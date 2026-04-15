// Baza od 50 vežbi (ovde su primeri, ti samo dodaj nazive svojih Rive Artboard-a)
const allExercises = [
    { name: "Mačka-Krava", duration: 45, goal: "physio", riveArtboard: "CatCow" },
    { name: "Mrtva Buba", duration: 45, goal: "physio", riveArtboard: "DeadBug" },
    { name: "Most (Bridge)", duration: 60, goal: "physio", riveArtboard: "Bridge" },
    { name: "Čučnjevi", duration: 45, goal: "strength", riveArtboard: "Squat" }
];

let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let isPaused = false;
let timerInterval;
let riveInstance; // Ovde čuvamo Rive objekat

// FORMA -> LISTA
document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const goal = document.getElementById('goal').value;
    workoutQueue = allExercises.filter(ex => ex.goal === goal);
    
    document.getElementById('onboarding').style.display = 'none';
    document.getElementById('workout-list-screen').style.display = 'flex';
    
    const listUl = document.getElementById('exercise-list-ul');
    listUl.innerHTML = workoutQueue.map(ex => `<li>${ex.name} <span>${ex.duration}s</span></li>`).join('');
});

// LISTA -> TRENING
document.getElementById('start-workout-btn').addEventListener('click', function() {
    document.getElementById('workout-list-screen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    
    // Inicijalizuj Rive (Zameni 'tvoj_fajl.riv' sa tvojim linkom)
    riveInstance = new rive.Rive({
        src: 'tvoj_karakter.riv', 
        canvas: document.getElementById('canvas'),
        autoplay: true,
        onLoad: () => {
            loadExercise(0);
        }
    });
});

function loadExercise(idx) {
    if (idx >= workoutQueue.length) {
        alert("Trening završen! Bravo!");
        location.reload();
        return;
    }

    currentIdx = idx;
    const ex = workoutQueue[idx];
    timeLeft = ex.duration;

    // Promeni Artboard u Rive-u (Ovo je ključ!)
    if (riveInstance) {
        riveInstance.load({
            src: 'tvoj_karakter.riv',
            artboard: ex.riveArtboard,
            autoplay: true
        });
    }

    // UI Update
    document.getElementById('current-ex-name').innerText = ex.name;
    document.getElementById('current-index-display').innerText = `${idx + 1} / ${workoutQueue.length}`;
    document.getElementById('next-ex-name').innerText = workoutQueue[idx + 1]?.name || "Kraj";
    
    // Globalni progres bar
    const progress = ((idx) / workoutQueue.length) * 100;
    document.getElementById('global-progress-fill').style.width = `${progress}%`;

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            updateTimerDisplay();
            
            // Zvučni signal u poslednje 3 sekunde
            if (timeLeft <= 3 && timeLeft > 0) document.getElementById('beep-sound').play();
            
            if (timeLeft <= 0) nextExercise();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById('exercise-timer').innerText = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

function nextExercise() {
    loadExercise(currentIdx + 1);
}

// PAUZA
document.getElementById('play-pause-btn').addEventListener('click', function() {
    isPaused = !isPaused;
    this.innerText = isPaused ? "NASTAVI" : "PAUZA";
    if(isPaused) riveInstance.pause(); else riveInstance.play();
});

document.getElementById('skip-btn').addEventListener('click', nextExercise);
