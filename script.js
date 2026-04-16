const db = {
    physio: {
        warmup: [
            { name: "Thoracic Rotation", yt: "Y8ZInX-7O_o" },
            { name: "Cat-Cow Flow", yt: "kqnua4rHVp8" }
        ],
        main: [
            { name: "Bird Dog", yt: "wiFNA3sqjCA", img: "img/bird-dog.png" },
            { name: "Dead Bug", yt: "4XLEnwUr1gc", img: "img/dead-bug.png" },
            { name: "Glute Bridge", yt: "wPM8icPu6H8", img: "img/glute-bridge.png" },
            { name: "Wall Push-ups", yt: "a6YHbv9sP9s", img: "img/wall-pushups.png" },
            { name: "Wall Slides", yt: "42S_f9S_Uas" },
            { name: "Plank Stability", yt: "ASdvN_XEl_c", img: "img/plank.png" }
        ],
        coolDown: [{ name: "Child Pose", yt: "qYvYs83-7_M" }]
    },
    weightloss: {
        warmup: [{ name: "Jumping Jacks", yt: "1b98WR72isY" }],
        main: [
            { name: "Mountain Climbers", yt: "nmwgirgXLYM" },
            { name: "Bicycle Crunches", yt: "9v_f8A-7_Y" },
            { name: "Reverse Lunges", yt: "wrwwXE_67p0" },
            { name: "Burpees", yt: "dZgVxmf6jkA" }
        ],
        coolDown: [{ name: "Lizard Stretch", yt: "i7A_N_D_V8U" }]
    },
    menopause: {
        warmup: [{ name: "Hip Circles", yt: "mI6S-6C6XyM" }],
        main: [
            { name: "Sumo Squat", yt: "9ZxQe1Zz_K8", img: "img/sumo-squat.png" },
            { name: "Glute Bridge", yt: "wPM8icPu6H8", img: "img/glute-bridge.png" },
            { name: "Dead Bug", yt: "4XLEnwUr1gc", img: "img/dead-bug.png" }
        ],
        coolDown: [{ name: "Box Breathing", yt: "8_86q8Y_Y6E" }]
    },
    joints: {
        warmup: [{ name: "Wrist Mobility", yt: "E-9vVvM_Y_Y" }],
        main: [
            { name: "Wall Sit", yt: "y-wV4Venus", img: "img/wall-sit.png" },
            { name: "Heel Raises", yt: "7m7p-08o0m0" }
        ],
        coolDown: [{ name: "Cat-Cow", yt: "kqnua4rHVp8" }]
    },
    office: {
        warmup: [{ name: "Neck Rolls", yt: "I6A_N_D_V8U" }],
        main: [
            { name: "Seated Twist", yt: "Is7S-H6hS_k" },
            { name: "Desk Stretch", yt: "M_0M9fWmsEw" }
        ],
        coolDown: [{ name: "Eye Palming", yt: "8_86q8Y_Y6E" }]
    }
};

let weeklyPlan = [];
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;
let isPaused = false;

function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function switchScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

document.querySelectorAll(".num-btn").forEach(btn => {
    btn.onclick = () => {
        const input = document.getElementById(btn.dataset.target);
        if (btn.dataset.type === "list") {
            const lvls = ["BEGINNER", "INTERMEDIATE", "PRO"];
            let idx = (lvls.indexOf(input.value) + parseInt(btn.dataset.step) + 3) % 3;
            input.value = lvls[idx];
        } else {
            input.value = Math.max(5, parseInt(input.value) + parseInt(btn.dataset.step));
        }
    };
});

document.getElementById("main-start-btn").onclick = () => {
    const g = document.querySelector('input[name="goal"]:checked');
    if (!g) return alert("Select goal");
    generatePlan(g.value);
    renderPlan();
    switchScreen("plan-screen");
};

function generatePlan(goal) {
    weeklyPlan = [];
    const cat = db[goal];
    const duration = parseInt(document.getElementById("user-duration").value) || 20;
    for (let i = 1; i <= 7; i++) {
        let session = [...cat.warmup, ...cat.main.sort(() => Math.random() - 0.5), ...cat.coolDown];
        let dPerEx = Math.floor((duration * 60) / session.length);
        weeklyPlan.push({ day: i, exercises: session.map(ex => ({ ...ex, duration: dPerEx })) });
    }
}

function renderPlan() {
    document.getElementById("weekly-plan-list").innerHTML = weeklyPlan.map((d, i) => `
        <div class="n-item" onclick="loadDay(${i})" style="cursor:pointer; justify-content:space-between;">
            DAY ${d.day} <span style="opacity:0.5;">${d.exercises.length} EXERCISES ➔</span>
        </div>
    `).join("");
}

function loadDay(i) {
    workoutQueue = weeklyPlan[i].exercises;
    document.getElementById("exercise-list-ul").innerHTML = `<h3 style="margin-bottom:20px; opacity:0.6;">DAY ${i+1} PROGRAM</h3>` + 
        workoutQueue.map((ex, idx) => `
            <div class="n-item" onclick="startAt(${idx})" style="cursor:pointer;">
                ${ex.img ? `<img src="${ex.img}" class="ex-thumb">` : `<div class="ex-thumb" style="background:#1a1a1a;"></div>`}
                <span>${idx+1}. ${ex.name}</span>
            </div>
        `).join("");
    switchScreen("workout-hub");
}

document.getElementById("start-workout-btn").onclick = () => startAt(0);

function startAt(i) {
    currentIdx = i;
    timeLeft = workoutQueue[i].duration;
    isPaused = false;
    document.getElementById("play-pause-btn").innerText = "PAUSE";
    switchScreen("dashboard");
    updateDashboard();
    runTimer();
}

function updateDashboard() {
    const ex = workoutQueue[currentIdx];
    document.getElementById("exercise-timer").innerText = formatTime(timeLeft);
    document.getElementById("current-ex-name").innerText = ex.name;
    document.getElementById("youtube-player").src = `https://www.youtube.com/embed/${ex.yt}?autoplay=1&mute=1&playlist=${ex.yt}&loop=1`;
    const dashThumb = document.getElementById("dashboard-thumb");
    if(ex.img) { dashThumb.src = ex.img; dashThumb.style.display = "block"; } else { dashThumb.style.display = "none"; }
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

document.getElementById("play-pause-btn").onclick = () => {
    isPaused = !isPaused;
    document.getElementById("play-pause-btn").innerText = isPaused ? "RESUME" : "PAUSE";
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
