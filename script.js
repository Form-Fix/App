document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Uzimanje podataka (možemo ih sačuvati za kasnije)
    const userData = {
        age: document.getElementById('age').value,
        goal: document.getElementById('goal').value,
        duration: document.getElementById('duration').value
    };

    // Animacija prelaza
    document.getElementById('onboarding').style.display = 'none';
    const dash = document.getElementById('dashboard');
    dash.style.display = 'flex';

    console.log("Program generisan za:", userData);
});
