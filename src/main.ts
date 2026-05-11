import '../style.css';

document.addEventListener('DOMContentLoaded', () => {
  setupScrollAnimations();
  setupTeamInteractions();
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

  const elementsToAnimate = document.querySelectorAll('.timeline-week, .milestone-card');
  
  elementsToAnimate.forEach(el => {
    // Remove the class if it exists to allow the observer to trigger it
    el.classList.remove('slide-up');
    (el as HTMLElement).style.opacity = '0';
    observer.observe(el);
  });
}

function setupTeamInteractions() {
  const teamCards = document.querySelectorAll('.team-card');
  const allTasks = document.querySelectorAll('.activities-list li');

  teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const memberId = card.getAttribute('data-member');
      if (!memberId) return;

      // Dim all tasks
      allTasks.forEach(task => {
        (task as HTMLElement).style.opacity = '0.3';
        (task as HTMLElement).style.transition = 'opacity 0.3s ease';
      });

      // Highlight tasks for this member (including team tasks)
      const memberTasks = document.querySelectorAll(`.activities-list li[data-member="${memberId}"], .activities-list li[data-member="equipo"], .activities-list li[data-member*="${memberId}"]`);
      memberTasks.forEach(task => {
        (task as HTMLElement).style.opacity = '1';
        (task as HTMLElement).style.transform = 'translateX(5px)';
      });
    });

    card.addEventListener('mouseleave', () => {
      // Reset all tasks
      allTasks.forEach(task => {
        (task as HTMLElement).style.opacity = '1';
        (task as HTMLElement).style.transform = 'translateX(0)';
      });
    });
  });
}
