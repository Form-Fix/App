const db = {
    menopause: {
        warmup: [{ name: "Shoulder Flossing", yt: "6IInLsc8w_k" }, { name: "Hip Circles", yt: "mI6S-6C6XyM" }],
        main: [
            { name: "Sumo Squat", yt: "9ZxQe1Zz_K8" }, { name: "Glute Bridge", yt: "wPM8icPu6H8" },
            { name: "Wall Push-ups", yt: "a6YHbv9sP9s" }, { name: "Bird Dog Stability", yt: "wiFNA3sqjCA" },
            { name: "Dead Bug Core", yt: "4XLEnwUr1gc" }, { name: "Clamshells", yt: "VlwBJE1wtOQ" },
            { name: "Superman Spine", yt: "z6PJn2z3120" }, { name: "Plank Hold", yt: "ASdvN_XEl_c" },
            { name: "Side Leg Raise", yt: "VlwBJE1wtOQ" }, { name: "Wall Sit Hold", yt: "y-wV4Venus" }
        ],
        coolDown: [{ name: "Box Breathing", yt: "8_86q8Y_Y6E" }, { name: "Child Pose", yt: "qYvYs83-7_M" }]
    },
    weightloss: {
        warmup: [{ name: "Jumping Jacks", yt: "1b98WR72isY" }, { name: "Active Plank", yt: "ASdvN_XEl_c" }],
        main: [
            { name: "Modified Burpees", yt: "dZgVxmf6jkA" }, { name: "Mountain Climbers", yt: "nmwgirgXLYM" },
            { name: "Bicycle Crunches", yt: "9v_f8A-7_Y" }, { name: "Squat Thrusts", yt: "gcNh17Ckjgg" },
            { name: "Reverse Lunges", yt: "wrwwXE_67p0" }, { name: "Plank Jacks", yt: "ASdvN_XEl_c" },
            { name: "High Knees", yt: "1b98WR72isY" }, { name: "Flutter Kicks", yt: "9v_f8A-7_Y" },
            { name: "Side To Side Hop", yt: "1b98WR72isY" }, { name: "Fast Feet", yt: "nmwgirgXLYM" }
        ],
        coolDown: [{ name: "Psoas Release", yt: "6_v-37p7S9o" }, { name: "Lizard Stretch", yt: "i7A_N_D_V8U" }]
    },
    joints: {
        warmup: [{ name: "Ankle Rolls", yt: "mI6S-6C6XyM" }, { name: "Wrist Mobility", yt: "E-9vVvM_Y_Y" }],
        main: [
            { name: "Isometric Wall Sit", yt: "y-wV4Venus" }, { name: "Straight Leg Raise", yt: "6IInLsc8w_k" },
            { name: "Wall Slides", yt: "42S_f9S_Uas" }, { name: "Scapular Push-ups", yt: "H33H65-0GIs" },
            { name: "Hip Bridge Hold", yt: "wPM8icPu6H8" }, { name: "Controlled Circles", yt: "mI6S-6C6XyM" },
            { name: "Gentle Knee Tucks", yt: "qYvYs83-7_M" }, { name: "Side Leg Lift", yt: "mI6S-6C6XyM" },
            { name: "Heel Raises", yt: "7m7p-08o0m0" }, { name: "Quad Contraction", yt: "y-wV4Venus" }
        ],
        coolDown: [{ name: "Gentle Cat-Cow", yt: "kqnua4rHVp8" }, { name: "Neck Release", yt: "I6A_N_D_V8U" }]
    },
    physio: {
        warmup: [{ name: "Thoracic Rotation", yt: "Y8ZInX-7O_o" }, { name: "Cat-Cow Flow", yt: "kqnua4rHVp8" }],
        main: [
            { name: "Bird Dog", yt: "wiFNA3sqjCA" }, { name: "Dead Bug", yt: "4XLEnwUr1gc" },
            { name: "Glute Bridge", yt: "wPM8icPu6H8" }, { name: "Pelvic Tilts", yt: "L_X6_mX0-8A" },
            { name: "Prone Y-Raise", yt: "lG7f1OAt6Xw" }, { name: "Scapular Squeeze", yt: "H33H65-0GIs" },
            { name: "Wall Slides", yt: "42S_f9S_Uas" }, { name: "Plank Stability", yt: "ASdvN_XEl_c" },
            { name: "Side Plank", yt: "XpS-C6E8Xps" }, { name: "Chin Tucks", yt: "6_v-37p7S9o"}
        ],
        coolDown: [{ name: "Child Pose", yt: "qYvYs83-7_M" }, { name: "Cobra Stretch", yt: "fOdrW7nfPrg" }]
    },
    office: {
        warmup: [{ name: "Neck Rolls", yt: "I6A_N_D_V8U" }, { name: "Shoulder Shrugs", yt: "7mPz8pGf8p8" }],
        main: [
            { name: "Chin Tucks", yt: "6_v-37p7S9o" }, { name: "Seated Twist", yt: "Is7S-H6hS_k" },
            { name: "Desk Stretch", yt: "M_0M9fWmsEw" }, { name: "Wrist Rolls", yt: "E-9vVvM_Y_Y" },
            { name: "Seated Leg Ext", yt: "6IInLsc8w_k" }, { name: "Chest Opener", yt: "M_0M9fWmsEw" },
            { name: "Upper Trap Stretch", yt: "I6A_N_D_V8U" }, { name: "Back Extension", yt: "fOdrW7nfPrg" },
            { name: "Seated Forward Fold", yt: "qYvYs83-7_M" }, { name: "Shoulder Squeeze", yt: "H33H65-0GIs" }
        ],
        coolDown: [{ name: "Eye Palming", yt: "8_86q8Y_Y6E" }, { name: "Standing Calf", yt: "7m7p-08o0m0" }]
    }
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
    window.scrollTo(0, 0);
}

function shuffle(array) { return array.sort(() => Math.random() - 0.5); }

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function generateWeeklyPlan(goal) {
    weeklyPlan = [];
    const cat = db[goal];
    const totalMin = parseInt(document.getElementById("user-duration").value) || 20;

    for (let i = 1; i <= 7; i++) {
        let session = [...cat.warmup, ...shuffle([...cat.main]), ...cat.coolDown];
        const durationPerEx = Math.floor((totalMin * 60) / session.length);
        weeklyPlan.push({ day: i, exercises: session.map(ex => ({ ...ex, duration: durationPerEx })) });
    }
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
    if (!g) return alert("Please select a program goal");
    generateWeeklyPlan(g.value);
    renderPlan();
    switchScreen("plan-screen");
};

function renderPlan() {
    document.getElementById("weekly-plan-list").innerHTML = weeklyPlan.map((d, i) => `
        <div class="n-item" onclick="loadDay(${i})" style="cursor:pointer; justify-content:space-between;">
            <span>DAY ${d.day}</span>
            <span style="color:var(--p-pink); font-size:0.7rem;">${d.exercises.length} EXERCISES ➔</span>
        </div>
    `).join("");
}

function loadDay(i) {
    workoutQueue = weeklyPlan[i].exercises;
    document.getElementById("exercise-list-ul").innerHTML = `<h3 style="margin-bottom:20px; color:#555;">DAY ${i+1} SESSION</h3>` + 
        workoutQueue.map((ex, idx) => `
            <div class="n-item" onclick="startAt(${idx})" style="cursor:pointer;">
                <div class="ex-thumb" style="display:flex; align-items:center; justify-content:center; background:#111; color:#333; font-size:0.5rem;">FF</div>
                <span>${idx+1}. ${ex.name}</span>
            </div>
        `).join("");
    switchScreen("workout-hub");
}

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
    document.getElementById("youtube-player").src = `https://www.youtube.com/embed/${ex.yt}?autoplay=1&mute=1&controls=0&modestbranding=1&playlist=${ex.yt}&loop=1`;
}

function runTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if(!isPaused) {
            timeLeft--;
            document.getElementById("exercise-timer").innerText = formatTime(timeLeft);
            const total = workoutQueue[currentIdx].duration;
            document.getElementById("progress-fill").style.width = ((total - timeLeft) / total * 100) + "%";
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

document.getElementById("skip-btn").onclick = () => {
    if(currentIdx + 1 < workoutQueue.length) startAt(currentIdx + 1);
};

document.getElementById("exit-workout-btn").onclick = () => {
    if(confirm("Exit session?")) {
        clearInterval(timer);
        document.getElementById("youtube-player").src = "";
        switchScreen("workout-hub");
    }
};

document.getElementById("start-workout-btn").onclick = () => startAt(0);
