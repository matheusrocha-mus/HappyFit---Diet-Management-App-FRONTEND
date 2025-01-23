const apiURL = `${API_URL}`;

(() => {
    'use strict'
    
    function applyFormValidationStyles() {
        const forms = document.querySelectorAll('.needs-validation');
        
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                
                form.classList.add('was-validated');
            }, false);
        });
    }

    applyFormValidationStyles(); 
})();



async function submitForm(event) {
    event.preventDefault();
    event.stopPropagation();

    const name = document.getElementById('user-name').value;
    const surname = document.getElementById('user-surname').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const type = document.getElementById('user-type').value;
    const confirmPassword = document.getElementById('user-confirm-password').value;

    if (!/^[a-zA-Z\u00C0-\u017F ]+$/.test(name)) {
        alert("Nome só deve ter letras e espaço");
    } else if (!/^[a-zA-Z\u00C0-\u017F ]+$/.test(surname)) {
        alert("Sobrenome só deve ter letras e espaço");
    } else if (password.length < 8) {
        alert("A senha deve ter ao menos 8 caracteres.");
    } else if (!/[A-Z]/.test(password)) {
        alert("A senha deve conter pelo menos uma letra maiúscula.");
    } else if (!/[a-z]/.test(password)) {
        alert("A senha deve conter pelo menos uma letra minúscula.");
    } else if (!/\W/.test(password)) {
        alert("A senha deve conter pelo menos um caractere especial.");
    } else if (password !== confirmPassword) {
        alert("As duas senhas digitadas não são iguais.");
    } else{

        const requestBody = {
            name: name,
            surname: surname,
            email: email,
            password: password,
            role: type
        };
    
        try {
            // Realizar uma requisição POST usando fetch com async/await
            const response = await fetch(`${apiURL}/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify(requestBody),
            });
    
            if (response.ok) {
                alert("Cadastro realizado com sucesso.")
                window.location.href = 'login.html'; //Redirecionar para a página de login
            } else {
                // Lidar com erros
                alert('Erro ao fazer cadastro');
                console.error('Erro ao fazer cadastro:', response.statusText);
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    }
}

document.getElementById('view-password').addEventListener('click', function() {
    var campoSenha = document.getElementById('user-password');
    const showEye = document.getElementById("show-eye1");
    const hideEye = document.getElementById("hide-eye1");
    if (campoSenha.type === 'password') {
        campoSenha.type = 'text';
        hideEye.classList.add("d-none");
        showEye.classList.remove("d-none");
    } else {
        campoSenha.type = 'password';
        hideEye.classList.remove("d-none");
        showEye.classList.add("d-none");
    }
});

document.getElementById('view-confirm-password').addEventListener('click', function() {
    var campoConfirmSenha = document.getElementById('user-confirm-password');
    const showEye = document.getElementById("show-eye2");
    const hideEye = document.getElementById("hide-eye2");
    if (campoConfirmSenha.type === 'password') {
        campoConfirmSenha.type = 'text';
        hideEye.classList.add("d-none");
        showEye.classList.remove("d-none");
    } else {
        campoConfirmSenha.type = 'password';
        hideEye.classList.remove("d-none");
        showEye.classList.add("d-none");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-cad');
    form.addEventListener('submit', submitForm);
});