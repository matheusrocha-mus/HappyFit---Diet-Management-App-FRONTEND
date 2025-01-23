//document.getElementById('header').onLoad = (event) => {
document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('header').innerHTML = `
		<nav class="navbar navbar-expand-md">
			<div class="container-fluid">
				<a class="navbar-brand mx-3 expand-on-hover" href="index.html">
					<img class="logo" src="assets/images/logo.png" alt="logo">
				</a>
				<button id="navbar-toggler" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div id="navbar-collapse" class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav ms-auto me-auto">
						<li id="home-link" class="nav-item expand-on-hover">
							<a class="nav-link" aria-current="page" href="index.html">Home</a>
						</li>
						<li id="about-link" class="nav-item expand-on-hover">
							<a class="nav-link" href="index.html#sobre">Desenvolvedores</a>
						</li>
						<li id="manager-link" class="nav-item expand-on-hover">
							<a class="nav-link" href="gerencia-clientes.html">Gerência de Clientes</a>
						</li>
						<li id="diet-link" class="nav-item expand-on-hover">
							<a class="nav-link" href="dieta.html">Dieta</a>
						</li>
						<li id="diary-link" class="nav-item expand-on-hover">
							<a class="nav-link" href="diario-alimentar.html">Diário Alimentar</a>
						</li>
					</ul>
				</div>
				<div class="d-grid gap-2 d-md-flex justify-content-md-end">
					<a id="login-button" class="btn login btn-outline-light me-md-2 expand-on-hover" type="button" href="login.html">Login</a>
					<a id="register-button" class="btn btn-primary cadastro expand-on-hover" type="button" href="cadastro.html">Cadastro</a>
				</div>
				<div id="account" class="me-3">
					<div id="account-button">
						<img id="account-avatar" src="assets/images/default-user.jpg"/>
					</div>
					<div id="account-menu">
						<h3 id="account-name"></h3>
						<ul class="ps-0">
							<li>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
									<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
								</svg>
								<a href="account.html">&nbsp;Minha Conta</a>
							</li>
							<li>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
									<path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
									<path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
								</svg>
								<a id="loggout" href="index.html">&nbsp;Sair</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
    `;
});