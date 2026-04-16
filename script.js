const db = {
    physio:[
        {name: "Cat-Cow", yt: "kqnua4rHVp8"},
        {name: "Bird Dog", yt: "wiFNA3sqjCA"},
        {name: "Glute Bridge", yt: "wPM8icPu6H8"}
    ],
    office:[
        {name: "Neck Stretch", yt: "I6A_N_D_V8U"},
        {name: "Wrist Rolls", yt: "E-9vVvM_Y_Y"}
    ],
    strength:[
        {name: "Push-ups", yt: "IODxDxX7oi4"},
        {name: "Squats", yt: "gcNh17Ckjgg"},
        {name: "Plank", yt: "ASdvN_XEl_c"}
    ],
    yoga:[
        {name: "Downward Dog", yt: "j97SSGzqhxQ"},
        {name: "Cobra", yt: "fOdrW7nfPrg"}
    ],
    stretch:[
        {name: "Hamstring Stretch", yt: "SshM9770mX0"}
    ],
    pilates:[
        {name: "Hundred", yt: "lCg_gh_fppI"},
        {name: "Roll Up", yt: "fK26MvL1sK4"}
    ]
};

const levels = ["BEGINNER", "INTERMEDIATE", "PRO"];
let weeklyPlan = [];
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;
let isPaused = false;

function getCleanYtUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3&autoplay=1&mute=1&playsinline=1`;
}

/* UI SETUP CONTROLS (+ i -) */
document.querySelectorAll(".num-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.target;
        const step = parseInt(btn.dataset.step);
        const input = document.getElementById(id);
        if (!input) return;

        if (btn.dataset.type === "list") {
            let idx = (levels.indexOf(input.value) + step + levels.length) % levels.length;
            input.value = levels[idx];
        } else {
            let val = (parseInt(input.value) || 0) + step;
            if(id === "age") val = Math.max(10, Math.min(100, val));
            if(id === "weight") val = Math.max(30, Math.min(200, val));
            if(id === "user-duration") val = Math.max(5, Math.min(120, val));
            input.value = val;
        }
    });
});

/* GENERATE PLAN ACTION */
document.getElementById("main-start-btn").onclick = () => {
    const goalInput = document.querySelector('input[name="goal"]:checked');
    if(!goalInput) return alert("Select program");
    
    generateWeeklyPlan(goalInput.value);
    renderPlanScreen();
    switchScreen("plan-screen");
};

function generateWeeklyPlan(goal) {
    weeklyPlan = [];
    const pool = db[goal];
    const totalMin = parseInt(document.getElementById("user-duration").value) || 20;

    for(let i = 1; i <= 7; i++) {
        let dayExercises = [];
        for(let j = 0; j < 5; j++) {
            let ex = pool[Math.floor(Math.random() * pool.length)];
            dayExercises.push({...ex, duration: (totalMin * 60) / 5});
        }
        weeklyPlan.push({ dayNumber: i, exercises: dayExercises });
    }
}

function renderPlanScreen() {
    const container = document.getElementById("weekly-plan-list");
    if(!container) return;
    
    container.innerHTML = weeklyPlan.map((day, idx) => `
        <div class="n-item" onclick="loadDay(${idx})" style="cursor:pointer; display:flex; justify-content:space-between;">
            DAY ${day.dayNumber} <span style="color:var(--p-pink)">➔</span>
        </div>
    `).join("");
}

function loadDay(idx) {
    workoutQueue = weeklyPlan[idx].exercises;
    const container = document.getElementById("exercise-list-ul");
    if(!container) return;

    container.innerHTML = `<h3 style="margin-bottom:15px; font-size:0.8rem; color:#666;">DAY ${idx+1} EXERCISES</h3>` + 
        workoutQueue.map((ex, i) => `<div class="n-item" onclick="startAt(${i})">${i+1}. ${ex.name}</div>`).join("");
    switchScreen("workout-hub");
}

/* WORKOUT ENGINE */
function formatTime(s) {
    return `${Math.floor(s/60).toString().padStart(2,'0')}:${Math.floor(s%60).toString().padStart(2,'0')}`;
}

function startAt(i) {
    currentIdx = i;
    timeLeft = workoutQueue[i].duration;
    isPaused = false;
    switchScreen("dashboard");
    updateDashboard();
    runTimer();
}

function updateDashboard() {
    const ex = workoutQueue[currentIdx];
    document.getElementById("exercise-timer").innerText = formatTime(timeLeft);
    document.getElementById("current-ex-name").innerText = ex.name;
    document.getElementById("youtube-player").src = getCleanYtUrl(ex.yt);

    const next = document.getElementById("next-ex-preview");
    next.innerText = (currentIdx + 1 < workoutQueue.length) ? "NEXT: " + workoutQueue[currentIdx+1].name : "FINAL EXERCISE";
}

function runTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if(!isPaused) {
            timeLeft--;
            document.getElementById("exercise-timer").innerText = formatTime(timeLeft);
            
            let total = workoutQueue[currentIdx].duration;
            document.getElementById("progress-fill").style.width = ((total - timeLeft) / total * 100) + "%";

            if(timeLeft <= 0) nextExercise();
        }
    }, 1000);
}

function nextExercise() {
    if(currentIdx + 1 < workoutQueue.length) {
        startAt(currentIdx + 1);
    } else {
        clearInterval(timer);
        alert("DAY COMPLETED!");
        switchScreen("plan-screen");
    }
}

/* DASHBOARD CONTROLS */
document.getElementById("skip-btn").onclick = () => nextExercise();
document.getElementById("play-pause-btn").onclick = function() {
    isPaused = !isPaused;
    this.innerText = isPaused ? "RESUME" : "PAUSE";
};
document.getElementById("start-workout-btn").onclick = () => startAt(0);

function switchScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(id);
    if(target) target.classList.add("active");
}
