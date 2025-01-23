let profileUserId;

if (userData.role == "USER")
    profileUserId = userData.id;
else if (userData.role == "NUTRITIONIST")
    profileUserId = parseInt(localStorage.getItem('selectedUserId'));

const apiURL = `${API_URL}/user/${profileUserId}`;


var currentTab = 0;
showTab(currentTab);

function showTab(n) {
	var x = document.getElementsByClassName("tab");
	x[n].style.display = "block";
	if (n == 0) {
		document.getElementById("prevBtn").style.display = "none";
	} else {
		document.getElementById("prevBtn").style.display = "inline";
	}
	if (n == (x.length - 1)) {
		document.getElementById("nextBtn").innerHTML = "Enviar";
	} else {
		document.getElementById("nextBtn").innerHTML = "Próximo";
	}
	fixStepIndicator(n);
}

function nextPrev(n) {
	var x = document.getElementsByClassName("tab");
	if (n == 1 && !validateForm()) return false;
	x[currentTab].style.display = "none";
	currentTab = currentTab + n;
	if (currentTab >= x.length) {
		submitForm();
		return false;
	}
	showTab(currentTab);
}

function validateForm() {
	var x, y, i, valid = true;
	x = document.getElementsByClassName("tab");
	y = x[currentTab].getElementsByTagName("input");
	for (i = 0; i < y.length; i++) {
		if (y[i].value == "") {
			y[i].className += " invalid";
			valid = false;
		} else {
			y[i].className = y[i].className.replace(" invalid", "");
		}
	}
	y = x[currentTab].getElementsByTagName("select");
	for (i = 0; i < y.length; i++) {
		if (y[i].value == "") {
			y[i].className += " invalid";
			valid = false;
		} else {
			y[i].className = y[i].className.replace(" invalid", "");
		}
	}
	if (valid) {
		document.getElementsByClassName("step")[currentTab].className += " finish";
	}
	return valid;
}

function fixStepIndicator(n) {
	var i, x = document.getElementsByClassName("step");
	for (i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(" active", "");
	}
	x[n].className += " active";
}

function submitForm() {
	const form = document.getElementById("user-profile");

	if (form.checkValidity()) {
		const requestBody = {
			weight: document.getElementById('peso').value,
			height: document.getElementById('altura').value,
			age: document.getElementById('idade').value,
			gender: document.getElementById('sexo').value,
			waist: document.getElementById('cintura').value,
			hip: document.getElementById('quadril').value,
			neck: document.getElementById('pescoco').value,
			currentGoal: document.getElementById('objetivos').value,
			pal: document.getElementById('frequencia').value
		};

		postData(`${apiURL}/profile`, requestBody, 'Successfully posted new profile to the database').then((data) => {
			console.log(data);

			userData.profile = data;

			const _requestBody = {
				totalCalories: 0,
				totalProteins: 0,
				totalCarbs: 0,
				totalFats: 0
			};

			postData(`${apiURL}/diet`, _requestBody, 'Successfully posted new diet to the database').then((_data) => {
				console.log(_data);

				userData.diet = _data;

				alert("Perfil alimentar cadastrado com sucesso.");

				if (userData.role == "USER") {
					localStorage.setItem('loggedUser', JSON.stringify(userData));
					window.location.href = 'dieta.html';
				} else if (userData.role == "NUTRITIONIST") window.location.href = 'gerencia-clientes.html';

			}).catch((error) => {
				console.error('Error while posting new diet:', error);
			});
		}).catch((error) => {
			console.error('Error while posting new profile:', error);
		});
	} else {
		form.classList.add('was-validated');
		const invalidFields = form.querySelectorAll(':invalid');
		const firstInvalidField = invalidFields[0];
		firstInvalidField.focus();
	}
}