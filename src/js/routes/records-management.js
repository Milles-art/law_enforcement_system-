import { format } from 'date-fns';

// Mock data for records
const records = [
  {
    id: 'REC-2023-001',
    type: 'Criminal',
    name: 'John Smith',
    dob: '1985-06-15',
    lastIncident: '2023-09-10',
    status: 'Active',
    charges: ['Theft', 'Assault'],
    risk: 'High'
  },
  {
    id: 'REC-2023-002',
    type: 'Incident',
    name: 'Traffic Accident',
    location: '789 Pine St',
    date: '2023-09-12',
    status: 'Resolved',
    involvedParties: ['Sarah Brown', 'Michael Lee'],
    severity: 'Medium'
  },
  {
    id: 'REC-2023-003',
    type: 'Criminal',
    name: 'Jane Doe',
    dob: '1990-03-22',
    lastIncident: '2023-09-08',
    status: 'Inactive',
    charges: ['Drug Possession'],
    risk: 'Low'
  }
];

// Initialize records management
export function initRecordsManagement() {
  const recordsList = document.getElementById('records-list');
  const searchInput = document.getElementById('record-search');
  const typeFilter = document.getElementById('type-filter');
  const statusFilter = document.getElementById('status-filter');

  // Render records
  function renderRecords(filteredRecords = records) {
    recordsList.innerHTML = filteredRecords.map(record => `
      <div class="record-card" data-id="${record.id}">
        <div class="record-header">
          <div class="record-type ${record.type.toLowerCase()}">${record.type}</div>
          <span class="record-id">${record.id}</span>
        </div>
        
        <h3 class="record-name">${record.name}</h3>
        
        ${record.type === 'Criminal' ? `
          <div class="record-details">
            <div class="detail-item">
              <i class="fas fa-calendar"></i>
              <span>DOB: ${format(new Date(record.dob), 'PP')}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-exclamation-circle"></i>
              <span>Risk Level: ${record.risk}</span>
            </div>
          </div>
          <div class="charges-list">
            ${record.charges.map(charge => `
              <span class="charge-tag">${charge}</span>
            `).join('')}
          </div>
        ` : `
          <div class="record-details">
            <div class="detail-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>${record.location}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-calendar"></i>
              <span>${format(new Date(record.date), 'PP')}</span>
            </div>
          </div>
          <div class="involved-parties">
            ${record.involvedParties.map(party => `
              <span class="party-tag">${party}</span>
            `).join('')}
          </div>
        `}
        
        <div class="record-status ${record.status.toLowerCase()}">
          ${record.status}
        </div>
        
        <div class="record-actions">
          <button class="action-button view">
            <i class="fas fa-eye"></i> View Details
          </button>
          <button class="action-button edit">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="action-button history">
            <i class="fas fa-history"></i> History
          </button>
        </div>
      </div>
    `).join('');

    // Add event listeners to record cards
    document.querySelectorAll('.record-card').forEach(card => {
      card.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = button.classList[1];
          const recordId = card.dataset.id;
          alert(`${action.charAt(0).toUpperCase() + action.slice(1)} record ${recordId}`);
        });
      });
    });
  }

  // Search functionality
  searchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredRecords = records.filter(record => 
      record.name.toLowerCase().includes(searchTerm) ||
      record.id.toLowerCase().includes(searchTerm) ||
      (record.type === 'Criminal' && record.charges.some(charge => 
        charge.toLowerCase().includes(searchTerm)
      )) ||
      (record.type === 'Incident' && record.involvedParties.some(party => 
        party.toLowerCase().includes(searchTerm)
      ))
    );
    renderRecords(filteredRecords);
  });

  // Filter functionality
  function applyFilters() {
    const type = typeFilter?.value;
    const status = statusFilter?.value;
    
    let filteredRecords = [...records];
    
    if (type && type !== 'all') {
      filteredRecords = filteredRecords.filter(record => record.type === type);
    }
    
    if (status && status !== 'all') {
      filteredRecords = filteredRecords.filter(record => record.status === status);
    }
    
    renderRecords(filteredRecords);
  }

  typeFilter?.addEventListener('change', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);

  // Initial render
  renderRecords();
}