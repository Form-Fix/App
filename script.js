const nikeDatabase = [
    { name: "Neck Retraction", duration: 30, goal: "office", art: "Neck" },
    { name: "Thoracic Opening", duration: 45, goal: "office", art: "Thoracic" },
    { name: "Wrist Stretch", duration: 30, goal: "office", art: "Wrist" },
    { name: "Cat-Cow Stretch", duration: 60, goal: "physio", art: "CatCow" },
    { name: "Dead Bug Core", duration: 45, goal: "physio", art: "DeadBug" },
    { name: "Bodyweight Squat", duration: 45, goal: "strength", art: "Squat" }
];

let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let isPaused = false;
let timerInterval;

// Memory
window.onload = () => {
    document.getElementById('age').value = localStorage.getItem('age') || "";
    document.getElementById('weight').value = localStorage.getItem('weight') || "";
};

document.getElementById('generate-btn').onclick = () => {
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    localStorage.setItem('age', age);
    localStorage.setItem('weight', weight);

    const goal = document.querySelector('input[name="goal"]:checked').value;
    workoutQueue = nikeDatabase.filter(ex => ex.goal === goal);
    
    renderHub();
    switchScreen('workout-hub');
};

function renderHub() {
    document.getElementById('hub-count').innerText = workoutQueue.length;
    const list = document.getElementById('exercise-list-ul');
    list.innerHTML = workoutQueue.map((ex, i) => `
        <div class="n-item" onclick="startAt(${i})">
            <div>
                <span class="gradient-text" style="font-weight:900">0${i+1}</span>
                <h4 style="margin:5px 0">${ex.name}</h4>
                <small style="color:#555">${ex.duration} SEC</small>
            </div>
            <div class="gradient-text">→</div>
        </div>
    `).join('');
}

window.startAt = function(idx) {
    currentIdx = idx;
    isPaused = false;
    switchScreen('dashboard');
    loadExercise(idx);
};

document.getElementById('start-workout-btn').onclick = () => startAt(0);

function loadExercise(idx) {
    if (idx >= workoutQueue.length) {
        alert("GOAL REACHED.");
        location.reload();
        return;
    }
    currentIdx = idx;
    const ex = workoutQueue[idx];
    document.getElementById('current-ex-name').innerText = ex.name;
    document.getElementById('progress-fill').style.width = `${(idx / workoutQueue.length) * 100}%`;
    
    timeLeft = ex.duration;
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            updateTimerUI();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                loadExercise(currentIdx + 1);
            }
        }
    }, 1000);
}

function updateTimerUI() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById('exercise-timer').innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
}

// FIX: Play/Pause
document.getElementById('play-pause-btn').onclick = function() {
    isPaused = !isPaused;
    this.innerText = isPaused ? "RESUME" : "PAUSE";
    this.style.background = isPaused ? "var(--nike-gradient)" : "white";
    this.style.color = isPaused ? "white" : "black";
};

// FIX: Skip
document.getElementById('skip-btn').onclick = () => {
    clearInterval(timerInterval);
    loadExercise(currentIdx + 1);
};

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
