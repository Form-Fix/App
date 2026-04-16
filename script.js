const db = {
    physio:[
        {name: "Cat-Cow", yt: "https://www.youtube.com/embed/kqnua4rHVp8"},
        {name: "Bird Dog", yt: "https://www.youtube.com/embed/wiFNA3sqjCA"},
        {name: "Glute Bridge", yt: "https://www.youtube.com/embed/wPM8icPu6H8"}
    ],
    office:[
        {name: "Neck Stretch", yt: "https://www.youtube.com/embed/I6A_N_D_V8U"},
        {name: "Wrist Rolls", yt: "https://www.youtube.com/embed/E-9vVvM_Y_Y"}
    ],
    strength:[
        {name: "Push-ups", yt: "https://www.youtube.com/embed/IODxDxX7oi4"},
        {name: "Squats", yt: "https://www.youtube.com/embed/gcNh17Ckjgg"},
        {name: "Plank", yt: "https://www.youtube.com/embed/ASdvN_XEl_c"}
    ],
    yoga:[
        {name: "Downward Dog", yt: "https://www.youtube.com/embed/j97SSGzqhxQ"},
        {name: "Cobra", yt: "https://www.youtube.com/embed/fOdrW7nfPrg"}
    ],
    stretch:[
        {name: "Hamstring Stretch", yt: "https://www.youtube.com/embed/SshM9770mX0"}
    ],
    pilates:[
        {name: "Hundred", yt: "https://www.youtube.com/embed/lCg_gh_fppI"},
        {name: "Roll Up", yt: "https://www.youtube.com/embed/fK26MvL1sK4"}
    ]
};

const levels = ["BEGINNER", "INTERMEDIATE", "PRO"];
let weeklyPlan = {};
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;
let isPaused = false;

/* UI KONTROLE */
document.querySelectorAll(".num-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.target;
        const step = parseInt(btn.dataset.step);
        const input = document.getElementById(id);
        if (btn.dataset.type === "list") {
            let idx = (levels.indexOf(input.value) + step + levels.length) % levels.length;
            input.value = levels[idx];
        } else {
            let val = (parseInt(input.value) || 0) + step;
            if(id === "age") val = Math.max(10, Math.min(100, val));
            if(id === "weight") val = Math.max(30, Math.min(200, val));
            if(id === "user-duration") val = Math.max(5, Math.min(60, val));
            input.value = val;
        }
    });
});

document.getElementById("main-start-btn").onclick = () => {
    const goal = document.querySelector('input[name="goal"]:checked');
    if(!goal) return alert("Select program");
    generatePlan(goal.value);
    renderWeekly();
};

function generatePlan(goal) {
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const pool = db[goal];
    const totalMin = parseInt(document.getElementById("user-duration").value) || 20;
    days.forEach(day => {
        weeklyPlan[day] = [];
        for(let i=0; i<5; i++) {
            let ex = pool[Math.floor(Math.random() * pool.length)];
            weeklyPlan[day].push({...ex, duration: (totalMin * 60) / 5});
        }
    });
}

function renderWeekly() {
    const container = document.getElementById("weekly-plan-container");
    container.innerHTML = `<h3 style="font-size:0.7rem; color:#666;">DAILY PLANS</h3>` + 
        Object.keys(weeklyPlan).map(day => `
            <div class="n-item" onclick="loadDay('${day}')" style="cursor:pointer; display:flex; justify-content:space-between;">
                ${day} <span style="color:var(--p-pink)">➔</span>
            </div>
        `).join("");
}

function loadDay(day) {
    workoutQueue = weeklyPlan[day];
    const container = document.getElementById("exercise-list-ul");
    container.innerHTML = workoutQueue.map((ex, i) => `<div class="n-item" onclick="startAt(${i})">${i+1}. ${ex.name}</div>`).join("");
    switchScreen("workout-hub");
}

/* TIMER LOGIKA */
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
    document.getElementById("youtube-player").src = ex.yt + "?autoplay=1&mute=1";

    const next = document.getElementById("next-ex-preview");
    next.innerText = (currentIdx + 1 < workoutQueue.length) ? "NEXT: " + workoutQueue[currentIdx+1].name : "LAST ONE!";
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
        alert("GOAL REACHED!");
        location.reload();
    }
}

/* KONTROLE */
document.getElementById("skip-btn").onclick = () => nextExercise();
document.getElementById("play-pause-btn").onclick = function() {
    isPaused = !isPaused;
    this.innerText = isPaused ? "RESUME" : "PAUSE";
};
document.getElementById("start-workout-btn").onclick = () => startAt(0);

function switchScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}
