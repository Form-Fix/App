const exerciseDB = {
    physio: ["Cat-Cow", "Bird-Dog", "Glute Bridge", "Pelvic Tilt", "Dead Bug", "Child's Pose"],
    office: ["Neck Stretch", "Wrist Rolls", "Shoulder Shrugs", "Thoracic Twist", "Desk Plank"],
    strength: ["Air Squats", "Pushups", "Lunges", "Plank", "Diamond Pushups", "Superman"],
    yoga: ["Downward Dog", "Cobra", "Warrior I", "Warrior II", "Tree Pose"],
    stretch: ["Hamstring Stretch", "Cobra Stretch", "Butterfly Fold", "Quad Stretch"],
    pilates: ["The Hundred", "Leg Circles", "Roll Up", "Plank Leg Lift"]
};

document.getElementById('main-start-btn').onclick = () => {
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const totalMinutes = parseInt(document.getElementById('user-duration').value);
    
    // Svaka vežba mora da traje 2 min (120 sec)
    const exerciseDuration = 120; 
    const numberOfExercises = Math.floor((totalMinutes * 60) / exerciseDuration);
    
    let pool = exerciseDB[goal];
    let selected = [];
    
    for(let i = 0; i < numberOfExercises; i++) {
        // Uzimamo vežbe iz baze (ako ponestane, ponavljamo krug)
        selected.push(pool[i % pool.length]);
    }

    renderHub(selected, exerciseDuration);
    document.querySelector('.screen.active').classList.remove('active');
    document.getElementById('workout-hub').classList.add('active');
};

function renderHub(exercises, duration) {
    const list = document.getElementById('exercise-list-ul');
    list.innerHTML = exercises.map((ex, i) => `
        <div class="n-item" style="background:#0c0c0c; padding:20px; border-radius:15px; margin-bottom:10px; border:1px solid #1a1a1a; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <span style="font-weight:900; color:white;">${i+1}. ${ex.toUpperCase()}</span>
                <br><small style="color:#555">Duration: 2:00 MIN</small>
            </div>
            <div class="gradient-text" style="font-weight:900">▶</div>
        </div>
    `).join('');
}
