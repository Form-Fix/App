const db = {
    physio: ["Cat-Cow","Bird Dog","Glute Bridge","Dead Bug"],
    office: ["Neck Stretch","Wrist Rolls","Shoulder Rolls"],
    strength: ["Push-ups","Squats","Lunges","Plank"],
    yoga: ["Downward Dog","Cobra","Warrior"],
    stretch: ["Hamstring Stretch","Quad Stretch"],
    pilates: ["Hundred","Roll Up","Leg Circles"]
};

let weeklyPlan = {};
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;

/* change input */
function changeValue(id, delta){
    const input = document.getElementById(id);
    let val = parseInt(input.value) || 0;

    val += delta;

    if(id==="age") val = Math.max(10, Math.min(100, val));
    if(id==="weight") val = Math.max(30, Math.min(200, val));

    input.value = val;
}

/* start */
document.getElementById("main-start-btn").onclick = () => {
    const goal = document.querySelector('input[name="goal"]:checked');

    if(!goal){
        alert("Select program");
        return;
    }

    generatePlan(goal.value);
    renderWeekly();
};

/* plan */
function generatePlan(goal){
    const days = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
    const pool = db[goal];

    days.forEach(day=>{
        weeklyPlan[day] = [];

        for(let i=0;i<5;i++){
            weeklyPlan[day].push({
                name: pool[Math.floor(Math.random()*pool.length)],
                duration: 60
            });
        }
    });
}

/* render */
function renderWeekly(){
    const el = document.getElementById("weekly-plan");

    el.innerHTML = Object.keys(weeklyPlan).map(day=>`
        <div class="n-item" onclick="loadDay('${day}')">
            ${day} ▶
        </div>
    `).join("");
}

/* load */
function loadDay(day){
    workoutQueue = weeklyPlan[day];
    renderWorkout();
    switchScreen("workout-hub");
}

/* workout */
function renderWorkout(){
    const el = document.getElementById("exercise-list-ul");

    el.innerHTML = workoutQueue.map((ex,i)=>`
        <div class="n-item" onclick="startAt(${i})">
            ${ex.name}
        </div>
    `).join("");
}

/* start */
document.getElementById("start-workout-btn").onclick = () => startAt(0);

function startAt(i){
    currentIdx = i;
    timeLeft = workoutQueue[i].duration;
    switchScreen("dashboard");
    runTimer();
}

/* timer */
function runTimer(){
    clearInterval(timer);

    timer = setInterval(()=>{
        timeLeft--;

        document.getElementById("exercise-timer").innerText = timeLeft;
        document.getElementById("current-ex-name").innerText = workoutQueue[currentIdx].name;

        if(timeLeft <= 0){
            currentIdx++;
            if(currentIdx < workoutQueue.length) startAt(currentIdx);
            else alert("DONE");
        }

    },1000);
}

/* controls */
document.getElementById("skip-btn").onclick = ()=>{
    currentIdx++;
    if(currentIdx < workoutQueue.length) startAt(currentIdx);
};

document.getElementById("play-pause-btn").onclick = ()=>{
    clearInterval(timer);
};

/* screen */
function switchScreen(id){
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}
