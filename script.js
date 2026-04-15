const nikeDatabase = [
    // OFFICE (Anti-Sitting)
    { name: "Neck Retractions", duration: 30, goal: "office", art: "Neck" },
    { name: "Thoracic Opening", duration: 45, goal: "office", art: "Thoracic" },
    { name: "Shoulder Rolls", duration: 30, goal: "office", art: "Shoulders" },
    { name: "Seated Spine Twist", duration: 45, goal: "office", art: "Twist" },
    { name: "Wrist Stretch", duration: 30, goal: "office", art: "Wrist" },
    { name: "Chin Tucks", duration: 30, goal: "office", art: "Chin" },
    
    // PHYSIO
    { name: "Cat-Cow Stretch", duration: 60, goal: "physio", art: "CatCow" },
    { name: "Dead Bug Core", duration: 60, goal: "physio", art: "DeadBug" },
    { name: "Bird-Dog Balance", duration: 45, goal: "physio", art: "BirdDog" },
    { name: "Glute Bridge", duration: 60, goal: "physio", art: "Bridge" },
    { name: "Clamshells L/R", duration: 60, goal: "physio", art: "Clams" },
    { name: "Pelvic Tilts", duration: 45, goal: "physio", art: "Pelvic" },

    // YOGA
    { name: "Downward Dog", duration: 60, goal: "yoga", art: "DownDog" },
    { name: "Warrior I", duration: 45, goal: "yoga", art: "Warrior1" },
    { name: "Warrior II", duration: 45, goal: "yoga", art: "Warrior2" },
    { name: "Child's Pose", duration: 60, goal: "yoga", art: "Child" },
    { name: "Cobra Pose", duration: 45, goal: "yoga", art: "Cobra" },

    // STRENGTH
    { name: "Bodyweight Squat", duration: 45, goal: "strength", art: "Squat" },
    { name: "Diamond Pushups", duration: 30, goal: "strength", art: "Pushup" },
    { name: "Reverse Lunges", duration: 45, goal: "strength", art: "Lunge" },
    { name: "Plank Hold", duration: 60, goal: "strength", art: "Plank" },
    { name: "Superman Raise", duration: 45, goal: "strength", art: "Superman" }
];

let workoutQueue = [];
let currentIdx = 0;
let timerInterval;

// MEMORY LOGIC
window.addEventListener('load', () => {
    const sAge = localStorage.getItem('userAge');
    const sWeight = localStorage.getItem('userWeight');
    if(sAge) document.getElementById('age').value = sAge;
    if(sWeight) document.getElementById('weight').value = sWeight;
});

// FORM FIX
document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    localStorage.setItem('userAge', age);
    localStorage.setItem('userWeight', weight);

    const goal = document.querySelector('input[name="goal"]:checked').value;
    workoutQueue = nikeDatabase.filter(ex => ex.goal === goal);
    
    if(workoutQueue.length > 0) {
        renderHub();
        switchScreen('workout-hub');
    }
});

function renderHub() {
    document.getElementById('hub-count').innerText = `${workoutQueue.length} EXERCISES`;
    document.getElementById('hub-time').innerText = `${workoutQueue.length} MIN`;
    
    const list = document.getElementById('exercise-list-ul');
    list.innerHTML = workoutQueue.map((ex, i) => `
        <div class="n-item" onclick="startAt(${i})">
            <div>
                <span class="gradient-text" style="font-weight:900">0${i+1}</span>
                <h4 style="margin:5px 0">${ex.name}</h4>
                <small style="color:#555">${ex.duration} SEC</small>
            </div>
            <div class="gradient-text">→</div>
        </div>
    `).join('');
}

window.startAt = function(idx) {
    currentIdx = idx;
    switchScreen('dashboard');
    loadExercise(idx);
};

document.getElementById('start-workout-btn').onclick = () => startAt(0);

function loadExercise(idx) {
    if (idx >= workoutQueue.length) {
        alert("GOAL REACHED. NO LIMITS.");
        location.reload();
        return;
    }
    currentIdx = idx;
    const ex = workoutQueue[idx];
    document.getElementById('current-ex-name').innerText = ex.name;
    document.getElementById('progress-fill').style.width = `${(idx / workoutQueue.length) * 100}%`;
    startTimer(ex.duration);
}

function startTimer(duration) {
    let timeLeft = duration;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        const m = Math.floor(timeLeft/60);
        const s = timeLeft%60;
        document.getElementById('exercise-timer').innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            loadExercise(currentIdx + 1);
        }
    }, 1000);
}

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
