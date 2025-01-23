let profileUserId;

if (userData.role == "USER")
    profileUserId = userData.id;
else if (userData.role == "NUTRITIONIST")
    profileUserId = parseInt(localStorage.getItem('selectedUserId'));

const apiURL = `${API_URL}/user/${profileUserId}`;



let perfil = {};

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

//console.log(userData);
async function fetchUserDetails() {
	try {
		const response = await fetch(`${apiURL}/profile`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Erro ao buscar os dados:', error);
	}
}

async function updateUserDetails(user) {
	perfil = await fetchUserDetails();
	//console.log(perfil);
	if (user) {
		document.getElementById('user-weight').value = perfil.weight;
		document.getElementById('user-height').value = perfil.height;
		document.getElementById('user-age').value = perfil.age;

		const sex = perfil.gender;
		if (sex == "MASCULINO") {
			document.getElementById('user-sex').value = 1;
		} else document.getElementById('user-sex').value = 2;

		document.getElementById('user-waist').value = perfil.waist;
		document.getElementById('user-hip').value = perfil.hip;

		const currentGoalAux = perfil.currentGoal;
		if (currentGoalAux == "HIPERTROFIA") {
			document.getElementById('user-goal').value = 1;
		} else if (currentGoalAux == "EMAGRECIMENTO") {
			document.getElementById('user-goal').value = 2;
		} else document.getElementById('user-goal').value = 3;

		document.getElementById('user-scruff').value = perfil.neck;
		document.getElementById('user-levelAthlete').value = perfil.pal;

		const pal = perfil.pal;
		if (pal == 1.2) {
			document.getElementById('user-levelAthlete').value = 1.2;
		} else if (pal == 1.375) {
			document.getElementById('user-levelAthlete').value = 1.375;
		} else if (pal == 1.55) {
			document.getElementById('user-levelAthlete').value = 1.55;
		} else if (pal == 1.725) {
			document.getElementById('user-levelAthlete').value = 1.725;
		} else if (pal == 1.9) {
			document.getElementById('user-levelAthlete').value = 1.9;
		} else document.getElementById('user-levelAthlete').value = 2.4;

	} else {
		alert('Usuário não encontrado');
	}
}


updateUserDetails(userData);



//Função de atualizar Perfil Alimentar
async function submitForm(event) {
	event.preventDefault();
	event.stopPropagation();

	const updateWeight = parseFloat(document.getElementById('user-weight').value);
	const updateHeight = parseFloat(document.getElementById('user-height').value);
	const updateAge = parseInt(document.getElementById('user-age').value);
	const updateSex = parseInt(document.getElementById('user-sex').value);
	const updateGoal = parseInt(document.getElementById('user-goal').value);
	const updateWaist = parseFloat(document.getElementById('user-waist').value);
	const updateHip = parseFloat(document.getElementById('user-hip').value);
	const updateNeck = parseFloat(document.getElementById('user-scruff').value);
	const updatePal = parseFloat(document.getElementById('user-levelAthlete').value);

	const requestBody = {
		weight: updateWeight,
		height: updateHeight,
		age: updateAge,
		gender: updateSex,
		waist: updateWaist,
		hip: updateHip,
		neck: updateNeck,
		currentGoal: updateGoal,
		pal: updatePal
	};

	//console.log(requestBody);

	putData(`${apiURL}/profile/${perfil.id}`, requestBody, "Successfully updated profile in the database").then((data) => {
		//console.log(data);
		alert('Perfil alimentar atualizado com sucesso');
	}).catch((error) => {
		console.error('Error while updating profile:', error);
	});

	if (userData.role == "USER") window.location.href = 'account.html';
	else if (userData.role == "NUTRITIONIST") window.location.href = 'gerencia-clientes.html';
}

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('user-updatePerfil');
	form.addEventListener('submit', submitForm);
});