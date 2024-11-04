document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value 
    };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "dashboard.html"; 
});