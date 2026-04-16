const db = {
    physio:["Cat-Cow","Bird Dog","Glute Bridge"],
    office:["Neck Stretch","Wrist Rolls"],
    strength:["Push-ups","Squats","Plank"],
    yoga:["Downward Dog","Cobra"],
    stretch:["Hamstring Stretch"],
    pilates:["Hundred","Roll Up"]
};

const levels = ["BEGINNER", "INTERMEDIATE", "PRO"];
let weeklyPlan = {};
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;
let isPaused = false;

/* KONTROLE ZA + I - */
document.querySelectorAll(".num-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.target;
        const step = parseInt(btn.dataset.step);
        const input = document.getElementById(id);

        if (btn.dataset.type === "list") {
            // Menjanje Levela (tekst)
            let currentIdx = levels.indexOf(input.value);
            let nextIdx = (currentIdx + step + levels.length) % levels.length;
            input.value = levels[nextIdx];
        } else {
            // Menjanje brojeva
            let val = parseInt(input.value) || 0;
            val += step;
            if(id === "age") val = Math.max(10, Math.min(100, val));
            if(id === "weight") val = Math.max(30, Math.min(200, val));
            if(id === "user-duration") val = Math.max(5, Math.min(60, val));
            input.value = val;
        }
    });
});

/* GENERISANJE PLANA */
document.getElementById("main-start-btn").onclick = () => {
    const goal = document.querySelector('input[name="goal"]:checked');

    if(!goal){
        alert("Please select a program");
        return;
    }

    generatePlan(goal.value);
    renderWeekly();
};

function generatePlan(goal) {
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const pool = db[goal];
    const duration = parseInt(document.getElementById("user-duration").value) || 20;

    days.forEach(day => {
        weeklyPlan[day] = [];
        for(let i=0; i<5; i++) {
            weeklyPlan[day].push({
                name: pool[Math.floor(Math.random() * pool.length)],
                duration: (duration * 60) / 5 // Delimo ukupno vreme na 5 vežbi
            });
        }
    });
}

function renderWeekly() {
    const container = document.getElementById("weekly-plan-container");
    container.innerHTML = `<h3 style="margin:10px 0">WEEKLY PLAN</h3>` + 
        Object.keys(weeklyPlan).map(day => `
            <div class="n-item" onclick="loadDay('${day}')" style="cursor:pointer; display:flex; justify-content:space-between;">
                ${day} <span>➔</span>
            </div>
        `).join("");
}

function loadDay(day) {
    workoutQueue = weeklyPlan[day];
    renderWorkoutList();
    switchScreen("workout-hub");
}

function renderWorkoutList() {
    const container = document.getElementById("exercise-list-ul");
    container.innerHTML = workoutQueue.map((ex, i) => `
        <div class="n-item" onclick="startAt(${i})">${i+1}. ${ex.name}</div>
    `).join("");
}

/* TAJMER I VEŽBANJE */
document.getElementById("start-workout-btn").onclick = () => startAt(0);

function startAt(i) {
    currentIdx = i;
    timeLeft = workoutQueue[i].duration;
    switchScreen("dashboard");
    runTimer();
}

function runTimer() {
    clearInterval(timer);
    isPaused = false;
    document.getElementById("play-pause-btn").innerText = "PAUSE";

    timer = setInterval(() => {
        if(!isPaused) {
            timeLeft--;
            document.getElementById("exercise-timer").innerText = Math.ceil(timeLeft);
            document.getElementById("current-ex-name").innerText = workoutQueue[currentIdx].name;

            // Progress bar
            let total = workoutQueue[currentIdx].duration;
            let perc = ((total - timeLeft) / total) * 100;
            document.getElementById("progress-fill").style.width = perc + "%";

            if(timeLeft <= 0) {
                currentIdx++;
                if(currentIdx < workoutQueue.length) {
                    startAt(currentIdx);
                } else {
                    clearInterval(timer);
                    alert("WORKOUT COMPLETE!");
                    location.reload();
                }
            }
        }
    }, 1000);
}

document.getElementById("play-pause-btn").onclick = function() {
    isPaused = !isPaused;
    this.innerText = isPaused ? "RESUME" : "PAUSE";
};

/* POMOĆNE FUNKCIJE */
function switchScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}
