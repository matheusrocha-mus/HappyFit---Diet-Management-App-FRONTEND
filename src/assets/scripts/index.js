const apiURL = `${API_URL}`;

async function fetchDiaryCount() {
    try {
      const response = await fetch(`${API_URL}/diary/count`);
      const data = await response.json();   
      return data;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  async function fetchNumDias() {
    try {
      const response = await fetch(`${API_URL}/diary/countDate`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  async function fetchNumUsuarios() {
    try {
      const response = await fetch(`${API_URL}/user/count`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  async function fetchNumUsuariosComum() {
    try {
      const response = await fetch(`${API_URL}/user/role`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }

  async function fetchNumUsuariosSemNutricionista() {
    try {
      const response = await fetch(`${API_URL}/user/nutritionist_id`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }


  async function updateDetails(){
    const totalDiary = await fetchDiaryCount();
    const totalDias = await fetchNumDias();
    const totalUser = await fetchNumUsuarios();
    const totalUsersComum = await fetchNumUsuariosComum();
    const totalUserSemNutri = await fetchNumUsuariosSemNutricionista();

    const barra1 = (((totalUser - totalUserSemNutri)/totalUsersComum)*100).toFixed(2);

    document.getElementById('mediaRefeicoes').textContent = ((totalDiary/totalDias)/totalUser).toFixed(2);
    document.getElementById('barraProgresso1').style = `Width: ${barra1}%`;
    document.getElementById('barraProgresso1').textContent = `${barra1}%`;

  }

  updateDetails();