const db = {
    strength: [
        { name: "Push-ups", muscle: "chest", video: "https://www.youtube.com/embed/IODxDxX7oi4" },
        { name: "Squats", muscle: "legs", video: "https://www.youtube.com/embed/aclHkVaku9U" },
        { name: "Plank", muscle: "core", video: "https://www.youtube.com/embed/pSHjTRCQxIw" }
    ],
    mobility: [
        { name: "Hip Flow", muscle: "full", video: "https://www.youtube.com/embed/2pLT-olgUJs" }
    ],
    yoga: [
        { name: "Sun Salutation", muscle: "full", video: "https://www.youtube.com/embed/73sjzvNYyCM" }
    ]
};

let weeklyPlan = {};
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;

/* populate dropdowns */
for(let i=18;i<=100;i++){
    age.innerHTML += `<option>${i}</option>`;
}
for(let i=40;i<=140;i++){
    weight.innerHTML += `<option>${i}</option>`;
}

/* stats */
let stats = JSON.parse(localStorage.getItem("stats")) || {
    workouts:0,
    streak:0,
    lastDate:null
};

/* generate */
document.getElementById("main-start-btn").onclick = ()=>{
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const level = document.getElementById("user-level").value;

    generatePlan(goal, level);
    renderWeekly();
};

/* AI-like plan */
function generatePlan(goal, level){
    const days = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
    const pool = db[goal];

    days.forEach(day=>{
        weeklyPlan[day] = [];

        for(let i=0;i<5;i++){
            let ex = pool[Math.floor(Math.random()*pool.length)];

            let duration = 60;
            if(level==="pro") duration=90;
            if(level==="beginner") duration=45;

            weeklyPlan[day].push({...ex, duration});
        }
    });
}

/* render */
function renderWeekly(){
    weekly-plan.innerHTML = Object.keys(weeklyPlan).map(day=>`
        <div class="n-item" onclick="loadDay('${day}')">
            ${day} <span>▶</span>
        </div>
    `).join("");
}

/* load */
function loadDay(day){
    workoutQueue = weeklyPlan[day];
    renderWorkout();
    switchScreen("workout-hub");
}

function renderWorkout(){
    exercise-list-ul.innerHTML = workoutQueue.map((ex,i)=>`
        <div class="n-item" onclick="startAt(${i})">
            ${ex.name} <span>▶</span>
        </div>
    `).join("");
}

/* start */
function startAt(i){
    currentIdx=i;
    timeLeft=workoutQueue[i].duration;
    switchScreen("dashboard");
    showVideo(workoutQueue[i].video);
    renderStats();
    runTimer();
}

/* video */
function showVideo(url){
    let iframe=document.getElementById("video-frame");

    if(!iframe){
        iframe=document.createElement("iframe");
        iframe.id="video-frame";
        document.getElementById("dashboard").prepend(iframe);
    }

    iframe.src=url+"?autoplay=1&mute=1";
}

/* timer */
function runTimer(){
    clearInterval(timer);

    timer=setInterval(()=>{
        timeLeft--;

        exercise-timer.innerText=timeLeft;
        current-ex-name.innerText=workoutQueue[currentIdx].name;

        let progress=((workoutQueue[currentIdx].duration-timeLeft)/workoutQueue[currentIdx].duration)*100;
        progress-fill.style.width=progress+"%";

        if(timeLeft<=0){
            currentIdx++;
            if(currentIdx<workoutQueue.length) startAt(currentIdx);
            else finish();
        }

    },1000);
}

/* finish */
function finish(){
    stats.workouts++;

    const today=new Date().toDateString();
    if(stats.lastDate!==today) stats.streak++;

    stats.lastDate=today;

    localStorage.setItem("stats",JSON.stringify(stats));

    alert("DONE 🔥");
    location.reload();
}

/* stats */
function renderStats(){
    stats-box.innerHTML=`
        <div class="stat-card">🔥 ${stats.streak}</div>
        <div class="stat-card">💪 ${stats.workouts}</div>
    `;
}

/* controls */
skip-btn.onclick=()=>{
    currentIdx++;
    if(currentIdx<workoutQueue.length) startAt(currentIdx);
};

play-pause-btn.onclick=()=>{
    clearInterval(timer);
};

/* screen */
function switchScreen(id){
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}
