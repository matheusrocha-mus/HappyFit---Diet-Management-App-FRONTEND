document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitMode').addEventListener('click', () => {
        event.preventDefault();

        var selectedMode = document.querySelector('input[name="modalidade"]:checked').value;

        if (selectedMode === 'alone') {
            window.location.href = 'perfil-alimentar.html';
        } else if (selectedMode === 'withNutritionist') {
            document.getElementById('mode-choice').classList.add("d-none");
            document.getElementById('nutricionist-chosen').classList.remove("d-none");
            document.getElementById("show-id").textContent = userData.email;
        }
    });
});