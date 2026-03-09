
// 1. DOM Elements
const repCountDisplay = document.getElementById('rep-count');
const showRepModalBtn = document.getElementById('show-rep-modal-btn');
const resetBtn = document.getElementById('reset-btn');
const historyList = document.getElementById('history-list');
const progressBar = document.getElementById('progress-bar');
const goalDisplay = document.getElementById('current-goal-display');
const setGoalBtn = document.getElementById('set-goal-btn');
const themeToggle = document.getElementById('theme-toggle');
const shareBtn = document.getElementById('share-btn');
const successSound = document.getElementById('success-sound');

// Calendar
const calendarGrid = document.getElementById('calendar-grid');
const monthYearHeader = document.getElementById('month-year-header');
const prevMonthBtn = document.getElementById('prev-month-btn');
const nextMonthBtn = document.getElementById('next-month-btn');
const calendarViewToggle = document.getElementById('calendar-view-toggle');

// Rep Input Modal
const repModal = document.getElementById('rep-modal');
const confirmRepsBtn = document.getElementById('confirm-reps-btn');
const cancelRepsBtn = document.getElementById('cancel-reps-btn');
const circularSlider = document.getElementById('circular-slider');
const modalRepCount = document.getElementById('modal-rep-count');
const progressCircle = document.querySelector('.slider-progress');
const handleCircle = document.querySelector('.slider-handle');

// Exercise Selection
const exerciseTitleBtn = document.getElementById('exercise-title-btn');
const exerciseModal = document.getElementById('exercise-modal');
const exercisePicker = document.getElementById('exercise-picker');
const confirmExerciseBtn = document.getElementById('confirm-exercise-btn');

// 2. State Management & Exercise Data
const exerciseData = {
    'Push-ups': {
        color: '#007AFF', // Blue
        icon: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30" style="enable-background:new 0 0 94.5 94.5;" xml:space="preserve" width="30" height="30"><g><path d="M2.31 20.601a1.587 1.587 0 0 0 1.466 0.97c0.211 0 0.418 -0.042 0.613 -0.124L13.068 17.787q0.153 -0.065 0.284 -0.156a0.952 0.952 0 0 0 0.23 -0.061l7.423 -3.13 2.814 6.672a0.951 0.951 0 0 0 1.248 0.508l0.658 -0.277a0.943 0.943 0 0 0 0.511 -0.519 0.946 0.946 0 0 0 -0.004 -0.729L22.902 12.196l0 0 -0.64 -1.518a0.951 0.951 0 0 0 -1.248 -0.508l-8.959 3.778a0.952 0.952 0 0 0 -0.576 0.943L3.112 18.419c-0.39 0.164 -0.692 0.471 -0.852 0.865s-0.158 0.825 0.006 1.214z"/><path d="M26.57 13.19c0.431 0 0.853 -0.086 1.253 -0.254a3.206 3.206 0 0 0 1.736 -1.758 3.206 3.206 0 0 0 -0.016 -2.471 3.222 3.222 0 0 0 -2.976 -1.974c-0.431 0 -0.853 0.085 -1.253 0.254 -1.64 0.692 -2.412 2.589 -1.72 4.229a3.224 3.224 0 0 0 2.976 1.974"/><path d="M29.365 21.998H0.635a0.635 0.635 0 0 0 0 1.27h28.73a0.635 0.635 0 0 0 0 -1.27"/></g></svg>'
    },
    'Squats': {
        color: '#34C759', // Green
        icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30" style="enable-background:new 0 0 256 256;" xml:space="preserve" width="30" height="30"><g><path cx="127" cy="28.4" r="26.6" d="M18 3.328A3.117 3.117 0 0 1 14.883 6.445A3.117 3.117 0 0 1 11.766 3.328A3.117 3.117 0 0 1 18 3.328z"/><path d="M25.008 20.063h-5.836V11.402c0 -0.211 0.176 -0.387 0.387 -0.387 0.07 0 0.141 0.023 0.199 0.059l3.527 2.027 -2.438 4.219c-0.375 0.656 -0.152 1.488 0.504 1.863s1.488 0.152 1.863 -0.504l3.117 -5.391c0.375 -0.656 0.152 -1.488 -0.504 -1.863l-6.047 -3.492c-0.551 -0.387 -1.172 -0.633 -1.816 -0.703l-3.082 -0.012 -3.082 0.012c-0.645 0.07 -1.266 0.316 -1.816 0.703L3.938 11.426c-0.656 0.375 -0.879 1.207 -0.504 1.863l3.117 5.391c0.375 0.656 1.207 0.879 1.863 0.504s0.879 -1.207 0.504 -1.863l-2.438 -4.219 3.527 -2.027c0.059 -0.035 0.129 -0.059 0.199 -0.059 0.211 0 0.387 0.176 0.387 0.387v8.66H4.758c-1.078 0 -1.945 0.867 -1.945 1.945 0 0.539 0.211 1.02 0.563 1.371l5.824 5.824c0.762 0.762 1.992 0.762 2.754 0s0.762 -1.992 0 -2.754l-2.496 -2.496h5.414v-1.559h5.414l-2.496 2.496c-0.762 0.762 -0.762 1.992 0 2.754s1.992 0.762 2.754 0l5.824 -5.824c0.352 -0.352 0.563 -0.832 0.563 -1.371 0.023 -1.066 -0.844 -1.945 -1.922 -1.945"/></g></svg>'
    },
    'Sit-ups': {
        color: '#FF9500', // Orange
        icon: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" style="enable-background:new 0 0 483.791 483.791;" xml:space="preserve"><g><g id="_x32_4_27_"><path d="M29.131 23.236 20.564 16.568c-0.898 -0.739 -2.198 -0.722 -3.076 0.04L11.269 21.622c-0.148 0.071 -0.285 0.091 -0.387 0.017 -0.408 -0.292 -2.023 -5.407 -2.334 -6.418a0.843 0.843 0 0 1 -0.036 -0.299l6.286 -3.061a2.001 2.001 0 0 0 -0.139 -3.659L6.549 4.989a2.046 2.046 0 0 0 -0.094 -0.034c-0.01 -0.004 -0.021 -0.007 -0.032 -0.01 -0.021 -0.007 -0.042 -0.014 -0.063 -0.02 -0.013 -0.004 -0.025 -0.007 -0.038 -0.01 -0.019 -0.005 -0.038 -0.01 -0.057 -0.015 -0.013 -0.003 -0.027 -0.006 -0.04 -0.009a1.922 1.922 0 0 0 -0.055 -0.011q-0.021 -0.004 -0.042 -0.007a1.798 1.798 0 0 0 -0.054 -0.008c-0.014 -0.002 -0.028 -0.003 -0.042 -0.005q-0.027 -0.003 -0.053 -0.005 -0.022 -0.002 -0.043 -0.003a1.86 1.86 0 0 0 -0.096 -0.004c-0.009 0 -0.018 -0.001 -0.028 -0.001 -0.005 0 -0.01 0 -0.015 0.001 -0.044 0 -0.088 0.002 -0.131 0.005q-0.005 0 -0.011 0.001 -0.061 0.005 -0.122 0.014 -0.015 0.002 -0.03 0.004c-0.043 0.007 -0.086 0.015 -0.128 0.024q-0.008 0.002 -0.016 0.004 -0.057 0.013 -0.114 0.03 -0.014 0.004 -0.027 0.008 -0.062 0.019 -0.122 0.042 -0.01 0.004 -0.019 0.008 -0.053 0.021 -0.106 0.045 -0.012 0.006 -0.024 0.011 -0.058 0.028 -0.115 0.059 -0.011 0.006 -0.021 0.012 -0.049 0.029 -0.097 0.06c-0.007 0.004 -0.014 0.009 -0.021 0.013q-0.054 0.036 -0.105 0.076c-0.007 0.006 -0.014 0.011 -0.022 0.017q-0.045 0.036 -0.088 0.074 -0.008 0.007 -0.016 0.014a1.984 1.984 0 0 0 -0.114 0.113q-0.041 0.043 -0.079 0.089 -0.006 0.007 -0.011 0.013a1.984 1.984 0 0 0 -0.098 0.132 2.046 2.046 0 0 0 -0.068 0.107c-0.002 0.003 -0.004 0.006 -0.006 0.009a2.046 2.046 0 0 0 -0.079 0.15 2.046 2.046 0 0 0 -0.056 0.128c-0.407 1.027 0.096 2.19 1.123 2.597l3.08 1.22c-0.258 0.086 -0.6 0.201 -0.982 0.328l-2.343 -0.928c-0.663 -0.262 -1.183 -0.767 -1.466 -1.421 -0.283 -0.654 -0.294 -1.379 -0.032 -2.042 0.405 -1.024 1.379 -1.686 2.481 -1.686h0c0.337 0 0.667 0.063 0.982 0.188l2.252 0.892c-0.712 -1.694 -2.387 -2.884 -4.34 -2.884C2.107 2.378 0 4.485 0 7.084c0 2.097 1.372 3.872 3.267 4.48 -1.243 0.419 -3.509 1.584 -1.349 8.036 1.989 5.942 3.901 7.527 5.696 7.949 0.238 0.08 3.252 0.073 3.252 0.073 0.574 0 0.94 -0.156 1.373 -0.532l6.852 -5.563 7.012 5.389c1.016 0.836 2.518 0.69 3.354 -0.326s0.69 -2.518 -0.326 -3.354M8.966 10.251l-0.024 0.012q-0.005 -0.013 -0.011 -0.026z"/></g></g></svg>'
    },
    'Pull-ups': {
        color: '#AF52DE', // Purple
        icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30" style="enable-background:new 0 0 512.002 512.002;" xml:space="preserve" width="30" height="30"><g><g><path d="m12.571 20.228 -0.734 0.779c-0.487 0.517 -0.463 1.331 0.054 1.818 0.517 0.488 1.331 0.463 1.818 -0.054l1.041 -1.104z"/></g></g><g><g><path d="M11.897 2.245c0 -0.084 0.004 -0.167 0.011 -0.249h-0.576l-0.049 1.684h0.968a3.076 3.076 0 0 1 -0.354 -1.435"/></g></g><g><g><path d="m18.707 3.681 -0.049 -1.684h-0.579c0.007 0.082 0.011 0.165 0.011 0.249a3.076 3.076 0 0 1 -0.354 1.435z"/></g></g><g><g><path d="M21.5 2.164c-0.023 -0.532 -0.463 -0.947 -0.989 -0.947q-0.021 0 -0.041 0.001c-0.546 0.023 -0.969 0.484 -0.946 1.03l0.102 2.419 -3.188 0.232h-2.886l-3.188 -0.232 0.102 -2.419c0.023 -0.546 -0.401 -1.007 -0.946 -1.03q-0.022 -0.001 -0.044 -0.001c-0.526 0 -0.964 0.416 -0.986 0.947l-0.144 3.395c-0.023 0.541 0.393 0.999 0.933 1.029l2.863 0.159v6.437l-1.919 2.583c-0.44 0.592 -0.292 1.434 0.323 1.84l5.556 3.671c0.593 0.392 1.391 0.228 1.782 -0.364 0.392 -0.593 0.229 -1.39 -0.364 -1.782l-4.422 -2.922 1.57 -2.112h0.848l0.815 2.14 -0.478 0.507 2.178 1.439 0.725 -0.769a1.286 1.286 0 0 0 0.266 -1.34l-1.202 -3.157V6.748l2.89 -0.16c0.54 -0.03 0.956 -0.489 0.933 -1.029z"/></g></g><g><g><path d="M7.47 27.575h-1.631V3.681h1.711c0.072 -1.693 0.065 -1.582 0.076 -1.684H4.997c-0.465 0 -0.842 0.377 -0.842 0.842v24.736h-1.631a0.356 0.356 0 0 0 -0.356 0.356v1.713a0.356 0.356 0 0 0 0.356 0.356h4.946a0.356 0.356 0 0 0 0.356 -0.356v-1.713a0.356 0.356 0 0 0 -0.356 -0.356"/></g></g><g><g><path d="M27.476 27.575h-1.641V2.839c0 -0.465 -0.377 -0.842 -0.842 -0.842H22.364c0.011 0.102 0.005 -0.009 0.076 1.684h1.711v23.894H22.53a0.356 0.356 0 0 0 -0.356 0.356v1.713a0.356 0.356 0 0 0 0.356 0.356h4.946a0.356 0.356 0 0 0 0.356 -0.356V27.931a0.356 0.356 0 0 0 -0.356 -0.356"/></g></g><g><g><path cx="255.889" cy="38.321" r="38.321" d="M17.239 2.245A2.245 2.245 0 0 1 14.993 4.491A2.245 2.245 0 0 1 12.748 2.245A2.245 2.245 0 0 1 17.239 2.245z"/></g></g></svg>'
    }
};
const exercises = Object.keys(exerciseData);

let currentExercise = localStorage.getItem('currentExercise') || 'Push-ups';
let dailyGoal = Number(localStorage.getItem('dailyGoal')) || 100;
let repData = JSON.parse(localStorage.getItem('repData')) || {};
let calendarView = localStorage.getItem('calendarView') || 'monthly';

let currentDate = new Date();
let selectedDate = new Date();
let totalReps = 0;
let history = [];

function getFormattedDate(date) {
    return date.toISOString().split('T')[0];
}

function updateStateForDateAndExercise() {
    const dateStr = getFormattedDate(selectedDate);
    const dayData = repData[dateStr] || {};
    const exerciseStats = dayData[currentExercise] || { total: 0, history: [] };
    totalReps = exerciseStats.total;
    history = exerciseStats.history;
}

// 3. Theme Logic
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// 4. Core UI & Data Updaters
function updateUI() {
    updateStateForDateAndExercise();

    const currentData = exerciseData[currentExercise];
    const accentColor = currentData.color;

    // --- Update Header ---
    exerciseTitleBtn.querySelector('h1').textContent = currentExercise;
    exerciseTitleBtn.querySelector('.icon-container').innerHTML = currentData.icon;
    exerciseTitleBtn.querySelector('.icon-container svg').style.stroke = accentColor;
    repCountDisplay.textContent = totalReps;
    repCountDisplay.style.color = accentColor;
    
    // --- Update Goal Bar ---
    goalDisplay.textContent = dailyGoal;
    let percentage = (totalReps / dailyGoal) * 100;
    progressBar.style.width = `${Math.min(percentage, 100)}%`;
    progressBar.style.background = totalReps >= dailyGoal ? "#FFD700" : accentColor;

    // --- Update History ---
    historyList.innerHTML = '';
    history.slice().reverse().forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `<span><strong style="color:${accentColor};">+${item.amount}</strong> reps</span><span class="history-time">${item.time}</span>`;
        historyList.appendChild(li);
    });
    
    renderCalendar();
}

function saveData() {
    const dateStr = getFormattedDate(selectedDate);
    if (!repData[dateStr]) repData[dateStr] = {};
    repData[dateStr][currentExercise] = { total: totalReps, history: history };
    localStorage.setItem('repData', JSON.stringify(repData));
}

// 5. App Interactions
showRepModalBtn.addEventListener('click', () => {
    repModal.style.display = 'flex';
    resetSlider();
});

cancelRepsBtn.addEventListener('click', () => repModal.style.display = 'none');

confirmRepsBtn.addEventListener('click', () => {
    const value = currentSliderReps;
    if (value > 0) {
        successSound.currentTime = 0;
        successSound.play().catch(e => console.log("Sound not ready"));

        totalReps += value;
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        history.push({ amount: value, time: timeString });

        saveData();
        updateUI();
        repModal.style.display = 'none';
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
    const text = `🔥 I crushed ${totalReps} ${currentExercise.toLowerCase()}! My daily goal is ${dailyGoal}.`;
    if (navigator.share) {
        navigator.share({ title: 'My Workout Progress', text, url: window.location.href });
    } else {
        alert(text);
    }
});

resetBtn.addEventListener('click', () => {
    if (confirm(`This will permanently delete your ${currentExercise} history for this date. Are you sure?`)) {
        totalReps = 0;
        history = [];
        saveData();
        updateUI();
    }
});

// 6. Calendar Logic
calendarViewToggle.addEventListener('click', () => {
    if (calendarView === 'monthly') {
        calendarView = 'weekly';
    } else if (calendarView === 'weekly') {
        calendarView = 'daily';
    } else {
        calendarView = 'monthly';
    }
    localStorage.setItem('calendarView', calendarView);
    renderCalendar();
});

function renderCalendar() {
    calendarGrid.innerHTML = '';
    calendarGrid.removeAttribute('data-view');

    if (calendarView === 'monthly') {
        calendarViewToggle.textContent = 'Weekly View';
        renderMonthlyView();
    } else if (calendarView === 'weekly') {
        calendarViewToggle.textContent = 'Daily View';
        renderWeeklyView();
    } else { // Daily view
        calendarViewToggle.textContent = 'Monthly View';
        renderDailyView();
    }
}

function renderMonthlyView() {
    calendarGrid.setAttribute('data-view', 'monthly');
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    monthYearHeader.textContent = `${selectedDate.toLocaleString('default', { month: 'long' })} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(name => {
        const dayNameCell = document.createElement('div');
        dayNameCell.className = 'day-name';
        dayNameCell.textContent = name;
        calendarGrid.appendChild(dayNameCell);
    });

    for (let i = 0; i < startingDay; i++) {
        calendarGrid.appendChild(document.createElement('div'));
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const dayCell = createDayCell(date);
        calendarGrid.appendChild(dayCell);
    }
}

function renderWeeklyView() {
    calendarGrid.setAttribute('data-view', 'weekly');
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    monthYearHeader.textContent = `${startOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' })}`;
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(name => {
        const dayNameCell = document.createElement('div');
        dayNameCell.className = 'day-name';
        dayNameCell.textContent = name;
        calendarGrid.appendChild(dayNameCell);
    });
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(date.getDate() + i);
        const dayCell = createDayCell(date);
        calendarGrid.appendChild(dayCell);
    }
}

function renderDailyView() {
    const dateStr = getFormattedDate(selectedDate);
    const dayData = repData[dateStr] || {};

    monthYearHeader.textContent = selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' });
    calendarGrid.setAttribute('data-view', 'daily');
    calendarGrid.innerHTML = ''; // Clear the grid

    const exercisesDone = Object.keys(dayData);

    if (exercisesDone.length === 0) {
        calendarGrid.innerHTML = `<div class="no-data-day">No exercises recorded for this day.</div>`;
        return;
    }

    exercisesDone.forEach(exercise => {
        if (exerciseData[exercise]) {
            const row = document.createElement('div');
            row.className = 'day-view-row';

            const exerciseInfo = document.createElement('div');
            exerciseInfo.className = 'day-view-exercise';
            exerciseInfo.innerHTML = `${exerciseData[exercise].icon} <span>${exercise}</span>`;
            exerciseInfo.querySelector('svg').style.stroke = exerciseData[exercise].color;

            const repsInfo = document.createElement('div');
            repsInfo.className = 'day-view-reps';
            repsInfo.innerHTML = `<span>${dayData[exercise].total}</span> reps`;

            row.appendChild(exerciseInfo);
            row.appendChild(repsInfo);
            calendarGrid.appendChild(row);
        }
    });
}

function createDayCell(date) {
    const dateStr = getFormattedDate(date);
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day';

    const dayNumber = document.createElement('span');
    dayNumber.className = 'day-number';
    dayNumber.textContent = date.getDate();
    dayCell.appendChild(dayNumber);

    const dayData = repData[dateStr] || {};
    const repsContainer = document.createElement('div');
    repsContainer.className = 'day-reps-container';
    
    Object.keys(dayData).forEach(exercise => {
        const reps = dayData[exercise].total;
        if (reps > 0 && exerciseData[exercise]) {
            const repsDisplay = document.createElement('div');
            repsDisplay.className = 'day-reps';
            
            if (calendarView === 'weekly') {
                repsDisplay.innerHTML = `${exerciseData[exercise].icon}<span>${reps}</span>`;
                repsDisplay.querySelector('svg').style.stroke = exerciseData[exercise].color;
            } else {
                repsDisplay.textContent = reps;
                repsDisplay.style.backgroundColor = exerciseData[exercise].color;
            }
            repsContainer.appendChild(repsDisplay);
        }
    });
    dayCell.appendChild(repsContainer);

    if (dateStr === getFormattedDate(new Date())) dayCell.classList.add('today');
    if (dateStr === getFormattedDate(selectedDate)) dayCell.classList.add('selected');

    dayCell.addEventListener('click', () => {
        selectedDate = date;
        updateUI();
    });
    
    return dayCell;
}

prevMonthBtn.addEventListener('click', () => {
    if (calendarView === 'monthly') {
        selectedDate.setMonth(selectedDate.getMonth() - 1);
    } else if (calendarView === 'weekly') {
        selectedDate.setDate(selectedDate.getDate() - 7);
    } else { // Daily
        selectedDate.setDate(selectedDate.getDate() - 1);
    }
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    if (calendarView === 'monthly') {
        selectedDate.setMonth(selectedDate.getMonth() + 1);
    } else if (calendarView === 'weekly') {
        selectedDate.setDate(selectedDate.getDate() + 7);
    } else { // Daily
        selectedDate.setDate(selectedDate.getDate() + 1);
    }
    renderCalendar();
});


// 7. Circular Slider Logic
const slider = { center: 60, radius: 54, isDragging: false, startAngle: 0, currentAngle: 0, repsPerRotation: 10 };
let currentSliderReps = 0;

function updateSlider(angle) {
    const a = Math.max(0, angle);
    const progressAngle = a % 360;
    const isLargeArc = progressAngle > 180 ? 1 : 0;
    
    const x = slider.center + slider.radius * Math.sin(progressAngle * Math.PI / 180);
    const y = slider.center - slider.radius * Math.cos(progressAngle * Math.PI / 180);
    
    const pathData = `M ${slider.center},${slider.center - slider.radius} A ${slider.radius},${slider.radius} 0 ${isLargeArc},1 ${x},${y}`;
    progressCircle.setAttribute('d', pathData);
    handleCircle.setAttribute('cx', x);
    handleCircle.setAttribute('cy', y);

    const remainingReps = Math.max(0, dailyGoal - totalReps);
    currentSliderReps = Math.min(remainingReps, Math.floor(a / (360 / slider.repsPerRotation)));
    modalRepCount.textContent = currentSliderReps;
}

function resetSlider() {
    slider.isDragging = false;
    slider.startAngle = 0;
    slider.currentAngle = 0;
    updateSlider(0);
}

function getAngle(event) {
    const rect = circularSlider.getBoundingClientRect();
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;
    return (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360;
}

function handleDragStart(e) {
    e.preventDefault();
    slider.isDragging = true;
    slider.startAngle = getAngle(e);
}

function handleDragMove(e) {
    if (!slider.isDragging) return;
    e.preventDefault();
    
    const newAngle = getAngle(e);
    let angleDiff = newAngle - slider.startAngle;

    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;

    const newTotalAngle = slider.currentAngle + angleDiff;
    const potentialReps = Math.floor(Math.max(0, newTotalAngle) / (360 / slider.repsPerRotation));
    const remainingReps = Math.max(0, dailyGoal - totalReps);

    if (potentialReps <= remainingReps) {
        slider.currentAngle = Math.max(0, newTotalAngle);
        updateSlider(slider.currentAngle);
    }
    
    slider.startAngle = newAngle;
}

function handleDragEnd() { slider.isDragging = false; }

// 8. Exercise Selection Logic
let selectedExerciseInPicker = currentExercise;

function renderExercisePicker() {
    exercisePicker.innerHTML = '';
    exercises.forEach(ex => {
        const item = document.createElement('button');
        item.className = 'picker-item';
        const currentData = exerciseData[ex];
        item.innerHTML = `${currentData.icon} <span>${ex}</span>`;
        item.querySelector('svg').style.stroke = currentData.color;

        if (ex === selectedExerciseInPicker) {
            item.classList.add('selected');
            item.style.borderColor = currentData.color;
        }
        item.addEventListener('click', () => {
            selectedExerciseInPicker = ex;
            renderExercisePicker();
        });
        exercisePicker.appendChild(item);
    });
}

exerciseTitleBtn.addEventListener('click', () => {
    selectedExerciseInPicker = currentExercise;
    renderExercisePicker();
    exerciseModal.style.display = 'flex';
});

confirmExerciseBtn.addEventListener('click', () => {
    currentExercise = selectedExerciseInPicker;
    localStorage.setItem('currentExercise', currentExercise);
    exerciseModal.style.display = 'none';
    updateUI();
});

exerciseModal.addEventListener('click', (e) => {
    if (e.target === exerciseModal) exerciseModal.style.display = 'none';
});

// 9. Initial Load & Timers
circularSlider.addEventListener('mousedown', handleDragStart);
document.addEventListener('mousemove', handleDragMove);
document.addEventListener('mouseup', handleDragEnd);
circularSlider.addEventListener('touchstart', handleDragStart, { passive: false });
document.addEventListener('touchmove', handleDragMove, { passive: false });
document.addEventListener('touchend', handleDragEnd);

updateUI();

setInterval(() => {
    const nowStr = getFormattedDate(new Date());
    const todayStr = getFormattedDate(currentDate);
    if (nowStr !== todayStr) {
        currentDate = new Date();
        selectedDate = new Date();
        updateUI();
    }
}, 60000);
