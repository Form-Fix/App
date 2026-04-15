// 1. BAZA VEŽBI (Ovde ćemo kasnije dodati svih 50)
const allExercises = [
    { name: "Mačka-Krava", duration: 45, goal: "physio" },
    { name: "Mrtva Buba", duration: 45, goal: "physio" },
    { name: "Most (Bridge)", duration: 60, goal: "physio" },
    { name: "Bird-Dog", duration: 45, goal: "physio" },
    { name: "Plank (Izdržaj)", duration: 30, goal: "strength" },
    { name: "Čučnjevi", duration: 60, goal: "strength" },
    { name: "Iskorak", duration: 45, goal: "strength" },
    { name: "Istezanje vrata", duration: 30, goal: "physio" }
];

let workoutQueue = []; // Lista koja se pravi specifično za korisnika
let currentIdx = 0;
let timeLeft = 0;
let isPaused = false;
let timerInterval;

// 2. LOGIKA ZA SUBMIT FORME (Onboarding -> Lista)
document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Uzimanje podataka
    const userData = {
        age: document.getElementById('age').value,
        goal: document.getElementById('goal').value,
        duration: document.getElementById('duration').value
    };

    console.log("Generišem plan za:", userData);

    // FILTRIRANJE: Uzmi vežbe koje odgovaraju cilju
    workoutQueue = allExercises.filter(ex => ex.goal === userData.goal);

    // OGRANIČAVANJE: Ako je izabrao 5 min, daj mu npr. 4 vežbe, ako je 20 min, daj više
    let limit = userData.duration == "5" ? 4 : 10;
    workoutQueue = workoutQueue.slice(0, limit);

    // PRELAZAK NA EKRAN SA LISTOM
    document.getElementById('onboarding').style.display = 'none';
    document.getElementById('workout-list-screen').style.display = 'flex';

    // POPUNJAVANJE LISTE NA EKRANU
    const listUl = document.getElementById('exercise-list-ul');
    listUl.innerHTML = workoutQueue.map((ex) => 
        `<li>${ex.name} <span>${ex.duration}s</span></li>`
    ).join('');
});

// 3. POČETAK TRENINGA (Lista -> Dashboard)
document.getElementById('start-workout-btn').addEventListener('click', function() {
    document.getElementById('workout-list-screen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    loadExercise(0); // Krećemo od prve vežbe u nizu
});

// 4. KONTROLE NA DASHBOARDU
document.getElementById('play-pause-btn').addEventListener('click', function() {
    isPaused = !isPaused;
    this.innerText = isPaused ? "NASTAVI" : "PAUZA";
});

document.getElementById('skip-btn').addEventListener('click', function() {
    nextExercise();
});

// 5. FUNKCIJE ZA UPRAVLJANJE TRENINGOM
function loadExercise(idx) {
    if (idx >= workoutQueue.length) {
        alert("Čestitamo! Trening je završen.");
        location.reload(); // Vraća na početak
        return;
    }

    currentIdx = idx;
    timeLeft = workoutQueue[idx].duration;
    document.getElementById('current-ex-name').innerText = workoutQueue[idx].name;
    
    updateTimerDisplay();
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval); // Resetuj stari tajmer ako postoji
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                nextExercise();
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const display = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    document.getElementById('exercise-timer').innerText = display;
}

function nextExercise() {
    loadExercise(currentIdx + 1);
}
