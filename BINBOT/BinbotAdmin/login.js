// ============================================================================
// Login Page JavaScript - Binbot Admin Login (2026 Premium)
// ============================================================================

// Mock User Database (Replace with actual backend API call)
const users = {
  admin: {
    email: 'admin@binbot.local',
    password: 'admin123',
    role: 'Administrator',
    name: 'System Administrator'
  },
  manager: {
    email: 'manager@binbot.local',
    password: 'manager123',
    role: 'Manager',
    name: 'Facility Manager'
  },
  supervisor: {
    email: 'supervisor@binbot.local',
    password: 'supervisor123',
    role: 'Supervisor',
    name: 'Operations Supervisor'
  },
  technician: {
    email: 'technician@binbot.local',
    password: 'tech123',
    role: 'Technician',
    name: 'System Technician'
  }
};

// ── Initialize on Page Load ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is already logged in
  const sessionToken = localStorage.getItem('binbot_session');
  if (sessionToken && isSessionValid(sessionToken)) {
    redirectToAdmin();
  }

  // Set focus to username field
  document.getElementById('username').focus();

  // Add Enter key support for quick login
  document.getElementById('loginForm').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  });
});

// ── Handle Login ───────────────────────────────────────────────────────────
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const role = document.querySelector('input[name="role"]:checked').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Reset error message
  hideErrorMessage();

  // Validate inputs
  if (!username || !password) {
    showErrorMessage('Please enter both username/email and password');
    return;
  }

  // Disable login button
  const loginBtn = document.querySelector('.btn-login');
  loginBtn.disabled = true;
  loginBtn.classList.add('loading');
  loginBtn.innerHTML = '<span class="btn-text">Signing In...</span>';

  // Simulate API call delay
  setTimeout(() => {
    authenticateUser(username, password, role, rememberMe);
    loginBtn.disabled = false;
    loginBtn.classList.remove('loading');
    loginBtn.innerHTML = '<span class="btn-text">Sign In</span><span class="btn-icon">→</span>';
  }, 1500);
}

// ── Authenticate User ──────────────────────────────────────────────────────
function authenticateUser(username, password, role, rememberMe) {
  // Check credentials against mock database
  const userKey = Object.keys(users).find(key => {
    const user = users[key];
    const usernameMatch = username === user.email || username === key;
    const passwordMatch = password === user.password;
    return usernameMatch && passwordMatch;
  });

  if (!userKey) {
    showErrorMessage('Invalid username/email or password');
    return;
  }

  const user = users[userKey];

  // Check if role matches
  if (role === 'admin' && user.role !== 'Administrator') {
    showErrorMessage('This account does not have administrator privileges');
    return;
  }

  if (role === 'manager' && !['Manager', 'Administrator'].includes(user.role)) {
    showErrorMessage('This account does not have manager privileges');
    return;
  }

  // Create session token
  const sessionToken = generateSessionToken();
  const sessionData = {
    token: sessionToken,
    user: {
      username: userKey,
      email: user.email,
      role: user.role,
      name: user.name
    },
    loginTime: Date.now()
  };

  // Store session
  localStorage.setItem('binbot_session', sessionToken);
  localStorage.setItem('binbot_user', JSON.stringify(sessionData.user));

  // Remember me option
  if (rememberMe) {
    localStorage.setItem('binbot_remember', 'true');
    localStorage.setItem('binbot_remembered_email', user.email);
  } else {
    localStorage.removeItem('binbot_remember');
    localStorage.removeItem('binbot_remembered_email');
  }

  // Show success message
  showSuccessAnimation();

  // Redirect to admin panel
  setTimeout(() => {
    redirectToAdmin();
  }, 800);
}

// ── Generate Session Token ────────────────────────────────────────────────
function generateSessionToken() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const token = btoa(`${timestamp}-${random}`);
  return token;
}

// ── Check Session Validity ────────────────────────────────────────────────
function isSessionValid(sessionToken) {
  // In production, verify token with backend
  // For now, check if token exists
  return sessionToken && sessionToken.length > 0;
}

// ── Redirect to Admin Dashboard ────────────────────────────────────────────
function redirectToAdmin() {
  // Redirect to admin dashboard
  window.location.href = 'admin.php';
}

// ── Toggle Password Visibility ────────────────────────────────────────────
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleBtn = document.querySelector('.toggle-password');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.textContent = '👁️‍🗨️';
  } else {
    passwordInput.type = 'password';
    toggleBtn.textContent = '👁️';
  }
}

// ── Show Error Message ─────────────────────────────────────────────────────
function showErrorMessage(message) {
  const errorDiv = document.getElementById('errorMessage');
  errorDiv.textContent = '❌ ' + message;
  errorDiv.style.display = 'block';
  errorDiv.style.animation = 'slideIn 0.3s ease';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    hideErrorMessage();
  }, 5000);
}

// ── Hide Error Message ─────────────────────────────────────────────────────
function hideErrorMessage() {
  const errorDiv = document.getElementById('errorMessage');
  errorDiv.style.display = 'none';
}

// ── Show Success Animation ────────────────────────────────────────────────
function showSuccessAnimation() {
  const loginForm = document.querySelector('.login-form');
  const loginBox = document.querySelector('.login-box');

  // Add success animation
  loginBox.style.animation = 'slideOut 0.5s ease forwards';
  loginForm.style.opacity = '0.7';

  // Create success checkmark
  const successCheckmark = document.createElement('div');
  successCheckmark.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    z-index: 1000;
    box-shadow: 0 20px 50px rgba(76, 175, 80, 0.4);
    animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  `;
  successCheckmark.textContent = '✓';
  document.body.appendChild(successCheckmark);
}

// ── Forgot Password Modal ──────────────────────────────────────────────────
function showForgotPassword(event) {
  event.preventDefault();
  document.getElementById('forgotPasswordModal').style.display = 'block';
  document.getElementById('modalOverlay').style.display = 'block';
  document.getElementById('resetEmail').focus();
}

function closeForgotPassword() {
  document.getElementById('forgotPasswordModal').style.display = 'none';
  document.getElementById('modalOverlay').style.display = 'none';
  document.getElementById('forgotForm').style.display = 'block';
  document.getElementById('forgotSuccessMessage').style.display = 'none';
}

function handleForgotPassword(event) {
  event.preventDefault();

  const email = document.getElementById('resetEmail').value.trim();

  // Validate email
  if (!email || !isValidEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }

  // Check if email exists
  const emailExists = Object.values(users).some(user => user.email === email);

  if (!emailExists) {
    alert('No account found with this email address');
    return;
  }

  // Hide form and show success message
  document.getElementById('forgotForm').style.display = 'none';
  document.getElementById('forgotSuccessMessage').style.display = 'block';

  // Auto-close modal after 3 seconds
  setTimeout(() => {
    closeForgotPassword();
  }, 3000);
}

// ── Email Validation ───────────────────────────────────────────────────────
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ── Pre-fill Remembered Email ─────────────────────────────────────────────
window.addEventListener('load', () => {
  const rememberedEmail = localStorage.getItem('binbot_remembered_email');
  if (rememberedEmail) {
    document.getElementById('username').value = rememberedEmail;
    document.getElementById('rememberMe').checked = true;
    document.getElementById('password').focus();
  }
});

// ── Keyboard Shortcuts ────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  // Alt + H = Admin
  if (e.altKey && e.key === 'a') {
    document.querySelector('input[value="admin"]').checked = true;
  }
  // Alt + M = Manager
  if (e.altKey && e.key === 'm') {
    document.querySelector('input[value="manager"]').checked = true;
  }
});

// ── Session Timeout Check ────────────────────────────────────────────────
setInterval(() => {
  const sessionToken = localStorage.getItem('binbot_session');
  if (sessionToken && !isSessionValid(sessionToken)) {
    localStorage.removeItem('binbot_session');
    localStorage.removeItem('binbot_user');
  }
}, 30000); // Check every 30 seconds

// ── CSS for animations (added dynamically) ──────────────────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  @keyframes scaleIn {
    from {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

console.log('%c🗑️ Binbot Admin Login System Ready', 'color: #60a5fa; font-size: 16px; font-weight: bold;');
console.log('%cDemo Credentials:', 'color: #a78bfa; font-weight: bold;');
console.log('Admin: admin@binbot.local / admin123');
console.log('Manager: manager@binbot.local / manager123');
console.log('Supervisor: supervisor@binbot.local / supervisor123');
console.log('Technician: technician@binbot.local / tech123');
