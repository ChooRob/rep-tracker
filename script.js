// 1. DOM Elements
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

// 2. State Management (Load from Storage)
let totalReps = Number(localStorage.getItem('savedReps')) || 0;
let dailyGoal = Number(localStorage.getItem('dailyGoal')) || 50;
let history = JSON.parse(localStorage.getItem('repHistory')) || [];

// 3. Theme Initialization & Logic
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// 4. Core UI Updater Function
function updateUI() {
    // Update text
    repCountDisplay.textContent = totalReps;
    goalDisplay.textContent = dailyGoal;

    // Update progress bar
    let percentage = (totalReps / dailyGoal) * 100;
    if (percentage > 100) percentage = 100;
    progressBar.style.width = percentage + "%";
    
    if (totalReps >= dailyGoal) {
        progressBar.style.background = "#FFD700"; // Gold when goal hit
    } else {
        progressBar.style.background = "linear-gradient(90deg, #4cd964, #28cd41)";
    }

    // Render history
    historyList.innerHTML = '';
    history.slice().reverse().forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            <span><strong>+${item.amount}</strong> reps</span>
            <span class="history-time">${item.time}</span>
        `;
        historyList.appendChild(li);
    });
}

// Initial UI render on load
updateUI();

// 5. App Interactions
addBtn.addEventListener('click', () => {
    const value = parseInt(repInput.value);
    
    if (!isNaN(value) && value > 0) {
        // Play sound
        successSound.currentTime = 0;
        successSound.play().catch(e => console.log("Sound ready on next click"));

        // Update Data
        totalReps += value;
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        history.push({ amount: value, time: timeString });

        // Save Data
        localStorage.setItem('savedReps', totalReps);
        localStorage.setItem('repHistory', JSON.stringify(history));
        
        // Refresh UI
        updateUI();
        repInput.value = '';
        repInput.focus();
    }
});

setGoalBtn.addEventListener('click', () => {
    const newGoal = prompt("What is your new daily goal?", dailyGoal);
    if (newGoal && !isNaN(newGoal) && newGoal > 0) {
        dailyGoal = parseInt(newGoal);
        localStorage.setItem('dailyGoal', dailyGoal);
        updateUI();
    }
});

shareBtn.addEventListener('click', () => {
    const text = `🔥 I just crushed ${totalReps} reps! My daily goal is ${dailyGoal}.`;
    if (navigator.share) {
        navigator.share({
            title: 'My Workout Progress',
            text: text,
            url: window.location.href
        });
    } else {
        alert(text); // Fallback if browser doesn't support sharing
    }
});

resetBtn.addEventListener('click', () => {
    if(confirm("This will permanently delete your session history. Are you sure?")) {
        totalReps = 0;
        history = [];
        localStorage.removeItem('savedReps');
        localStorage.removeItem('repHistory');
        updateUI();
    }
});