const apiURL = `${API_URL}`;

async function fetchUserDetails() {
  try {
    const response = await fetch(`${apiURL}/user/${userData.id}/profile`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

async function fetchUserNutritionist() {
  try {
    const response = await fetch(`${apiURL}/user/${userData.id}/nutritionist`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

async function fetchMacroProteins() {
  try {
    const response = await fetch(`${apiURL}/user/${userData.id}/diary/totalProteins`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

async function fetchMacroCalories() {
  try {
    const response = await fetch(`${apiURL}/user/${userData.id}/diary/totalCalories`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

async function fetchMacroCarbs() {
  try {
    const response = await fetch(`${apiURL}/user/${userData.id}/diary/totalCarbs`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

async function fetchMacroFat() {
  try {
    const response = await fetch(`${apiURL}/user/${userData.id}/diary/totalFats`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

async function fetchDiet() {
  try {
    const response = await fetch(`${apiURL}/user/${userData.id}/diet`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

async function fetchCountDiary() {
  try {
    const response = await fetch(`${apiURL}/user/${userData.id}/diary/count`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

async function fetchLatestDiary() {
  try {
    const response = await fetch(`${apiURL}/user/${userData.id}/diary/latest`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}


const botaoPerfil = document.getElementById('button-perfilAlimentar');
if (userData.role === "USER") {
  updateUserDetails(userData);
  botaoPerfil.style.display = 'block';
}
if (userData.role === "NUTRITIONIST") {
  botaoPerfil.style.display = 'none';
  updateNutritionistDetails(userData);
}



//Função que mostra os detalhes do perfil
async function updateUserDetails(user) {
  const nutritionist = await fetchUserNutritionist();
  const perfil = await fetchUserDetails();
  const proteins = await fetchMacroProteins();
  const carbs = await fetchMacroCarbs();
  const fats = await fetchMacroFat();
  const calories = await fetchMacroCalories();
  const diet = await fetchDiet();
  const countDiary = await fetchCountDiary();
  const latest = await fetchLatestDiary();

  if (user) {
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-surname').textContent = user.surname;
    if (userData.role == "USER") {
      document.getElementById('user-category').textContent = "Usuário comum";
    } else document.getElementById('user-category').textContent = "Nutricionista";
    document.getElementById('user-email').textContent = user.email;
    if (nutritionist) {
      document.getElementById('user-acompanhamento').textContent = `${nutritionist.name} ${nutritionist.surname}`;
    } else document.getElementById('user-acompanhamento').textContent = `Você não está associado a um nutricionista`;
    document.getElementById('user-weight').textContent = perfil.weight;
    document.getElementById('user-height').textContent = perfil.height;
    document.getElementById('user-age').textContent = perfil.age;
    document.getElementById('user-sex').textContent = perfil.gender;
    document.getElementById('user-waist').textContent = perfil.waist;
    document.getElementById('user-hip').textContent = perfil.hip;
    document.getElementById('user-goal').textContent = perfil.currentGoal;
    document.getElementById('user-scruff').textContent = perfil.neck;
    goal = perfil.pal;
    if (goal == 1.2) {
      document.getElementById('user-levelAthlete').textContent = "Sedentário: pouco ou nenhum exercício";
    } else if (goal == 1.375) {
      document.getElementById('user-levelAthlete').textContent = "Leve: se exercita de 1 a 2 vezes por semana";
    } else if (goal == 1.55) {
      document.getElementById('user-levelAthlete').textContent = "Moderado: se exercita de 2 a 3 vezes por semana";
    } else if (goal == 1.725) {
      document.getElementById('user-levelAthlete').textContent = "Pesado: se exercita de 4 a 5 vezes por semana";
    } else if (goal == 1.9) {
      document.getElementById('user-levelAthlete').textContent = "Trabalho físico ou exercício intenso";
    } else document.getElementById('user-levelAthlete').textContent = "Atleta Profissional";

  } else {
    alert('Usuário não encontrado');
  }

  document.getElementById('caloriasUltimo').textContent = latest.totalCalories;
  document.getElementById('proteinasUltimo').textContent = latest.totalProteins;
  document.getElementById('carboidratosUltimo').textContent = latest.totalCarbs;
  document.getElementById('gorduraUltimo').textContent = latest.totalFats;
  document.getElementById('caloriasEsperado').textContent = diet.totalCalories;
  document.getElementById('proteinasEsperado').textContent = diet.totalProteins;
  document.getElementById('carboidratosEsperado').textContent = diet.totalCarbs;
  document.getElementById('gorduraEsperado').textContent = diet.totalFats;
  document.getElementById('caloriasMedia').textContent = (calories/countDiary).toFixed(2);
  document.getElementById('proteinasMedia').textContent = (proteins/countDiary).toFixed(2);
  document.getElementById('carboidratosMedia').textContent = (carbs/countDiary).toFixed(2);
  document.getElementById('gorduraMedia').textContent = (fats/countDiary).toFixed(2);

}

async function updateNutritionistDetails(user) {
  if (user) {
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-surname').textContent = user.surname;
    if (userData.role == "USER") {
      document.getElementById('user-category').textContent = "Usuário comum";
    } else document.getElementById('user-category').textContent = "Nutricionista";
    document.getElementById('user-email').textContent = user.email;
  } else {
    alert('Usuário não encontrado');
  }
}

//funções de ver senha
document.getElementById('view-password').addEventListener('click', function () {
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

document.getElementById('view-confirm-password').addEventListener('click', function () {
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

//Função de atualizar senha
async function submitForm(event) {
  event.preventDefault();
  event.stopPropagation();

  const password = document.getElementById('user-password').value;
  const confirmPassword = document.getElementById('user-confirm-password').value;

  if (password.length < 8) {
    alert("A senha deve ter ao menos 8 caracteres.");
  } else if (!/[A-Z]/.test(password)) {
    alert("A senha deve conter pelo menos uma letra maiúscula.");
  } else if (!/[a-z]/.test(password)) {
    alert("A senha deve conter pelo menos uma letra minúscula.");
  } else if (!/\W/.test(password)) {
    alert("A senha deve conter pelo menos um caractere especial.");
  } else if (password !== confirmPassword) {
    alert("As duas senhas digitadas não são iguais.");
  } else {

    if(userData.role == "NUTRITIONIST"){
      aux = 2;
    } else aux = 1;

    const requestBody = {
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      password: password,
      role: aux
    };

    putData(`${apiURL}/user/${userData.id}`, requestBody, "Successfully updated --- in the database").then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error('Error while updating ---:', error);
    });

  }

  alert('Senha trocada com sucesso');
  window.location.href = 'account.html';

}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formUser-password');
  form.addEventListener('submit', submitForm);
});


//Função de excluir perfil
async function excluirPerfil() {
  const perfil = await fetchUserDetails();

  if (confirm("Tem certeza de que deseja excluir o perfil?")) {
    try {
      const response = await fetch(`${apiURL}/user/${userData.id}`, {
        method: 'DELETE',
      }); userData.profile

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        window.location.href = 'account.html';
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error("Ocorreu um erro ao excluir o item:", error);
    }
  }


}

const btnDelete = document.getElementById("btn-delete");
btnDelete.addEventListener("click", function () {
  excluirPerfil();
});
