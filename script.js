/**
 * FORM & FIX PRO - KINEZIOLOŠKI ALGORITAM (PREMIUM MODEL)
 * Logika: Dinamičko generisanje plana zasnovano na strukturi:
 * Zagrejvanje (20%) -> Glavni deo (60%) -> Istezanje/Oporavak (20%)
 */

const db = {
    physio: {
        warmup: [
            { name: "Cat-Cow Flow", yt: "kqnua4rHVp8" },
            { name: "Thoracic Rotation", yt: "Y8ZInX-7O_o" },
            { name: "Neck CARs", yt: "I6A_N_D_V8U" }
        ],
        main: [
            { name: "Bird Dog Stability", yt: "wiFNA3sqjCA" },
            { name: "Glute Bridge", yt: "wPM8icPu6H8" },
            { name: "Dead Bug Core", yt: "g_byZ__EisM" },
            { name: "Scapular Push-ups", yt: "H33H65-0GIs" },
            { name: "Wall Slides", yt: "42S_f9S_Uas" },
            { name: "Prone Y-Raise", yt: "lG7f1OAt6Xw" },
            { name: "Pelvic Tilts", yt: "L_X6_mX0-8A" },
            { name: "Clamshells", yt: "mI6S-6C6XyM" }
        ],
        coolDown: [
            { name: "Child's Pose", yt: "qYvYs83-7_M" },
            { name: "Cobra Stretch", yt: "fOdrW7nfPrg" }
        ]
    },
    strength: {
        warmup: [
            { name: "Jumping Jacks", yt: "1b98WR72isY" },
            { name: "Dynamic Lunges", yt: "wrwwXE_67p0" }
        ],
        main: [
            { name: "Standard Push-ups", yt: "IODxDxX7oi4" },
            { name: "Air Squats", yt: "gcNh17Ckjgg" },
            { name: "Plank Hold", yt: "ASdvN_XEl_c" },
            { name: "Mountain Climbers", yt: "nmwgirgXLYM" },
            { name: "Burpees", yt: "dZgVxmf6jkA" },
            { name: "Diamond Push-ups", yt: "J0DnGzESSHk" },
            { name: "Hollow Body Hold", yt: "LlV7W_N-G_E" },
            { name: "Superman Raise", yt: "z6PJn2z3120" },
            { name: "Side Plank", yt: "XpS-C6E8Xps" },
            { name: "Tricep Dips", yt: "0326dbS-8_o" }
        ],
        coolDown: [
            { name: "Hamstring Release", yt: "SshM9770mX0" },
            { name: "Quad Stretch", yt: "1oI9q60-m8A" }
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
            { name: "Desk Chest Stretch", yt: "M_0M9fWmsEw" },
            { name: "Wrist Rolls", yt: "E-9vVvM_Y_Y" },
            { name: "Seated Leg Extensions", yt: "6IInLsc8w_k" },
            { name: "Spinal Roll Down", yt: "qYvYs83-7_M" },
            { name: "Upper Trap Stretch", yt: "I6A_N_D_V8U" }
        ],
        coolDown: [
            { name: "Eye Palming (Focus)", yt: "8_86q8Y_Y6E" },
            { name: "Standing Calf Stretch", yt: "7m7p-08o0m0" }
        ]
    },
    yoga: {
        warmup: [
            { name: "Sun Salutation A", yt: "j97SSGzqhxQ" },
            { name: "Cat-Cow Flow", yt: "kqnua4rHVp8" }
        ],
        main: [
            { name: "Downward Dog", yt: "j97SSGzqhxQ" },
            { name: "Warrior I", yt: "osXj67EIsyM" },
            { name: "Warrior II", yt: "4Ejz7IgAnlU" },
            { name: "Tree Pose", yt: "wdln9qWYloU" },
            { name: "Pigeon Pose", yt: "W2P6L6mG7S8" },
            { name: "Triangle Pose", yt: "S6S7G-O-X60" },
            { name: "Bridge Pose", yt: "wPM8icPu6H8" },
            { name: "Boat Pose", yt: "8S7_G_O-X60" }
        ],
        coolDown: [
            { name: "Savasana / Breath", yt: "8_86q8Y_Y6E" },
            { name: "Cobra Stretch", yt: "fOdrW7nfPrg" }
        ]
    },
    stretch: {
        warmup: [{name: "Body Rotation", yt: "Y8ZInX-7O_o"}, {name: "Leg Swings", yt: "wrwwXE_67p0"}],
        main: [
            { name: "Hamstring Stretch", yt: "SshM9770mX0" },
            { name: "Butterfly Stretch", yt: "MdX6pL-Z-O4" },
            { name: "Quad Stretch", yt: "1oI9q60-m8A" },
            { name: "Lizard Stretch", yt: "i7A_N_D_V8U" },
            { name: "Shoulder Stretch", yt: "mI6S-H6hS_k" },
            { name: "Lat Stretch", yt: "i7A_N_D_V8U" },
            { name: "Hip Flexor Stretch", yt: "6_v-37p7S9o" },
            { name: "Spinal Twist", yt: "S6S7G-O-X60" }
        ],
        coolDown: [{name: "Toe Touch", yt: "MdX6pL-Z-O4"}, {name: "Glute Stretch", yt: "wPM8icPu6H8"}]
    },
    pilates: {
        warmup: [{name: "Hundred Prep", yt: "lCg_gh_fppI"}, {name: "Pelvic Tilt", yt: "L_X6_mX0-8A"}],
        main: [
            { name: "The Hundred", yt: "lCg_gh_fppI" },
            { name: "Roll Up", yt: "fK26MvL1sK4" },
            { name: "Single Leg Stretch", yt: "68O8-X8Xm8w" },
            { name: "Double Leg Stretch", yt: "5_6pL8Xm8A" },
            { name: "Criss Cross", yt: "XpS-C6E8Xps" },
            { name: "Leg Circles", yt: "8S7_G_O-X60" },
            { name: "Swimming", yt: "z6PJn2z3120" },
            { name: "The Saw", yt: "S6S7G-O-X60" }
        ],
        coolDown: [{name: "Spine Stretch", yt: "qYvYs83-7_M"}, {name: "Seal Pose", yt: "fOdrW7nfPrg"}]
    }
};

let weeklyPlan = [];
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;
let isPaused = false;

/* ALGORITAM ZA GENERISANJE PLANA */
function generateWeeklyPlan(goal) {
    weeklyPlan = [];
    const category = db[goal];
    const totalDurationMin = parseInt(document.getElementById("user-duration").value) || 20;

    for (let i = 1; i <= 7; i++) {
        // Metodički odabir:
        // 1. Warmup (2 unikatne)
        let wup = shuffle([...category.warmup]).slice(0, 2);
        // 2. Main (Sve dostupne iz Main baze - min 6-8)
        let main = shuffle([...category.main]);
        // 3. CoolDown (2 unikatne)
        let cd = shuffle([...category.coolDown]).slice(0, 2);

        let combined = [...wup, ...main, ...cd];
        
        // Kalkulacija vremena po vežbi (ukupno sekundi / broj vežbi)
        const durationPerEx = Math.floor((totalDurationMin * 60) / combined.length);

        let dayExercises = combined.map(ex => ({
            ...ex,
            duration: durationPerEx
        }));

        weeklyPlan.push({ dayNumber: i, exercises: dayExercises });
    }
}

/* POMOĆNE FUNKCIJE */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getCleanYtUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3&autoplay=1&mute=1&playsinline=1`;
}

function formatTime(s) {
    return `${Math.floor(s/60).toString().padStart(2,'0')}:${Math.floor(s%60).toString().padStart(2,'0')}`;
}

/* UI KONTROLE (SETUP) */
document.querySelectorAll(".num-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.target;
        const step = parseInt(btn.dataset.step);
        const input = document.getElementById(id);
        if (!input) return;

        if (btn.dataset.type === "list") {
            const levels = ["BEGINNER", "INTERMEDIATE", "PRO"];
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

/* NAVIGACIJA I RENDER */
document.getElementById("main-start-btn").onclick = () => {
    const goalInput = document.querySelector('input[name="goal"]:checked');
    if (!goalInput) return alert("Please select a program");
    
    generateWeeklyPlan(goalInput.value);
    renderPlanScreen();
    switchScreen("plan-screen");
};

function renderPlanScreen() {
    const container = document.getElementById("weekly-plan-list");
    if(!container) return;
    container.innerHTML = weeklyPlan.map((day, idx) => `
        <div class="n-item" onclick="loadDay(${idx})" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <span>DAY ${day.dayNumber}</span>
            <span style="font-size:0.75rem; color:#d946ef; font-weight:900;">${day.exercises.length} EXERCISES</span>
        </div>
    `).join("");
}

function loadDay(idx) {
    workoutQueue = weeklyPlan[idx].exercises;
    const container = document.getElementById("exercise-list-ul");
    if(!container) return;
    container.innerHTML = `<h3 style="margin-bottom:20px; color:#666; font-size:0.8rem;">DAY ${idx+1} PROGRAM</h3>` + 
        workoutQueue.map((ex, i) => `<div class="n-item" onclick="startAt(${i})">${i+1}. ${ex.name}</div>`).join("");
    switchScreen("workout-hub");
}

/* WORKOUT ENGINE */
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
    next.innerText = (currentIdx + 1 < workoutQueue.length) ? "NEXT: " + workoutQueue[currentIdx+1].name : "FINISHING WORKOUT";
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
                else {
                    clearInterval(timer);
                    alert("WORKOUT COMPLETE! GREAT JOB.");
                    switchScreen("plan-screen");
                }
            }
        }
    }, 1000);
}

/* KONTROLE DASHBOARDA */
document.getElementById("skip-btn").onclick = () => {
    if(currentIdx + 1 < workoutQueue.length) startAt(currentIdx + 1);
};

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
