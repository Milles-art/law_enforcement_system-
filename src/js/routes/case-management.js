import { format } from 'date-fns';

// Mock data for cases
const cases = [
  {
    id: 'CASE-2023-001',
    title: 'Armed Robbery at 123 Main St',
    status: 'Active',
    priority: 'High',
    assignedTo: 'Det. Sarah Johnson',
    lastUpdated: '2023-09-15T10:30:00',
    description: 'Armed robbery at convenience store. Two suspects, one weapon reported.'
  },
  {
    id: 'CASE-2023-002',
    title: 'Vehicle Theft',
    status: 'Under Investigation',
    priority: 'Medium',
    assignedTo: 'Det. Mike Williams',
    lastUpdated: '2023-09-14T15:45:00',
    description: 'Red Toyota Camry stolen from parking lot at 456 Oak Ave.'
  },
  {
    id: 'CASE-2023-003',
    title: 'Domestic Disturbance',
    status: 'Pending Review',
    priority: 'Medium',
    assignedTo: 'Officer Robert Chen',
    lastUpdated: '2023-09-13T09:15:00',
    description: 'Noise complaint and verbal altercation reported by neighbors.'
  }
];

// Initialize case management
export function initCaseManagement() {
  const caseList = document.getElementById('case-list');
  const searchInput = document.getElementById('case-search');
  const statusFilter = document.getElementById('status-filter');
  const priorityFilter = document.getElementById('priority-filter');

  // Render cases
  function renderCases(filteredCases = cases) {
    caseList.innerHTML = filteredCases.map(case_ => `
      <div class="case-card" data-id="${case_.id}">
        <div class="case-header">
          <h3>${case_.title}</h3>
          <span class="case-id">${case_.id}</span>
        </div>
        <div class="case-details">
          <div class="case-status ${case_.status.toLowerCase().replace(' ', '-')}">
            ${case_.status}
          </div>
          <div class="case-priority ${case_.priority.toLowerCase()}">
            ${case_.priority}
          </div>
        </div>
        <p class="case-description">${case_.description}</p>
        <div class="case-footer">
          <div class="assigned-to">
            <i class="fas fa-user"></i>
            ${case_.assignedTo}
          </div>
          <div class="last-updated">
            <i class="fas fa-clock"></i>
            ${format(new Date(case_.lastUpdated), 'PPp')}
          </div>
        </div>
        <div class="case-actions">
          <button class="action-button edit">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="action-button view">
            <i class="fas fa-eye"></i> View
          </button>
        </div>
      </div>
    `).join('');

    // Add event listeners to case cards
    document.querySelectorAll('.case-card').forEach(card => {
      card.querySelector('.edit').addEventListener('click', (e) => {
        e.stopPropagation();
        const caseId = card.dataset.id;
        alert(`Edit case ${caseId}`);
      });

      card.querySelector('.view').addEventListener('click', (e) => {
        e.stopPropagation();
        const caseId = card.dataset.id;
        alert(`View case ${caseId}`);
      });
    });
  }

  // Search functionality
  searchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCases = cases.filter(case_ => 
      case_.title.toLowerCase().includes(searchTerm) ||
      case_.id.toLowerCase().includes(searchTerm) ||
      case_.description.toLowerCase().includes(searchTerm)
    );
    renderCases(filteredCases);
  });

  // Filter functionality
  function applyFilters() {
    const status = statusFilter?.value;
    const priority = priorityFilter?.value;
    
    let filteredCases = [...cases];
    
    if (status && status !== 'all') {
      filteredCases = filteredCases.filter(case_ => case_.status === status);
    }
    
    if (priority && priority !== 'all') {
      filteredCases = filteredCases.filter(case_ => case_.priority === priority);
    }
    
    renderCases(filteredCases);
  }

  statusFilter?.addEventListener('change', applyFilters);
  priorityFilter?.addEventListener('change', applyFilters);

  // Initial render
  renderCases();
}