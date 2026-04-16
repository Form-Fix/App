const db = {
    physio: [
        { name: "Cat-Cow", yt: "wT8m5ovS_fA" },
        { name: "Bird-Dog", yt: "wiFNA3sqjCA" },
        { name: "Glute Bridge", yt: "wPM8icPu6H8" }
    ],
    office: [
        { name: "Neck Stretch", yt: "I6A7CStZ_f0" },
        { name: "Wrist Rolls", yt: "u9V9R07-X0k" },
        { name: "Thoracic Twist", yt: "6C-774nIn9E" }
    ],
    strength: [
        { name: "Air Squats", yt: "rMvwVtlqjTE" },
        { name: "Pushups", yt: "IODxDxX7oi4" },
        { name: "Plank", yt: "ASdvN_XEl_c" }
    ]
};

let workoutQueue = [];
let currentIdx = 0;
let timerInterval;
let timeLeft = 120; // 2 minuta po vežbi
let isPaused = false;

document.getElementById('main-start-btn').onclick = () => {
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const totalMin = parseInt(document.getElementById('user-duration').value);
    const numEx = Math.floor((totalMin * 60) / 120);
    
    workoutQueue = [];
    let pool = db[goal];
    for(let i = 0; i < numEx; i++) {
        workoutQueue.push(pool[i % pool.length]);
    }
    renderHub();
    switchScreen('workout-hub');
};

function renderHub() {
    const list = document.getElementById('exercise-list-ul');
    list.innerHTML = workoutQueue.map((ex, i) => `
        <div class="n-item" onclick="startAt(${i})" style="background:#0c0c0c; padding:20px; border-radius:15px; margin-bottom:10px; border:1px solid #1a1a1a; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
            <div><span style="font-weight:900;">${i+1}. ${ex.name.toUpperCase()}</span><br><small style="color:#555">2:00 MIN</small></div>
            <div class="gradient-text" style="font-size:1.5rem">▶</div>
        </div>
    `).join('');
}

document.getElementById('start-workout-btn').onclick = () => startAt(0);

function startAt(idx) {
    currentIdx = idx;
    timeLeft = 120;
    isPaused = false;
    switchScreen('dashboard');
    
    // Učitavanje YouTube videa
    const ytId = workoutQueue[idx].yt;
    document.getElementById('video-container').innerHTML = 
        `<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}" allow="autoplay"></iframe>`;
    
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
    document.getElementById('progress-fill').style.width = ((120 - timeLeft) / 120 * 100) + "%";
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
