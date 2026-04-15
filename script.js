const db = {
    physio: [
        { name: "Bird-Dog", duration: 45, level: "beginner", day: 1 },
        { name: "Dead Bug", duration: 60, level: "beginner", day: 1 },
        { name: "Glute Bridge", duration: 45, level: "pro", day: 1 }
    ],
    office: [
        { name: "Neck Tuck", duration: 30, level: "beginner", day: 1 },
        { name: "Wrist Stretch", duration: 30, level: "beginner", day: 1 },
        { name: "Wall Slides", duration: 45, level: "pro", day: 1 }
    ],
    strength: [
        { name: "Air Squats", duration: 45, level: "beginner", day: 1 },
        { name: "Pushups", duration: 40, level: "intermediate", day: 1 },
        { name: "Plank Hold", duration: 60, level: "beginner", day: 1 }
    ]
};

let workoutQueue = [];
let currentIdx = 0;
let timerInterval;

document.getElementById('main-start-btn').onclick = () => {
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const level = document.getElementById('user-level').value;
    
    // Filtriranje prema kategoriji i nivou
    workoutQueue = db[goal].filter(ex => ex.level === level || ex.level === "beginner");
    
    renderHub();
    switchScreen('workout-hub');
};

function renderHub() {
    const list = document.getElementById('exercise-list-ul');
    list.innerHTML = workoutQueue.map((ex, i) => `
        <div class="n-item" onclick="startAt(${i})">
            <div>
                <span style="color:#444; font-weight:900">${i+1}. ${ex.name}</span>
                <br><small style="color:#555">${ex.duration} Seconds</small>
            </div>
            <div class="gradient-text">▶</div>
        </div>
    `).join('');
}

function startAt(idx) {
    currentIdx = idx;
    switchScreen('dashboard');
    runTimer(workoutQueue[idx].duration);
}

function runTimer(sec) {
    clearInterval(timerInterval);
    let time = sec;
    document.getElementById('current-ex-name').innerText = workoutQueue[currentIdx].name;
    
    timerInterval = setInterval(() => {
        time--;
        let m = Math.floor(time/60);
        let s = time%60;
        document.getElementById('exercise-timer').innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        
        if(time <= 0) {
            clearInterval(timerInterval);
            if(currentIdx < workoutQueue.length - 1) startAt(currentIdx + 1);
        }
    }, 1000);
}

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
