

  // Toggle sidebar
  document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
  });

  // Highlight active menu item
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Dark mode toggle
  document.getElementById('dark-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });

  // Module card hover effects
  const moduleCards = document.querySelectorAll('.module-card');
  moduleCards.forEach(card => {
    card.addEventListener('click', () => {
      alert('Opening ' + card.querySelector('h3').textContent + ' module');
    });
  });

  // Mock officer name functionality - removed prompt for better UX
  const officerName = "Taylor"; // Default name
  const welcomeText = document.querySelector(".content-header p");
  welcomeText.textContent = `Welcome back, Officer ${officerName}!`;
