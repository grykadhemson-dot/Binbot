// ============================================================================
// Admin Dashboard JavaScript - Binbot Admin Panel (2026 Premium)
// ============================================================================

// ── Page Navigation ────────────────────────────────────────────────────────
function switchPage(pageName) {
  // Hide all pages
  const pages = document.querySelectorAll('.page-content');
  pages.forEach(page => page.classList.remove('active'));
  
  // Show selected page
  const selectedPage = document.getElementById(pageName + '-page');
  if (selectedPage) {
    selectedPage.classList.add('active');
  }
  
  // Update navigation
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  event.target.closest('.nav-link').classList.add('active');
  
  // Update page title
  const titles = {
    dashboard: 'Dashboard',
    sensors: 'Sensor Management',
    alerts: 'Alert Management',
    'bin-status': 'Bin Status',
    users: 'User Management',
    reports: 'Reports & Analytics',
    logs: 'System Logs',
    settings: 'System Settings'
  };
  document.getElementById('page-title').textContent = titles[pageName] || 'Dashboard';
  
  // Initialize charts if needed
  if (pageName === 'dashboard') {
    setTimeout(initializeCharts, 100);
  } else if (pageName === 'reports') {
    setTimeout(initializeReportCharts, 100);
  }
}

// ── Chart Initialization ───────────────────────────────────────────────────
function initializeCharts() {
  const weeklyCtx = document.getElementById('weeklyChart');
  if (!weeklyCtx) return;
  
  new Chart(weeklyCtx, {
    type: 'bar',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: 'Biodegradable (kg)',
          data: [45, 52, 48, 61, 55, 58, 43],
          backgroundColor: 'rgba(76, 175, 80, 0.5)',
          borderColor: '#4CAF50',
          borderWidth: 2,
          borderRadius: 8
        },
        {
          label: 'Non-Biodegradable (kg)',
          data: [32, 38, 35, 42, 39, 44, 36],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          borderRadius: 8
        },
        {
          label: 'Hazardous (kg)',
          data: [12, 15, 14, 18, 16, 17, 13],
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          borderColor: '#ef4444',
          borderWidth: 2,
          borderRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            color: '#cbd5e1',
            font: { weight: 'bold', size: 12 },
            padding: 15
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(96, 165, 250, 0.1)' },
          ticks: { color: '#94a3b8' }
        },
        y: {
          grid: { color: 'rgba(96, 165, 250, 0.1)' },
          ticks: { color: '#94a3b8' },
          beginAtZero: true
        }
      }
    }
  });
}

function initializeReportCharts() {
  const reportCtx = document.getElementById('reportChart');
  if (!reportCtx) return;
  
  new Chart(reportCtx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
      datasets: [
        {
          label: 'Biodegradable',
          data: [320, 335, 350, 320, 365, 380, 370, 385],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#4CAF50',
          pointBorderColor: 'white',
          pointBorderWidth: 2
        },
        {
          label: 'Non-Biodegradable',
          data: [280, 290, 305, 315, 320, 340, 330, 350],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: 'white',
          pointBorderWidth: 2
        },
        {
          label: 'Hazardous',
          data: [110, 115, 120, 125, 130, 140, 135, 145],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#ef4444',
          pointBorderColor: 'white',
          pointBorderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            color: '#cbd5e1',
            font: { weight: 'bold', size: 12 },
            padding: 15
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(96, 165, 250, 0.1)' },
          ticks: { color: '#94a3b8' }
        },
        y: {
          grid: { color: 'rgba(96, 165, 250, 0.1)' },
          ticks: { color: '#94a3b8' },
          beginAtZero: true
        }
      }
    }
  });
}

// ── Sensor Management ──────────────────────────────────────────────────────
function addSensor() {
  alert('Feature: Add new sensor form will appear here');
  // TODO: Implement sensor addition modal
}

function editSensor(sensorId) {
  alert(`Editing sensor: ${sensorId}`);
  // TODO: Implement sensor edit modal
}

// ── Alert Management ──────────────────────────────────────────────────────
function configurAlerts() {
  alert('Alert configuration panel opening...');
  // TODO: Implement alert configuration modal
}

function dismissAlert() {
  event.target.closest('.alert-item').style.opacity = '0';
  setTimeout(() => {
    event.target.closest('.alert-item').remove();
  }, 300);
}

// ── User Management ────────────────────────────────────────────────────────
function addUser() {
  const modal = document.getElementById('userRegistrationModal');
  const overlay = document.getElementById('regModalOverlay');
  const form = document.getElementById('registrationForm');
  
  // Show modal
  modal.style.display = 'block';
  overlay.style.display = 'block';
  
  // Clear form
  form.reset();
  document.getElementById('regErrorMessage').style.display = 'none';
  
  // Remove all selected classes from role cards
  document.querySelectorAll('.role-card').forEach(card => {
    card.classList.remove('selected-admin', 'selected-manager', 'selected-collector', 'selected-supervisor');
  });
  
  // Add event listeners to role cards
  document.querySelectorAll('.role-card input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const selectedRole = e.target.value;
      
      // Remove all selected classes
      document.querySelectorAll('.role-card').forEach(card => {
        card.classList.remove('selected-admin', 'selected-manager', 'selected-collector', 'selected-supervisor');
      });
      
      // Add selected class to the checked card
      e.target.closest('.role-card').classList.add(`selected-${selectedRole}`);
    });
  });
  
  // Focus first input
  document.getElementById('fullName').focus();
}

function closeUserRegistration() {
  const modal = document.getElementById('userRegistrationModal');
  const overlay = document.getElementById('regModalOverlay');
  
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeUserRegistration();
  }
});

function toggleRegPassword() {
  const input = document.getElementById('regPassword');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function toggleConfirmPassword() {
  const input = document.getElementById('confirmPassword');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function handleUserRegistration(event) {
  event.preventDefault();
  
  // Get form values
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const userRole = document.querySelector('input[name="userRole"]:checked')?.value;
  const department = document.getElementById('department').value;
  const isActive = document.getElementById('activeStatus').checked;
  
  const errorMsg = document.getElementById('regErrorMessage');
  
  // Validation
  if (!fullName) {
    showError(errorMsg, '❌ Full name is required');
    return;
  }
  
  if (!email || !isValidEmail(email)) {
    showError(errorMsg, '❌ Please enter a valid email address');
    return;
  }
  
  if (!username || username.length < 3) {
    showError(errorMsg, '❌ Username must be at least 3 characters');
    return;
  }
  
  if (!password || password.length < 8) {
    showError(errorMsg, '❌ Password must be at least 8 characters');
    return;
  }
  
  if (!isValidPassword(password)) {
    showError(errorMsg, '❌ Password must contain uppercase, lowercase, and numbers');
    return;
  }
  
  if (password !== confirmPassword) {
    showError(errorMsg, '❌ Passwords do not match');
    return;
  }
  
  if (!userRole) {
    showError(errorMsg, '❌ Please select a user role');
    return;
  }
  
  // Create new user object
  const newUser = {
    id: generateUserId(),
    fullName: fullName,
    email: email,
    username: username,
    role: userRole,
    department: department || 'Unassigned',
    status: isActive ? 'Active' : 'Inactive',
    joinDate: new Date().toLocaleDateString(),
    avatar: generateAvatar(fullName)
  };
  
  // Save to localStorage (mock database)
  let users = JSON.parse(localStorage.getItem('systemUsers')) || [];
  users.push(newUser);
  localStorage.setItem('systemUsers', JSON.stringify(users));
  
  // Show success message and close modal
  showSuccessNotification(`✅ User "${fullName}" created successfully!`);
  closeUserRegistration();
  
  // Refresh the user table
  loadUsers();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  return hasUppercase && hasLowercase && hasNumbers;
}

function generateUserId() {
  return 'USR' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function generateAvatar(fullName) {
  const initials = fullName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return initials;
}

function showError(element, message) {
  element.textContent = message;
  element.style.display = 'block';
  element.style.animation = 'none';
  setTimeout(() => {
    element.style.animation = 'slideDown 0.3s ease-in-out';
  }, 10);
}

function showSuccessNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    border: 1px solid rgba(16, 185, 129, 0.5);
    z-index: 2000;
    animation: slideInRight 0.3s ease-in-out;
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Load users from localStorage
function loadUsers() {
  const users = JSON.parse(localStorage.getItem('systemUsers')) || [];
  const tableBody = document.querySelector('.users-table tbody');
  
  if (!tableBody) return;
  
  tableBody.innerHTML = '';
  
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.avatar}</td>
      <td>
        <div class="user-name">${user.fullName}</div>
        <small style="color: #64748b;">${user.email}</small>
      </td>
      <td><span class="role-badge role-${user.role.toLowerCase()}">${user.role}</span></td>
      <td>${user.department}</td>
      <td><span class="status-${user.status.toLowerCase()}">${user.status}</span></td>
      <td>${user.joinDate}</td>
      <td>
        <button class="icon-btn" onclick="editUser('${user.id}')" title="Edit">✏️</button>
        <button class="icon-btn" onclick="deleteUser('${user.id}')" title="Delete">🗑️</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function deleteUser(userId) {
  if (confirm('Are you sure you want to delete this user?')) {
    let users = JSON.parse(localStorage.getItem('systemUsers')) || [];
    users = users.filter(u => u.id !== userId);
    localStorage.setItem('systemUsers', JSON.stringify(users));
    loadUsers();
    showSuccessNotification('✅ User deleted successfully!');
  }
}

function editUser(userId) {
  alert(`Editing user: ${userId}`);
  // TODO: Implement user edit modal
}

// ── Reports ───────────────────────────────────────────────────────────────
function exportReport() {
  alert('Generating report export...');
  // TODO: Implement report export functionality
}

// ── System Logs ────────────────────────────────────────────────────────────
function clearLogs() {
  if (confirm('Are you sure you want to clear all system logs? This action cannot be undone.')) {
    alert('System logs cleared');
    // TODO: Implement log clearing
  }
}

// ── Settings ───────────────────────────────────────────────────────────────
function saveSettings() {
  const settings = {
    bioAlertLevel: document.querySelector('input[type="range"]:nth-of-type(1)').value,
    nonBioAlertLevel: document.querySelector('input[type="range"]:nth-of-type(2)').value,
    hazardAlertLevel: document.querySelector('input[type="range"]:nth-of-type(3)').value,
    gasThreshold: document.querySelector('input[type="number"]').value,
    fanActivationLevel: document.querySelectorAll('input[type="number"]')[1].value,
    emailAlerts: document.getElementById('emailAlerts').checked,
    smsAlerts: document.getElementById('smsAlerts').checked,
    autoReports: document.getElementById('autoReports').checked
  };
  
  console.log('Saved settings:', settings);
  alert('✅ Settings saved successfully!');
  // TODO: Send settings to server
}

function resetSettings() {
  if (confirm('Reset all settings to defaults?')) {
    document.querySelectorAll('input[type="range"]').forEach((slider, index) => {
      const defaults = [80, 80, 75];
      slider.value = defaults[index];
      slider.nextElementSibling.textContent = defaults[index] + '%';
    });
    
    document.querySelectorAll('input[type="number"]').forEach((input, index) => {
      const defaults = [300, 70];
      input.value = defaults[index];
    });
    
    document.getElementById('emailAlerts').checked = true;
    document.getElementById('smsAlerts').checked = false;
    document.getElementById('autoReports').checked = true;
    
    alert('Settings reset to defaults');
  }
}

// ── Logout ─────────────────────────────────────────────────────────────────
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    // Clear session data
    localStorage.removeItem('binbot_session');
    localStorage.removeItem('binbot_user');
    // Redirect to login
    window.location.href = 'login.php';
  }
}

// ── Range Slider Value Display ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Initialize default users if none exist
  const existingUsers = localStorage.getItem('systemUsers');
  if (!existingUsers) {
    const defaultUsers = [
      {
        id: 'USR001',
        fullName: 'Admin User',
        email: 'admin@binbot.local',
        username: 'admin',
        role: 'admin',
        department: 'Central Office',
        status: 'Active',
        joinDate: '2026-01-15',
        avatar: 'AU'
      },
      {
        id: 'USR002',
        fullName: 'Manager User',
        email: 'manager@binbot.local',
        username: 'manager',
        role: 'manager',
        department: 'North Zone',
        status: 'Active',
        joinDate: '2026-02-01',
        avatar: 'MU'
      },
      {
        id: 'USR003',
        fullName: 'John Collector',
        email: 'john@binbot.local',
        username: 'john_collector',
        role: 'collector',
        department: 'South Zone',
        status: 'Active',
        joinDate: '2026-02-10',
        avatar: 'JC'
      },
      {
        id: 'USR004',
        fullName: 'Sarah Supervisor',
        email: 'sarah@binbot.local',
        username: 'sarah_super',
        role: 'supervisor',
        department: 'East Zone',
        status: 'Active',
        joinDate: '2026-02-15',
        avatar: 'SS'
      }
    ];
    localStorage.setItem('systemUsers', JSON.stringify(defaultUsers));
  }
  
  // Load users into the table
  loadUsers();
  
  // Initialize range sliders
  const rangeSliders = document.querySelectorAll('.range-slider');
  rangeSliders.forEach(slider => {
    slider.addEventListener('input', (e) => {
      e.target.nextElementSibling.textContent = e.target.value + '%';
    });
  });
  
  // Initialize first page with charts
  setTimeout(initializeCharts, 500);
  
  // Update time display
  updateAdminTime();
  setInterval(updateAdminTime, 1000);
});

function updateAdminTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  // Update any time display elements if needed
}

// ── Auto-refresh Data ──────────────────────────────────────────────────────
setInterval(() => {
  // Update sensor readings
  const sensorReadings = [
    { id: 'SEN001', value: Math.floor(Math.random() * 100) + 20 },
    { id: 'SEN002', value: Math.floor(Math.random() * 100) + 20 },
    { id: 'SEN003', value: Math.floor(Math.random() * 100) + 20 },
    { id: 'SEN004', value: Math.floor(Math.random() * 100) + 20 }
  ];
  
  // Update bin levels
  const binLevels = {
    bio: Math.floor(Math.random() * 100),
    nonBio: Math.floor(Math.random() * 100),
    hazard: Math.floor(Math.random() * 100)
  };
  
  // TODO: Update UI with new data from server
}, 5000);

// ── Keyboard shortcuts ─────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  // Alt + D = Dashboard
  if (e.altKey && e.key === 'd') {
    switchPage('dashboard');
  }
  // Alt + S = Settings
  if (e.altKey && e.key === 's') {
    switchPage('settings');
  }
  // Alt + L = Logout
  if (e.altKey && e.key === 'l') {
    logout();
  }
});

// ── Real-time Notifications ────────────────────────────────────────────────
function showNotification(title, message, type = 'info') {
  // TODO: Implement notification system
  console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
}

// ── WebSocket/Real-time Updates (future implementation) ────────────────────
function initializeRealtimeUpdates() {
  // TODO: Connect to WebSocket for real-time updates
  // This would allow the admin panel to receive live updates from the Binbot system
}
