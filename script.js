// Baza od 50 vežbi (ovde je skraćeno, ti samo dodaj ostale)
const nikeDatabase = [
    { id: "catcow", name: "CAT-COW", duration: 45, goal: "physio", art: "CatCow" },
    { id: "deadbug", name: "DEAD BUG", duration: 60, goal: "physio", art: "DeadBug" },
    { id: "squat", name: "AIR SQUAT", duration: 45, goal: "strength", art: "Squat" },
    { id: "pushup", name: "PUSHUPS", duration: 40, goal: "strength", art: "Pushup" },
    { id: "plank", name: "PLANK", duration: 30, goal: "strength", art: "Plank" }
];

let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let isPaused = false;
let timerInterval;
let riveInstance;

// 1. GENERISANJE PROGRAMA
document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const timeLimit = parseInt(document.getElementById('duration').value);

    // Filtriraj i nasumično izaberi vežbe
    workoutQueue = nikeDatabase
        .filter(ex => ex.goal === goal)
        .sort(() => 0.5 - Math.random())
        .slice(0, 10); // Uzimamo 10 vežbi

    document.getElementById('hub-count').innerText = `${workoutQueue.length} EXERCISES`;
    document.getElementById('hub-time').innerText = `${workoutQueue.length} MIN`;

    renderList();
    switchScreen('workout-hub');
});

// 2. RENDEROVANJE LISTE (Sa popravljenim strelicama)
function renderList() {
    const container = document.getElementById('exercise-list-ul');
    container.innerHTML = workoutQueue.map((ex, i) => `
        <div class="n-item" onclick="startAt(${i})">
            <div>
                <span style="font-size:0.7rem; color:#444">0${i+1}</span>
                <h4>${ex.name}</h4>
                <span style="font-size:0.8rem; color:#666">${ex.duration} SEC</span>
            </div>
            <div class="n-item-arrow">→</div>
        </div>
    `).join('');
}

// 3. GLOBALNA FUNKCIJA ZA START (Sada radi!)
window.startAt = function(index) {
    currentIdx = index;
    switchScreen('dashboard');
    if (!riveInstance) {
        initRive();
    } else {
        loadExercise(currentIdx);
    }
};

document.getElementById('start-workout-btn').onclick = () => startAt(0);

function initRive() {
    riveInstance = new rive.Rive({
        src: 'your_file.riv', // Zameni sa tvojim .riv fajlom
        canvas: document.getElementById('canvas'),
        autoplay: true,
        onLoad: () => loadExercise(currentIdx)
    });
}

function loadExercise(idx) {
    if (idx >= workoutQueue.length) {
        alert("SESSION COMPLETE. NO LIMITS.");
        location.reload();
        return;
    }

    currentIdx = idx;
    const ex = workoutQueue[idx];
    timeLeft = ex.duration;

    // UI Updates
    document.getElementById('current-ex-name').innerText = ex.name;
    document.getElementById('exercise-timer').innerText = formatTime(timeLeft);
    document.getElementById('progress-text').innerText = `EXERCISE ${idx + 1} OF ${workoutQueue.length}`;
    document.getElementById('next-ex-name').innerText = workoutQueue[idx+1]?.name || "DONE";
    document.getElementById('progress-fill').style.width = `${(idx / workoutQueue.length) * 100}%`;

    if (riveInstance) {
        riveInstance.load({ src: 'your_file.riv', artboard: ex.art, autoplay: true });
    }

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            document.getElementById('exercise-timer').innerText = formatTime(timeLeft);
            if (timeLeft <= 0) nextExercise();
        }
    }, 1000);
}

function nextExercise() { loadExercise(currentIdx + 1); }

function formatTime(s) {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

document.getElementById('play-pause-btn').onclick = function() {
    isPaused = !isPaused;
    this.innerText = isPaused ? "RESUME" : "PAUSE";
};
document.getElementById('skip-btn').onclick = nextExercise;
