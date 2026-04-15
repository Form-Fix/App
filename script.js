const nikeDatabase = [
    // OFFICE (Kancelarija - Fokus na vrat i ramena)
    { name: "Neck Retraction", duration: 30, goal: "office", art: "Neck" },
    { name: "Thoracic Opening", duration: 45, goal: "office", art: "Thoracic" },
    { name: "Wrist Mobility", duration: 30, goal: "office", art: "Wrist" },
    { name: "Wall Slides", duration: 45, goal: "office", art: "Wall" },

    // PHYSIO (Oporavak)
    { name: "Cat-Cow Stretch", duration: 60, goal: "physio", art: "CatCow" },
    { name: "Dead Bug", duration: 45, goal: "physio", art: "DeadBug" },
    { name: "Bird-Dog", duration: 45, goal: "physio", art: "BirdDog" },
    { name: "Glute Bridge", duration: 60, goal: "physio", art: "Bridge" },

    // YOGA
    { name: "Downward Dog", duration: 45, goal: "yoga", art: "DownDog" },
    { name: "Warrior II", duration: 60, goal: "yoga", art: "Warrior" },
    { name: "Cobra Pose", duration: 30, goal: "yoga", art: "Cobra" },

    // STRENGTH
    { name: "Bodyweight Squats", duration: 45, goal: "strength", art: "Squat" },
    { name: "Diamond Pushups", duration: 40, goal: "strength", art: "Pushup" },
    { name: "Reverse Lunges", duration: 50, goal: "strength", art: "Lunge" }
];

let workoutQueue = [];
let currentIdx = 0;
let timerInterval;

// Učitavanje snimljenih podataka (Memory)
window.onload = () => {
    if(localStorage.getItem('age')) document.getElementById('age').value = localStorage.getItem('age');
    if(localStorage.getItem('weight')) document.getElementById('weight').value = localStorage.getItem('weight');
};

document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Snimi podatke
    localStorage.setItem('age', document.getElementById('age').value);
    localStorage.setItem('weight', document.getElementById('weight').value);

    const goal = document.querySelector('input[name="goal"]:checked').value;
    workoutQueue = nikeDatabase.filter(ex => ex.goal === goal);

    renderList();
    switchScreen('workout-hub');
});

function renderList() {
    const container = document.getElementById('exercise-list-ul');
    container.innerHTML = workoutQueue.map((ex, i) => `
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
    switchScreen('dashboard');
    loadExercise(idx);
};

function loadExercise(idx) {
    if (idx >= workoutQueue.length) {
        alert("SESSION COMPLETE!");
        location.reload();
        return;
    }
    const ex = workoutQueue[idx];
    document.getElementById('current-ex-name').innerText = ex.name;
    startTimer(ex.duration);
}

function startTimer(duration) {
    let timeLeft = duration;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        const m = Math.floor(timeLeft/60);
        const s = timeLeft%60;
        document.getElementById('exercise-timer').innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            loadExercise(currentIdx + 1);
        }
    }, 1000);
}

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
