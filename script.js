const db = {
    menopause: {
        warmup: [
            { name: "Shoulder Flossing", yt: "6IInLsc8w_k" },
            { name: "Hip Circles", yt: "mI6S-6C6XyM" }
        ],
        main: [
            { name: "Sumo Squat", yt: "9ZxQe1Zz_K8" }, 
            { name: "Glute Bridge", yt: "wPM8icPu6H8", img: "img/glute-bridge.png" },
            { name: "Wall Push-ups", yt: "a6YHbv9sP9s" },
            { name: "Bird Dog Stability", yt: "wiFNA3sqjCA" },
            { name: "Dead Bug Core", yt: "4XLEnwUr1gc", img: "img/dead-bug.png" },
            { name: "Clamshells", yt: "VlwBJE1wtOQ" },
            { name: "Superman Spine", yt: "z6PJn2z3120" },
            { name: "Plank Hold", yt: "ASdvN_XEl_c" },
            { name: "Side Leg Raise", yt: "VlwBJE1wtOQ" },
            { name: "Wall Sit Hold", yt: "y-wV4Venus" }
        ],
        coolDown: [
            { name: "Box Breathing", yt: "8_86q8Y_Y6E" },
            { name: "Child Pose", yt: "qYvYs83-7_M" }
        ]
    },
    weightloss: {
        warmup: [
            { name: "Jumping Jacks", yt: "1b98WR72isY" },
            { name: "Active Plank", yt: "ASdvN_XEl_c" }
        ],
        main: [
            { name: "Modified Burpees", yt: "dZgVxmf6jkA" },
            { name: "Mountain Climbers", yt: "nmwgirgXLYM" },
            { name: "Bicycle Crunches", yt: "9v_f8A-7_Y" },
            { name: "Squat Thrusts", yt: "gcNh17Ckjgg" },
            { name: "Reverse Lunges", yt: "wrwwXE_67p0" },
            { name: "Plank Jacks", yt: "ASdvN_XEl_c" },
            { name: "High Knees", yt: "1b98WR72isY" },
            { name: "Flutter Kicks", yt: "9v_f8A-7_Y" },
            { name: "Side To Side Hop", yt: "1b98WR72isY" },
            { name: "Fast Feet", yt: "nmwgirgXLYM" }
        ],
        coolDown: [
            { name: "Psoas Release", yt: "6_v-37p7S9o" },
            { name: "Lizard Stretch", yt: "i7A_N_D_V8U" }
        ]
    },
    joints: {
        warmup: [
            { name: "Ankle Rolls", yt: "mqz6bhQFJe8" },
            { name: "Wrist Mobility", yt: "E-9vVvM_Y_Y" }
        ],
        main: [
            { name: "Isometric Wall Sit", yt: "y-wV4Venus" },
            { name: "Straight Leg Raise", yt: "6IInLsc8w_k" },
            { name: "Wall Slides", yt: "42S_f9S_Uas" },
            { name: "Scapular Push-ups", yt: "H33H65-0GIs" },
            { name: "Hip Bridge Hold", yt: "wPM8icPu6H8", img: "img/glute-bridge.png" },
            { name: "Controlled Circles", yt: "mI6S-6C6XyM" },
            { name: "Gentle Knee Tucks", yt: "qYvYs83-7_M" },
            { name: "Side Leg Lift", yt: "mI6S-6C6XyM" },
            { name: "Heel Raises", yt: "7m7p-08o0m0" },
            { name: "Quad Contraction", yt: "y-wV4Venus" }
        ],
        coolDown: [
            { name: "Gentle Cat-Cow", yt: "kqnua4rHVp8" },
            { name: "Neck Release", yt: "I6A_N_D_V8U" }
        ]
    },
    physio: {
        warmup: [
            { name: "Thoracic Rotation", yt: "Y8ZInX-7O_o" },
            { name: "Cat-Cow Flow", yt: "kqnua4rHVp8" }
        ],
        main: [
            { name: "Bird Dog", yt: "wiFNA3sqjCA" },
            { name: "Dead Bug", yt: "4XLEnwUr1gc", img: "img/dead-bug.png" },
            { name: "Glute Bridge", yt: "wPM8icPu6H8", img: "img/glute-bridge.png" },
            { name: "Pelvic Tilts", yt: "L_X6_mX0-8A" },
            { name: "Prone Y-Raise", yt: "lG7f1OAt6Xw" },
            { name: "Scapular Squeeze", yt: "H33H65-0GIs" },
            { name: "Wall Slides", yt: "42S_f9S_Uas" },
            { name: "Plank Stability", yt: "ASdvN_XEl_c" },
            { name: "Side Plank", yt: "XpS-C6E8Xps" },
            { name: "Chin Tucks", yt: "6_v-37p7S9o"}
        ],
        coolDown: [
            { name: "Child Pose", yt: "qYvYs83-7_M" },
            { name: "Cobra Stretch", yt: "fOdrW7nfPrg" }
        ]
    },
    office: {
        warmup: [
            { name: "Neck Rolls", yt: "I6A_N_D_V8U" },
            { name: "Shoulder Shrugs", yt: "7mPz8pGf8p8" }
        ],
        main: [
            { name: "Chin Tucks", yt: "6_v-37p7S9o" },
            { name: "Seated Twist", yt: "Is7S-H6hS_k" },
            { name: "Desk Stretch", yt: "M_0M9fWmsEw" },
            { name: "Wrist Rolls", yt: "E-9vVvM_Y_Y" },
            { name: "Seated Leg Ext", yt: "6IInLsc8w_k" },
            { name: "Chest Opener", yt: "M_0M9fWmsEw" },
            { name: "Upper Trap Stretch", yt: "I6A_N_D_V8U" },
            { name: "Back Extension", yt: "fOdrW7nfPrg" },
            { name: "Seated Forward Fold", yt: "qYvYs83-7_M" },
            { name: "Shoulder Squeeze", yt: "H33H65-0GIs" }
        ],
        coolDown: [
            { name: "Eye Palming", yt: "8_86q8Y_Y6E" },
            { name: "Standing Calf", yt: "7m7p-08o0m0" }
        ]
    }
};

let weeklyPlan = [];
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;
let isPaused = false;

// Helpers
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Logic
function generateWeeklyPlan(goal) {
    weeklyPlan = [];
    const cat = db[goal];
    const totalMin = parseInt(document.getElementById("user-duration").value) || 20;

    for (let i = 1; i <= 7; i++) {
        let session = [
            ...cat.warmup, 
            ...shuffle([...cat.main]), 
            ...cat.coolDown
        ];
        const durationPerEx = Math.floor((totalMin * 60) / session.length);
        weeklyPlan.push({ 
            day: i, 
            exercises: session.map(ex => ({ ...ex, duration: durationPerEx })) 
        });
    }
}

// UI Handlers
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

document.getElementById("exit-workout-btn").onclick = () => {
    if(confirm("Exit this session and return to exercise list?")) {
        clearInterval(timer);
        document.getElementById("youtube-player").src = "";
        switchScreen("workout-hub");
    }
};

document.getElementById("start-workout-btn").onclick = () => {
    startAt(0);
};

function renderPlan() {
    document.getElementById("weekly-plan-list").innerHTML = weeklyPlan.map((d, i) => `
        <div class="n-item" onclick="loadDay(${i})" style="cursor:pointer; justify-content:space-between;">
            DAY ${d.day} <span style="color:#555;">${d.exercises.length} EXERCISES ➔</span>
        </div>
    `).join("");
}

function loadDay(i) {
    workoutQueue = weeklyPlan[i].exercises;
    document.getElementById("exercise-list-ul").innerHTML = `<h3 style="margin-bottom:20px; color:#555;">DAY ${i+1} PROGRAM</h3>` + 
        workoutQueue.map((ex, idx) => `
            <div class="n-item" onclick="startAt(${idx})" style="cursor:pointer;">
                ${ex.img ? `<img src="${ex.img}" class="ex-thumb">` : `<div class="ex-thumb" style="display:flex; align-items:center; justify-content:center; background:#1a1a1a; color:#333; font-size:0.6rem;">NO IMAGE</div>`}
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
    const ytId = ex.yt;
    document.getElementById("youtube-player").src = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&rel=0&playlist=${ytId}&loop=1&modestbranding=1`;
    const dashThumb = document.getElementById("dashboard-thumb");
    if(ex.img) {
        dashThumb.src = ex.img;
        dashThumb.style.display = "block";
    } else {
        dashThumb.style.display = "none";
    }
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
                if(currentIdx + 1 < workoutQueue.length) {
                    startAt(currentIdx + 1);
                } else {
                    clearInterval(timer);
                    alert("SESSION COMPLETE! GREAT WORK.");
                    switchScreen("plan-screen");
                }
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

function switchScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}
