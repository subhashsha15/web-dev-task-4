document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function loadTasks() {
    let email = JSON.parse(localStorage.getItem("email")) || "";
    let password = JSON.parse(localStorage.getItem("password")) || "";
    document.getElementById("email").value = email;
    document.getElementById("password").value = password;
}

const signIn = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorEmailMessage = document.getElementById('error-email-message');
    const errorPasswordMessage = document.getElementById('error-password-message');

    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("password", JSON.stringify(password));

    if (!email) {
        errorEmailMessage.textContent = 'Please fill in Email';
        return;
    } else {
        errorEmailMessage.textContent = '';
    }

    if (!password) {
        errorPasswordMessage.textContent = 'Please fill in Password';
        return;
    } else {
        errorPasswordMessage.textContent = '';
    }

    history.pushState(null, null, '../index.html');
    window.location.href = "../homePage/HomePage.html";
}