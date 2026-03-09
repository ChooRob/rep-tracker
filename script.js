
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
        icon: '<svg viewBox="0 0 32 32"><path d="M2,28 L30,28 M18,28 L20,22 M10,22 L4,28"/><circle cx="23" cy="20" r="3"/><path d="M20,22 L10,22"/></svg>'
    },
    'Squats': {
        color: '#34C759', // Green
        icon: '<svg viewBox="0 0 32 32"><circle cx="18" cy="12" r="3"/><path d="M16,15 L12,22 L16,22 L16,28 M12,22 L8,28"/></svg>'
    },
    'Sit-ups': {
        color: '#FF9500', // Orange
        icon: '<svg viewBox="0 0 32 32"><path d="M2,28 L30,28"/><circle cx="24" cy="16" r="3"/><path d="M21,18 L10,28 M10,28 L6,22 L12,22"/></svg>'
    },
    'Pull-ups': {
        color: '#AF52DE', // Purple
        icon: '<svg viewBox="0 0 32 32"><path d="M2,4 L30,4"/><circle cx="16" cy="10" r="3"/><path d="M12,4 L14,10 L18,10 L20,4 M16,10 L16,20 M12,26 L16,20 L20,26"/></svg>'
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
    calendarView = calendarView === 'monthly' ? 'weekly' : 'monthly';
    localStorage.setItem('calendarView', calendarView);
    renderCalendar();
});

function renderCalendar() {
    calendarGrid.innerHTML = '';
    calendarViewToggle.textContent = calendarView === 'monthly' ? 'Weekly View' : 'Monthly View';
    
    if (calendarView === 'monthly') {
        renderMonthlyView();
    } else {
        renderWeeklyView();
    }
}

function renderMonthlyView() {
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
    } else {
        selectedDate.setDate(selectedDate.getDate() - 7);
    }
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    if (calendarView === 'monthly') {
        selectedDate.setMonth(selectedDate.getMonth() + 1);
    } else {
        selectedDate.setDate(selectedDate.getDate() + 7);
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
