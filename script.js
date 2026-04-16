const db = {
    physio:["Cat-Cow","Bird Dog","Glute Bridge"],
    office:["Neck Stretch","Wrist Rolls"],
    strength:["Push-ups","Squats","Plank"],
    yoga:["Downward Dog","Cobra"],
    stretch:["Hamstring Stretch"],
    pilates:["Hundred","Roll Up"]
};

let weeklyPlan = {};
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;

/* FIX + - BUTTONS */
document.querySelectorAll(".num-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
        const id = btn.dataset.target;
        const step = parseInt(btn.dataset.step);

        const input = document.getElementById(id);
        let val = parseInt(input.value) || 0;

        val += step;

        if(id==="age") val = Math.max(10, Math.min(100,val));
        if(id==="weight") val = Math.max(30, Math.min(200,val));

        input.value = val;
    });
});

/* START */
document.getElementById("main-start-btn").onclick = ()=>{
    const goal = document.querySelector('input[name="goal"]:checked');

    if(!goal){
        alert("Select program");
        return;
    }

    generatePlan(goal.value);
    renderWeekly();
};

/* PLAN */
function generatePlan(goal){
    const days=["MON","TUE","WED","THU","FRI","SAT","SUN"];
    const pool=db[goal];

    days.forEach(day=>{
        weeklyPlan[day]=[];

        for(let i=0;i<5;i++){
            weeklyPlan[day].push({
                name:pool[Math.floor(Math.random()*pool.length)],
                duration:60
            });
        }
    });
}

/* UI */
function renderWeekly(){
    weekly-plan.innerHTML=Object.keys(weeklyPlan).map(day=>`
        <div class="n-item" onclick="loadDay('${day}')">${day}</div>
    `).join("");
}

function loadDay(day){
    workoutQueue=weeklyPlan[day];
    renderWorkout();
    switchScreen("workout-hub");
}

function renderWorkout(){
    exercise-list-ul.innerHTML=workoutQueue.map((ex,i)=>`
        <div class="n-item" onclick="startAt(${i})">${ex.name}</div>
    `).join("");
}

/* START */
document.getElementById("start-workout-btn").onclick=()=>startAt(0);

function startAt(i){
    currentIdx=i;
    timeLeft=workoutQueue[i].duration;
    switchScreen("dashboard");
    runTimer();
}

/* TIMER */
function runTimer(){
    clearInterval(timer);

    timer=setInterval(()=>{
        timeLeft--;

        exercise-timer.innerText=timeLeft;
        current-ex-name.innerText=workoutQueue[currentIdx].name;

        if(timeLeft<=0){
            currentIdx++;
            if(currentIdx<workoutQueue.length) startAt(currentIdx);
            else alert("DONE");
        }
    },1000);
}

/* SCREEN */
function switchScreen(id){
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}
