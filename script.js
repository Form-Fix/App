const exerciseDatabase = [
    // PHYSIO PROGRAM
    { id: "catcow", name: "Cat-Cow Stretch", duration: 45, goal: "physio", artboard: "CatCow" },
    { id: "deadbug", name: "Dead Bug Core", duration: 60, goal: "physio", artboard: "DeadBug" },
    { id: "birdog", name: "Bird-Dog Balance", duration: 45, goal: "physio", artboard: "BirdDog" },
    { id: "bridge", name: "Glute Bridge", duration: 50, goal: "physio", artboard: "Bridge" },
    { id: "childs", name: "Child's Pose", duration: 30, goal: "physio", artboard: "Child" },
    // STRENGTH PROGRAM
    { id: "squat", name: "Air Squats", duration: 45, goal: "strength", artboard: "Squat" },
    { id: "pushup", name: "Dynamic Pushups", duration: 40, goal: "strength", artboard: "Pushup" },
    { id: "plank", name: "Forearm Plank", duration: 30, goal: "strength", artboard: "Plank" },
    { id: "lunge", name: "Reverse Lunges", duration: 50, goal: "strength", artboard: "Lunge" }
];

let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let isPaused = false;
let timerInterval;
let riveInstance;

// FORM SUBMIT -> GENERATE HUB
document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const selectedGoal = document.querySelector('input[name="goal"]:checked').value;
    
    // Filter and Shuffle Exercises (Pro Logic)
    workoutQueue = exerciseDatabase
        .filter(ex => ex.goal === selectedGoal)
        .sort(() => 0.5 - Math.random())
        .slice(0, 8); // Take 8 exercises for the session

    document.getElementById('onboarding').style.display = 'none';
    document.getElementById('workout-hub').style.display = 'flex';

    // Render Hub List
    const listContainer = document.getElementById('exercise-list-ul');
    listContainer.innerHTML = workoutQueue.map((ex, i) => `
        <div class="workout-item">
            <div>
                <strong>${i+1}. ${ex.name}</strong>
                <p style="margin:0; font-size:0.8rem; color:#9ca3af">${ex.duration} Seconds</p>
            </div>
            <span style="color:var(--accent)">▶</span>
        </div>
    `).join('');
});

// START WORKOUT -> DASHBOARD
document.getElementById('start-workout-btn').addEventListener('click', function() {
    document.getElementById('workout-hub').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    
    // Initialize Rive
    riveInstance = new rive.Rive({
        src: 'your_animation_file.riv', // PLACEHOLDER
        canvas: document.getElementById('canvas'),
        autoplay: true,
        onLoad: () => {
            loadExercise(0);
        }
    });
});

function loadExercise(idx) {
    if (idx >= workoutQueue.length) {
        alert("Workout Complete! You're getting stronger.");
        location.reload();
        return;
    }

    currentIdx = idx;
    const ex = workoutQueue[idx];
    timeLeft = ex.duration;

    // Update UI
    document.getElementById('current-ex-name').innerText = ex.name;
    document.getElementById('current-ex-index').innerText = `${idx + 1}/${workoutQueue.length}`;
    document.getElementById('next-ex-name').innerText = workoutQueue[idx+1]?.name || "Finish";
    document.getElementById('progress-fill').style.width = `${(idx / workoutQueue.length) * 100}%`;

    // Load Rive Artboard
    if(riveInstance) {
        riveInstance.load({ src: 'your_animation_file.riv', artboard: ex.artboard, autoplay: true });
    }

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if(!isPaused) {
            timeLeft--;
            const m = Math.floor(timeLeft/60);
            const s = timeLeft%60;
            document.getElementById('exercise-timer').innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
            if(timeLeft <= 0) nextExercise();
        }
    }, 1000);
}

function nextExercise() {
    loadExercise(currentIdx + 1);
}

// Controls
document.getElementById('play-pause-btn').addEventListener('click', function() {
    isPaused = !isPaused;
    this.innerText = isPaused ? "RESUME" : "PAUSE";
});
document.getElementById('skip-btn').addEventListener('click', nextExercise);
