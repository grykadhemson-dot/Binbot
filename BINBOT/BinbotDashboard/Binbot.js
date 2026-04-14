// ============================================================================
// Binbot.js - TrashSmart Dashboard JavaScript (2026 Premium)
// Enhanced with Better Performance, UX, and Code Organization
// ============================================================================

// ── Configuration ──────────────────────────────────────────────────────────
const CONFIG = {
  DETECTION_DURATION: 8000,      // How long to show detection (ms)
  DEMO_CYCLE_TIME: 12000,        // Detection demo cycle time (ms)
  PARTICLE_COUNT: 25,            // Particle effects count
  ANIMATION_DURATION: 600        // Standard animation duration (ms)
};

// ── Data ────────────────────────────────────────────────────────────────────
const detectedCounts = {
  bio:    { Food:5, Paper:4, 'Natural fibers':2, Wood:1, Bioplastics:3 },
  nonBio: { Plastics:7, Glass:3, Metals:2, 'Synthetic fabrics':5, 'Synthetic rubber':1 },
  hazard: { Chemicals:2, 'Heavy metals':2, 'Flammable substances':1, 'Medical waste':0 }
};

const bioItems = [
  {name:'Food', color:'#4CAF50', image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=750&fit=crop'},
  {name:'Paper', color:'#66BB6A', image:'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&h=750&fit=crop'},
  {name:'Natural fibers', color:'#81C784', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=750&fit=crop'},
  {name:'Wood', color:'#388E3C', image:'https://images.unsplash.com/photo-1510432190041-2bf5a9f2f58c?w=900&h=750&fit=crop'},
  {name:'Bioplastics', color:'#43A047', image:'https://images.unsplash.com/photo-1581093588401-9c8b0e5f1a2c?w=900&h=750&fit=crop'}
];

const nonBioItems = [
  {name:'Plastics', color:'#2196F3', image:'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=900&h=750&fit=crop'},
  {name:'Glass', color:'#64B5F6', image:'https://images.unsplash.com/photo-1535694194098-e3a67c48bfa0?w=900&h=750&fit=crop'},
  {name:'Metals', color:'#1976D2', image:'https://images.unsplash.com/photo-1589939705066-5470d59623ca?w=900&h=750&fit=crop'},
  {name:'Synthetic fabrics', color:'#42A5F5', image:'https://images.unsplash.com/photo-1556821552-107fcf49668d?w=900&h=750&fit=crop'},
  {name:'Synthetic rubber', color:'#1E88E5', image:'https://images.unsplash.com/photo-1536889328b5-3e4d3d80f8f3?w=900&h=750&fit=crop'}
];

const hazardItems = [
  {name:'Chemicals', color:'#F44336', image:'https://images.unsplash.com/photo-1581576220527-7a8ec85d4c9a?w=900&h=750&fit=crop'},
  {name:'Heavy metals', color:'#D32F2F', image:'https://images.unsplash.com/photo-1589939705066-5470d59623ca?w=900&h=750&fit=crop'},
  {name:'Flammable substances', color:'#FF7043', image:'https://images.unsplash.com/photo-1624993359155-e3b97e8b5b1e?w=900&h=750&fit=crop'},
  {name:'Medical waste', color:'#E57373', image:'https://images.unsplash.com/photo-1631217314830-ead1a78d6e5f?w=900&h=750&fit=crop'}
];

// Sample items for detection simulation
const sampleItems = [
  ...bioItems.map(item => ({ ...item, category: 'bio' })),
  ...nonBioItems.map(item => ({ ...item, category: 'nonBio' })),
  ...hazardItems.map(item => ({ ...item, category: 'hazard' }))
];

// ── Utility Functions ──────────────────────────────────────────────────────
function calculatePercent(key) {
  const counts = detectedCounts[key];
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return Math.min(100, Math.round((total / (key === 'bio' ? 35 : key === 'nonBio' ? 50 : 15)) * 100));
}

/**
 * Safely get DOM element with fallback
 * @param {string} id - Element ID
 * @returns {HTMLElement|null}
 */
function getEl(id) {
  return document.getElementById(id);
}

// ── Particles System ──────────────────────────────────────────────────────
function createParticles(selector, count = CONFIG.PARTICLE_COUNT, isHeader = false) {
  const container = document.querySelector(selector);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dx = (Math.random() - 0.5) * (isHeader ? 200 : 400);
    const dy = (Math.random() - 0.5) * (isHeader ? 200 : 400);
    p.style.left = `${x}%`;
    p.style.top = `${y}%`;
    p.style.setProperty('--dx', `${dx}px`);
    p.style.setProperty('--dy', `${dy}px`);
    p.style.animationDelay = `${Math.random() * 12}s`;
    container.appendChild(p);
  }
}

// ── Daily Time Bubble Update ───────────────────────────────────────────────
function updateTimeBubble() {
  const timeEl = document.getElementById('currentTime');
  const floatingMonthEl = document.getElementById('floatingMonth');
  const dayEl = document.getElementById('currentDay');
  const dayOfWeekEl = document.getElementById('currentDayOfWeek');
  
  if (!timeEl) return;
  
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const currentMonth = months[now.getMonth()];
  const currentMonthNumber = String(now.getMonth() + 1).padStart(2, '0');
  const currentDay = String(now.getDate()).padStart(2, '0');
  const currentDayOfWeek = daysOfWeek[now.getDay()];
  
  timeEl.textContent = `${hours}:${minutes}:${seconds}`;
  if (floatingMonthEl) floatingMonthEl.textContent = currentMonth;
  if (dayEl) dayEl.textContent = currentDay;
  if (dayOfWeekEl) dayOfWeekEl.textContent = currentDayOfWeek;
}

// Start time bubble updates
function initTimeBubble() {
  updateTimeBubble();
  setInterval(updateTimeBubble, 1000);
}



function animateCircle(id, targetPercent, baseColor) {
  const box = document.getElementById(id);
  if (!box) return;
  const canvas = box.querySelector('canvas');
  const percentEl = box.querySelector('.circle-percent');
  if (!canvas || !percentEl) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  
  // Set canvas size for high DPI
  const size = 160;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);
  
  const cx = size / 2, cy = size / 2, r = 58, lw = 11;
  let progress = 0;

  function draw() {
    ctx.clearRect(0, 0, size, size);
    
    // Set up context
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.imageSmoothingEnabled = true;

    // Background ring - subtle glow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
    
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.lineWidth = lw;
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.12)';
    ctx.stroke();

    // Progress arc - main visual element
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (progress / 100) * Math.PI * 2;
    
    // Create linear gradient for progress arc
    const gradX1 = cx - r, gradY1 = cy - r;
    const gradX2 = cx + r, gradY2 = cy + r;
    const gradient = ctx.createLinearGradient(gradX1, gradY1, gradX2, gradY2);
    
    gradient.addColorStop(0, baseColor);
    gradient.addColorStop(0.5, baseColor);
    gradient.addColorStop(1, baseColor + 'cc');

    ctx.shadowColor = baseColor + '80';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.lineWidth = lw;
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Outer glow for progress arc
    ctx.shadowColor = baseColor + '40';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.lineWidth = lw + 6;
    ctx.strokeStyle = baseColor + '20';
    ctx.stroke();

    // Center circle with radial gradient
    ctx.shadowColor = 'transparent';
    const centerGrad = ctx.createRadialGradient(cx - 20, cy - 20, 5, cx, cy, r - lw - 12);
    centerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    centerGrad.addColorStop(0.3, 'rgba(20, 28, 50, 0.8)');
    centerGrad.addColorStop(1, 'rgba(10, 15, 26, 0.95)');

    ctx.beginPath();
    ctx.arc(cx, cy, r - lw / 2 - 8, 0, Math.PI * 2);
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 14;
    ctx.fillStyle = centerGrad;
    ctx.fill();

    // Highlight/Gloss effect
    ctx.shadowColor = 'transparent';
    const glossGrad = ctx.createRadialGradient(cx - 15, cy - 15, 0, cx, cy, r - lw);
    glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    glossGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.1)');
    glossGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.beginPath();
    ctx.arc(cx, cy, r - lw - 10, 0, Math.PI * 2);
    ctx.fillStyle = glossGrad;
    ctx.fill();

    percentEl.textContent = Math.round(progress) + '%';

    if (progress < targetPercent) {
      progress += 1.2 + (targetPercent - progress) * 0.08;
      requestAnimationFrame(draw);
    } else if (progress > targetPercent) {
      progress = targetPercent;
      percentEl.textContent = Math.round(progress) + '%';
    }
  }

  requestAnimationFrame(draw);
}

// ── Box Slider ─────────────────────────────────────────────────────────────
let currentSlide = 0;
const sliderWrapper = document.getElementById('boxSlider');
const boxSlides = document.querySelectorAll('.box-slide');
function initializeSlider() {
  if (!sliderWrapper || boxSlides.length === 0) return;
  // Slider initialized without dots
}

function updateSlider() {
  sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  boxSlides.forEach((slide, i) => {
    if (i === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function moveSlide(dir) {
  currentSlide = (currentSlide + dir + boxSlides.length) % boxSlides.length;
  updateSlider();
}

// ── Calendar inside Box 1 ──────────────────────────────────────────────────
let currentMonthIndex = 3;
const monthSlides = document.querySelectorAll('#calendarSlider .calendar-slide');
const monthTitle = document.getElementById('currentMonth');

function changeMonth(dir) {
  // Remove active class from current slide
  monthSlides[currentMonthIndex].classList.remove('active');
  
  // Calculate next month index (ensures proper wrapping and sequential order)
  currentMonthIndex = (currentMonthIndex + dir + monthSlides.length) % monthSlides.length;
  
  // Add active class to new slide and update title
  monthSlides[currentMonthIndex].classList.add('active');
  monthTitle.textContent = monthSlides[currentMonthIndex].dataset.month;
}

// ── Trend Chart inside Box 2 ───────────────────────────────────────────────

let combinedTrendChartInstance = null;

const dailyTrendData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  bio:    [30, 40, 35, 50, 45, 60, 55],
  nonBio: [45, 50, 48, 60, 55, 65, 62],
  hazard: [20, 25, 22, 30, 28, 35, 32]
};

function updateTrendChart(data = dailyTrendData) {
  const chartElement = document.getElementById('combinedTrendChart');
  if (!chartElement) return;
  
  const ctx = chartElement.getContext('2d');
  if (combinedTrendChartInstance) {
    combinedTrendChartInstance.destroy();
  }
  
  combinedTrendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Biodegradable',
          data: data.bio,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76,175,80,0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#4CAF50',
        },
        {
          label: 'Non-Biodegradable',
          data: data.nonBio,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#3b82f6',
        },
        {
          label: 'Hazardous',
          data: data.hazard,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#ef4444',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#e2e8f0',
            font: { size: 14 }
          }
        },
        title: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8', font: { size: 13 } },
          grid: { color: 'rgba(148,163,184,0.12)' }
        },
        y: {
          min: 0,
          max: 100,
          ticks: { color: '#94a3b8', font: { size: 13 }, stepSize: 20 },
          grid: { color: 'rgba(148,163,184,0.12)' }
        }
      }
    }
  });
}

// ── Detection Simulation ────────────────────────────────────────────────────
function handleDetectionResponse(isCorrect) {
  const popup = document.getElementById('detectionPopup');
  const feedbackMsg = document.getElementById('feedbackMessage');
  const feedbackText = document.getElementById('feedbackText');
  const popupButtons = document.querySelector('.popup-buttons');
  const popupQuestion = document.querySelector('.popup-content p');
  
  if (!popup || !feedbackMsg) return;
  
  // Hide buttons and question
  if (popupButtons) popupButtons.style.display = 'none';
  if (popupQuestion) popupQuestion.style.display = 'none';
  
  // Show feedback message
  feedbackMsg.style.display = 'block';
  
  if (isCorrect) {
    feedbackMsg.classList.remove('error');
    feedbackMsg.classList.add('success');
    feedbackText.textContent = '✓ Thank you! Feedback recorded.';
  } else {
    feedbackMsg.classList.remove('success');
    feedbackMsg.classList.add('error');
    feedbackText.textContent = '✗ Feedback noted. Will improve detection.';
  }
  
  // Log feedback to console
  console.log(`Detection feedback: ${isCorrect ? 'Correct' : 'Incorrect'}`);
  
  // Hide popup after 2.5 seconds
  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => {
      popup.style.display = 'none';
      feedbackMsg.style.display = 'none';
      if (popupButtons) popupButtons.style.display = 'flex';
      if (popupQuestion) popupQuestion.style.display = 'block';
    }, 400);
  }, 2500);
}

function showDetection(item) {
  const imageBox = document.getElementById('imageBox');
  const popup = document.getElementById('detectionPopup');
  const resultBox = document.getElementById('detectionResult');
  const waitingDetection = document.getElementById('waitingDetection');

  // Remove any previous detected image
  let prevImg = document.querySelector('.detected-img');
  if (prevImg) prevImg.remove();

  // Hide waiting detection box
  if (waitingDetection) {
    waitingDetection.classList.add('hidden');
  }

  // Create and display detected waste image (900x750px)
  if (imageBox && item.image) {
    const img = document.createElement('img');
    img.className = 'detected-img';
    img.src = item.image;
    img.alt = `Detected: ${item.name}`;
    img.title = `${item.name} (${item.category})`;
    img.onerror = () => {
      img.src = `https://via.placeholder.com/900x750?text=${encodeURIComponent(item.name)}`;
    };
    imageBox.appendChild(img);
    
    // Generate confidence percentage (85-99%)
    const confidence = Math.floor(Math.random() * 15) + 85;
    
    // Get category display name
    const categoryNames = {
      'bio': 'Biodegradable',
      'nonBio': 'Non-Biodegradable',
      'hazard': 'Hazardous'
    };
    const categoryDisplay = categoryNames[item.category] || item.category;
    
    // Show detection result box with details
    if (resultBox) {
      const resultText = document.getElementById('detectionText');
      if (resultText) {
        resultText.innerHTML = `<strong>${item.name}</strong><br>Category: ${categoryDisplay}<br>Confidence: ${confidence}%`;
      }
      resultBox.style.display = 'block';
      resultBox.classList.add('show');
      resultBox.style.pointerEvents = 'auto';
    }
    
    // Show detection popup for user confirmation
    if (popup) {
      popup.style.display = 'block';
      popup.classList.add('show');
      popup.style.pointerEvents = 'auto';
    }
    
    // Auto-remove image and popups after 8 seconds
    setTimeout(() => {
      if (img && img.parentNode) img.remove();
      if (popup) {
        popup.classList.remove('show');
        setTimeout(() => popup.style.display = 'none', 400);
      }
      if (resultBox) {
        resultBox.classList.remove('show');
        setTimeout(() => resultBox.style.display = 'none', 400);
      }
      // Show waiting detection box again
      if (waitingDetection) {
        waitingDetection.classList.remove('hidden');
      }
    }, 8000);
  }
}

// ── Camera Access ──────────────────────────────────────────────────────────
async function startCamera() {
  const video = document.getElementById('cameraFeed');
  if (!video) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = stream;
    console.log('✓ Camera started successfully');
  } catch (err) {
    console.error('✗ Camera error:', err.message);
    video.style.display = 'none';
    const placeholder = document.createElement('span');
    placeholder.className = 'placeholder-text';
    placeholder.textContent = 'Camera access denied. Using demo mode.';
    video.parentNode.insertBefore(placeholder, video);
  }
}



// ── Gas Sensor & Level Bars Demo ────────────────────────────────────────────
function updateGasBox(gasHigh, bio, nonBio, hazard) {
  // Update gas readings (PPM)
  const bioPPM = Math.round(bio * 3.75); // Convert percentage to PPM (0-300 PPM scale)
  const nonBioPPM = Math.round(nonBio * 3.75);
  const hazardPPM = Math.round(hazard * 3.75);
  
  // Update readings
  const bioReading = document.getElementById('bioGasReading');
  const nonBioReading = document.getElementById('nonBioGasReading');
  const hazardReading = document.getElementById('hazardGasReading');
  
  if (bioReading) bioReading.textContent = bioPPM + ' PPM';
  if (nonBioReading) nonBioReading.textContent = nonBioPPM + ' PPM';
  if (hazardReading) hazardReading.textContent = hazardPPM + ' PPM';
  
  // Update bar fills
  document.getElementById('bioLevelBar').style.width = bio + '%';
  document.getElementById('bioLevelPercent').textContent = bio + '%';
  document.getElementById('nonBioLevelBar').style.width = nonBio + '%';
  document.getElementById('nonBioLevelPercent').textContent = nonBio + '%';
  document.getElementById('hazardLevelBar').style.width = hazard + '%';
  document.getElementById('hazardLevelPercent').textContent = hazard + '%';
  
  // Update status for each compartment
  function updateGasStatus(compartmentName, percent, statusElementId) {
    const statusElement = document.getElementById(statusElementId);
    if (!statusElement) return;
    
    let statusClass = 'safe';
    let statusIcon = '✓';
    let statusText = 'Safe Level - Fan OFF';
    
    if (percent >= 80) {
      statusClass = 'danger';
      statusIcon = '⚡';
      statusText = 'CRITICAL - Fan AUTO-ON!';
    } else if (percent >= 70) {
      statusClass = 'warning';
      statusIcon = '⚠';
      statusText = 'Warning - Monitor Closely';
    } else if (percent >= 50) {
      statusClass = 'warning';
      statusIcon = '⚠';
      statusText = 'Elevated - Fan Ready';
    }
    
    statusElement.className = 'gas-indicator-status ' + statusClass;
    statusElement.innerHTML = `
      <span class="status-icon ${statusClass}">${statusIcon}</span>
      <span class="status-text">${statusText}</span>
    `;
  }
  
  updateGasStatus('Bio', bio, 'bioGasStatus');
  updateGasStatus('Non-Bio', nonBio, 'nonBioGasStatus');
  updateGasStatus('Hazardous', hazard, 'hazardGasStatus');
  
  // Update overall system status badge
  const systemBadge = document.getElementById('gasStatusBadge');
  if (systemBadge) {
    const maxGasLevel = Math.max(bio, nonBio, hazard);
    let badgeStatus = 'Normal';
    let badgeColor = '#4CAF50';
    
    if (maxGasLevel >= 80) {
      badgeStatus = 'CRITICAL';
      badgeColor = '#ef4444';
    } else if (maxGasLevel >= 70) {
      badgeStatus = 'Warning';
      badgeColor = '#ffc107';
    } else if (maxGasLevel >= 50) {
      badgeStatus = 'Elevated';
      badgeColor = '#ff9800';
    }
    
    systemBadge.style.borderColor = 'rgba(' + 
      (badgeColor === '#4CAF50' ? '76, 175, 80' : 
       badgeColor === '#ffc107' ? '255, 193, 7' : '239, 68, 68') + ', 0.3)';
    
    const badgeValue = systemBadge.querySelector('.badge-value');
    if (badgeValue) {
      badgeValue.textContent = badgeStatus;
      badgeValue.style.color = badgeColor;
    }
  }
}

let demoStep = 0;
const demoStates = [
  { gas: false, bio: 42, nonBio: 38, hazard: 28 },
  { gas: true,  bio: 65, nonBio: 55, hazard: 45 },
  { gas: false, bio: 85, nonBio: 78, hazard: 62 },
  { gas: true,  bio: 95, nonBio: 90, hazard: 80 }
];

function cycleGasDemo() {
  const s = demoStates[demoStep % demoStates.length];
  updateGasBox(s.gas, s.bio, s.nonBio, s.hazard);
  demoStep++;
  setTimeout(cycleGasDemo, 5000);
}

// ── Detection Demo ──────────────────────────────────────────────────────────
function runDetectionDemo() {
  // Mix of real waste items from all categories with images
  const samples = [
    // Bio
    { ...bioItems[0], category: 'bio' },     // Food
    { ...bioItems[1], category: 'bio' },     // Paper
    { ...bioItems[4], category: 'bio' },     // Bioplastics
    
    // Non-Bio
    { ...nonBioItems[0], category: 'nonBio' }, // Plastics
    { ...nonBioItems[1], category: 'nonBio' }, // Glass
    { ...nonBioItems[2], category: 'nonBio' }, // Metals
    
    // Hazardous
    { ...hazardItems[0], category: 'hazard' },  // Chemicals
    { ...hazardItems[3], category: 'hazard' }   // Medical waste
  ];
  
  let idx = 0;
  let demoRunning = true;
  
  function next() {
    if (!demoRunning) return;
    
    const item = samples[idx % samples.length];
    showDetection(item);
    
    // Update circle percentages based on detection
    // Bio gets higher percentage when bio waste is detected
    animateCircle('biodegradable', item.category === 'bio' ? 75 : 40, '#4CAF50');
    animateCircle('nonBiodegradable', item.category === 'nonBio' ? 65 : 35, '#3b82f6');
    animateCircle('hazardous', item.category === 'hazard' ? 70 : 20, '#ef4444');
    
    idx++;
    setTimeout(next, 12000); // Show each item for 12 seconds
  }
  
  next();
  
  // Return function to stop demo if needed
  return () => { demoRunning = false; };
}

// ── Settings Panel Management ───────────────────────────────────────────────
function openSettings() {
  const panel = document.getElementById('settingsPanel');
  if (panel) {
    panel.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeSettings() {
  const panel = document.getElementById('settingsPanel');
  if (panel) {
    panel.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}

function switchSettingsTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.settings-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all buttons
  document.querySelectorAll('.settings-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  const tab = document.getElementById(`${tabName}-tab`);
  if (tab) {
    tab.classList.add('active');
  }
  
  // Activate button
  event.target.classList.add('active');
}

function updateCameraThreshold(value) {
  document.getElementById('cameraThresholdValue').textContent = value + '%';
  console.log('Camera Detection Threshold updated to:', value + '%');
}

function updateBioThreshold(value) {
  document.getElementById('bioThresholdValue').textContent = value + '%';
  console.log('Biodegradable Fill Alert Threshold updated to:', value + '%');
}

function updateNonBioThreshold(value) {
  document.getElementById('nonBioThresholdValue').textContent = value + '%';
  console.log('Non-Biodegradable Fill Alert Threshold updated to:', value + '%');
}

function updateHazardThreshold(value) {
  document.getElementById('hazardThresholdValue').textContent = value + '%';
  console.log('Hazardous Fill Alert Threshold updated to:', value + '%');
}

function updateGasThreshold(value) {
  document.getElementById('gasThresholdValue').textContent = value + ' PPM';
  console.log('Gas Level Alert Threshold updated to:', value + ' PPM');
}

function resetToDefaults() {
  if (confirm('Are you sure you want to reset all settings to defaults?')) {
    // Reset all sliders and controls to default values
    document.getElementById('cameraThreshold').value = 85;
    document.getElementById('bioThreshold').value = 80;
    document.getElementById('nonBioThreshold').value = 80;
    document.getElementById('hazardThreshold').value = 75;
    document.getElementById('gasThreshold').value = 300;
    
    // Update display values
    document.getElementById('cameraThresholdValue').textContent = '85%';
    document.getElementById('bioThresholdValue').textContent = '80%';
    document.getElementById('nonBioThresholdValue').textContent = '80%';
    document.getElementById('hazardThresholdValue').textContent = '75%';
    document.getElementById('gasThresholdValue').textContent = '300 PPM';
    
    console.log('All settings reset to defaults');
  }
}

function saveSettings() {
  const settings = {
    cameraThreshold: document.getElementById('cameraThreshold').value,
    bioThreshold: document.getElementById('bioThreshold').value,
    nonBioThreshold: document.getElementById('nonBioThreshold').value,
    hazardThreshold: document.getElementById('hazardThreshold').value,
    gasThreshold: document.getElementById('gasThreshold').value,
    timestamp: new Date().toISOString()
  };
  
  // Save to localStorage
  localStorage.setItem('binbotSettings', JSON.stringify(settings));
  
  // Show success message
  alert('✅ Settings saved successfully!');
  console.log('Settings saved:', settings);
  
  closeSettings();
}

// ── Manual Lid Control ──────────────────────────────────────────────────
function openLid(category) {
  const categoryNames = {
    'bio': 'Biodegradable',
    'nonbio': 'Non-Biodegradable',
    'hazard': 'Hazardous'
  };
  
  const name = categoryNames[category] || category;
  
  // Show confirmation before opening
  const confirmed = confirm(`🚪 Open ${name} Lid?\n\nMake sure the bin is stable before opening!`);
  
  if (confirmed) {
    // Simulate lid opening action
    console.log(`Opening ${name} compartment lid...`);
    
    // Show success message
    alert(`✅ ${name} lid is now open!\n\nRemember to close it when finished.`);
    
    // Log to console for debugging/backend integration
    const lidAction = {
      action: 'open_lid',
      category: category,
      categoryName: name,
      timestamp: new Date().toISOString()
    };
    
    console.log('Lid action:', lidAction);
    
    // Save to localStorage for tracking
    const lidHistory = JSON.parse(localStorage.getItem('lidHistory') || '[]');
    lidHistory.push(lidAction);
    localStorage.setItem('lidHistory', JSON.stringify(lidHistory));
    
    // In production, you would send this to your backend/ESP32
    // Example: sendToBackend('/api/lid/open', lidAction);
  }
}

function closeLid(category) {
  const categoryNames = {
    'bio': 'Biodegradable',
    'nonbio': 'Non-Biodegradable',
    'hazard': 'Hazardous'
  };
  
  const name = categoryNames[category] || category;
  
  // Show confirmation before closing
  const confirmed = confirm(`🚪 Close ${name} Lid?\n\nMake sure nothing is in the way!`);
  
  if (confirmed) {
    // Simulate lid closing action
    console.log(`Closing ${name} compartment lid...`);
    
    // Show success message
    alert(`✅ ${name} lid is now closed securely!`);
    
    // Log to console for debugging/backend integration
    const lidAction = {
      action: 'close_lid',
      category: category,
      categoryName: name,
      timestamp: new Date().toISOString()
    };
    
    console.log('Lid action:', lidAction);
    
    // Save to localStorage for tracking
    const lidHistory = JSON.parse(localStorage.getItem('lidHistory') || '[]');
    lidHistory.push(lidAction);
    localStorage.setItem('lidHistory', JSON.stringify(lidHistory));
    
    // In production, you would send this to your backend/ESP32
    // Example: sendToBackend('/api/lid/close', lidAction);
  }
}

// ── Initialization ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Initialize time bubble
  initTimeBubble();
  
  // Initialize slider
  initializeSlider();
  updateSlider();
  
  // Create particles
  createParticles('.particle-container', 16, true);
  createParticles('body', 22, false);

  // Start camera
  startCamera();

  // Animate circles
  animateCircle('biodegradable', calculatePercent('bio'), '#4CAF50');
  animateCircle('nonBiodegradable', calculatePercent('nonBio'), '#3b82f6');
  animateCircle('hazardous', calculatePercent('hazard'), '#ef4444');



  // Initialize calendar
  if (monthSlides.length > 0) {
    monthSlides[currentMonthIndex].classList.add('active');
    monthTitle.textContent = monthSlides[currentMonthIndex].dataset.month;
  }

  // Draw chart
  updateTrendChart();

  // Start gas demo
  cycleGasDemo();

  // Start detection demo
  runDetectionDemo();

  // Add Settings nav link click handler
  const settingsLink = document.querySelector('a[href="#settings"]');
  if (settingsLink) {
    settingsLink.addEventListener('click', (e) => {
      e.preventDefault();
      openSettings();
    });
  }

  // Initialize first settings tab as active
  switchSettingsTabDirect('sensors');
});

// Helper function to set active tab directly (on init)
function switchSettingsTabDirect(tabName) {
  const tab = document.getElementById(`${tabName}-tab`);
  const btns = document.querySelectorAll('.settings-tab-btn');
  
  document.querySelectorAll('.settings-tab').forEach(t => {
    t.classList.remove('active');
  });
  
  btns.forEach((btn, i) => {
    if (i === 0 && tabName === 'sensors') {
      btn.classList.add('active');
    } else if (i === 1 && tabName === 'health') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  if (tab) {
    tab.classList.add('active');
  }
}

// Redraw chart on resize
window.addEventListener('resize', () => {
  updateTrendChart();
});
