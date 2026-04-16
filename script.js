const db = {
    menopause: { warmup: [{ name: "Shoulder Flossing", yt: "6IInLsc8w_k" }], main: [{ name: "Sumo Squat", yt: "9ZxQe1Zz_K8" }, { name: "Glute Bridge", yt: "wPM8icPu6H8" }], coolDown: [{ name: "Box Breathing", yt: "8_86q8Y_Y6E" }] },
    weightloss: { warmup: [{ name: "Jumping Jacks", yt: "1b98WR72isY" }], main: [{ name: "Modified Burpees", yt: "dZgVxmf6jkA" }, { name: "Mountain Climbers", yt: "nmwgirgXLYM" }], coolDown: [{ name: "Psoas Release", yt: "6_v-37p7S9o" }] },
    joints: { warmup: [{ name: "Ankle Rolls", yt: "mI6S-6C6XyM" }], main: [{ name: "Isometric Wall Sit", yt: "y-wV4Venus" }, { name: "Straight Leg Raise", yt: "6IInLsc8w_k" }], coolDown: [{ name: "Gentle Cat-Cow", yt: "kqnua4rHVp8" }] },
    physio: { warmup: [{ name: "Thoracic Rotation", yt: "Y8ZInX-7O_o" }], main: [{ name: "Bird Dog", yt: "wiFNA3sqjCA" }, { name: "Dead Bug", yt: "4XLEnwUr1gc" }], coolDown: [{ name: "Child Pose", yt: "qYvYs83-7_M" }] },
    office: { warmup: [{ name: "Neck Rolls", yt: "I6A_N_D_V8U" }], main: [{ name: "Chin Tucks", yt: "6_v-37p7S9o" }, { name: "Seated Twist", yt: "Is7S-H6hS_k" }], coolDown: [{ name: "Eye Palming", yt: "8_86q8Y_Y6E" }] }
};

let weeklyPlan = [];
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;
let isPaused = false;

function switchScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

document.querySelectorAll(".num-btn").forEach(btn => {
    btn.onclick = () => {
        const input = document.getElementById(btn.dataset.target);
        if (btn.dataset.type === "list") {
            const lvls = ["BEGINNER", "INTERMEDIATE", "PRO"];
            let idx = (lvls.indexOf(input.value) + parseInt(btn.dataset.step) + 3) % 3;
            input.value = lvls[idx];
        } else {
            let val = parseInt(input.value) + parseInt(btn.dataset.step);
            input.value = val < 5 ? 5 : val;
        }
    };
});

document.getElementById("main-start-btn").onclick = () => {
    const g = document.querySelector('input[name="goal"]:checked');
    if (!g) return alert("Select a program!");
    generateWeeklyPlan(g.value);
    renderPlan();
    switchScreen("plan-screen");
};

function generateWeeklyPlan(goal) {
    const cat = db[goal];
    const totalMin = parseInt(document.getElementById("user-duration").value) || 20;
    weeklyPlan = [];
    for (let i = 1; i <= 7; i++) {
        let session = [...cat.warmup, ...cat.main, ...cat.coolDown];
        let dur = Math.floor((totalMin * 60) / session.length);
        weeklyPlan.push({ day: i, exercises: session.map(ex => ({ ...ex, duration: dur })) });
    }
}

function renderPlan() {
    document.getElementById("weekly-plan-list").innerHTML = weeklyPlan.map((d, i) => `
        <div class="n-item" onclick="loadDay(${i})" style="cursor:pointer; justify-content:space-between;">
            DAY ${d.day} <span style="color:var(--p-pink)">VIEW ➔</span>
        </div>
    `).join("");
}

function loadDay(i) {
    workoutQueue = weeklyPlan[i].exercises;
    document.getElementById("exercise-list-ul").innerHTML = workoutQueue.map((ex, idx) => `
        <div class="n-item"><span>${idx+1}. ${ex.name}</span></div>
    `).join("");
    switchScreen("workout-hub");
}

document.getElementById("start-workout-btn").onclick = () => startAt(0);

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
    document.getElementById("youtube-player").src = `https://www.youtube.com/embed/${ex.yt}?autoplay=1&mute=1&controls=0&modestbranding=1`;
}

function runTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if(!isPaused) {
            timeLeft--;
            document.getElementById("exercise-timer").innerText = formatTime(timeLeft);
            let total = workoutQueue[currentIdx].duration;
            document.getElementById("progress-fill").style.width = ((total - timeLeft) / total * 100) + "%";
            if(timeLeft <= 0) {
                if(currentIdx + 1 < workoutQueue.length) startAt(currentIdx + 1);
                else { clearInterval(timer); alert("Done!"); switchScreen("plan-screen"); }
            }
        }
    }, 1000);
}

document.getElementById("play-pause-btn").onclick = function() {
    isPaused = !isPaused;
    this.innerText = isPaused ? "RESUME" : "PAUSE";
};

document.getElementById("skip-btn").onclick = () => {
    if(currentIdx + 1 < workoutQueue.length) startAt(currentIdx + 1);
};

document.getElementById("exit-workout-btn").onclick = () => {
    if(confirm("Exit?")) {
        clearInterval(timer);
        document.getElementById("youtube-player").src = "";
        switchScreen("workout-hub");
    }
};
