// Web Audio API Sound Synthesizer
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playAudio(freq, type = 'sine', duration = 0.15) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playWinSound() {
  playAudio(523.25, 'triangle', 0.12);
  setTimeout(() => playAudio(659.25, 'triangle', 0.12), 100);
  setTimeout(() => playAudio(783.99, 'triangle', 0.2), 200);
  setTimeout(() => playAudio(1046.50, 'square', 0.3), 300);
}

function playPipeClang() {
  playAudio(120, 'sawtooth', 0.25);
  setTimeout(() => playAudio(80, 'square', 0.2), 50);
}

function playCrunchSound() {
  playAudio(800, 'square', 0.05);
  setTimeout(() => playAudio(400, 'square', 0.05), 40);
  setTimeout(() => playAudio(200, 'sawtooth', 0.08), 80);
}

function playSlurpSound() {
  playAudio(300, 'sine', 0.1);
  setTimeout(() => playAudio(500, 'sine', 0.15), 80);
  setTimeout(() => playAudio(700, 'sine', 0.2), 160);
}

const dogDialogues = [
  "Woof! Drag me anywhere!",
  "Ammavan is watching you!",
  "12 years? I'll be taking a nap.",
  "Try CSS !important for instant victory!",
  "Hydraulic steam won't break my spirit!"
];

document.addEventListener('DOMContentLoaded', () => {
  // Spawns Floating Interactive Draggable Items
  spawnDraggableDog();
  spawnDraggablePipe();
  spawnDraggableBone();
  spawnDraggablePayasam();
});

// Floating Draggable Dog Generator
function spawnDraggableDog() {
  const dogEl = document.createElement('div');
  dogEl.className = 'draggable-toy';
  dogEl.style.bottom = '20px';
  dogEl.style.right = '20px';
  dogEl.innerHTML = `
    <div class="dog-speech" id="floatingSpeech">${dogDialogues[0]}</div>
    <svg width="65" height="65" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="#ffde59" stroke="#000" stroke-width="4"/>
      <circle cx="38" cy="42" r="5" fill="#000"/>
      <circle cx="62" cy="42" r="5" fill="#000"/>
      <polygon points="50,52 42,62 58,62" fill="#000"/>
      <path d="M 18 30 C 8 10 28 5 33 25 Z" fill="#d97706" stroke="#000" stroke-width="3"/>
      <path d="M 82 30 C 92 10 72 5 67 25 Z" fill="#d97706" stroke="#000" stroke-width="3"/>
    </svg>
  `;
  document.body.appendChild(dogEl);
  makeElementDraggable(dogEl);

  const speechEl = dogEl.querySelector('#floatingSpeech');
  setInterval(() => {
    speechEl.textContent = dogDialogues[Math.floor(Math.random() * dogDialogues.length)];
  }, 5000);
}

// Floating PVC Pipe Toy
function spawnDraggablePipe() {
  const pipeEl = document.createElement('div');
  pipeEl.className = 'draggable-toy';
  pipeEl.style.bottom = '120px';
  pipeEl.style.left = '20px';
  pipeEl.innerHTML = `
    <svg width="60" height="60" viewBox="0 0 80 80">
      <rect x="10" y="25" width="60" height="30" fill="#cbd5e1" stroke="#000" stroke-width="4" rx="4"/>
      <rect x="5" y="20" width="10" height="40" fill="#64748b" stroke="#000" stroke-width="3"/>
      <rect x="65" y="20" width="10" height="40" fill="#64748b" stroke="#000" stroke-width="3"/>
    </svg>
  `;
  document.body.appendChild(pipeEl);
  makeElementDraggable(pipeEl);
  pipeEl.addEventListener('click', playPipeClang);
}

// Floating Bone Toy
function spawnDraggableBone() {
  const boneEl = document.createElement('div');
  boneEl.className = 'draggable-toy';
  boneEl.style.top = '100px';
  boneEl.style.right = '20px';
  boneEl.innerHTML = `
    <svg width="55" height="55" viewBox="0 0 80 80">
      <path d="M 20 30 C 10 20 10 40 25 40 L 55 40 C 70 40 70 20 60 30 C 70 40 70 60 60 50 L 25 50 C 10 60 10 40 20 30 Z" fill="#ffffff" stroke="#000" stroke-width="4"/>
    </svg>
  `;
  document.body.appendChild(boneEl);
  makeElementDraggable(boneEl);
  boneEl.addEventListener('click', playCrunchSound);
}

// Floating Payasam Bowl Toy
function spawnDraggablePayasam() {
  const bowlEl = document.createElement('div');
  bowlEl.className = 'draggable-toy';
  bowlEl.style.bottom = '20px';
  bowlEl.style.left = '20px';
  bowlEl.innerHTML = `
    <svg width="55" height="55" viewBox="0 0 80 80">
      <path d="M 10 30 Q 40 80 70 30 Z" fill="#ffde59" stroke="#000" stroke-width="4"/>
      <ellipse cx="40" cy="30" rx="30" ry="10" fill="#d97706" stroke="#000" stroke-width="3"/>
    </svg>
  `;
  document.body.appendChild(bowlEl);
  makeElementDraggable(bowlEl);
  bowlEl.addEventListener('click', playSlurpSound);
}

// Universal Drag Logic (Mouse & Multi-touch Support)
function makeElementDraggable(element) {
  let posX = 0, posY = 0, initialX = 0, initialY = 0;

  element.addEventListener('mousedown', dragStart);
  element.addEventListener('touchstart', dragStart, { passive: false });

  function dragStart(e) {
    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - posX;
      initialY = e.touches[0].clientY - posY;
      document.addEventListener('touchmove', dragging, { passive: false });
      document.addEventListener('touchend', dragEnd);
    } else {
      initialX = e.clientX - posX;
      initialY = e.clientY - posY;
      document.addEventListener('mousemove', dragging);
      document.addEventListener('mouseup', dragEnd);
    }
  }

  function dragging(e) {
    e.preventDefault();
    const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    posX = currentX - initialX;
    posY = currentY - initialY;

    element.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
  }

  function dragEnd() {
    document.removeEventListener('mousemove', dragging);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchmove', dragging);
    document.removeEventListener('touchend', dragEnd);
  }
}

// Universal Touch / Click Particle Stamp Spawners
function spawnTouchStamp(x, y, container = document.body) {
  const stamp = document.createElement('div');
  stamp.className = 'touch-stamp';
  stamp.textContent = 'NIVARILLA!';
  stamp.style.left = `${x}px`;
  stamp.style.top = `${y}px`;
  container.appendChild(stamp);

  playAudio(180, 'sine', 0.08);

  setTimeout(() => {
    if (stamp.parentNode) stamp.parentNode.removeChild(stamp);
  }, 1200);
}

function runSarcasticModal(onComplete) {
  const steps = [
    "⏳ Initializing Bureau compute engine...",
    "📡 Uplinking NASA satellite data...",
    "👴 Asking Ammavan for permission...",
    "🔥 Heating Kuzhal to 600°C...",
    "🐕 Injecting CSS !important into tail genetics...",
    "📊 Computing zero-percent probability matrix..."
  ];

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-box">
      <div style="font-size:1.1rem; font-weight:900; background:#ffde59; border:2px solid #000; padding:0.4rem;">
        ⚙️ COMPUTING TAIL VECTOR
      </div>
      <div id="modalStatus" style="font-weight:900; min-height:45px; display:flex; align-items:center; justify-content:center; background:#fef08a; border:2px solid #000; padding:0.5rem;">
        Starting computation...
      </div>
      <div class="progress-bar">
        <div class="progress-fill" id="modalFill"></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const statusBox = modal.querySelector('#modalStatus');
  const fillBox = modal.querySelector('#modalFill');
  let current = 0;

  const interval = setInterval(() => {
    if (current < steps.length) {
      statusBox.textContent = steps[current];
      fillBox.style.width = `${((current + 1) / steps.length) * 100}%`;
      playAudio(250 + (current * 60), 'sine', 0.08);
      current++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        document.body.removeChild(modal);
        if (onComplete) onComplete();
      }, 400);
    }
  }, 500);
}