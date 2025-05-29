import { format, addDays, isBefore } from 'date-fns';
import { faker } from '@faker-js/faker';

// Generate mock fleet data
const vehicles = Array.from({ length: 10 }, (_, index) => ({
  id: `VEH-${(index + 1).toString().padStart(3, '0')}`,
  type: faker.helpers.arrayElement(['Patrol Car', 'SUV', 'Motorcycle', 'Van']),
  make: faker.vehicle.manufacturer(),
  model: faker.vehicle.model(),
  year: faker.number.int({ min: 2020, max: 2023 }),
  mileage: faker.number.int({ min: 1000, max: 50000 }),
  status: faker.helpers.arrayElement(['Active', 'Maintenance', 'Out of Service']),
  lastMaintenance: faker.date.past(),
  nextMaintenance: faker.date.future(),
  assignedTo: faker.person.fullName(),
  fuelLevel: faker.number.int({ min: 20, max: 100 }),
  location: faker.helpers.arrayElement(['North Precinct', 'South Precinct', 'Central Station', 'East Division'])
}));

// Initialize fleet management
export function initFleetManagement() {
  const vehiclesList = document.getElementById('vehicles-list');
  const searchInput = document.getElementById('vehicle-search');
  const statusFilter = document.getElementById('status-filter');
  const typeFilter = document.getElementById('type-filter');
  const locationFilter = document.getElementById('location-filter');

  // Render vehicles
  function renderVehicles(filteredVehicles = vehicles) {
    vehiclesList.innerHTML = filteredVehicles.map(vehicle => `
      <div class="vehicle-card ${vehicle.status.toLowerCase().replace(' ', '-')}">
        <div class="vehicle-header">
          <div class="vehicle-id">${vehicle.id}</div>
          <div class="vehicle-status">${vehicle.status}</div>
        </div>
        
        <div class="vehicle-info">
          <h3>${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
          <div class="vehicle-type">${vehicle.type}</div>
        </div>
        
        <div class="vehicle-details">
          <div class="detail-row">
            <div class="detail-item">
              <i class="fas fa-tachometer-alt"></i>
              <span>${vehicle.mileage.toLocaleString()} miles</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-gas-pump"></i>
              <span>${vehicle.fuelLevel}%</span>
            </div>
          </div>
          
          <div class="detail-row">
            <div class="detail-item">
              <i class="fas fa-user"></i>
              <span>${vehicle.assignedTo}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>${vehicle.location}</span>
            </div>
          </div>
        </div>
        
        <div class="maintenance-info">
          <div class="maintenance-item ${isBefore(new Date(vehicle.nextMaintenance), addDays(new Date(), 7)) ? 'urgent' : ''}">
            <i class="fas fa-wrench"></i>
            <div class="maintenance-details">
              <span>Next Service</span>
              <span class="date">${format(new Date(vehicle.nextMaintenance), 'PP')}</span>
            </div>
          </div>
        </div>
        
        <div class="vehicle-actions">
          <button class="action-button service">
            <i class="fas fa-wrench"></i> Service
          </button>
          <button class="action-button assign">
            <i class="fas fa-user-plus"></i> Assign
          </button>
          <button class="action-button track">
            <i class="fas fa-map-marked-alt"></i> Track
          </button>
        </div>
      </div>
    `).join('');

    // Add event listeners to vehicle cards
    document.querySelectorAll('.vehicle-card').forEach((card, index) => {
      const vehicle = filteredVehicles[index];
      
      card.querySelector('.service').addEventListener('click', () => {
        alert(`Schedule service for ${vehicle.id}`);
      });

      card.querySelector('.assign').addEventListener('click', () => {
        alert(`Assign ${vehicle.id} to officer`);
      });

      card.querySelector('.track').addEventListener('click', () => {
        alert(`Track location of ${vehicle.id}`);
      });
    });
  }

  // Search functionality
  searchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredVehicles = vehicles.filter(vehicle => 
      vehicle.id.toLowerCase().includes(searchTerm) ||
      `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchTerm) ||
      vehicle.assignedTo.toLowerCase().includes(searchTerm)
    );
    renderVehicles(filteredVehicles);
  });

  // Filter functionality
  function applyFilters() {
    const status = statusFilter?.value;
    const type = typeFilter?.value;
    const location = locationFilter?.value;
    
    let filteredVehicles = [...vehicles];
    
    if (status && status !== 'all') {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.status === status);
    }
    
    if (type && type !== 'all') {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.type === type);
    }
    
    if (location && location !== 'all') {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.location === location);
    }
    
    renderVehicles(filteredVehicles);
  }

  statusFilter?.addEventListener('change', applyFilters);
  typeFilter?.addEventListener('change', applyFilters);
  locationFilter?.addEventListener('change', applyFilters);

  // Initialize stats
  function updateFleetStats() {
    const totalVehicles = vehicles.length;
    const activeVehicles = vehicles.filter(v => v.status === 'Active').length;
    const inMaintenance = vehicles.filter(v => v.status === 'Maintenance').length;
    const outOfService = vehicles.filter(v => v.status === 'Out of Service').length;
    const needsMaintenance = vehicles.filter(v => 
      isBefore(new Date(v.nextMaintenance), addDays(new Date(), 7))
    ).length;

    document.getElementById('total-vehicles').textContent = totalVehicles;
    document.getElementById('active-vehicles').textContent = activeVehicles;
    document.getElementById('in-maintenance').textContent = inMaintenance;
    document.getElementById('out-of-service').textContent = outOfService;
    document.getElementById('needs-maintenance').textContent = needsMaintenance;
  }

  // Initial render
  renderVehicles();
  updateFleetStats();
}