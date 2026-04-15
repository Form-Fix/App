// PROŠIRENA BAZA VEŽBI
const fullDatabase = {
    physio: [
        { name: "Bird-Dog", duration: 45, level: "beginner", day: 1 },
        { name: "Cat-Cow", duration: 60, level: "beginner", day: 1 },
        { name: "Pelvic Tilt", duration: 45, level: "beginner", day: 2 },
        { name: "Dead Bug", duration: 60, level: "intermediate", day: 1 },
        { name: "Single Leg Bridge", duration: 45, level: "pro", day: 1 }
    ],
    office: [
        { name: "Neck Retraction", duration: 30, level: "beginner", day: 1 },
        { name: "Thoracic Twist", duration: 45, level: "beginner", day: 1 },
        { name: "Wall Slides", duration: 60, level: "intermediate", day: 1 },
        { name: "Wrist Mobility", duration: 30, level: "beginner", day: 2 }
    ],
    strength: [
        { name: "Air Squats", duration: 45, level: "beginner", day: 1 },
        { name: "Pushups", duration: 40, level: "intermediate", day: 1 },
        { name: "Plank", duration: 60, level: "beginner", day: 1 },
        { name: "Burpees", duration: 45, level: "pro", day: 1 }
    ]
};

let workoutQueue = [];
let currentIdx = 0;
let timerInterval;

document.getElementById('main-start-btn').onclick = () => {
    const level = document.getElementById('user-level').value;
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const durationLimit = parseInt(document.getElementById('user-duration').value);

    // LOGIKA FILTRIRANJA: Cilj + Nivo + Dan (uvek kreće od dana 1)
    let rawExercises = fullDatabase[goal].filter(ex => ex.level === level || ex.level === 'beginner');
    
    // Ograničavanje trajanja
    let currentTotal = 0;
    workoutQueue = rawExercises.filter(ex => {
        if(currentTotal + (ex.duration/60) <= durationLimit) {
            currentTotal += (ex.duration/60);
            return true;
        }
        return false;
    });

    renderHub();
    switchScreen('workout-hub');
};

function renderHub() {
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

// OSNOVNA NAVIGACIJA I TAJMER
function startAt(idx) {
    currentIdx = idx;
    switchScreen('dashboard');
    runTimer(workoutQueue[idx].duration);
}

function runTimer(seconds) {
    clearInterval(timerInterval);
    let time = seconds;
    const display = document.getElementById('exercise-timer');
    
    timerInterval = setInterval(() => {
        time--;
        let m = Math.floor(time/60);
        let s = time%60;
        display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        
        if(time <= 0) {
            clearInterval(timerInterval);
            if(currentIdx < workoutQueue.length - 1) startAt(currentIdx + 1);
            else alert("WORKOUT COMPLETE!");
        }
    }, 1000);
}

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
