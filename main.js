// JavaScript for basic form validation
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function (event) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                alert('Both email and password are required!');
                event.preventDefault(); // Prevent form submission if validation fails
            }
        });
    }
});
