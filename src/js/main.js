import { format } from 'date-fns';
import Chart from 'chart.js/auto';

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
    const moduleName = card.querySelector('h3').textContent;
    const moduleUrl = '/' + moduleName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    window.location.href = moduleUrl;
  });
});

// Update timestamps
function updateTimestamps() {
  document.querySelectorAll('.activity-time').forEach(time => {
    const timestamp = time.getAttribute('data-time');
    if (timestamp) {
      time.textContent = format(new Date(timestamp), 'PP');
    }
  });
}

// Mock officer name functionality
const officerName = "Taylor"; // Default name
const welcomeText = document.querySelector(".content-header p");
welcomeText.textContent = `Welcome back, Officer ${officerName}!`;

// Initialize timestamps
updateTimestamps();