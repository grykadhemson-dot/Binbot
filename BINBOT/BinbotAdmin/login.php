<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Binbot Admin - Login</title>
  <link rel="stylesheet" href="login.css">
</head>
<body>

<!-- Background Animation -->
<div class="background-animation"></div>

<!-- Login Container -->
<div class="login-container">
  <div class="login-box">
    <!-- Logo Section -->
    <div class="login-header">
      <div class="logo-icon">🗑️</div>
      <h1>Binbot Admin</h1>
      <p class="subtitle">Waste Management System</p>
    </div>

    <!-- Login Form -->
    <form class="login-form" id="loginForm" onsubmit="handleLogin(event)">
      <!-- Email/Username Field -->
      <div class="form-group">
        <label for="username">Email or Username</label>
        <div class="input-wrapper">
          <span class="input-icon">👤</span>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="admin@binbot.local"
            required
          >
        </div>
      </div>

      <!-- Password Field -->
      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-wrapper">
          <span class="input-icon">🔒</span>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="••••••••"
            required
          >
          <button type="button" class="toggle-password" onclick="togglePassword()">👁️</button>
        </div>
      </div>

      <!-- Role Selection -->
      <div class="form-group">
        <label for="role">Login as</label>
        <div class="role-selector">
          <label class="role-option">
            <input type="radio" name="role" value="admin" checked>
            <span class="role-label">
              <span class="role-icon">⚙️</span>
              <span class="role-text">Administrator</span>
            </span>
          </label>
          <label class="role-option">
            <input type="radio" name="role" value="manager">
            <span class="role-label">
              <span class="role-icon">👔</span>
              <span class="role-text">Manager</span>
            </span>
          </label>
        </div>
      </div>

      <!-- Remember Me & Forgot Password -->
      <div class="form-options">
        <label class="remember-me">
          <input type="checkbox" name="rememberMe" id="rememberMe">
          <span>Remember me</span>
        </label>
        <a href="#forgot" class="forgot-password" onclick="showForgotPassword(event)">Forgot Password?</a>
      </div>

      <!-- Login Button -->
      <button type="submit" class="btn-login">
        <span class="btn-text">Sign In</span>
        <span class="btn-icon">→</span>
      </button>

      <!-- Error Message -->
      <div class="error-message" id="errorMessage" style="display: none;"></div>
    </form>

    <!-- Demo Credentials -->
    <div class="demo-section">
      <p class="demo-title">Demo Credentials:</p>
      <div class="demo-credentials">
        <div class="demo-item">
          <strong>Admin:</strong>
          <span>admin@binbot.local / admin123</span>
        </div>
        <div class="demo-item">
          <strong>Manager:</strong>
          <span>manager@binbot.local / manager123</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="login-footer">
      <p>&copy; 2026 Binbot - AI-Powered Waste Management. All rights reserved.</p>
    </div>
  </div>

  <!-- Floating Elements -->
  <div class="floating-elements">
    <div class="float-item item1">🗑️</div>
    <div class="float-item item2">♻️</div>
    <div class="float-item item3">📊</div>
    <div class="float-item item4">🌱</div>
  </div>
</div>

<!-- Forgot Password Modal -->
<div class="modal" id="forgotPasswordModal" style="display: none;">
  <div class="modal-content">
    <button class="modal-close" onclick="closeForgotPassword()">✕</button>
    
    <h2>Reset Password</h2>
    <p>Enter your email address and we'll send you a link to reset your password.</p>

    <form class="forgot-form" id="forgotForm" onsubmit="handleForgotPassword(event)">
      <div class="form-group">
        <label for="resetEmail">Email Address</label>
        <div class="input-wrapper">
          <span class="input-icon">📧</span>
          <input 
            type="email" 
            id="resetEmail" 
            name="email" 
            placeholder="your@email.com"
            required
          >
        </div>
      </div>

      <button type="submit" class="btn-primary">Send Reset Link</button>
      <button type="button" class="btn-secondary" onclick="closeForgotPassword()">Cancel</button>
    </form>

    <div class="success-message" id="forgotSuccessMessage" style="display: none;">
      ✅ Check your email for password reset instructions.
    </div>
  </div>
</div>

<!-- Overlay for Modal -->
<div class="modal-overlay" id="modalOverlay" onclick="closeForgotPassword()" style="display: none;"></div>

<script src="login.js"></script>
</body>
</html>
