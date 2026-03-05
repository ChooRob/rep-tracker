// DOM Elements
const repCountDisplay = document.getElementById('rep-count');
const repInput = document.getElementById('rep-input');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');
const historyList = document.getElementById('history-list');
const progressBar = document.getElementById('progress-bar');
const goalDisplay = document.getElementById('current-goal-display');
const setGoalBtn = document.getElementById('set-goal-btn');
const successSound = document.getElementById('success-sound');

// Data State
let totalReps = Number(localStorage.getItem('savedReps')) || 0;
let dailyGoal = Number(localStorage.getItem('dailyGoal')) || 50;
let history = JSON.parse(localStorage.getItem('repHistory')) || [];

const themeToggle = document.getElementById('theme-toggle');

// 1. Function to apply theme
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// 2. Load saved theme or system preference
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

applyTheme(savedTheme);

// 3. Toggle event
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});

// Initial Load
updateUI();

function updateUI() {
    // 1. Update Text
    repCountDisplay.textContent = totalReps;
    goalDisplay.textContent = dailyGoal;

    // 2. Update Progress Bar
    let percentage = (totalReps / dailyGoal) * 100;
    if (percentage > 100) percentage = 100;
    progressBar.style.width = percentage + "%";
    
    // Change color if goal reached
    progressBar.style.background = totalReps >= dailyGoal 
        ? "#FFD700" 
        : "linear-gradient(90deg, #4cd964, #28cd41)";

    // 3. Render History
    historyList.innerHTML = '';
    history.slice().reverse().forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `<span><strong>+${item.amount}</strong> reps</span><span style="color:#999">${item.time}</span>`;
        historyList.appendChild(li);
    });
}

addBtn.addEventListener('click', () => {
    const value = parseInt(repInput.value);
    
    if (!isNaN(value) && value > 0) {
        // Play sound
        successSound.currentTime = 0; // Reset sound if clicked rapidly
        successSound.play();

        // Update Data
        totalReps += value;
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        history.push({ amount: value, time: timeStr });

        // Save
        localStorage.setItem('savedReps', totalReps);
        localStorage.setItem('repHistory', JSON.stringify(history));
        
        updateUI();
        repInput.value = '';
        repInput.focus();
    }
});

setGoalBtn.addEventListener('click', () => {
    const newGoal = prompt("Set a new daily goal:", dailyGoal);
    if (newGoal && !isNaN(newGoal) && newGoal > 0) {
        dailyGoal = parseInt(newGoal);
        localStorage.setItem('dailyGoal', dailyGoal);
        updateUI();
    }
});

resetBtn.addEventListener('click', () => {
    if(confirm("Clear all session data and history?")) {
        totalReps = 0;
        history = [];
        localStorage.clear(); // Clears everything
        updateUI();
    }
});