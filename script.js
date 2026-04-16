const db = {
    menopause: {
        warmup: [{name: "Shoulder Flossing", yt: "6IInLsc8w_k"}],
        main: [
            {name: "Sumo Squat (Bone Health)", yt: "gcNh17Ckjgg"},
            {name: "Isometric Glute Bridge", yt: "wPM8icPu6H8", img: "img/glute-bridge.png"},
            {name: "Wall Push-ups", yt: "H33H65-0GIs"},
            {name: "Bird Dog Stability", yt: "wiFNA3sqjCA"},
            {name: "Dead Bug Core", yt: "g_byZ__EisM"}
        ],
        coolDown: [{name: "Box Breathing", yt: "8_86q8Y_Y6E"}]
    },
    weightloss: {
        warmup: [{name: "Jumping Jacks", yt: "1b98WR72isY"}],
        main: [
            {name: "Modified Burpees", yt: "dZgVxmf6jkA"},
            {name: "Mountain Climbers", yt: "nmwgirgXLYM"},
            {name: "Bicycle Crunches", yt: "9v_f8A-7_Y"},
            {name: "Plank Jacks", yt: "ASdvN_XEl_c"},
            {name: "Reverse Lunges", yt: "wrwwXE_67p0"}
        ],
        coolDown: [{name: "Psoas Release", yt: "6_v-37p7S9o"}]
    },
    joints: {
        warmup: [{name: "Wrist Rolls", yt: "E-9vVvM_Y_Y"}],
        main: [
            {name: "Isometric Wall Sit", yt: "y-wV4Venus"},
            {name: "Straight Leg Raise", yt: "6IInLsc8w_k"},
            {name: "Wall Slides", yt: "42S_f9S_Uas"},
            {name: "Clamshells", yt: "mI6S-6C6XyM"},
            {name: "Heel Raises (Slow)", yt: "7m7p-08o0m0"}
        ],
        coolDown: [{name: "Child's Pose", yt: "qYvYs83-7_M"}]
    },
    physio: {
        warmup: [{name: "Cat-Cow Flow", yt: "kqnua4rHVp8"}],
        main: [
            {name: "Bird Dog Stability", yt: "wiFNA3sqjCA"},
            {name: "Dead Bug Core", yt: "g_byZ__EisM"},
            {name: "Glute Bridge", yt: "wPM8icPu6H8", img: "img/glute-bridge.png"}
        ],
        coolDown: [{name: "Child's Pose", yt: "qYvYs83-7_M"}]
    },
    office: {
        warmup: [{name: "Neck Stretch", yt: "I6A_N_D_V8U"}],
        main: [{name: "Seated Twist", yt: "Is7S-H6hS_k"}, {name: "Chin Tucks", yt: "6_v-37p7S9o"}, {name: "Desk Stretch", yt: "M_0M9fWmsEw"}],
        coolDown: [{name: "Eye Palming", yt: "8_86q8Y_Y6E"}]
    },
    strength: {
        warmup: [{name: "Active Lunges", yt: "wrwwXE_67p0"}],
        main: [{name: "Push-ups", yt: "IODxDxX7oi4"}, {name: "Squats", yt: "gcNh17Ckjgg"}, {name: "Plank", yt: "ASdvN_XEl_c"}],
        coolDown: [{name: "Cobra Stretch", yt: "fOdrW7nfPrg"}]
    }
};

let weeklyPlan = [];
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;
let isPaused = false;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateWeeklyPlan(goal) {
    weeklyPlan = [];
    const cat = db[goal];
    const totalMin = parseInt(document.getElementById("user-duration").value) || 20;

    for (let i = 1; i <= 7; i++) {
        let session = [...shuffle([...cat.warmup]).slice(0, 1), ...shuffle([...cat.main]), ...cat.coolDown];
        const durationPerEx = Math.floor((totalMin * 60) / session.length);
        weeklyPlan.push({ day: i, exercises: session.map(ex => ({ ...ex, duration: durationPerEx })) });
    }
}

// UI HANDLERS
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
    if (!g) return alert("Select program");
    generateWeeklyPlan(g.value);
    renderPlan();
    switchScreen("plan-screen");
};

function renderPlan() {
    document.getElementById("weekly-plan-list").innerHTML = weeklyPlan.map((d, i) => `
        <div class="n-item" onclick="loadDay(${i})" style="cursor:pointer; justify-content:space-between;">
            DAY ${d.day} <span>${d.exercises.length} EXERCISES ➔</span>
        </div>
    `).join("");
}

function loadDay(i) {
    workoutQueue = weeklyPlan[i].exercises;
    document.getElementById("exercise-list-ul").innerHTML = `<h3 style="margin-bottom:15px; color:#555;">DAY ${i+1}</h3>` + 
        workoutQueue.map((ex, idx) => `
            <div class="n-item" onclick="startAt(${idx})" style="cursor:pointer;">
                ${ex.img ? `<img src="${ex.img}" class="ex-thumb">` : `<div class="ex-thumb" style="background:#222; display:flex; align-items:center; justify-content:center; font-size:0.6rem;">NO IMG</div>`}
                <span>${idx+1}. ${ex.name}</span>
            </div>
        `).join("");
    switchScreen("workout-hub");
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
    document.getElementById("exercise-timer").innerText = `${Math.floor(timeLeft/60).toString().padStart(2,'0')}:${(timeLeft%60).toString().padStart(2,'0')}`;
    document.getElementById("current-ex-name").innerText = ex.name;
    document.getElementById("youtube-player").src = `https://www.youtube.com/embed/${ex.yt}?autoplay=1&mute=1&rel=0&modestbranding=1`;
}

function runTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if(!isPaused) {
            timeLeft--;
            updateDashboard();
            document.getElementById("progress-fill").style.width = ((workoutQueue[currentIdx].duration - timeLeft) / workoutQueue[currentIdx].duration * 100) + "%";
            if(timeLeft <= 0) {
                if(currentIdx + 1 < workoutQueue.length) startAt(currentIdx + 1);
                else { clearInterval(timer); alert("SESSION COMPLETE!"); switchScreen("plan-screen"); }
            }
        }
    }, 1000);
}

document.getElementById("play-pause-btn").onclick = function() {
    isPaused = !isPaused;
    this.innerText = isPaused ? "RESUME" : "PAUSE";
};

document.getElementById("skip-btn").onclick = () => { if(currentIdx+1 < workoutQueue.length) startAt(currentIdx+1); };

function switchScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}
