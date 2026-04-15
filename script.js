const nikeDatabase = [
    // OFFICE (Fokus na vrat, leđa, ručne zglobove)
    { name: "Neck Retractions", duration: 30, goal: "office", art: "Neck" },
    { name: "Thoracic Opening", duration: 45, goal: "office", art: "Thoracic" },
    { name: "Wrist Circles", duration: 30, goal: "office", art: "Wrist" },
    { name: "Seated Spine Twist", duration: 45, goal: "office", art: "Twist" },
    { name: "Shoulder Shrugs", duration: 30, goal: "office", art: "Shrugs" },
    { name: "Standing Desk Stretch", duration: 60, goal: "office", art: "Desk" },
    
    // PHYSIO
    { name: "Cat-Cow Stretch", duration: 60, goal: "physio", art: "CatCow" },
    { name: "Dead Bug Core", duration: 60, goal: "physio", art: "DeadBug" },
    { name: "Bird-Dog Balance", duration: 45, goal: "physio", art: "BirdDog" },
    { name: "Glute Bridge", duration: 60, goal: "physio", art: "Bridge" },
    { name: "Clamshells L/R", duration: 60, goal: "physio", art: "Clams" },

    // YOGA / PILATES / STRENGTH (Dopuni po želji)
    { name: "Downward Dog", duration: 45, goal: "yoga", art: "DownDog" },
    { name: "Plank Hold", duration: 60, goal: "strength", art: "Plank" },
    { name: "Bodyweight Squat", duration: 45, goal: "strength", art: "Squat" }
];

let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let isPaused = false;
let timerInterval;

// Memory (Pamćenje unosa)
window.onload = () => {
    document.getElementById('age').value = localStorage.getItem('age') || "";
    document.getElementById('weight').value = localStorage.getItem('weight') || "";
};

document.getElementById('main-start-btn').onclick = (e) => {
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    localStorage.setItem('age', age);
    localStorage.setItem('weight', weight);

    const goal = document.querySelector('input[name="goal"]:checked').value;
    workoutQueue = nikeDatabase.filter(ex => ex.goal === goal);
    
    if(workoutQueue.length > 0) {
        renderHub();
        switchScreen('workout-hub');
    }
};

function renderHub() {
    const list = document.getElementById('exercise-list-ul');
    list.innerHTML = workoutQueue.map((ex, i) => `
        <div class="n-item" onclick="startAt(${i})">
            <div>
                <span class="gradient-text" style="font-weight:900">0${i+1}</span>
                <h4 style="margin:5px 0">${ex.name}</h4>
                <small style="color:#444">${ex.duration} SECONDS</small>
            </div>
            <div class="gradient-text" style="font-size:1.2rem">▶</div>
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
        alert("SESSION COMPLETE. NO LIMITS.");
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
            updateUI();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                loadExercise(currentIdx + 1);
            }
        }
    }, 1000);
}

function updateUI() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById('exercise-timer').innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Play/Pause Fix
document.getElementById('play-pause-btn').onclick = function() {
    isPaused = !isPaused;
    this.innerText = isPaused ? "RESUME" : "PAUSE";
    this.classList.toggle('main'); // Menja boju tastera
};

// Skip Fix
document.getElementById('skip-btn').onclick = () => {
    clearInterval(timerInterval);
    loadExercise(currentIdx + 1);
};

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
