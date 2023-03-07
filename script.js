async function buscarDados() {
  try {
    const numeroBatelada = document.getElementById("numeroBatelada").value;
    const response = await axios.get(`http://localhost:3000/reator2/batelada?numeroBatelada=${numeroBatelada}`);

    const data = response.data;
    console.log(data);

    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    data.forEach((item) => {
      const row = tabela.insertRow();
      row.insertCell().textContent = item.batelada;
      row.insertCell().textContent = item.data;
      row.insertCell().textContent = item.hora;
      row.insertCell().textContent = item.hidrogenioInicial;
      row.insertCell().textContent = item.inicioAquecimento;
      row.insertCell().textContent = item.finalAquecimento;
      row.insertCell().textContent = item.temperatura;
      row.insertCell().textContent = item.proximaAmostra;
      row.insertCell().textContent = item.iodo;
      row.insertCell().textContent = item.catalisador;
      row.insertCell().textContent = item.inicioResfriamento;
      row.insertCell().textContent = item.operador;
      row.insertCell().textContent = item.hidrogenioFinal;
      row.insertCell().textContent = item.finalizado;
    });
  } catch (error) {
    console.error(error);
  }
}

function abrirNovaReacao() {
  const button = document.getElementById('iniciarReacao');
  button.addEventListener('click', () => {
    // Abre uma nova página ao clicar no botão
    window.open('/andamento.html', '_blank');
  });
}

async function carregarDados() {
  try {
    const response = await axios.get('http://localhost:3000/reator2/Finalizados');
    const dados = response.data;

    const corpoTabela = document.getElementById('corpo-tabela');

    for (let i = 0; i < dados.length; i++) {
      const linha = document.createElement('tr');
      const colunaBatelada = document.createElement('td');
      colunaBatelada.textContent = dados[i].batelada;
      const colunaData = document.createElement('td');
      colunaData.textContent = dados[i].data;
      const colunaHora = document.createElement('td');
      colunaHora.textContent = dados[i].hora;
      const colunaHidrogenioInicial = document.createElement('td');
      colunaHidrogenioInicial.textContent = dados[i].hidrogenioInicial;
      const colunaInicioAquecimento = document.createElement('td');
      colunaInicioAquecimento.textContent = dados[i].inicioAquecimento;
      const colunaFinalAquecimento = document.createElement('td');
      colunaFinalAquecimento.textContent = dados[i].finalAquecimento;
      const colunaTemperatura = document.createElement('td');
      colunaTemperatura.textContent = dados[i].temperatura;
      const colunaProximaAmostra = document.createElement('td');
      colunaProximaAmostra.textContent = dados[i].proximaAmostra;
      const colunaIodo = document.createElement('td');
      colunaIodo.textContent = dados[i].iodo;
      const colunaCatalisador = document.createElement('td');
      colunaCatalisador.textContent = dados[i].catalisador;
      const colunaInicioResfriamento = document.createElement('td');
      colunaInicioResfriamento.textContent = dados[i].inicioResfriamento;
      const colunaOperador = document.createElement('td');
      colunaOperador.textContent = dados[i].operador;
      const colunaHidrogenioFinal = document.createElement('td');
      colunaHidrogenioFinal.textContent = dados[i].hidrogenioFinal;
      const colunaFinalizado = document.createElement('td');
      colunaFinalizado.textContent = dados[i].finalizado;
        
      linha.appendChild(colunaBatelada);
      linha.appendChild(colunaData);
      linha.appendChild(colunaHora);
      linha.appendChild(colunaHidrogenioInicial);
      linha.appendChild(colunaInicioAquecimento);
      linha.appendChild(colunaFinalAquecimento);
      linha.appendChild(colunaTemperatura);
      linha.appendChild(colunaProximaAmostra);
      linha.appendChild(colunaIodo);
      linha.appendChild(colunaCatalisador);
      linha.appendChild(colunaInicioResfriamento);
      linha.appendChild(colunaOperador);
      linha.appendChild(colunaHidrogenioFinal);
      linha.appendChild(colunaFinalizado);

      corpoTabela.appendChild(linha);
    }
  } catch (error) {
    console.error(error);
  }
}

carregarDados()