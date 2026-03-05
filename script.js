// Elements
const repCountDisplay = document.getElementById('rep-count');
const repInput = document.getElementById('rep-input');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');
const historyList = document.getElementById('history-list');
const progressBar = document.getElementById('progress-bar');
const goalDisplay = document.getElementById('current-goal-display');
const setGoalBtn = document.getElementById('set-goal-btn');
const themeToggle = document.getElementById('theme-toggle');
const shareBtn = document.getElementById('share-btn');
const successSound = document.getElementById('success-sound');

// State
let totalReps = Number(localStorage.getItem('savedReps')) || 0;
let dailyGoal = Number(localStorage.getItem('dailyGoal')) || 50;
let history = JSON.parse(localStorage.getItem('repHistory')) || [];

// Initialize
updateUI();
initTheme();

function updateUI() {
    repCountDisplay.textContent = totalReps;
    goalDisplay.textContent = dailyGoal;

    // Progress Calculation
    let pct = Math.min((totalReps / dailyGoal) * 100, 100);
    progressBar.style.width = pct + "%";
    progressBar.style.background = totalReps >= dailyGoal ? "#FFD700" : "linear-gradient(90deg, #4cd964, #28cd41)";

    // History Rendering
    historyList.innerHTML = '';
    history.slice().reverse().forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `<span><strong>+${item.amount}</strong></span> <span style="color:var(--text-sub)">${item.time}</span>`;
        historyList.appendChild(li);
    });
}

// Logic
addBtn.addEventListener('click', () => {
    const val = parseInt(repInput.value);
    if (val > 0) {
        successSound.currentTime = 0;
        successSound.play().catch(() => {}); // Catch browser block
        
        totalReps += val;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        history.push({ amount: val, time: time });

        localStorage.setItem('savedReps', totalReps);
        localStorage.setItem('repHistory', JSON.stringify(history));
        
        updateUI();
        repInput.value = '';
    }
});

// Theme Logic
function initTheme() {
    const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(saved);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
});

// Extras
setGoalBtn.addEventListener('click', () => {
    const n = prompt("New daily goal:", dailyGoal);
    if (n > 0) { dailyGoal = parseInt(n); localStorage.setItem('dailyGoal', dailyGoal); updateUI(); }
});

shareBtn.addEventListener('click', () => {
    const msg = `🔥 Just hit ${totalReps} reps! Current goal: ${dailyGoal}. Tracker by Gemini.`;
    if (navigator.share) navigator.share({ title: 'Workout', text: msg });
    else alert(msg);
});

resetBtn.addEventListener('click', () => {
    if(confirm("Wipe all data?")) { localStorage.clear(); location.reload(); }
});