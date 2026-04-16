const db = {
    strength: ["Push-ups","Squats","Plank","Lunges","Burpees"],
    mobility: ["Hip Flow","Spine Rotation","Deep Squat Hold"],
    office: ["Neck Stretch","Wrist Rolls","Shoulder Rolls"],
    yoga: ["Sun Salutation","Warrior Flow","Tree Pose"]
};

let weeklyPlan = {};
let workoutQueue = [];
let currentIdx = 0;
let timeLeft = 0;
let timer;

/* GENERATE PLAN */
document.getElementById('main-start-btn').onclick = () => {
    const goal = document.querySelector('input[name="goal"]:checked').value;
    generateWeeklyPlan(goal);
    renderWeekly();
};

/* WEEK PLAN */
function generateWeeklyPlan(goal) {
    const days = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

    days.forEach(day => {
        weeklyPlan[day] = [];

        for(let i=0;i<5;i++) {
            weeklyPlan[day].push({
                name: db[goal][Math.floor(Math.random()*db[goal].length)],
                duration: 60 + Math.random()*60
            });
        }
    });
}

function renderWeekly() {
    const container = document.getElementById('weekly-plan');

    container.innerHTML = Object.keys(weeklyPlan).map(day => `
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

/* RENDER EXERCISES */
function renderWorkout() {
    const list = document.getElementById('exercise-list-ul');

    list.innerHTML = workoutQueue.map((ex,i)=>`
        <div class="n-item" onclick="startAt(${i})">
            ${ex.name}
            <span>▶</span>
        </div>
    `).join('');
}

/* START */
document.getElementById('start-workout-btn').onclick = () => {
    startAt(0);
};

function startAt(i) {
    currentIdx = i;
    timeLeft = workoutQueue[i].duration;
    switchScreen('dashboard');
    runTimer();
}

/* TIMER */
function runTimer() {
    clearInterval(timer);

    timer = setInterval(()=>{
        timeLeft--;

        document.getElementById('exercise-timer').innerText = Math.floor(timeLeft);
        document.getElementById('current-ex-name').innerText = workoutQueue[currentIdx].name;

        let progress = ((60 - timeLeft)/60)*100;
        document.getElementById('progress-fill').style.width = progress+"%";

        if(timeLeft <= 0) {
            currentIdx++;
            if(currentIdx < workoutQueue.length) startAt(currentIdx);
            else location.reload();
        }

    },1000);
}

/* CONTROLS */
document.getElementById('skip-btn').onclick = ()=>{
    currentIdx++;
    if(currentIdx < workoutQueue.length) startAt(currentIdx);
};

document.getElementById('play-pause-btn').onclick = ()=>{
    clearInterval(timer);
};

/* SCREEN SWITCH */
function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
