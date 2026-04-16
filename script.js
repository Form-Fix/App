const db = {
    menopause: {
        warmup: [{name: "Shoulder Flossing", yt: "6IInLsc8w_k"}, {name: "Hip Circles", yt: "mI6S-6C6XyM"}],
        main: [
            {name: "Sumo Squat (Bone Health)", yt: "gcNh17Ckjgg"},
            {name: "Wall Push-ups", yt: "H33H65-0GIs"},
            {name: "Bird Dog Stability", yt: "wiFNA3sqjCA"},
            {name: "Spine Health superman", yt: "z6PJn2z3120"},
            {name: "Isometric Glute Bridge", yt: "wPM8icPu6H8"},
            {name: "Dead Bug Core", yt: "g_byZ__EisM"},
            {name: "Clamshells (Pelvic Floor)", yt: "mI6S-6C6XyM"}
        ],
        coolDown: [{name: "Box Breathing (Hormonal Reset)", yt: "8_86q8Y_Y6E"}, {name: "Child's Pose", yt: "qYvYs83-7_M"}]
    },
    weightloss: {
        warmup: [{name: "Jumping Jacks", yt: "1b98WR72isY"}, {name: "Active Plank", yt: "ASdvN_XEl_c"}],
        main: [
            {name: "Modified Burpees", yt: "dZgVxmf6jkA"},
            {name: "Mountain Climbers", yt: "nmwgirgXLYM"},
            {name: "Bicycle Crunches", yt: "9v_f8A-7_Y"},
            {name: "Squat Thrusts", yt: "gcNh17Ckjgg"},
            {name: "Reverse Lunges", yt: "wrwwXE_67p0"},
            {name: "Plank Jacks", yt: "ASdvN_XEl_c"},
            {name: "High Knees", yt: "1b98WR72isY"}
        ],
        coolDown: [{name: "Psoas Release", yt: "6_v-37p7S9o"}, {name: "Lizard Stretch", yt: "i7A_N_D_V8U"}]
    },
    joints: {
        warmup: [{name: "Ankle Rotations", yt: "mI6S-6C6XyM"}, {name: "Wrist Mobility", yt: "E-9vVvM_Y_Y"}],
        main: [
            {name: "Isometric Wall Sit", yt: "y-wV4Venus"},
            {name: "Straight Leg Raises", yt: "6IInLsc8w_k"},
            {name: "Wall Slides (Shoulders)", yt: "42S_f9S_Uas"},
            {name: "Scapular Push-ups", yt: "H33H65-0GIs"},
            {name: "Controlled Hip Circles", yt: "mI6S-6C6XyM"},
            {name: "Heel Raises (Slow)", yt: "7m7p-08o0m0"}
        ],
        coolDown: [{name: "Gentle Cat-Cow", yt: "kqnua4rHVp8"}, {name: "Nerve Flossing", yt: "6IInLsc8w_k"}]
    },
    physio: {
        warmup: [{name: "Thoracic Rotation", yt: "Y8ZInX-7O_o"}, {name: "Cat-Cow Flow", yt: "kqnua4rHVp8"}],
        main: [{name: "Bird Dog", yt: "wiFNA3sqjCA"}, {name: "Dead Bug", yt: "g_byZ__EisM"}, {name: "Pelvic Tilts", yt: "L_X6_mX0-8A"}, {name: "Scapular Squeeze", yt: "H33H65-0GIs"}, {name: "Wall Slides", yt: "42S_f9S_Uas"}, {name: "Prone Y", yt: "lG7f1OAt6Xw"}],
        coolDown: [{name: "Child's Pose", yt: "qYvYs83-7_M"}]
    },
    office: {
        warmup: [{name: "Neck Rolls", yt: "I6A_N_D_V8U"}, {name: "Shoulder Shrugs", yt: "7mPz8pGf8p8"}],
        main: [{name: "Chin Tucks", yt: "6_v-37p7S9o"}, {name: "Seated Twist", yt: "Is7S-H6hS_k"}, {name: "Chest Opener", yt: "M_0M9fWmsEw"}, {name: "Wrist Stretch", yt: "E-9vVvM_Y_Y"}, {name: "Hip Flexor Seated", yt: "6IInLsc8w_k"}],
        coolDown: [{name: "Eye Palming", yt: "8_86q8Y_Y6E"}]
    },
    strength: {
        warmup: [{name: "Active Lunges", yt: "wrwwXE_67p0"}, {name: "Plank Warmup", yt: "ASdvN_XEl_c"}],
        main: [{name: "Push-ups", yt: "IODxDxX7oi4"}, {name: "Squats", yt: "gcNh17Ckjgg"}, {name: "Diamond Push-up", yt: "J0DnGzESSHk"}, {name: "Superman", yt: "z6PJn2z3120"}, {name: "Side Plank", yt: "XpS-C6E8Xps"}, {name: "Tricep Dips", yt: "0326dbS-8_o"}],
        coolDown: [{name: "Cobra Stretch", yt: "fOdrW7nfPrg"}]
    },
    yoga: {
        warmup: [{name: "Cat-Cow Flow", yt: "kqnua4rHVp8"}],
        main: [{name: "Downward Dog", yt: "j97SSGzqhxQ"}, {name: "Warrior I", yt: "osXj67EIsyM"}, {name: "Warrior II", yt: "4Ejz7IgAnlU"}, {name: "Tree Pose", yt: "wdln9qWYloU"}, {name: "Pigeon Pose", yt: "W2P6L6mG7S8"}, {name: "Triangle Pose", yt: "S6S7G-O-X60"}],
        coolDown: [{name: "Child's Pose", yt: "qYvYs83-7_M"}]
    }
};

let weeklyPlan = [];
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;
let isPaused = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateWeeklyPlan(goal) {
    weeklyPlan = [];
    const cat = db[goal];
    const totalMin = parseInt(document.getElementById("user-duration").value) || 20;

    for (let i = 1; i <= 7; i++) {
        let wup = shuffle([...cat.warmup]).slice(0, 2);
        let main = shuffle([...cat.main]); // Uzima sve iz main za raznovrsnost
        let cd = shuffle([...cat.coolDown]).slice(0, 1);
        
        let session = [...wup, ...main, ...cd];
        const durationPerEx = Math.floor((totalMin * 60) / session.length);

        weeklyPlan.push({ 
            day: i, 
            exercises: session.map(ex => ({ ...ex, duration: durationPerEx }))
        });
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
        <div class="n-item" onclick="loadDay(${i})" style="cursor:pointer; display:flex; justify-content:space-between;">
            DAY ${d.day} <span>${d.exercises.length} EXERCISES ➔</span>
        </div>
    `).join("");
}

function loadDay(i) {
    workoutQueue = weeklyPlan[i].exercises;
    document.getElementById("exercise-list-ul").innerHTML = `<h3 style="margin-bottom:15px; color:#444;">DAY ${i+1}</h3>` + 
        workoutQueue.map((ex, idx) => `<div class="n-item" onclick="startAt(${idx})">${idx+1}. ${ex.name}</div>`).join("");
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
    document.getElementById("next-ex-preview").innerText = workoutQueue[currentIdx+1] ? `NEXT: ${workoutQueue[currentIdx+1].name}` : "FINAL STRETCH";
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
