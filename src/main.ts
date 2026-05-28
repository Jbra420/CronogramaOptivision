import '../style.css';
import { DEFAULT_SCHEDULES, DUMMY_JSON_TEMPLATE } from './schedulesData';
import type { Schedule, Task, ScheduleGroup, Deliverable, UploadedSchedulesStore } from './types';

// State management
let schedules: Schedule[] = [...DEFAULT_SCHEDULES];
let activeScheduleId: string = 'optivision';

// DOM elements cached
let schedulesGrid: HTMLElement | null = null;
let ganttThead: HTMLElement | null = null;
let ganttTbody: HTMLElement | null = null;
let deliverablesGrid: HTMLElement | null = null;
let deliverablesSection: HTMLElement | null = null;
let progressText: HTMLElement | null = null;
let resetBtn: HTMLElement | null = null;
let deleteCustomBtn: HTMLButtonElement | null = null;

// Modal elements (Detail)
let taskModal: HTMLElement | null = null;
let taskModalTitle: HTMLElement | null = null;
let taskModalDesc: HTMLElement | null = null;
let taskModalMemberTag: HTMLElement | null = null;
let taskModalClose: HTMLElement | null = null;

// Modal elements (Platform - Upload/Create)
let platformModal: HTMLElement | null = null;
let platformModalClose: HTMLElement | null = null;
let tabButtons: NodeListOf<HTMLButtonElement> | null = null;
let tabPanels: NodeListOf<HTMLElement> | null = null;
let dropZone: HTMLElement | null = null;
let fileInput: HTMLInputElement | null = null;
let uploadFeedback: HTMLElement | null = null;
let copyTemplateBtn: HTMLButtonElement | null = null;
let jsonTemplatePreview: HTMLElement | null = null;

// Builder form elements
let builderForm: HTMLFormElement | null = null;
let builderTasksList: HTMLElement | null = null;
let addBuilderTaskBtn: HTMLButtonElement | null = null;

document.addEventListener('DOMContentLoaded', () => {
  initDOMReferences();
  loadCustomSchedules();
  loadActiveScheduleId();
  
  // Render initial components
  renderSchedulesHub();
  loadAndRenderActiveSchedule();
  
  // Initialize general event listeners
  setupModals();
  setupDragAndDrop();
  setupBuilderForm();
  setupScrollAnimations();
});

function initDOMReferences() {
  schedulesGrid = document.getElementById('schedules-grid');
  ganttThead = document.getElementById('gantt-thead');
  ganttTbody = document.getElementById('gantt-tbody');
  deliverablesGrid = document.getElementById('deliverables-grid');
  deliverablesSection = document.getElementById('deliverables-section');
  progressText = document.getElementById('progress-text');
  resetBtn = document.getElementById('reset-btn');
  deleteCustomBtn = document.getElementById('delete-custom-btn') as HTMLButtonElement;

  taskModal = document.getElementById('task-modal');
  taskModalTitle = document.getElementById('modal-title');
  taskModalDesc = document.getElementById('modal-desc');
  taskModalMemberTag = document.getElementById('modal-member-tag');
  taskModalClose = document.getElementById('modal-close');

  platformModal = document.getElementById('platform-modal');
  platformModalClose = document.getElementById('platform-modal-close');
  tabButtons = document.querySelectorAll('.tab-btn');
  tabPanels = document.querySelectorAll('.tab-panel');
  dropZone = document.getElementById('drop-zone');
  fileInput = document.getElementById('file-input') as HTMLInputElement;
  uploadFeedback = document.getElementById('upload-feedback');
  copyTemplateBtn = document.getElementById('copy-template-btn') as HTMLButtonElement;
  jsonTemplatePreview = document.getElementById('json-template-preview');

  builderForm = document.getElementById('builder-form') as HTMLFormElement;
  builderTasksList = document.getElementById('builder-tasks-list');
  addBuilderTaskBtn = document.getElementById('add-builder-task-btn') as HTMLButtonElement;
}

// ==========================================================================
// DATA PERSISTENCE & LOADING
// ==========================================================================
function loadCustomSchedules() {
  try {
    const raw = localStorage.getItem('uploaded_schedules');
    if (raw) {
      const parsedStore: UploadedSchedulesStore = JSON.parse(raw);
      Object.keys(parsedStore).forEach(key => {
        // Avoid duplicate ids just in case
        if (!schedules.some(s => s.id === parsedStore[key].id)) {
          schedules.push(parsedStore[key]);
        }
      });
    }
  } catch (e) {
    console.error('Error loading custom schedules from local storage:', e);
  }
}

function saveCustomSchedule(schedule: Schedule) {
  try {
    const raw = localStorage.getItem('uploaded_schedules');
    const store: UploadedSchedulesStore = raw ? JSON.parse(raw) : {};
    store[schedule.id] = schedule;
    localStorage.setItem('uploaded_schedules', JSON.stringify(store));
  } catch (e) {
    console.error('Error saving custom schedule to local storage:', e);
  }
}

function deleteCustomSchedule(id: string) {
  try {
    const raw = localStorage.getItem('uploaded_schedules');
    if (raw) {
      const store: UploadedSchedulesStore = JSON.parse(raw);
      delete store[id];
      localStorage.setItem('uploaded_schedules', JSON.stringify(store));
    }
    
    // Remove from in-memory array
    schedules = schedules.filter(s => s.id !== id);
  } catch (e) {
    console.error('Error deleting custom schedule:', e);
  }
}

function loadActiveScheduleId() {
  const savedId = localStorage.getItem('active_schedule_id');
  if (savedId && schedules.some(s => s.id === savedId)) {
    activeScheduleId = savedId;
  } else {
    activeScheduleId = 'optivision';
  }
}

function setActiveScheduleId(id: string) {
  activeScheduleId = id;
  localStorage.setItem('active_schedule_id', id);
}

// ==========================================================================
// RENDER COMPONENT METHODS
// ==========================================================================

function getScheduleTasksState(scheduleId: string): Record<string, boolean> {
  return JSON.parse(localStorage.getItem(`schedule_progress_${scheduleId}`) || '{}');
}

function saveScheduleTasksState(scheduleId: string, state: Record<string, boolean>) {
  localStorage.setItem(`schedule_progress_${scheduleId}`, JSON.stringify(state));
}

function calculateProgress(schedule: Schedule): { total: number; checked: number; percentage: number } {
  let total = 0;
  schedule.groups.forEach(g => {
    total += g.tasks.length;
  });
  
  const savedState = getScheduleTasksState(schedule.id);
  let checked = 0;
  
  schedule.groups.forEach(g => {
    g.tasks.forEach(t => {
      if (savedState[t.id] === true) {
        checked++;
      }
    });
  });
  
  const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
  return { total, checked, percentage };
}

function getProjectIcon(id: string): string {
  if (id === 'optivision') {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }
  if (id === 'proyecto-piensa') {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;
}

function renderSchedulesHub() {
  if (!schedulesGrid) return;
  schedulesGrid.innerHTML = '';
  
  schedules.forEach(schedule => {
    const { percentage } = calculateProgress(schedule);
    const isActive = schedule.id === activeScheduleId;
    
    const tab = document.createElement('div');
    tab.className = `workspace-tab ${isActive ? 'active' : ''} ${schedule.id}`;
    tab.setAttribute('data-id', schedule.id);
    
    tab.innerHTML = `
      <div class="tab-led"></div>
      <div class="tab-icon-frame">
        ${getProjectIcon(schedule.id)}
      </div>
      <span class="tab-title-text">${schedule.title}</span>
      <span class="tab-percentage">${percentage}%</span>
    `;
    
    tab.addEventListener('click', () => {
      if (schedule.id !== activeScheduleId) {
        switchActiveSchedule(schedule.id);
      }
    });
    
    schedulesGrid?.appendChild(tab);
  });
  
  // Append "+ Add Custom Schedule" tab
  const addTab = document.createElement('div');
  addTab.className = 'workspace-tab add-tab';
  addTab.innerHTML = `
    <svg class="add-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    <span class="tab-title-text">Cargar Proyecto</span>
  `;
  addTab.addEventListener('click', () => {
    openPlatformModal();
  });
  
  schedulesGrid.appendChild(addTab);
}

function switchActiveSchedule(id: string) {
  setActiveScheduleId(id);
  renderSchedulesHub();
  
  // Re-render schedule with a smooth visual transition
  const tableSection = document.querySelector('.table-section');
  if (tableSection) {
    tableSection.classList.remove('slide-up');
    void (tableSection as HTMLElement).offsetWidth; // Trigger reflow for animation restart
    tableSection.classList.add('slide-up');
  }
  
  loadAndRenderActiveSchedule();
}

function loadAndRenderActiveSchedule() {
  const schedule = schedules.find(s => s.id === activeScheduleId) || schedules[0];
  if (!schedule) return;
  
  // Update header descriptions
  const titleDisplay = document.getElementById('schedule-title-display');
  const subtitleDisplay = document.getElementById('schedule-subtitle-display');
  const categoryBadge = document.getElementById('schedule-category-badge');
  const isCustom = !DEFAULT_SCHEDULES.some(s => s.id === schedule.id);
  
  if (titleDisplay) titleDisplay.textContent = schedule.title;
  if (subtitleDisplay) subtitleDisplay.textContent = schedule.subtitle;
  if (categoryBadge) {
    categoryBadge.textContent = isCustom ? 'Personalizado' : 'Plantilla';
    if (isCustom) {
      categoryBadge.classList.add('custom');
    } else {
      categoryBadge.classList.remove('custom');
    }
  }

  // Toggle dynamic delete button
  if (deleteCustomBtn) {
    if (isCustom) {
      deleteCustomBtn.style.display = 'flex';
      // Re-bind click event to prevent duplicates
      deleteCustomBtn.onclick = () => {
        if (confirm(`¿Estás seguro de que deseas eliminar permanentemente el cronograma "${schedule.title}"?`)) {
          deleteCustomSchedule(schedule.id);
          switchActiveSchedule('optivision');
        }
      };
    } else {
      deleteCustomBtn.style.display = 'none';
    }
  }
  
  renderTableHeaders(schedule);
  renderTableRows(schedule);
  renderDeliverables(schedule);
  updateProgressBar(schedule);
}

function renderTableHeaders(schedule: Schedule) {
  if (!ganttThead) return;
  ganttThead.innerHTML = '';
  
  const tr = document.createElement('tr');
  
  // Static headers
  tr.innerHTML = `
    <th class="col-objetivo sticky-col">Hito / Objetivo</th>
    <th class="col-actividad">Actividades</th>
    <th class="col-responsable">Responsables</th>
  `;
  
  // Dynamic weeks headers
  for (let i = 1; i <= schedule.weeksCount; i++) {
    const th = document.createElement('th');
    th.className = 'col-semana';
    if (schedule.weekNames && schedule.weekNames[i - 1]) {
      th.textContent = schedule.weekNames[i - 1];
    } else {
      th.textContent = `Semana ${i}`;
    }
    tr.appendChild(th);
  }
  
  ganttThead.appendChild(tr);
}

function renderTableRows(schedule: Schedule) {
  if (!ganttTbody) return;
  ganttTbody.innerHTML = '';
  
  const savedState = getScheduleTasksState(schedule.id);
  
  schedule.groups.forEach(group => {
    group.tasks.forEach((task, taskIndex) => {
      const isFirst = taskIndex === 0;
      const isLast = taskIndex === group.tasks.length - 1;
      const isCompleted = savedState[task.id] === true;
      
      const tr = document.createElement('tr');
      tr.className = `row-hover ${isLast ? 'border-bottom-heavy' : ''} ${isCompleted ? 'completed' : ''}`;
      
      // Objective/Hito column (spanned over all tasks of the group, rendered only for first task)
      if (isFirst) {
        const tdObj = document.createElement('td');
        tdObj.className = 'col-objetivo sticky-col group-header';
        tdObj.rowSpan = group.tasks.length;
        
        tdObj.innerHTML = `
          <span class="hito-badge ${getHitoBadgeClass(group.hito)}">${group.hito}</span>
          <strong>${group.title}</strong>
          <p>${group.subtitle}</p>
        `;
        tr.appendChild(tdObj);
      }
      
      // Task checkbox
      const tdAct = document.createElement('td');
      tdAct.className = 'col-actividad';
      tdAct.innerHTML = `
        <label class="task-checkbox">
          <input type="checkbox" data-task-id="${task.id}" ${isCompleted ? 'checked' : ''} />
          <span class="checkmark"></span>
          <span class="task-text">${task.text}</span>
        </label>
        <button class="detail-btn" data-info-id="${task.id}">
          <span>Descripción</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      `;
      
      // Bind checkbox change event
      const checkbox = tdAct.querySelector('input');
      checkbox?.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const state = getScheduleTasksState(schedule.id);
        const row = target.closest('tr');
        
        if (target.checked) {
          row?.classList.add('completed');
          state[task.id] = true;
        } else {
          row?.classList.remove('completed');
          state[task.id] = false;
        }
        
        saveScheduleTasksState(schedule.id, state);
        updateProgressBar(schedule);
        renderSchedulesHub(); // Refresh active progress bar in selector cards
      });
      
      // Bind detail button modal open event
      const detailBtn = tdAct.querySelector('.detail-btn');
      detailBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        openDetailModal(task);
      });
      
      tr.appendChild(tdAct);
      
      // Responsable tag
      const tdResp = document.createElement('td');
      tdResp.className = 'col-responsable';
      tdResp.innerHTML = `<span class="tag ${task.responsable.class}">${task.responsable.name}</span>`;
      tr.appendChild(tdResp);
      
      // Render dynamic active week cells
      for (let w = 1; w <= schedule.weeksCount; w++) {
        const tdWeek = document.createElement('td');
        tdWeek.className = 'col-semana';
        
        if (task.weeks.includes(w)) {
          tdWeek.className += ' cell-active';
          tdWeek.classList.add(getWeekBgClass(w, schedule.weeksCount));
        }
        tr.appendChild(tdWeek);
      }
      
      ganttTbody?.appendChild(tr);
    });
  });
}

function getHitoBadgeClass(hito: string): string {
  const norm = hito.toLowerCase();
  if (norm.includes('1') || norm.includes('inicio')) return '';
  if (norm.includes('2') || norm.includes('base')) return '';
  if (norm.includes('3') || norm.includes('sprint 1')) return '';
  if (norm.includes('4') || norm.includes('sprint 2')) return 'highlight';
  if (norm.includes('5') || norm.includes('core')) return 'highlight';
  if (norm.includes('6') || norm.includes('integración') || norm.includes('fase 1')) return 'warning';
  if (norm.includes('7') || norm.includes('qa')) return 'warning';
  if (norm.includes('lanzamiento') || norm.includes('cierre') || norm.includes('fase 2')) return 'success';
  return '';
}

function getWeekBgClass(weekIndex: number, totalWeeks: number): string {
  if (totalWeeks === 4) {
    if (weekIndex === 1) return 'bg-s1';
    if (weekIndex === 2) return 'bg-s2';
    if (weekIndex === 3) return 'bg-s3';
    return 'bg-s4';
  } else if (totalWeeks === 3) {
    if (weekIndex === 1) return 'bg-s1';
    if (weekIndex === 2) return 'bg-s2-alt';
    return 'bg-s3-end';
  } else if (totalWeeks === 2) {
    if (weekIndex === 1) return 'bg-s1';
    return 'bg-s4-end';
  }
  // Dynamic cycle for schedules with many weeks (e.g. PROYECTO PIENSA with 9 weeks)
  const cycleClasses = ['bg-s1', 'bg-s2', 'bg-s2-alt', 'bg-s3', 'bg-s3-alt', 'bg-s3-qa', 'bg-s4', 'bg-s4-end', 'bg-s3-end'];
  return cycleClasses[(weekIndex - 1) % cycleClasses.length];
}

function renderDeliverables(schedule: Schedule) {
  if (!deliverablesGrid || !deliverablesSection) return;
  deliverablesGrid.innerHTML = '';
  
  if (!schedule.deliverables || schedule.deliverables.length === 0) {
    // Hide deliverables section if none defined
    deliverablesSection.style.display = 'none';
    return;
  }
  
  deliverablesSection.style.display = 'block';
  
  schedule.deliverables.forEach(deliv => {
    const card = document.createElement('div');
    card.className = 'deliverable-card';
    card.setAttribute('data-member', deliv.member);
    
    card.innerHTML = `
      <div class="avatar ${deliv.gradient}">${deliv.avatar}</div>
      <div class="deliverable-info">
        <h4>${deliv.name}</h4>
        <p>${deliv.desc}</p>
      </div>
    `;
    deliverablesGrid?.appendChild(card);
  });
}

function updateProgressBar(schedule: Schedule) {
  if (!progressText) return;
  const { percentage } = calculateProgress(schedule);
  progressText.textContent = `${percentage}%`;
  
  // Re-bind reset button click for the active schedule
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm(`¿Estás seguro de que deseas reiniciar todo el progreso del cronograma "${schedule.title}"?`)) {
        saveScheduleTasksState(schedule.id, {});
        loadAndRenderActiveSchedule();
        renderSchedulesHub();
      }
    };
  }
}

// ==========================================================================
// TASK DETAIL MODAL METHODS
// ==========================================================================
function openDetailModal(task: Task) {
  if (!taskModal || !taskModalTitle || !taskModalDesc || !taskModalMemberTag) return;
  
  taskModalTitle.textContent = task.text;
  taskModalDesc.textContent = task.desc || 'No hay descripción detallada para esta actividad.';
  
  taskModalMemberTag.textContent = task.responsable.name;
  taskModalMemberTag.className = `tag ${task.responsable.class}`;
  
  taskModal.classList.add('active');
}

function setupModals() {
  // Close buttons
  taskModalClose?.addEventListener('click', () => taskModal?.classList.remove('active'));
  platformModalClose?.addEventListener('click', closePlatformModal);
  
  // Backdrop closes
  window.addEventListener('click', (e) => {
    if (e.target === taskModal) taskModal?.classList.remove('active');
    if (e.target === platformModal) closePlatformModal();
  });
  
  // Escape key closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      taskModal?.classList.remove('active');
      closePlatformModal();
    }
  });

  // Setup platform modal tabs switching
  tabButtons?.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (!targetTab) return;
      
      tabButtons?.forEach(b => b.classList.remove('active'));
      tabPanels?.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Prepopulate the JSON template block
  if (jsonTemplatePreview) {
    jsonTemplatePreview.textContent = DUMMY_JSON_TEMPLATE;
  }

  // Copy template button action
  if (copyTemplateBtn) {
    copyTemplateBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(DUMMY_JSON_TEMPLATE).then(() => {
        copyTemplateBtn!.classList.add('copied');
        const textSpan = copyTemplateBtn!.querySelector('span');
        if (textSpan) textSpan.textContent = '¡Copiado!';
        
        setTimeout(() => {
          copyTemplateBtn!.classList.remove('copied');
          if (textSpan) textSpan.textContent = 'Copiar JSON';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }
}

function openPlatformModal() {
  platformModal?.classList.add('active');
  // Clear any past feedback
  if (uploadFeedback) {
    uploadFeedback.style.display = 'none';
    uploadFeedback.innerHTML = '';
  }
  
  // Prepopulate form if empty
  if (builderTasksList && builderTasksList.children.length === 0) {
    addBuilderTaskRow();
  }
}

function closePlatformModal() {
  platformModal?.classList.remove('active');
}

// ==========================================================================
// DRAG AND DROP / FILE UPLOAD SYSTEM
// ==========================================================================
function setupDragAndDrop() {
  if (!dropZone || !fileInput) return;
  
  // Click on zone triggers input choose
  dropZone.addEventListener('click', () => {
    fileInput?.click();
  });
  
  fileInput.addEventListener('change', () => {
    if (fileInput?.files && fileInput.files.length > 0) {
      handleUploadedFile(fileInput.files[0]);
    }
  });
  
  // Drag over / leave effects
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone?.classList.add('dragover');
  });
  
  ['dragleave', 'dragend'].forEach(evtName => {
    dropZone?.addEventListener(evtName, () => {
      dropZone?.classList.remove('dragover');
    });
  });
  
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone?.classList.remove('dragover');
    
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      handleUploadedFile(e.dataTransfer.files[0]);
    }
  });
}

function showUploadFeedback(type: 'success' | 'error', text: string) {
  if (!uploadFeedback) return;
  uploadFeedback.style.display = 'block';
  uploadFeedback.className = `upload-feedback ${type}`;
  uploadFeedback.innerHTML = `<strong>${type === 'success' ? '✓ Éxito' : '✗ Error'}:</strong> ${text}`;
}

function handleUploadedFile(file: File) {
  if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
    showUploadFeedback('error', 'El archivo cargado debe ser un archivo JSON válido.');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target?.result as string);
      
      if (validateSchedule(parsed)) {
        // ID should be unique. Append salt if it exists to avoid overwriting default templates
        if (DEFAULT_SCHEDULES.some(s => s.id === parsed.id)) {
          parsed.id = `${parsed.id}-${Date.now()}`;
        }
        
        saveCustomSchedule(parsed);
        schedules.push(parsed);
        
        showUploadFeedback('success', `Cronograma "${parsed.title}" cargado e integrado correctamente.`);
        
        setTimeout(() => {
          closePlatformModal();
          switchActiveSchedule(parsed.id);
        }, 1200);
      } else {
        showUploadFeedback('error', 'El archivo JSON cargado no cumple con el esquema estructural requerido. Por favor, revisa la plantilla de referencia.');
      }
    } catch (err) {
      showUploadFeedback('error', 'No se pudo parsear el archivo. Comprueba que el JSON de tu cronograma esté formateado de forma correcta.');
    }
  };
  
  reader.readAsText(file);
}

// Full Type Guard validation for uploaded schedules
function validateSchedule(data: any): data is Schedule {
  if (!data || typeof data !== 'object') return false;
  if (typeof data.id !== 'string' || !data.id.trim()) return false;
  if (typeof data.title !== 'string' || !data.title.trim()) return false;
  if (typeof data.subtitle !== 'string') return false;
  if (typeof data.weeksCount !== 'number' || data.weeksCount < 1 || data.weeksCount > 4) return false;
  if (!Array.isArray(data.groups)) return false;
  
  for (const group of data.groups) {
    if (typeof group !== 'object' || !group) return false;
    if (typeof group.hito !== 'string' || !group.hito.trim()) return false;
    if (typeof group.title !== 'string' || !group.title.trim()) return false;
    if (typeof group.subtitle !== 'string') return false;
    if (!Array.isArray(group.tasks)) return false;
    
    for (const task of group.tasks) {
      if (typeof task !== 'object' || !task) return false;
      if (typeof task.id !== 'string' || !task.id.trim()) return false;
      if (typeof task.text !== 'string' || !task.text.trim()) return false;
      if (typeof task.desc !== 'string') return false;
      if (!Array.isArray(task.weeks) || task.weeks.length === 0) return false;
      
      for (const w of task.weeks) {
        if (typeof w !== 'number' || w < 1 || w > data.weeksCount) return false;
      }
      
      if (!task.responsable || typeof task.responsable !== 'object') return false;
      if (typeof task.responsable.name !== 'string' || !task.responsable.name.trim()) return false;
      if (typeof task.responsable.class !== 'string' || !task.responsable.class.trim()) return false;
    }
  }
  
  // Deliverables is optional, but validate if present
  if (data.deliverables !== undefined) {
    if (!Array.isArray(data.deliverables)) return false;
    for (const deliv of data.deliverables) {
      if (typeof deliv !== 'object' || !deliv) return false;
      if (typeof deliv.member !== 'string') return false;
      if (typeof deliv.name !== 'string') return false;
      if (typeof deliv.avatar !== 'string') return false;
      if (typeof deliv.gradient !== 'string') return false;
      if (typeof deliv.desc !== 'string') return false;
    }
  }
  
  return true;
}

// ==========================================================================
// VISUAL CRONOGRAMA QUICK BUILDER FORM
// ==========================================================================
let taskCounter = 1;

function addBuilderTaskRow() {
  if (!builderTasksList) return;
  
  const row = document.createElement('div');
  row.className = 'builder-task-row';
  row.innerHTML = `
    <input type="text" placeholder="Actividad (ej. Mockups iniciales)" required class="task-text-input" />
    <select class="task-resp-select">
      <option value="Equipo" data-class="equipo">Equipo</option>
      <option value="Juan" data-class="juan">Juan</option>
      <option value="Jessica" data-class="jessica">Jessica</option>
      <option value="Carlos" data-class="carlos">Carlos</option>
      <option value="Alexis" data-class="alexis">Alexis</option>
    </select>
    <input type="text" placeholder="Semanas (ej. 1, 2)" value="1" required class="task-weeks-input" title="Introduce números separados por comas" />
    <button type="button" class="remove-task-row-btn" title="Eliminar actividad">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
    </button>
  `;
  
  // Bind remove row button
  const removeBtn = row.querySelector('.remove-task-row-btn');
  removeBtn?.addEventListener('click', () => {
    // Keep at least one row
    if (builderTasksList!.children.length > 1) {
      row.remove();
    } else {
      alert('Debes añadir al menos una actividad a realizar en tu cronograma.');
    }
  });
  
  builderTasksList.appendChild(row);
  taskCounter++;
}

function setupBuilderForm() {
  if (!addBuilderTaskBtn || !builderForm) return;
  
  addBuilderTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBuilderTaskRow();
  });
  
  builderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const titleVal = (document.getElementById('builder-title') as HTMLInputElement).value.trim();
    const subtitleVal = (document.getElementById('builder-subtitle') as HTMLInputElement).value.trim() || 'Proyecto personalizado';
    const weeksVal = parseInt((document.getElementById('builder-weeks') as HTMLSelectElement).value, 10);
    
    if (!titleVal) {
      alert('Por favor introduce el título del proyecto.');
      return;
    }
    
    // Process form rows into Tasks array
    const rows = builderTasksList?.querySelectorAll('.builder-task-row');
    if (!rows || rows.length === 0) {
      alert('Por favor añade al menos una actividad.');
      return;
    }
    
    const generatedTasks: Task[] = [];
    const idSalt = Date.now();
    let hasError = false;
    
    rows.forEach((row, index) => {
      if (hasError) return;
      
      const textInput = row.querySelector('.task-text-input') as HTMLInputElement;
      const respSelect = row.querySelector('.task-resp-select') as HTMLSelectElement;
      const weeksInput = row.querySelector('.task-weeks-input') as HTMLInputElement;
      
      const text = textInput.value.trim();
      const respName = respSelect.value;
      const respClass = respSelect.options[respSelect.selectedIndex].getAttribute('data-class') || 'equipo';
      
      // Parse active weeks list (e.g. "1, 2" or "1")
      const weeksList = weeksInput.value.split(',')
        .map(w => parseInt(w.trim(), 10))
        .filter(w => !isNaN(w) && w >= 1 && w <= weeksVal);
        
      if (!text) {
        alert(`La actividad #${index + 1} no tiene texto descriptivo.`);
        hasError = true;
        return;
      }
      
      if (weeksList.length === 0) {
        alert(`Debes asignar al menos una semana válida (entre 1 y ${weeksVal}) para la actividad #${index + 1}.`);
        hasError = true;
        return;
      }
      
      generatedTasks.push({
        id: `custom-task-${idSalt}-${index}`,
        text: text,
        responsable: { name: respName, class: respClass },
        weeks: weeksList,
        desc: `Esta actividad forma parte del proyecto "${titleVal}" y es responsabilidad de ${respName}. Debe llevarse a cabo durante las semanas: ${weeksList.join(', ')}.`
      });
    });
    
    if (hasError) return;
    
    // Group all tasks under a main default group
    const mainGroup: ScheduleGroup = {
      hito: 'Lanzamiento',
      title: 'Plan de Actividades',
      subtitle: 'Actividades Generales',
      tasks: generatedTasks
    };
    
    // Generate simple deliverables mapping
    const uniqueResps = Array.from(new Set(generatedTasks.map(t => t.responsable.name)));
    const generatedDeliverables: Deliverable[] = uniqueResps.map((name) => {
      const t = generatedTasks.find(x => x.responsable.name === name);
      const respClass = t ? t.responsable.class : 'equipo';
      
      let gradient = 'gradient-1';
      if (respClass === 'jessica') gradient = 'gradient-2';
      if (respClass === 'carlos') gradient = 'gradient-3';
      if (respClass === 'alexis') gradient = 'gradient-4';
      
      return {
        member: name.toLowerCase().replace(/\s+/g, '-'),
        name: name,
        avatar: name.substring(0, 2).toUpperCase(),
        gradient: gradient,
        desc: `Encargado de actividades clave en el proyecto tales como: ${generatedTasks.filter(x => x.responsable.name === name).map(x => x.text.substring(0, 25) + '...').join(', ')}`
      };
    });
    
    const newSchedule: Schedule = {
      id: `custom-proj-${idSalt}`,
      title: titleVal,
      subtitle: subtitleVal,
      weeksCount: weeksVal,
      groups: [mainGroup],
      deliverables: generatedDeliverables
    };
    
    // Integrate and switch
    saveCustomSchedule(newSchedule);
    schedules.push(newSchedule);
    
    // Clear and close
    builderForm?.reset();
    if (builderTasksList) builderTasksList.innerHTML = '';
    taskCounter = 1;
    addBuilderTaskRow(); // populate first row
    
    closePlatformModal();
    switchActiveSchedule(newSchedule.id);
  });
}

// ==========================================================================
// SCROLL ANIMATIONS INTERSECTION OBSERVER
// ==========================================================================
function setupScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.table-section, .deliverables-section, .hub-section');
  elementsToAnimate.forEach(el => {
    el.classList.remove('slide-up');
    (el as HTMLElement).style.opacity = '0';
    observer.observe(el);
  });
}
