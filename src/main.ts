import '../style.css';

document.addEventListener('DOMContentLoaded', () => {
  setupScrollAnimations();
  setupTaskTracking();
  setupModals();
});

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

  const elementsToAnimate = document.querySelectorAll('.table-section');
  elementsToAnimate.forEach(el => {
    el.classList.remove('slide-up');
    (el as HTMLElement).style.opacity = '0';
    observer.observe(el);
  });
}

function setupTaskTracking() {
  const checkboxes = document.querySelectorAll<HTMLInputElement>('.task-checkbox input');
  const progressText = document.getElementById('progress-text');
  const resetBtn = document.getElementById('reset-btn');
  const totalTasks = checkboxes.length;

  // Load saved state
  const savedState = JSON.parse(localStorage.getItem('optivisionTasks') || '{}');

  function updateProgress() {
    const checkedCount = document.querySelectorAll('.task-checkbox input:checked').length;
    const percentage = Math.round((checkedCount / totalTasks) * 100);
    if (progressText) {
      progressText.textContent = `${percentage}%`;
    }
  }

  function handleCheckboxChange(checkbox: HTMLInputElement) {
    const taskId = checkbox.getAttribute('data-task-id');
    if (!taskId) return;

    const row = checkbox.closest('tr');
    if (checkbox.checked) {
      row?.classList.add('completed');
      savedState[taskId] = true;
    } else {
      row?.classList.remove('completed');
      savedState[taskId] = false;
    }

    localStorage.setItem('optivisionTasks', JSON.stringify(savedState));
    updateProgress();
  }

  checkboxes.forEach(checkbox => {
    const taskId = checkbox.getAttribute('data-task-id');
    if (taskId && savedState[taskId]) {
      checkbox.checked = true;
      checkbox.closest('tr')?.classList.add('completed');
    }

    checkbox.addEventListener('change', (e) => {
      handleCheckboxChange(e.target as HTMLInputElement);
    });
  });

  // Initial calculation
  updateProgress();

  // Reset functionality
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que deseas reiniciar todo el progreso del proyecto?')) {
        localStorage.removeItem('optivisionTasks');
        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
          checkbox.closest('tr')?.classList.remove('completed');
        });
        // Clear saved state object
        for (const key in savedState) {
          delete savedState[key];
        }
        updateProgress();
      }
    });
  }
}

const taskDescriptions: Record<string, string> = {
  'r1-t1': 'Reunión de inicio oficial del proyecto OptiVision. Se presentarán los objetivos generales, los límites del sistema (alcance) y la metodología de trabajo Mobile-D que guiará el desarrollo en las próximas 4 semanas.',
  'r1-t2': 'El Product Manager (Alexis) liderará la definición de las historias de usuario principales, detallando los roles, las acciones y los criterios de aceptación para cada requerimiento funcional.',
  'r1-t3': 'El Scrum Master (Juan) formalizará la distribución de responsabilidades en el equipo, asegurando que todos comprendan sus roles (Lead Mobile, UI/UX, Backend, QA).',
  'r1-t4': 'Juan realizará una investigación técnica de las opciones disponibles para integrar Realidad Aumentada en .NET MAUI (ej. ARKit, ARCore o frameworks de terceros) para el probador virtual.',
  'r1-t5': 'Jessica comenzará el bosquejo de baja fidelidad (wireframes) de las pantallas clave de la aplicación móvil, definiendo la distribución visual básica.',
  'r1-t6': 'Carlos diseñará el modelo Entidad-Relación preliminar de la base de datos SQLite, enfocándose en las entidades principales: Usuarios, Lentes y Citas.',
  'r2-t1': 'Juan inicializará el repositorio en GitHub, configurará las ramas de trabajo (main, dev) y establecerá las políticas de commits y PRs para el equipo.',
  'r2-t2': 'Juan establecerá la estructura base del proyecto .NET MAUI utilizando el patrón de diseño MVVM (Model-View-ViewModel) para separar la lógica de la interfaz.',
  'r2-t3': 'Alexis organizará las historias de usuario en el Product Backlog utilizando una herramienta de gestión, priorizando las tareas del primer sprint.',
  'r2-t4': 'Carlos instalará y configurará la instancia de SQLite, creará la base de datos del proyecto y ejecutará los primeros scripts DDL del esquema.',
  'r2-t5': 'Jessica refinará los wireframes iniciales añadiendo más detalle a la navegación, los estados de UI y los componentes interactivos.',
  'r3-t1': 'Revisión conjunta de la arquitectura base del proyecto MAUI. Juan mostrará cómo se ha estructurado el ruteo y la inyección de dependencias.',
  'r3-t2': 'Carlos desarrollará en ASP.NET Core los primeros endpoints RESTful (ej. controladores básicos de salud y listado estático).',
  'r3-t3': 'El equipo revisará los wireframes de Jessica para asegurar que cumplen con el flujo de usuario deseado antes de pasar a alta fidelidad.',
  'r3-t4': 'Alexis validará el avance frente al cronograma original, identificando posibles bloqueos y ajustando el backlog si es necesario.',
  'r4-t1': 'Juan y Carlos integrarán el sistema de Login/Registro. Carlos expondrá el endpoint con JWT y Juan implementará los servicios y vistas correspondientes en MAUI.',
  'r4-t2': 'Carlos conectará la API de ASP.NET Core con la base de datos SQLite mediante Entity Framework Core, aplicando las primeras migraciones.',
  'r4-t3': 'Juan programará el Shell de navegación de la aplicación móvil, conectando el menú lateral o tabs con las vistas principales vacías.',
  'r4-t4': 'Jessica aplicará feedback técnico a los diseños y comenzará a definir los tokens de diseño (colores, tipografía) para la fase de alta fidelidad.',
  'r4-t5': 'Alexis realizará las primeras pruebas manuales de la autenticación, documentando cualquier bug encontrado en el flujo de login.',
  'r5-t1': 'Juan integrará el SDK de AR seleccionado en el proyecto MAUI, habilitando el acceso a la cámara e implementando un renderizado básico sobre el rostro.',
  'r5-t2': 'Carlos completará el módulo backend para el agendamiento de citas médicas, incluyendo validaciones de disponibilidad de horarios y CRUD de reservaciones.',
  'r5-t3': 'Jessica entregará las interfaces en Alta Fidelidad (Hi-Fi) mostrando el aspecto visual final que tendrá la app OptiVision.',
  'r5-t4': 'Alexis presentará un reporte consolidado sobre los bugs descubiertos hasta el momento y el estado general de estabilidad de la aplicación base.',
  'r6-t1': 'Sincronización completa: Juan conectará las vistas MAUI con todos los endpoints finales desarrollados por Carlos, eliminando los datos mockeados.',
  'r6-t2': 'Carlos y Juan trabajarán juntos para obtener, deserializar y renderizar dinámicamente la lista de lentes desde la base de datos en el UI.',
  'r6-t3': 'Jessica verificará que la implementación en .NET MAUI coincida exactamente con los diseños Hi-Fi, reportando desajustes de CSS/Estilos.',
  'r6-t4': 'Alexis estructurará el guion y el orden del video de presentación final, asignando las partes que deberá grabar cada miembro.',
  'r7-t1': 'Todo el equipo ejecutará pruebas End-to-End simulando un flujo completo de usuario (registro -> agendar cita -> usar probador AR).',
  'r7-t2': 'Sprint intensivo de resolución de errores críticos encontrados durante las pruebas funcionales. Prioridad en fallos de negocio.',
  'r7-t3': 'Juan perfilará la aplicación móvil, reduciendo tiempos de carga de imágenes y optimizando el consumo de RAM en la cámara AR.',
  'r7-t4': 'Carlos revisará la integridad referencial, asegurará la correcta indexación de tablas y realizará un respaldo limpio de la base de datos final.',
  'r7-t5': 'Alexis agrupará todos los artefactos de la metodología Mobile-D en un documento formal para la entrega académica.',
  'r7-t6': 'Auditoría final de Jessica en los dispositivos físicos reales para asegurar un diseño responsivo impecable en diferentes tamaños de pantalla.',
  's4-t1': 'Reunión del equipo para practicar la defensa oral y la presentación del video, midiendo tiempos y afinando transiciones.',
  's4-t2': 'Pequeños retoques de código o configuración de servidor de último minuto que surgieron durante los ensayos.',
  's4-t3': 'Jessica generará iconos, banners y cualquier activo gráfico necesario para la documentación y el repositorio.',
  's4-t4': 'Alexis subirá el informe final, actas de reuniones y enlaces al sistema de la universidad.',
  's4-t5': 'Presentación final ante el jurado o stakeholders, demostrando la funcionalidad de OptiVision y los resultados obtenidos.'
};

function setupModals() {
  const modal = document.getElementById('task-modal');
  const closeBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const infoButtons = document.querySelectorAll('.detail-btn');

  if (!modal || !closeBtn || !modalTitle || !modalDesc) return;

  const openModal = (id: string, title: string) => {
    modalTitle.textContent = title;
    modalDesc.textContent = taskDescriptions[id] || 'Descripción detallada no disponible para esta actividad.';
    modal.classList.add('active');
  };

  const closeModal = () => {
    modal.classList.remove('active');
  };

  infoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      const id = target.getAttribute('data-info-id');
      const row = target.closest('tr');
      const textSpan = row?.querySelector('.task-text');
      
      if (id && textSpan) {
        openModal(id, textSpan.textContent || 'Detalle de la Actividad');
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
