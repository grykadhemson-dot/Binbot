/* ===== Binbot Login - Premium Edition JavaScript ===== */

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  initializeLogin();
});

function initializeLogin() {
  // Initialize demo accounts in localStorage if not exists
  if (!localStorage.getItem('binbot_demo_accounts')) {
    const demoAccounts = [
      {
        id: 'ADM001',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@binbot.com',
        password: 'password123',
        role: 'Administrator',
        createdAt: new Date().toISOString()
      },
      {
        id: 'MGR001',
        firstName: 'Manager',
        lastName: 'User',
        email: 'manager@binbot.com',
        password: 'password123',
        role: 'Manager',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('binbot_demo_accounts', JSON.stringify(demoAccounts));
  }

  // Initialize user accounts storage if not exists
  if (!localStorage.getItem('binbot_accounts')) {
    localStorage.setItem('binbot_accounts', JSON.stringify([]));
  }

  // Setup event listeners
  setupPasswordInputListeners();
  
  // Check if already logged in
  if (localStorage.getItem('binbot_session')) {
    redirectToDashboard();
  }
}

// ===== TAB SWITCHING =====
function switchTab(tabName) {
  // Hide all forms
  document.getElementById('loginForm').classList.remove('active-form');
  document.getElementById('registerForm').classList.remove('active-form');

  // Remove active from all tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected form and tab
  if (tabName === 'login') {
    document.getElementById('loginForm').classList.add('active-form');
    document.querySelector('.tab-btn:first-child').classList.add('active');
  } else if (tabName === 'register') {
    document.getElementById('registerForm').classList.add('active-form');
    document.querySelector('.tab-btn:last-child').classList.add('active');
  }
}

// ===== LOGIN HANDLER =====
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Validation
  if (!email || !password) {
    showNotification('❌ Please enter email and password', 'error');
    return;
  }

  // Get all accounts (demo + registered)
  const demoAccounts = JSON.parse(localStorage.getItem('binbot_demo_accounts') || '[]');
  const userAccounts = JSON.parse(localStorage.getItem('binbot_accounts') || '[]');
  const allAccounts = [...demoAccounts, ...userAccounts];

  // Find account
  const account = allAccounts.find(acc => acc.email === email && acc.password === password);

  if (!account) {
    showNotification('❌ Invalid email or password', 'error');
    return;
  }

  // Check if account is active (optional)
  if (account.status === 'inactive') {
    showNotification('❌ Your account is inactive', 'error');
    return;
  }

  // Create session
  const session = {
    token: generateSessionToken(),
    userId: account.id,
    email: account.email,
    role: account.role,
    username: `${account.firstName} ${account.lastName}`,
    loginTime: new Date().toISOString()
  };

  // Save session and user data
  localStorage.setItem('binbot_session', session.token);
  localStorage.setItem('binbot_user', JSON.stringify({
    id: account.id,
    username: session.username,
    email: account.email,
    role: account.role
  }));

  if (rememberMe) {
    localStorage.setItem('binbot_remember_me', 'true');
  }

  showNotification(`✅ Welcome back, ${account.firstName}!`, 'success');

  // Redirect after short delay
  setTimeout(() => {
    redirectToDashboard();
  }, 1500);
}

// ===== REGISTRATION HANDLER =====
function handleRegister(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const role = document.getElementById('role').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const termsAgree = document.getElementById('termsAgree').checked;

  // Validation
  if (!firstName || !lastName) {
    showNotification('❌ Please enter first and last name', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showNotification('❌ Please enter a valid email address', 'error');
    return;
  }

  if (!role) {
    showNotification('❌ Please select a user role', 'error');
    return;
  }

  if (password.length < 8) {
    showNotification('❌ Password must be at least 8 characters', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showNotification('❌ Passwords do not match', 'error');
    return;
  }

  if (!termsAgree) {
    showNotification('❌ You must agree to the Terms & Conditions', 'error');
    return;
  }

  // Check if email already exists
  const demoAccounts = JSON.parse(localStorage.getItem('binbot_demo_accounts') || '[]');
  const userAccounts = JSON.parse(localStorage.getItem('binbot_accounts') || '[]');
  const allAccounts = [...demoAccounts, ...userAccounts];

  if (allAccounts.some(acc => acc.email === email)) {
    showNotification('❌ Email already registered', 'error');
    return;
  }

  // Create new account
  const newAccount = {
    id: 'USR' + String(Math.floor(Math.random() * 999999)).padStart(3, '0'),
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role: role,
    status: 'active',
    createdAt: new Date().toISOString()
  };

  // Save to localStorage
  userAccounts.push(newAccount);
  localStorage.setItem('binbot_accounts', JSON.stringify(userAccounts));

  showNotification('✅ Account created successfully! Please login.', 'success');

  // Reset form and switch to login
  document.getElementById('registerForm').reset();
  document.getElementById('loginEmail').value = email;
  document.getElementById('loginPassword').value = password;

  setTimeout(() => {
    switchTab('login');
  }, 1500);
}

// ===== PASSWORD HANDLERS =====
function togglePasswordField(fieldId) {
  const field = document.getElementById(fieldId);
  if (field.type === 'password') {
    field.type = 'text';
  } else {
    field.type = 'password';
  }
}

function setupPasswordInputListeners() {
  const registerPassword = document.getElementById('registerPassword');
  if (registerPassword) {
    registerPassword.addEventListener('input', checkPasswordStrength);
  }
}

function checkPasswordStrength() {
  const password = document.getElementById('registerPassword').value;
  const strengthIndicator = document.getElementById('registerPasswordStrength');

  if (password.length === 0) {
    strengthIndicator.textContent = '';
    strengthIndicator.className = 'password-strength';
    return;
  }

  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*]/.test(password)) strength++;

  let text = '';
  let className = '';

  if (strength <= 2) {
    text = '❌ Weak password';
    className = 'weak';
  } else if (strength <= 4) {
    text = '⚠️ Medium password';
    className = 'medium';
  } else {
    text = '✅ Strong password';
    className = 'strong';
  }

  strengthIndicator.textContent = text;
  strengthIndicator.className = 'password-strength ' + className;
}

// ===== PASSWORD RESET =====
function showResetForm(event) {
  event.preventDefault();
  showNotification('📧 Password reset feature coming soon!', 'info');
}

// ===== VALIDATION FUNCTIONS =====
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notificationDiv = document.getElementById('notification');
  
  notificationDiv.textContent = message;
  notificationDiv.className = `notification ${type} show`;

  setTimeout(() => {
    notificationDiv.classList.remove('show');
  }, 4000);
}

// ===== SESSION MANAGEMENT =====
function generateSessionToken() {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

function redirectToDashboard() {
  window.location.href = 'admin-enhanced.php';
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(event) {
  // Enter to submit form
  if (event.key === 'Enter' && document.getElementById('loginForm').classList.contains('active-form')) {
    const email = document.getElementById('loginEmail').value;
    if (email) {
      document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
  }
});
