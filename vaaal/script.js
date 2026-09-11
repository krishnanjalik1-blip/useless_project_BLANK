// Web Audio API Sound Effects
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

// Global Floating Dog Dialogue Switcher
const dogDialogues = [
  "Woof! Ammavan is watching you!",
  "12 years? I'll be taking a nap.",
  "Try CSS !important for instant victory!",
  "Hydraulic steam won't break my spirit!",
  "Pass the payasam, human."
];

document.addEventListener('DOMContentLoaded', () => {
  // Floating dog insertion
  const dogEl = document.createElement('div');
  dogEl.className = 'floating-dog';
  dogEl.innerHTML = `
    <div class="dog-speech" id="floatingSpeech">${dogDialogues[0]}</div>
    <svg width="70" height="70" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="#ffde59" stroke="#000" stroke-width="4"/>
      <circle cx="38" cy="42" r="5" fill="#000"/>
      <circle cx="62" cy="42" r="5" fill="#000"/>
      <polygon points="50,52 42,62 58,62" fill="#000"/>
      <path d="M 18 30 C 8 10 28 5 33 25 Z" fill="#d97706" stroke="#000" stroke-width="3"/>
      <path d="M 82 30 C 92 10 72 5 67 25 Z" fill="#d97706" stroke="#000" stroke-width="3"/>
    </svg>
  `;
  document.body.appendChild(dogEl);

  const speechEl = document.getElementById('floatingSpeech');
  setInterval(() => {
    speechEl.textContent = dogDialogues[Math.floor(Math.random() * dogDialogues.length)];
  }, 5000);
});

// Sarcastic Loading Sequence Executer
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