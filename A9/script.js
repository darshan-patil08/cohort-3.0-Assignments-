// ===== global state =====
let todos = [];
let goals = [];
let pomodoroInterval = null;
let timeLeft = 25 * 60;
let totalTime = 25 * 60;
let isWorkSession = true;
let isRunning = false;
let currentFilter = 'all';
let use24Hour = false;

// fallback quotes in case api fails
const fallbackQuotes = [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { quote: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
];


function getTodayKey() {
    const d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}


function updateClock() {
    const now = new Date();

  
    let hours = now.getHours();
    let mins = String(now.getMinutes()).padStart(2, '0');
    let secs = String(now.getSeconds()).padStart(2, '0');
    let ampm = '';

    if (!use24Hour) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12 || 12;
    }
    hours = String(hours).padStart(2, '0');

    document.getElementById('current-time').textContent = hours + ':' + mins + ':' + secs + ampm;

    // format date
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = days[now.getDay()] + ', ' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();
    document.getElementById('current-date').textContent = dateStr;
}

// ===== dynamic background =====
function updateBackground() {
    const hour = new Date().getHours();
    const body = document.body;

    
    body.classList.remove('morning', 'afternoon', 'evening', 'night');

    // set new one based on hour
    if (hour >= 5 && hour < 12) {
        body.classList.add('morning');
    } else if (hour >= 12 && hour < 17) {
        body.classList.add('afternoon');
    } else if (hour >= 17 && hour < 21) {
        body.classList.add('evening');
    } else {
        body.classList.add('night');
    }
}

// ===== greeting message =====
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = '';

    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning! ☀️';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon! 🌤️';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good evening! 🌅';
    } else {
        greeting = 'Good night! 🌙';
    }

    greeting += ' Stay productive.';
    document.getElementById('greeting').textContent = greeting;
}

// ===== weather widget =====
// weather codes to emoji and description
const weatherCodes = {
    0: { emoji: '☀️', desc: 'Clear sky' },
    1: { emoji: '🌤️', desc: 'Mainly clear' },
    2: { emoji: '⛅', desc: 'Partly cloudy' },
    3: { emoji: '☁️', desc: 'Overcast' },
    45: { emoji: '🌫️', desc: 'Foggy' },
    48: { emoji: '🌫️', desc: 'Icy fog' },
    51: { emoji: '🌦️', desc: 'Light drizzle' },
    53: { emoji: '🌦️', desc: 'Drizzle' },
    55: { emoji: '🌦️', desc: 'Heavy drizzle' },
    61: { emoji: '🌧️', desc: 'Light rain' },
    63: { emoji: '🌧️', desc: 'Rain' },
    65: { emoji: '🌧️', desc: 'Heavy rain' },
    71: { emoji: '🌨️', desc: 'Light snow' },
    73: { emoji: '🌨️', desc: 'Snow' },
    75: { emoji: '🌨️', desc: 'Heavy snow' },
    80: { emoji: '🌦️', desc: 'Rain showers' },
    81: { emoji: '🌦️', desc: 'Heavy showers' },
    82: { emoji: '🌦️', desc: 'Violent showers' },
    95: { emoji: '⛈️', desc: 'Thunderstorm' },
    96: { emoji: '⛈️', desc: 'Thunderstorm with hail' },
    99: { emoji: '⛈️', desc: 'Severe thunderstorm' },
};

function getWeatherInfo(code) {
    return weatherCodes[code] || { emoji: '🌡️', desc: 'Unknown' };
}

function showWeatherLoading() {
    document.getElementById('weather-loading').classList.remove('hidden');
    document.getElementById('weather-content').classList.add('hidden');
    document.getElementById('weather-error').classList.add('hidden');
}

function showWeatherError() {
    document.getElementById('weather-loading').classList.add('hidden');
    document.getElementById('weather-content').classList.add('hidden');
    document.getElementById('weather-error').classList.remove('hidden');
}

function showWeatherData() {
    document.getElementById('weather-loading').classList.add('hidden');
    document.getElementById('weather-content').classList.remove('hidden');
    document.getElementById('weather-error').classList.add('hidden');
}

function fetchWeather() {
    showWeatherLoading();

   
    if (!navigator.geolocation) {
        showWeatherError();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // fetch weather from open-meteo
            const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat +
                '&longitude=' + lon +
                '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m';

            // also fetch city name
            const geoUrl = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat +
                '&longitude=' + lon + '&localityLanguage=en';

            // fetch both at the same time
            Promise.all([
                fetch(weatherUrl).then(function (res) { return res.json(); }),
                fetch(geoUrl).then(function (res) { return res.json(); })
            ])
                .then(function (results) {
                    const weather = results[0];
                    const geo = results[1];

                    const current = weather.current;
                    const info = getWeatherInfo(current.weather_code);

                    document.getElementById('weather-icon').textContent = info.emoji;
                    document.getElementById('weather-temp').textContent = Math.round(current.temperature_2m) + '°C';
                    document.getElementById('weather-desc').textContent = info.desc;
                    document.getElementById('weather-humidity').textContent = current.relative_humidity_2m;
                    document.getElementById('weather-wind').textContent = Math.round(current.wind_speed_10m);

                   
                    const city = geo.city || geo.locality || geo.principalSubdivision || 'Your Location';
                    document.getElementById('weather-city').textContent = city;

                    showWeatherData();
                })
                .catch(function () {
                    showWeatherError();
                });
        },
        function () {
            // if user denied location or error
            showWeatherError();
        },
        { timeout: 10000 }
    );
}

// ===== motivation quotes =====
function fetchQuote() {
 
    document.getElementById('quote-text').textContent = '"Loading a new quote..."';
    document.getElementById('quote-author').textContent = '';

    fetch('https://dummyjson.com/quotes/random')
        .then(function (res) { return res.json(); })
        .then(function (data) {
            displayQuote(data.quote, data.author);
        })
        .catch(function () {
            // use fallback if api fails
            const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
            displayQuote(random.quote, random.author);
        });
}

function displayQuote(text, author) {
    
    document.getElementById('quote-text').textContent = '"' + text + '"';
    document.getElementById('quote-author').textContent = '— ' + (author || 'Unknown');

  
    document.getElementById('quote-full-text').textContent = '"' + text + '"';
    document.getElementById('quote-full-author').textContent = '— ' + (author || 'Unknown');
}

// ===== navigation =====
let activeView = 'dashboard';

function navigateTo(viewName) {
    // prevent double clicks on same view
    if (viewName === activeView) return;

    
    const views = document.querySelectorAll('.view');
    views.forEach(function (v) {
        v.classList.add('hidden');
        v.classList.remove('active');
    });

    
    const target = document.getElementById('view-' + viewName);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }

   
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
        btn.classList.remove('active');
        if (btn.dataset.target === viewName) {
            btn.classList.add('active');
        }
    });

    activeView = viewName;
}

// ===== todo list =====
function loadTodos() {
    const saved = localStorage.getItem('dashboard_todos');
    if (saved) {
        todos = JSON.parse(saved);
    }
}

function saveTodos() {
    localStorage.setItem('dashboard_todos', JSON.stringify(todos));
}

function renderTodos() {
    const list = document.getElementById('todo-list');
    const emptyMsg = document.getElementById('todo-empty');
    list.innerHTML = '';

    // filter todos based on current filter
    let filtered = todos;
    if (currentFilter === 'active') {
        filtered = todos.filter(function (t) { return !t.completed; });
    } else if (currentFilter === 'completed') {
        filtered = todos.filter(function (t) { return t.completed; });
    }

    if (filtered.length === 0) {
        emptyMsg.classList.remove('hidden');
        if (currentFilter === 'all' && todos.length === 0) {
            emptyMsg.textContent = 'No tasks yet. Add one above!';
        } else {
            emptyMsg.textContent = 'No ' + currentFilter + ' tasks.';
        }
    } else {
        emptyMsg.classList.add('hidden');
    }

    filtered.forEach(function (todo) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) li.classList.add('completed');
        if (todo.important) li.classList.add('important');

        // checkbox
        const checkbox = document.createElement('button');
        checkbox.className = 'todo-checkbox';
        checkbox.textContent = todo.completed ? '✓' : '';
        checkbox.onclick = function () { toggleTodo(todo.id); };

        // text
        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.text;

        // action buttons
        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        // important toggle
        const starBtn = document.createElement('button');
        starBtn.className = 'todo-action-btn';
        starBtn.textContent = todo.important ? '⭐' : '☆';
        starBtn.title = 'Mark important';
        starBtn.onclick = function () { toggleImportant(todo.id); };

        // delete
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'todo-action-btn delete-btn';
        deleteBtn.textContent = '✕';
        deleteBtn.title = 'Delete task';
        deleteBtn.onclick = function () { deleteTodo(todo.id); };

        actions.appendChild(starBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(actions);
        list.appendChild(li);
    });
}

function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    if (!text) return;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        important: false,
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();
    input.value = '';
    input.focus();
}

function toggleTodo(id) {
    const todo = todos.find(function (t) { return t.id === id; });
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

function toggleImportant(id) {
    const todo = todos.find(function (t) { return t.id === id; });
    if (todo) {
        todo.important = !todo.important;
        saveTodos();
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(function (t) { return t.id !== id; });
    saveTodos();
    renderTodos();
}

// ===== daily planner =====
function formatHour(h) {
    if (use24Hour) {
        return String(h).padStart(2, '0') + ':00';
    }
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return displayHour + ':00 ' + period;
}

function renderPlanner() {
    const container = document.getElementById('planner-slots');
    container.innerHTML = '';

    // load saved data for today
    const storageKey = 'planner_' + getTodayKey();
    const saved = JSON.parse(localStorage.getItem(storageKey)) || {};
    const currentHour = new Date().getHours();

    // show today's date
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('planner-date').textContent = 'Today — ' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();

    // generate hourly slots from 6am to 10pm
    for (let h = 6; h <= 22; h++) {
        const slot = document.createElement('div');
        slot.className = 'planner-slot';
        if (h === currentHour) slot.classList.add('current-hour');

        const timeLabel = document.createElement('span');
        timeLabel.className = 'slot-time';
        timeLabel.textContent = formatHour(h);

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'slot-input';
        input.placeholder = 'Plan something...';
        input.value = saved[h] || '';
        input.dataset.hour = h;

        // save on blur (when user clicks away)
        input.addEventListener('blur', function () {
            const plannerData = JSON.parse(localStorage.getItem(storageKey)) || {};
            if (this.value.trim()) {
                plannerData[this.dataset.hour] = this.value.trim();
            } else {
                delete plannerData[this.dataset.hour];
            }
            localStorage.setItem(storageKey, JSON.stringify(plannerData));
        });

        slot.appendChild(timeLabel);
        slot.appendChild(input);
        container.appendChild(slot);
    }
}

// ===== pomodoro timer =====
function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timer-display').textContent =
        String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

    // update progress ring
    const circumference = 2 * Math.PI * 90; // radius is 90
    const progress = timeLeft / totalTime;
    const offset = circumference * (1 - progress);
    document.getElementById('timer-progress').style.strokeDashoffset = offset;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;

    document.getElementById('start-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;

    pomodoroInterval = setInterval(function () {
        timeLeft--;

        if (timeLeft < 0) {
            // timer finished
            clearInterval(pomodoroInterval);
            pomodoroInterval = null;
            isRunning = false;
            playBeep();

            // switch between work and break
            if (isWorkSession) {
                isWorkSession = false;
                timeLeft = 5 * 60;
                totalTime = 5 * 60;
                document.getElementById('session-label').textContent = 'Break Time ☕';
            } else {
                isWorkSession = true;
                timeLeft = 25 * 60;
                totalTime = 25 * 60;
                document.getElementById('session-label').textContent = 'Work Session';
            }

            document.getElementById('start-btn').disabled = false;
            document.getElementById('pause-btn').disabled = true;
        }

        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
    isRunning = false;

    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
}

function resetTimer() {
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
    isRunning = false;
    isWorkSession = true;

    timeLeft = 25 * 60;
    totalTime = 25 * 60;
    updateTimerDisplay();

    document.getElementById('session-label').textContent = 'Work Session';
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
}

// simple beep sound using web audio api
function playBeep() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gain.gain.value = 0.3;
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start();
        setTimeout(function () {
            oscillator.stop();
            ctx.close();
        }, 400);
    } catch (e) {
        // just alert 
        alert('Timer finished!');
    }
}

// ===== daily goals =====
function loadGoals() {
    const key = 'goals_' + getTodayKey();
    const saved = localStorage.getItem(key);
    if (saved) {
        goals = JSON.parse(saved);
    } else {
        goals = [];
    }
}

function saveGoals() {
    const key = 'goals_' + getTodayKey();
    localStorage.setItem(key, JSON.stringify(goals));
}

function renderGoals() {
    const list = document.getElementById('goals-list');
    const emptyMsg = document.getElementById('goals-empty');
    list.innerHTML = '';

    if (goals.length === 0) {
        emptyMsg.classList.remove('hidden');
    } else {
        emptyMsg.classList.add('hidden');
    }

    goals.forEach(function (goal) {
        const li = document.createElement('li');
        li.className = 'goal-item';
        if (goal.completed) li.classList.add('completed');

        // circular checkbox
        const checkbox = document.createElement('button');
        checkbox.className = 'goal-checkbox';
        checkbox.textContent = goal.completed ? '✓' : '';
        checkbox.onclick = function () { toggleGoal(goal.id); };

        // text
        const text = document.createElement('span');
        text.className = 'goal-text';
        text.textContent = goal.text;

        // delete
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'goal-delete-btn';
        deleteBtn.textContent = '✕';
        deleteBtn.title = 'Remove goal';
        deleteBtn.onclick = function () { deleteGoal(goal.id); };

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    updateGoalsProgress();
}

function addGoal() {
    const input = document.getElementById('goal-input');
    const text = input.value.trim();
    if (!text) return;

    goals.push({
        id: Date.now(),
        text: text,
        completed: false,
    });

    saveGoals();
    renderGoals();
    input.value = '';
    input.focus();
}

function toggleGoal(id) {
    const goal = goals.find(function (g) { return g.id === id; });
    if (goal) {
        goal.completed = !goal.completed;
        saveGoals();
        renderGoals();
    }
}

function deleteGoal(id) {
    goals = goals.filter(function (g) { return g.id !== id; });
    saveGoals();
    renderGoals();
}

function updateGoalsProgress() {
    const total = goals.length;
    const done = goals.filter(function (g) { return g.completed; }).length;

    document.getElementById('goals-progress-text').textContent = done + ' of ' + total + ' completed';

    const percentage = total > 0 ? (done / total) * 100 : 0;
    document.getElementById('progress-bar-fill').style.width = percentage + '%';
}

// ===== theme switch =====
function loadTheme() {
    const savedTheme = localStorage.getItem('dashboard_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // sync toggle checkbox
    const toggle = document.getElementById('theme-toggle');
    toggle.checked = savedTheme === 'dark';
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('dashboard_theme', newTheme);
}

// clock format
function loadClockFormat() {
    const saved = localStorage.getItem('dashboard_24hour');
    use24Hour = saved === 'true';
    document.getElementById('clock-format-toggle').checked = use24Hour;
}

function toggleClockFormat() {
    use24Hour = !use24Hour;
    localStorage.setItem('dashboard_24hour', String(use24Hour));
    updateClock();
    renderPlanner(); // update time labels too
}

// ===== settings panel =====
function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    panel.classList.toggle('hidden');
}

// ===== wire up all event listeners =====
function setupEventListeners() {
    // settings button
    document.getElementById('settings-btn').addEventListener('click', function (e) {
        e.stopPropagation();
        toggleSettings();
    });

    // close settings when clicking outside
    document.addEventListener('click', function (e) {
        const panel = document.getElementById('settings-panel');
        const btn = document.getElementById('settings-btn');
        if (!panel.contains(e.target) && !btn.contains(e.target)) {
            panel.classList.add('hidden');
        }
    });

    // theme toggle
    document.getElementById('theme-toggle').addEventListener('change', toggleTheme);

    // clock format toggle
    document.getElementById('clock-format-toggle').addEventListener('change', toggleClockFormat);

    // sidebar navigation
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            navigateTo(this.dataset.target);
        });
    });

    // feature cards on dashboard
    document.querySelectorAll('.feature-card').forEach(function (card) {
        card.addEventListener('click', function () {
            navigateTo(this.dataset.target);
        });
    });

    // back buttons
    document.querySelectorAll('.back-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            navigateTo(this.dataset.target);
        });
    });

    // quote buttons
    document.getElementById('new-quote-btn').addEventListener('click', fetchQuote);
    document.getElementById('new-quote-full-btn').addEventListener('click', fetchQuote);

    // weather retry
    document.getElementById('retry-weather-btn').addEventListener('click', fetchWeather);

    // todo - add task
    document.getElementById('add-todo-btn').addEventListener('click', addTodo);
    document.getElementById('todo-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') addTodo();
    });

    // todo filters
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderTodos();
        });
    });

    // goals - add goal
    document.getElementById('add-goal-btn').addEventListener('click', addGoal);
    document.getElementById('goal-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') addGoal();
    });

    // pomodoro controls
    document.getElementById('start-btn').addEventListener('click', startTimer);
    document.getElementById('pause-btn').addEventListener('click', pauseTimer);
    document.getElementById('reset-btn').addEventListener('click', resetTimer);
}

// ===== init everything =====
function init() {
    // load saved preferences
    loadTheme();
    loadClockFormat();

    // start clock right away
    updateClock();
    setInterval(updateClock, 1000);

    // set background and greeting
    updateBackground();
    updateGreeting();
    // recheck background every 5 minutes
    setInterval(function () {
        updateBackground();
        updateGreeting();
    }, 5 * 60 * 1000);

    // fetch weather and quote
    fetchWeather();
    fetchQuote();

    // load saved data
    loadTodos();
    renderTodos();
    loadGoals();
    renderGoals();
    renderPlanner();

    // setup timer display
    updateTimerDisplay();

    // attach all event listeners
    setupEventListeners();

    // render lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// run when page loads
init();
