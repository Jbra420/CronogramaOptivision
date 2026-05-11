import '../style.css';

document.addEventListener('DOMContentLoaded', () => {
  setupScrollAnimations();
  setupTaskTracking();
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
