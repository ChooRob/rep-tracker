
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
        icon: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="483.791px" height="483.791px" viewBox="0 0 483.791 483.791" style="enable-background:new 0 0 483.791 483.791;" xml:space="preserve"><g><g id="_x32_4_27_"><path d="M469.779,374.718L331.625,267.175c-14.479-11.915-35.439-11.643-49.602,0.646L181.735,348.68 c-2.386,1.141-4.597,1.461-6.248,0.282c-6.584-4.705-32.618-87.19-37.636-103.498c-0.503-1.633-0.667-3.244-0.577-4.823 l101.372-49.355c11.499-5.596,18.605-17.457,18.12-30.233c-0.482-12.777-8.472-24.065-20.357-28.774L105.614,80.462 c-0.503-0.199-1.009-0.384-1.516-0.556c-0.169-0.059-0.34-0.107-0.511-0.162c-0.339-0.109-0.676-0.218-1.015-0.315 c-0.202-0.058-0.406-0.107-0.608-0.161c-0.309-0.082-0.615-0.165-0.924-0.237c-0.217-0.05-0.434-0.093-0.651-0.139 c-0.295-0.063-0.592-0.126-0.887-0.18c-0.224-0.041-0.448-0.075-0.672-0.11c-0.289-0.047-0.579-0.094-0.869-0.132 c-0.228-0.031-0.457-0.055-0.685-0.081c-0.285-0.031-0.57-0.062-0.854-0.086c-0.231-0.02-0.465-0.034-0.696-0.048 c-0.28-0.018-0.562-0.033-0.841-0.043c-0.233-0.008-0.468-0.013-0.701-0.016c-0.147-0.002-0.296-0.01-0.445-0.01 c-0.082,0-0.164,0.008-0.245,0.009c-0.709,0.005-1.414,0.028-2.116,0.08c-0.058,0.004-0.113,0.012-0.17,0.017 c-0.659,0.052-1.315,0.128-1.969,0.221c-0.16,0.023-0.322,0.045-0.482,0.07c-0.691,0.108-1.379,0.234-2.059,0.388 c-0.088,0.02-0.173,0.043-0.26,0.063c-0.616,0.144-1.228,0.307-1.834,0.486c-0.146,0.043-0.295,0.085-0.442,0.132 c-0.664,0.207-1.322,0.431-1.97,0.68c-0.105,0.041-0.208,0.086-0.313,0.127c-0.574,0.227-1.142,0.471-1.702,0.73 c-0.131,0.061-0.263,0.119-0.393,0.181c-0.626,0.3-1.242,0.619-1.848,0.958c-0.113,0.064-0.227,0.132-0.34,0.198 c-0.531,0.307-1.055,0.628-1.568,0.965c-0.109,0.072-0.222,0.14-0.331,0.214c-0.576,0.387-1.14,0.795-1.692,1.221 c-0.117,0.09-0.23,0.184-0.347,0.275c-0.483,0.385-0.959,0.782-1.422,1.196c-0.087,0.077-0.177,0.151-0.263,0.229 c-0.517,0.471-1.018,0.963-1.505,1.47c-0.11,0.115-0.219,0.232-0.328,0.35c-0.436,0.467-0.86,0.946-1.269,1.441 c-0.06,0.072-0.122,0.141-0.182,0.213c-0.448,0.551-0.875,1.123-1.288,1.708c-0.098,0.139-0.195,0.279-0.291,0.42 c-0.382,0.559-0.752,1.13-1.102,1.718c-0.028,0.05-0.062,0.097-0.092,0.147c-0.367,0.628-0.711,1.276-1.039,1.936 c-0.08,0.16-0.158,0.321-0.236,0.484c-0.321,0.673-0.63,1.357-0.909,2.062c-6.566,16.568,1.545,35.318,18.112,41.881 l49.672,19.679c-4.159,1.391-9.677,3.234-15.84,5.293l-37.791-14.971c-10.685-4.233-19.081-12.372-23.642-22.919 c-4.563-10.547-4.742-22.24-0.509-32.922c6.539-16.513,22.243-27.184,40.005-27.184h0.002c5.427,0,10.754,1.02,15.834,3.032 l36.318,14.388c-11.486-27.321-38.5-46.507-69.996-46.507C33.981,38.345,0,72.325,0,114.243c0,33.815,22.122,62.441,52.679,72.25 c-20.039,6.755-56.589,25.539-21.753,129.59c32.08,95.83,62.902,121.388,91.854,128.189c3.842,1.288,52.445,1.17,52.445,1.17 c9.252,0,15.158-2.513,22.147-8.576l110.491-89.712l113.076,86.909c16.389,13.484,40.607,11.134,54.094-5.254 C488.521,412.422,486.166,388.204,469.779,374.718z M144.581,165.312l-0.392,0.19c-0.058-0.139-0.115-0.278-0.174-0.415 L144.581,165.312z"/></g></g></svg>'
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
