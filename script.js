const db = {
    physio: [
        { name: "Cat-Cow", yt: "kqnua4rHVp8" },
        { name: "Bird Dog", yt: "wiFNA3sqjCA" },
        { name: "Glute Bridge", yt: "wPM8icPu6H8" },
        { name: "Dead Bug", yt: "g_byZ__EisM" },
        { name: "Child's Pose", yt: "qYvYs83-7_M" },
        { name: "Scapular Push-ups", yt: "H33H65-0GIs" },
        { name: "Thoracic Rotation", yt: "Y8ZInX-7O_o" },
        { name: "Pelvic Tilts", yt: "L_X6_mX0-8A" },
        { name: "Clamshells", yt: "mI6S-6C6XyM" },
        { name: "Wall Slides", yt: "42S_f9S_Uas" },
        { name: "Prone Y-Raise", yt: "lG7f1OAt6Xw" },
        { name: "Cervical Retraction", yt: "6_v-37p7S9o" }
    ],
    office: [
        { name: "Neck Stretch", yt: "I6A_N_D_V8U" },
        { name: "Wrist Rolls", yt: "E-9vVvM_Y_Y" },
        { name: "Seated Twist", yt: "Is7S-H6hS_k" },
        { name: "Shoulder Shrugs", yt: "7mPz8pGf8p8" },
        { name: "Desk Chest Stretch", yt: "M_0M9fWmsEw" },
        { name: "Seated Leg Extensions", yt: "6IInLsc8w_k" },
        { name: "Eye Palming", yt: "8_86q8Y_Y6E" },
        { name: "Chin Tucks", yt: "6_v-37p7S9o" },
        { name: "Finger Stretches", yt: "2Zk_6R2yP5c" },
        { name: "Standing Calf Stretch", yt: "7m7p-08o0m0" },
        { name: "Spinal Roll Down", yt: "qYvYs83-7_M" },
        { name: "Upper Trap Stretch", yt: "I6A_N_D_V8U" }
    ],
    strength: [
        { name: "Push-ups", yt: "IODxDxX7oi4" },
        { name: "Squats", yt: "gcNh17Ckjgg" },
        { name: "Plank", yt: "ASdvN_XEl_c" },
        { name: "Lunges", yt: "wrwwXE_67p0" },
        { name: "Mountain Climbers", yt: "nmwgirgXLYM" },
        { name: "Burpees", yt: "dZgVxmf6jkA" },
        { name: "Diamond Push-ups", yt: "J0DnGzESSHk" },
        { name: "Jumping Jacks", yt: "1b98WR72isY" },
        { name: "Hollow Body Hold", yt: "LlV7W_N-G_E" },
        { name: "Superman", yt: "z6PJn2z3120" },
        { name: "Side Plank", yt: "XpS-C6E8Xps" },
        { name: "Tricep Dips", yt: "0326dbS-8_o" },
        { name: "Bicycle Crunches", yt: "9v_f8A-7_Y" },
        { name: "Wall Sit", yt: "y-wV4Venus" }
    ],
    yoga: [
        { name: "Downward Dog", yt: "j97SSGzqhxQ" },
        { name: "Cobra Pose", yt: "fOdrW7nfPrg" },
        { name: "Warrior I", yt: "osXj67EIsyM" },
        { name: "Warrior II", yt: "4Ejz7IgAnlU" },
        { name: "Tree Pose", yt: "wdln9qWYloU" },
        { name: "Pigeon Pose", yt: "W2P6L6mG7S8" },
        { name: "Triangle Pose", yt: "S6S7G-O-X60" },
        { name: "Child’s Pose", yt: "qYvYs83-7_M" },
        { name: "Bridge Pose", yt: "wPM8icPu6H8" },
        { name: "Cat-Cow Flow", yt: "kqnua4rHVp8" },
        { name: "Plank Pose", yt: "ASdvN_XEl_c" },
        { name: "Boat Pose", yt: "8S7_G_O-X60" }
    ],
    stretch: [
        { name: "Hamstring Stretch", yt: "SshM9770mX0" },
        { name: "Butterfly Stretch", yt: "MdX6pL-Z-O4" },
        { name: "Quad Stretch", yt: "1oI9q60-m8A" },
        { name: "Cobra Stretch", yt: "fOdrW7nfPrg" },
        { name: "Lizard Stretch", yt: "i7A_N_D_V8U" },
        { name: "Shoulder Stretch", yt: "mI6S-H6hS_k" },
        { name: "Hip Flexor Stretch", yt: "6_v-37p7S9o" },
        { name: "Spinal Twist", yt: "S6S7G-O-X60" },
        { name: "Toe Touch", yt: "MdX6pL-Z-O4" },
        { name: "Tricep Stretch", yt: "0326dbS-8_o" },
        { name: "Glute Stretch", yt: "wPM8icPu6H8" },
        { name: "Calf Stretch", yt: "7m7p-08o0m0" }
    ],
    pilates: [
        { name: "The Hundred", yt: "lCg_gh_fppI" },
        { name: "Roll Up", yt: "fK26MvL1sK4" },
        { name: "Single Leg Stretch", yt: "68O8-X8Xm8w" },
        { name: "Double Leg Stretch", yt: "5_6pL8Xm8A" },
        { name: "Criss Cross", yt: "XpS-C6E8Xps" },
        { name: "Leg Circles", yt: "8S7_G_O-X60" },
        { name: "Swan Dive", yt: "fOdrW7nfPrg" },
        { name: "Swimming", yt: "z6PJn2z3120" },
        { name: "The Saw", yt: "S6S7G-O-X60" },
        { name: "Spine Stretch Forward", yt: "qYvYs83-7_M" },
        { name: "Plank Leg Pull", yt: "ASdvN_XEl_c" },
        { name: "Side Kick Series", yt: "mI6S-6C6XyM" }
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

// Fisher-Yates shuffle za potpuno mešanje niza
function shuffle(array) {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

/* UI KONTROLE */
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

/* GENERATE PLAN LOGIKA - FIX: MIN 10 VEŽBI I BEZ PONAVLJANJA */
document.getElementById("main-start-btn").onclick = () => {
    const goalInput = document.querySelector('input[name="goal"]:checked');
    if (!goalInput) return alert("Please select a program");
    
    generateWeeklyPlan(goalInput.value);
    renderPlanScreen();
    switchScreen("plan-screen");
};

function generateWeeklyPlan(goal) {
    weeklyPlan = [];
    const pool = db[goal];
    const totalMin = parseInt(document.getElementById("user-duration").value) || 20;

    for (let i = 1; i <= 7; i++) {
        // 1. Uzmi sve vežbe iz bazena i promešaj ih
        let shuffled = shuffle([...pool]);
        
        // 2. Osiguraj minimalno 10 vežbi. 
        // Ako je bazen veći (npr 12), uzeće svih 12. Ako je manji, uzeće koliko ima.
        // Sa trenutnom bazom uzeće 10-12 UNIKATNIH vežbi.
        let selectedExercises = shuffled; 

        const numExercises = selectedExercises.length;
        const durationPerEx = Math.floor((totalMin * 60) / numExercises);

        let dayExercises = selectedExercises.map(ex => ({
            ...ex,
            duration: durationPerEx
        }));

        weeklyPlan.push({ dayNumber: i, exercises: dayExercises });
    }
}

function renderPlanScreen() {
    const container = document.getElementById("weekly-plan-list");
    if(!container) return;
    
    container.innerHTML = weeklyPlan.map((day, idx) => `
        <div class="n-item" onclick="loadDay(${idx})" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>DAY ${day.dayNumber}</span>
            <span style="font-size:0.7rem; color:#666;">${day.exercises.length} EXERCISES</span>
            <span style="color:var(--p-pink)">➔</span>
        </div>
    `).join("");
}

function loadDay(idx) {
    workoutQueue = weeklyPlan[idx].exercises;
    const container = document.getElementById("exercise-list-ul");
    if(!container) return;

    container.innerHTML = `<h3 style="margin-bottom:15px; font-size:0.8rem; color:#666; text-transform:uppercase;">DAY ${idx+1} EXERCISES</h3>` + 
        workoutQueue.map((ex, i) => `<div class="n-item" onclick="startAt(${i})"><span style="color:var(--p-pink); margin-right:10px;">${i+1}.</span> ${ex.name}</div>`).join("");
    switchScreen("workout-hub");
}

/* TIMER ENGINE */
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

/* KONTROLE */
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
