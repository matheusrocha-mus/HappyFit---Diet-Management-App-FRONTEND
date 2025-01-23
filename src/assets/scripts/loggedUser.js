function menuToggle() {
    const toggleMenu = document.getElementById("account-menu");
    toggleMenu.classList.toggle("active");
}

const loggedUser = localStorage.getItem('loggedUser');
const userData = JSON.parse(loggedUser);

if (loggedUser) {
    if (userData.role == "USER" && userData.profile == null) {
        if (window.location.pathname.split('/').pop() != 'primeiro-acesso.html' && window.location.pathname.split('/').pop() != 'perfil-alimentar.html')
            window.location.href = "primeiro-acesso.html";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (!loggedUser)
        document.getElementById('account').classList.add("d-none");

    else {
        document.getElementById("account-name").textContent = userData.name;

        document.getElementById("account-button").addEventListener("click", () => {
            menuToggle();
        });

        document.getElementById("loggout").addEventListener("click", () => {
            localStorage.removeItem('loggedUser');
            window.location.href = "index.html";
        });
    }

    if (window.location.pathname.split('/').pop() == 'index.html')
        document.getElementById('home-link').classList.add("d-none");

    if (window.location.pathname.split('/').pop() == 'cadastro.html' || loggedUser)
        document.getElementById('register-button').classList.add("d-none");

    if (window.location.pathname.split('/').pop() == 'login.html' || loggedUser)
        document.getElementById('login-button').classList.add("d-none");

    if (window.location.pathname.split('/').pop() == 'primeiro-acesso.html' || window.location.pathname.split('/').pop() == 'perfil-alimentar.html') {
        document.getElementById('navbar-toggler').remove();
        document.getElementById('navbar-collapse').remove();
    }

    if (window.location.pathname.split('/').pop() == 'gerencia-clientes.html' || !loggedUser || userData.role == "USER")
        document.getElementById('manager-link').classList.add("d-none");

    if (window.location.pathname.split('/').pop() == 'dieta.html' || !loggedUser || userData.role == "NUTRITIONIST")
        document.getElementById('diet-link').classList.add("d-none");

    if (window.location.pathname.split('/').pop() == 'diario-alimentar.html' || !loggedUser || userData.role == "NUTRITIONIST")
        document.getElementById('diary-link').classList.add("d-none");
});