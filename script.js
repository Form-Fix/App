const db = {
    strength: [
        { name: "Push-ups", muscle: "chest", video: "https://www.youtube.com/embed/IODxDxX7oi4" },
        { name: "Squats", muscle: "legs", video: "https://www.youtube.com/embed/aclHkVaku9U" },
        { name: "Lunges", muscle: "legs", video: "https://www.youtube.com/embed/QOVaHwm-Q6U" },
        { name: "Plank", muscle: "core", video: "https://www.youtube.com/embed/pSHjTRCQxIw" },
        { name: "Burpees", muscle: "full", video: "https://www.youtube.com/embed/TU8QYVW0gDU" }
    ],

    mobility: [
        { name: "Hip Flow", muscle: "hips", video: "https://www.youtube.com/embed/2pLT-olgUJs" },
        { name: "Spine Rotation", muscle: "spine", video: "https://www.youtube.com/embed/SNNKQlkoPqQ" }
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

/* USER DATA */
let stats = JSON.parse(localStorage.getItem("stats")) || {
    workouts: 0,
    streak: 0,
    lastDate: null
};

/* GENERATE SMART PLAN */
document.getElementById('main-start-btn').onclick = () => {
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const level = document.getElementById('user-level').value;

    generateSmartPlan(goal, level);
    renderWeekly();
};

/* AI PLAN */
function generateSmartPlan(goal, level) {
    const days = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
    const muscles = ["legs","chest","core","full"];

    days.forEach((day,i)=>{
        weeklyPlan[day] = [];

        let focus = muscles[i % muscles.length];

        let pool = db[goal].filter(e => e.muscle === focus || e.muscle === "full");

        for(let j=0;j<5;j++){
            let ex = pool[Math.floor(Math.random()*pool.length)];

            let duration = 60;
            if(level === "pro") duration = 90;
            if(level === "beginner") duration = 45;

            weeklyPlan[day].push({
                ...ex,
                duration
            });
        }
    });
}

/* RENDER WEEK */
function renderWeekly() {
    const el = document.getElementById('weekly-plan');

    el.innerHTML = Object.keys(weeklyPlan).map(day => `
        <div class="n-item" onclick="loadDay('${day}')">
            <b>${day}</b>
            <span>▶</span>
        </div>
    `).join('');
}

/* LOAD DAY */
function loadDay(day) {
    workoutQueue = weeklyPlan[day];
    renderWorkout();
    switchScreen('workout-hub');
}

/* RENDER EX */
function renderWorkout() {
    const el = document.getElementById('exercise-list-ul');

    el.innerHTML = workoutQueue.map((ex,i)=>`
        <div class="n-item" onclick="startAt(${i})">
            <div>
                ${ex.name}
                <br><small>${ex.duration}s</small>
            </div>
            <span>▶</span>
        </div>
    `).join('');
}

/* START */
document.getElementById('start-workout-btn').onclick = () => startAt(0);

function startAt(i) {
    currentIdx = i;
    timeLeft = workoutQueue[i].duration;
    switchScreen('dashboard');

    showVideo(workoutQueue[i].video);
    runTimer();
}

/* VIDEO */
function showVideo(url) {
    let iframe = document.getElementById("video-frame");

    if(!iframe){
        iframe = document.createElement("iframe");
        iframe.id = "video-frame";
        iframe.style.width = "100%";
        iframe.style.height = "200px";
        iframe.style.marginBottom = "10px";
        document.getElementById("dashboard").prepend(iframe);
    }

    iframe.src = url;
}

/* TIMER */
function runTimer() {
    clearInterval(timer);

    timer = setInterval(()=>{
        timeLeft--;

        document.getElementById('exercise-timer').innerText = timeLeft;
        document.getElementById('current-ex-name').innerText = workoutQueue[currentIdx].name;

        let progress = ((workoutQueue[currentIdx].duration - timeLeft) / workoutQueue[currentIdx].duration) * 100;
        document.getElementById('progress-fill').style.width = progress + "%";

        if(timeLeft <= 0){
            currentIdx++;

            if(currentIdx < workoutQueue.length){
                startAt(currentIdx);
            } else {
                finishWorkout();
            }
        }

    },1000);
}

/* FINISH */
function finishWorkout() {
    stats.workouts++;

    const today = new Date().toDateString();

    if(stats.lastDate !== today){
        stats.streak++;
    }

    stats.lastDate = today;

    localStorage.setItem("stats", JSON.stringify(stats));

    alert(`DONE 🔥\nWorkouts: ${stats.workouts}\nStreak: ${stats.streak}`);
    location.reload();
}

/* CONTROLS */
document.getElementById('skip-btn').onclick = ()=>{
    currentIdx++;
    if(currentIdx < workoutQueue.length) startAt(currentIdx);
};

document.getElementById('play-pause-btn').onclick = ()=>{
    clearInterval(timer);
};

/* SCREEN */
function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
