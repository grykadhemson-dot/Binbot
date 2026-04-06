<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Binbot Admin Dashboard</title>
  <link rel="stylesheet" href="admin.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>

<script>
  // Check if user is logged in
  const sessionToken = localStorage.getItem('binbot_session');
  const userData = localStorage.getItem('binbot_user');
  
  if (!sessionToken || !userData) {
    window.location.href = 'login.php';
  }
  
  // Parse user data
  const user = JSON.parse(userData);
</script>

<!-- Sidebar Navigation -->
<aside class="admin-sidebar">
  <div class="sidebar-header">
    <h1 class="logo">🗑️ Binbot Admin</h1>
  </div>
  
  <nav class="sidebar-nav">
    <a href="#dashboard" class="nav-link active" onclick="switchPage('dashboard')">
      <span class="nav-icon">📊</span>
      <span class="nav-text">Dashboard</span>
    </a>
    <a href="#sensors" class="nav-link" onclick="switchPage('sensors')">
      <span class="nav-icon">📡</span>
      <span class="nav-text">Sensors</span>
    </a>
    <a href="#alerts" class="nav-link" onclick="switchPage('alerts')">
      <span class="nav-icon">🚨</span>
      <span class="nav-text">Alerts</span>
    </a>
    <a href="#bin-status" class="nav-link" onclick="switchPage('bin-status')">
      <span class="nav-icon">📦</span>
      <span class="nav-text">Bin Status</span>
    </a>
    <a href="#users" class="nav-link" onclick="switchPage('users')">
      <span class="nav-icon">👥</span>
      <span class="nav-text">Users</span>
    </a>
    <a href="#reports" class="nav-link" onclick="switchPage('reports')">
      <span class="nav-icon">📈</span>
      <span class="nav-text">Reports</span>
    </a>
    <a href="#logs" class="nav-link" onclick="switchPage('logs')">
      <span class="nav-icon">📋</span>
      <span class="nav-text">System Logs</span>
    </a>
    <a href="#settings" class="nav-link" onclick="switchPage('settings')">
      <span class="nav-icon">⚙️</span>
      <span class="nav-text">Settings</span>
    </a>
  </nav>

  <div class="sidebar-footer">
    <button class="btn-logout" onclick="logout()">👋 Logout</button>
  </div>
</aside>

<!-- Main Content -->
<main class="admin-main">
  <!-- Top Header -->
  <header class="admin-header">
    <div class="header-left">
      <h2 id="page-title">Dashboard</h2>
    </div>
    <div class="header-right">
      <div class="admin-user">
        <span class="user-name" id="userName">Admin</span>
        <span class="user-avatar" id="userAvatar">A</span>
      </div>
    </div>
  </header>

  <script>
    // Display logged-in user info
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    
    if (user) {
      userName.textContent = user.name || user.username;
      userAvatar.textContent = (user.name || user.username).charAt(0).toUpperCase();
    }
  </script>

  <!-- Content Area -->
  <div class="admin-content">

    <!-- Dashboard Page -->
    <div id="dashboard-page" class="page-content active">
      <div class="dashboard-grid">
        <div class="stat-card">
          <div class="stat-icon bio">🟢</div>
          <h3>Biodegradable</h3>
          <p class="stat-value">68%</p>
          <p class="stat-label">Fill Level</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon nonbio">🟦</div>
          <h3>Non-Biodegradable</h3>
          <p class="stat-value">52%</p>
          <p class="stat-label">Fill Level</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon hazard">🔴</div>
          <h3>Hazardous</h3>
          <p class="stat-value">34%</p>
          <p class="stat-label">Fill Level</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚠️</div>
          <h3>Active Alerts</h3>
          <p class="stat-value">3</p>
          <p class="stat-label">Immediate Action</p>
        </div>
      </div>

      <div class="charts-container">
        <div class="chart-box">
          <h3>Weekly Waste Collection</h3>
          <canvas id="weeklyChart"></canvas>
        </div>
        <div class="chart-box">
          <h3>System Health Status</h3>
          <div class="health-grid">
            <div class="health-item">
              <span class="health-indicator online"></span>
              <span>Camera System: Online</span>
            </div>
            <div class="health-item">
              <span class="health-indicator online"></span>
              <span>Gas Sensors: Online</span>
            </div>
            <div class="health-item">
              <span class="health-indicator online"></span>
              <span>Level Sensors: Online</span>
            </div>
            <div class="health-item">
              <span class="health-indicator online"></span>
              <span>Fan System: Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sensors Page -->
    <div id="sensors-page" class="page-content">
      <div class="section-header">
        <h2>Sensor Management</h2>
        <button class="btn-primary" onclick="addSensor()">+ Add Sensor</button>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Sensor ID</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Last Reading</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#SEN001</td>
            <td>Gas Sensor</td>
            <td>Bio Compartment</td>
            <td><span class="badge online">Online</span></td>
            <td>45 PPM - 2s ago</td>
            <td><button class="btn-small" onclick="editSensor('#SEN001')">Edit</button></td>
          </tr>
          <tr>
            <td>#SEN002</td>
            <td>Level Sensor</td>
            <td>Non-Bio Compartment</td>
            <td><span class="badge online">Online</span></td>
            <td>52% - 1s ago</td>
            <td><button class="btn-small" onclick="editSensor('#SEN002')">Edit</button></td>
          </tr>
          <tr>
            <td>#SEN003</td>
            <td>Gas Sensor</td>
            <td>Hazard Compartment</td>
            <td><span class="badge online">Online</span></td>
            <td>28 PPM - 3s ago</td>
            <td><button class="btn-small" onclick="editSensor('#SEN003')">Edit</button></td>
          </tr>
          <tr>
            <td>#SEN004</td>
            <td>Level Sensor</td>
            <td>Hazard Compartment</td>
            <td><span class="badge online">Online</span></td>
            <td>34% - 2s ago</td>
            <td><button class="btn-small" onclick="editSensor('#SEN004')">Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Alerts Page -->
    <div id="alerts-page" class="page-content">
      <div class="section-header">
        <h2>Alert Management</h2>
        <button class="btn-primary" onclick="configurAlerts()">Configure Alerts</button>
      </div>

      <div class="alerts-container">
        <div class="alert-item critical">
          <div class="alert-icon">🔴</div>
          <div class="alert-content">
            <h4>Hazardous Bin Near Full</h4>
            <p>Fill level reached 89% - Collection needed soon</p>
            <span class="alert-time">2 minutes ago</span>
          </div>
          <button class="btn-dismiss" onclick="dismissAlert()">Dismiss</button>
        </div>

        <div class="alert-item warning">
          <div class="alert-icon">🟡</div>
          <div class="alert-content">
            <h4>High Gas Level Detected</h4>
            <p>Non-Bio compartment gas level: 245 PPM</p>
            <span class="alert-time">5 minutes ago</span>
          </div>
          <button class="btn-dismiss" onclick="dismissAlert()">Dismiss</button>
        </div>

        <div class="alert-item warning">
          <div class="alert-icon">🟡</div>
          <div class="alert-content">
            <h4>Sensor Reading Delayed</h4>
            <p>Sensor #SEN001 last update: 45 seconds ago</p>
            <span class="alert-time">10 minutes ago</span>
          </div>
          <button class="btn-dismiss" onclick="dismissAlert()">Dismiss</button>
        </div>
      </div>
    </div>

    <!-- Bin Status Page -->
    <div id="bin-status-page" class="page-content">
      <div class="section-header">
        <h2>Waste Bin Status</h2>
      </div>

      <div class="bin-status-grid">
        <div class="bin-card">
          <h3>🟢 Biodegradable Bin</h3>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 68%; background: #4CAF50;"></div>
          </div>
          <p class="progress-text">68% Full</p>
          <div class="bin-details">
            <span>Detected: 127 items</span>
            <span>Weight: ~45 kg</span>
            <span>Last Emptied: 3 days ago</span>
          </div>
        </div>

        <div class="bin-card">
          <h3>🟦 Non-Biodegradable Bin</h3>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 52%; background: #3b82f6;"></div>
          </div>
          <p class="progress-text">52% Full</p>
          <div class="bin-details">
            <span>Detected: 89 items</span>
            <span>Weight: ~32 kg</span>
            <span>Last Emptied: 2 days ago</span>
          </div>
        </div>

        <div class="bin-card">
          <h3>🔴 Hazardous Waste Bin</h3>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 34%; background: #ef4444;"></div>
          </div>
          <p class="progress-text">34% Full</p>
          <div class="bin-details">
            <span>Detected: 23 items</span>
            <span>Weight: ~12 kg</span>
            <span>Last Emptied: 5 days ago</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Users Page -->
    <div id="users-page" class="page-content">
      <div class="section-header">
        <h2>User Management</h2>
        <button class="btn-primary" onclick="addUser()">+ Add User</button>
      </div>

      <table class="users-table">
        <thead>
          <tr>
            <th colspan="2">Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Users will be loaded dynamically here -->
        </tbody>
      </table>
    </div>

    <!-- Reports Page -->
    <div id="reports-page" class="page-content">
      <div class="section-header">
        <h2>Data Reports & Analytics</h2>
        <div class="report-filters">
          <select class="filter-select">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Custom Range</option>
          </select>
          <button class="btn-secondary" onclick="exportReport()">📥 Export Report</button>
        </div>
      </div>

      <div class="reports-grid">
        <div class="report-card">
          <h3>Total Waste Collected</h3>
          <p class="report-value">2,847 kg</p>
          <p class="report-change">↑ 12% from last period</p>
        </div>
        <div class="report-card">
          <h3>Items Detected</h3>
          <p class="report-value">3,421</p>
          <p class="report-change">↑ 8% from last period</p>
        </div>
        <div class="report-card">
          <h3>Detection Accuracy</h3>
          <p class="report-value">94.2%</p>
          <p class="report-change">↑ 2.3% from last period</p>
        </div>
        <div class="report-card">
          <h3>System Uptime</h3>
          <p class="report-value">99.8%</p>
          <p class="report-change">↑ 0.1% from last period</p>
        </div>
      </div>

      <div class="chart-box full-width">
        <h3>Monthly Waste Distribution</h3>
        <canvas id="reportChart"></canvas>
      </div>
    </div>

    <!-- Logs Page -->
    <div id="logs-page" class="page-content">
      <div class="section-header">
        <h2>System Logs</h2>
        <button class="btn-secondary" onclick="clearLogs()">Clear Logs</button>
      </div>

      <div class="logs-container">
        <div class="log-entry info">
          <span class="log-time">2026-04-07 14:32:15</span>
          <span class="log-level info">INFO</span>
          <span class="log-message">Detection event: Plastic bottle detected in Non-Bio compartment</span>
        </div>
        <div class="log-entry success">
          <span class="log-time">2026-04-07 14:28:42</span>
          <span class="log-level success">SUCCESS</span>
          <span class="log-message">Non-Bio compartment collection completed - 89 items collected</span>
        </div>
        <div class="log-entry warning">
          <span class="log-time">2026-04-07 14:25:30</span>
          <span class="log-level warning">WARNING</span>
          <span class="log-message">Gas level alert for Bio compartment (85 PPM) - Fan activated</span>
        </div>
        <div class="log-entry error">
          <span class="log-time">2026-04-07 14:20:15</span>
          <span class="log-level error">ERROR</span>
          <span class="log-message">Sensor #SEN001 connection lost - Attempting reconnection</span>
        </div>
        <div class="log-entry info">
          <span class="log-time">2026-04-07 14:15:00</span>
          <span class="log-level info">INFO</span>
          <span class="log-message">System startup completed - All sensors initialized</span>
        </div>
      </div>
    </div>

    <!-- Settings Page -->
    <div id="settings-page" class="page-content">
      <div class="section-header">
        <h2>System Settings</h2>
      </div>

      <div class="settings-grid">
        <div class="settings-section">
          <h3>Fill Level Thresholds</h3>
          <div class="setting-item">
            <label>Biodegradable Alert Level</label>
            <div class="input-group">
              <input type="range" min="0" max="100" value="80" class="range-slider">
              <span class="range-value">80%</span>
            </div>
          </div>
          <div class="setting-item">
            <label>Non-Biodegradable Alert Level</label>
            <div class="input-group">
              <input type="range" min="0" max="100" value="80" class="range-slider">
              <span class="range-value">80%</span>
            </div>
          </div>
          <div class="setting-item">
            <label>Hazardous Alert Level</label>
            <div class="input-group">
              <input type="range" min="0" max="100" value="75" class="range-slider">
              <span class="range-value">75%</span>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3>Gas Sensor Settings</h3>
          <div class="setting-item">
            <label>Gas Alert Threshold (PPM)</label>
            <div class="input-group">
              <input type="number" value="300" min="0" max="500" class="input-field">
            </div>
          </div>
          <div class="setting-item">
            <label>Fan Activation Level (%)</label>
            <div class="input-group">
              <input type="number" value="70" min="0" max="100" class="input-field">
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3>System Preferences</h3>
          <div class="setting-item checkbox">
            <input type="checkbox" id="emailAlerts" checked>
            <label for="emailAlerts">Enable Email Alerts</label>
          </div>
          <div class="setting-item checkbox">
            <input type="checkbox" id="smsAlerts">
            <label for="smsAlerts">Enable SMS Alerts</label>
          </div>
          <div class="setting-item checkbox">
            <input type="checkbox" id="autoReports" checked>
            <label for="autoReports">Auto-Generate Daily Reports</label>
          </div>
        </div>
      </div>

      <div class="settings-actions">
        <button class="btn-primary" onclick="saveSettings()">💾 Save Settings</button>
        <button class="btn-secondary" onclick="resetSettings()">↺ Reset to Defaults</button>
      </div>
    </div>

  </div>
</main>

<!-- User Registration Modal -->
<div class="modal" id="userRegistrationModal" style="display: none;">
  <div class="modal-content">
    <button class="modal-close" onclick="closeUserRegistration()">✕</button>
    
    <div class="modal-header">
      <div>
        <h2>Register New User</h2>
        <p class="modal-subtitle">Create a new account for team members</p>
      </div>
      <div class="modal-icon">👤</div>
    </div>

    <form class="registration-form" id="registrationForm" onsubmit="handleUserRegistration(event)">
      <!-- Full Name -->
      <div class="form-group">
        <label for="fullName">Full Name *</label>
        <input 
          type="text" 
          id="fullName" 
          name="fullName" 
          placeholder="John Doe"
          required
        >
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="regEmail">Email Address *</label>
        <input 
          type="email" 
          id="regEmail" 
          name="email" 
          placeholder="john@binbot.local"
          required
        >
      </div>

      <!-- Username -->
      <div class="form-group">
        <label for="regUsername">Username *</label>
        <input 
          type="text" 
          id="regUsername" 
          name="username" 
          placeholder="johndoe"
          required
        >
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="regPassword">Password *</label>
        <div class="password-input-wrapper">
          <input 
            type="password" 
            id="regPassword" 
            name="password" 
            placeholder="Min 8 characters"
            required
          >
          <button type="button" class="toggle-password-btn" onclick="toggleRegPassword()">👁️</button>
        </div>
        <small class="password-hint">At least 8 characters with uppercase, lowercase, and numbers</small>
      </div>

      <!-- Confirm Password -->
      <div class="form-group">
        <label for="confirmPassword">Confirm Password *</label>
        <div class="password-input-wrapper">
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            placeholder="Confirm password"
            required
          >
          <button type="button" class="toggle-password-btn" onclick="toggleConfirmPassword()">👁️</button>
        </div>
      </div>

      <!-- Section Divider -->
      <div class="form-divider"></div>

      <!-- User Role Selection -->
      <div class="form-group role-selection-group">
        <label class="role-label">Select User Role *</label>
        <p class="role-subtitle">Choose the appropriate role for this user</p>
        <div class="role-grid">
          <label class="role-card" data-role="admin">
            <input type="radio" name="userRole" value="admin" required>
            <span class="role-icon">⚙️</span>
            <span class="role-name">Administrator</span>
            <span class="role-desc">Full system access & management</span>
          </label>
          <label class="role-card" data-role="manager">
            <input type="radio" name="userRole" value="manager">
            <span class="role-icon">👔</span>
            <span class="role-name">Manager</span>
            <span class="role-desc">Operations & team management</span>
          </label>
          <label class="role-card" data-role="collector">
            <input type="radio" name="userRole" value="collector">
            <span class="role-icon">🚚</span>
            <span class="role-name">Collector</span>
            <span class="role-desc">Waste collection & reports</span>
          </label>
          <label class="role-card" data-role="supervisor">
            <input type="radio" name="userRole" value="supervisor">
            <span class="role-icon">👨‍✈️</span>
            <span class="role-name">Supervisor</span>
            <span class="role-desc">Team & operations oversight</span>
          </label>
        </div>
      </div>

      <!-- Department/Assignment -->
      <div class="form-group">
        <label for="department">Department/Zone</label>
        <select id="department" name="department" class="form-select">
          <option value="">Select Department</option>
          <option value="north">North Zone</option>
          <option value="south">South Zone</option>
          <option value="east">East Zone</option>
          <option value="west">West Zone</option>
          <option value="central">Central Office</option>
        </select>
      </div>

      <!-- Status -->
      <div class="form-group checkbox-group">
        <label class="checkbox-label">
          <input type="checkbox" id="activeStatus" name="activeStatus" checked>
          <span>Active Account</span>
        </label>
      </div>

      <!-- Error Message -->
      <div class="error-message" id="regErrorMessage" style="display: none;"></div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button type="button" class="btn-secondary" onclick="closeUserRegistration()">Cancel</button>
        <button type="submit" class="btn-primary">📝 Create Account</button>
      </div>
    </form>
  </div>
</div>

<!-- Modal Overlay -->
<div class="modal-overlay" id="regModalOverlay" onclick="closeUserRegistration()" style="display: none;"></div>

<script src="admin.js"></script>
</body>
</html>
