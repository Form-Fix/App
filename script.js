const db = {
    physio: ["Cat-Cow", "Bird-Dog", "Glute Bridge", "Pelvic Tilt", "Dead Bug"],
    office: ["Neck Stretch", "Wrist Rolls", "Shoulder Shrugs", "Thoracic Twist", "Desk Plank"],
    strength: ["Air Squats", "Pushups", "Lunges", "Plank", "Burpees"],
    yoga: ["Downward Dog", "Cobra", "Warrior I", "Warrior II", "Tree Pose"],
    stretch: ["Hamstring Stretch", "Cobra Stretch", "Quad Stretch", "Butterfly"],
    pilates: ["The Hundred", "Leg Circles", "Roll Up", "Plank Leg Lift"]
};

let workoutQueue = [];
let currentIdx = 0;
let timerInterval;
let timeLeft = 0;
let isPaused = false;

// Generisanje plana
document.getElementById('main-start-btn').onclick = () => {
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const totalMin = parseInt(document.getElementById('user-duration').value);
    
    const exDuration = 120; // 2 minuta = 120 sekundi
    const numEx = Math.floor((totalMin * 60) / exDuration);
    
    workoutQueue = [];
    let pool = db[goal];
    
    for(let i = 0; i < numEx; i++) {
        workoutQueue.push({ name: pool[i % pool.length], duration: exDuration });
    }

    renderHub();
    switchScreen('workout-hub');
};

// Render liste i popravka strelica
function renderHub() {
    const list = document.getElementById('exercise-list-ul');
    list.innerHTML = workoutQueue.map((ex, i) => `
        <div class="n-item" onclick="startAt(${i})" style="background:#0c0c0c; padding:20px; border-radius:15px; margin-bottom:10px; border:1px solid #1a1a1a; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
            <div>
                <span style="font-weight:900;">${i+1}. ${ex.name.toUpperCase()}</span>
                <br><small style="color:#555">DURATION: 2:00 MIN</small>
            </div>
            <div class="gradient-text" style="font-size:1.5rem">▶</div>
        </div>
    `).join('');
}

// Popravka START ALL tastera
document.getElementById('start-workout-btn').onclick = () => {
    if(workoutQueue.length > 0) startAt(0);
};

function startAt(idx) {
    currentIdx = idx;
    timeLeft = workoutQueue[idx].duration;
    isPaused = false;
    switchScreen('dashboard');
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    document.getElementById('current-ex-name').innerText = workoutQueue[currentIdx].name.toUpperCase();
    
    timerInterval = setInterval(() => {
        if(!isPaused) {
            timeLeft--;
            updateUI();
            if(timeLeft <= 0) {
                clearInterval(timerInterval);
                if(currentIdx < workoutQueue.length - 1) startAt(currentIdx + 1);
                else { alert("DONE!"); location.reload(); }
            }
        }
    }, 1000);
}

function updateUI() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById('exercise-timer').innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
    const progress = ((120 - timeLeft) / 120) * 100;
    document.getElementById('progress-fill').style.width = progress + "%";
}

document.getElementById('play-pause-btn').onclick = function() {
    isPaused = !isPaused;
    this.innerText = isPaused ? "RESUME" : "PAUSE";
};

document.getElementById('skip-btn').onclick = () => {
    if(currentIdx < workoutQueue.length - 1) startAt(currentIdx + 1);
};

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
