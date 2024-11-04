
async function handleLogin(event) {
    event.preventDefault();
    console.log("Login form submitted");

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Login successful");
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } else {
            console.error("Login failed:", data.message);
            alert(data.message);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again.');
    }
}

// Function to handle registration form submission
async function handleRegistration(event) {
    event.preventDefault();
    console.log("Registration form submitted");

    const firstName = document.getElementById('first-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Registration successful");
            window.location.href = 'login.html';
        } else {
            console.error("Registration failed:", data.message);
            alert(data.message);
        }
    } catch (error) {
        console.error('Error registering:', error);
        alert('An error occurred. Please try again.');
    }
}

async function handleForgotPassword(event) {
    event.preventDefault();
    console.log("Forgot password form submitted");

    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Password reset email sent");
            alert('Check your email for instructions to reset your password.');
        } else {
            console.error("Forgot password request failed:", data.message);
            alert(data.message);
        }
    } catch (error) {
        console.error('Error requesting password reset:', error);
        alert('An error occurred. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        console.log("Login form found");
        loginForm.addEventListener('submit', handleLogin);
    }

    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        console.log("Registration form found");
        registerForm.addEventListener('submit', handleRegistration);
    }

    
});
