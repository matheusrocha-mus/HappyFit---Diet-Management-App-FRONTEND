const apiURL = `${API_URL}`;

async function submitForm(event) {
  event.preventDefault();

  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;

  const requestBody = ({
    email: email,
    password: password
  });

  try {
    // Realizar uma requisição POST usando fetch com async/await
    const response = await fetch(`${apiURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const userInfo = await response.json();
      localStorage.setItem('loggedUser', JSON.stringify(userInfo)); // Armazenar informações do usuário no localStorage
      //const data = await response.json();
      //const token = data.token; // se o backend retornar o token como um dos dados na resposta
      //localStorage.setItem('token', token);   // armazenar o token no localStorage pra usar nas páginas seguintes
      alert("Login realizado com sucesso.");
      if (userInfo.role == "USER" && userInfo.profile == null) {
        window.location.href = "primeiro-acesso.html";
      } else {
        window.location.href = 'index.html'; //Redirecionar para a home
      }
    } else {
      alert("Credenciais inválidas, tente novamente");
      console.error('Erro ao fazer login:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', submitForm);
});

document.getElementById('view-password').addEventListener('click', function() {
    var campoSenha = document.getElementById('password-input');
    const showEye = document.getElementById("show-eye");
    const hideEye = document.getElementById("hide-eye");
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

  applyFormValidationStyles(); // Chamando a função imediatamente após a definição
})();