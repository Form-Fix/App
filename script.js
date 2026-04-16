const db = {
    physio: [
        { name: "Pelvic Tilt", yt: "O9uInXf2_I4" },
        { name: "Cat-Cow Stretch", yt: "wT8m5ovS_fA" },
        { name: "Bird-Dog Balance", yt: "wiFNA3sqjCA" },
        { name: "Glute Bridge", yt: "wPM8icPu6H8" },
        { name: "Dead Bug Core", yt: "O7L8F7R9_7U" },
        { name: "Prone Y-Raise", yt: "6C-774nIn9E" }
    ],
    office: [
        { name: "Neck Release", yt: "I6A7CStZ_f0" },
        { name: "Wrist Mobility", yt: "u9V9R07-X0k" },
        { name: "Seated Twist", yt: "6p62S6NAtYQ" },
        { name: "Shoulder Rolls", yt: "GvG_pA_N26o" },
        { name: "Desk Chest Opener", yt: "m0vBvYy6Fm0" }
    ],
    strength: [
        { name: "Elite Air Squat", yt: "rMvwVtlqjTE" },
        { name: "Diamond Pushup", yt: "SLoS-XG7Vqc" },
        { name: "Reverse Lunges", yt: "K6K-v6W9U0Y" },
        { name: "Standard Plank", yt: "ASdvN_XEl_c" },
        { name: "Mountain Climbers", yt: "nmwgirg-6pM" }
    ],
    yoga: [
        { name: "Downward Dog", yt: "EC7RGJ9SUIc" },
        { name: "Cobra Pose", yt: "fOdrW7nf9gw" },
        { name: "Warrior II", yt: "nshZ_v_fW_o" },
        { name: "Sun Salutation", yt: "7U-9_6-7G9o" }
    ],
    stretch: [
        { name: "Deep Hamstring", yt: "L_xrDAtykMI" },
        { name: "Hip Flexor Stretch", yt: "m9L0f59uWos" },
        { name: "Butterfly Stretch", yt: "v9057m6-7A8" },
        { name: "Cobra Stretch", yt: "JD2Wv8vS_A8" }
    ],
    pilates: [
        { name: "Pilates Hundred", yt: "F9LpA-7G8A8" },
        { name: "Single Leg Circle", yt: "v90R6-7P8A8" },
        { name: "The Roll Up", yt: "vR9B6-P8A8-o" }
    ]
};

let workoutQueue = [];
let currentIdx = 0;
let timerInterval;
let timeLeft = 120; // 2 min
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
            <div><span style="font-weight:900;">${i+1}. ${ex.name.toUpperCase()}</span><br><small style="color:#555">DURATION: 2:00 MIN</small></div>
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
    
    const ytId = workoutQueue[idx].yt;
    // Ovi linkovi su provereni embed linkovi
    document.getElementById('video-container').innerHTML = 
        `<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&modestbranding=1&rel=0" allow="autoplay"></iframe>`;
    
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
                else { alert("TRAINING COMPLETE!"); location.reload(); }
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
