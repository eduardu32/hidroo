
async function criarTabelaUltimoItem() {
    const response = await fetch('http://localhost:3000/reator2/naoFinalizados');
    
    try {
        const ultimoItem = await response.json();

  
        const tabela = document.createElement('table');
        tabela.innerHTML = `
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Hidrogênio</th>
            <th>Hidrogênio Final</th>
            <th>Início Aquecimento</th>
            <th>Final Aquecimento</th>
            <th>Operador</th>
            <th>Iodo</th>
            <th>Catalisador</th>
            <th>Próxima Amostra</th>
            <th>Início Resfriamento</th>
            <th>Temperatura</th>
            <th>Batelada</th>
            <th>Finalizado</th>
          </tr>
          <tr>
            <td>${ultimoItem.data}</td>
            <td>${ultimoItem.hora}</td>
            <td>${ultimoItem.hidrogenioInicial}</td>
            <td>${ultimoItem.hidrogenioFinal}</td>
            <td>${ultimoItem.inicioAquecimento}</td>
            <td>${ultimoItem.finalAquecimento}</td>
            <td>${ultimoItem.operador}</td>
            <td>${ultimoItem.iodo}</td>
            <td>${ultimoItem.catalisador}</td>
            <td>${ultimoItem.proximaAmostra}</td>
            <td>${ultimoItem.inicioResfriamento}</td>
            <td>${ultimoItem.temperatura}</td>
            <td>${ultimoItem.batelada}</td>
            <td>${ultimoItem.finalizado}</td>
          </tr>
        `;
        const divTabela = document.getElementById('tabela');
        divTabela.innerHTML = '';
        divTabela.appendChild(tabela);


        async function buscarDados() {
          try {
            const numeroBatelada = ultimoItem.batelada
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
        
            // Utilize a função map() para transformar os dados da resposta em um array que pode ser utilizado na criação do gráfico
            const dadosGrafico = data.map((item) => [item.hora, item.temperatura,]);
        
            function desenharGrafico() {
              // Crie um objeto DataTable para armazenar os dados do gráfico
              var data = new google.visualization.DataTable();
              data.addColumn('string', 'Hora ');
              data.addColumn('number', 'Temperatura');
              
              // Insira os dados do gráfico
              data.addRows(dadosGrafico);
                
              // Configure as opções do gráfico
              var options = {
                title: 'Temperatura / Hora',
                curveType: 'function',
                legend: { position: 'bottom'},
                backgroundColor: '#212121',
                titleTextStyle: {
                  color: '#fff'
                },
                hAxis: {
                  textStyle: {
                    color: '#fff'
                  }
                },
                vAxis: {
                  textStyle: {
                    color: '3CB371',
                  },
                  gridlines: { count: 5 },
                },
                series: {
                  0: {
                    pointSize: 5,
                    pointShape: 'circle',
                    color: '#3CB371'
                  }
                },
                chartArea: {
                  width: '95%',
                  height: '80%',
                  left: '40',
                  top: '50'
                },
                width: 1690,
                height: 630,
              };
        
              // Crie um objeto Chart e passe a div onde o gráfico será exibido e as opções do gráfico
              var chart = new google.visualization.LineChart(document.getElementById('grafico'));
              chart.draw(data, options);
            }
        
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(desenharGrafico);  
          } catch (error) {
            console.error(error);
          }

        }
        

          buscarDados()

    } catch (error) {

        const divTabela = document.getElementById('div-tabela');
        divTabela.innerHTML = 'NENHUMA REAÇÃO EM ANDAMENTO';
        
    }
  }





criarTabelaUltimoItem()

  async function criarNovoRegistro() {
    const url = 'http://localhost:3000/reator2/atualizar';
  
    const data = {
      data: document.getElementById('data').value,
      hora: document.getElementById('hora').value,
      hidrogenioInicial: parseInt(document.getElementById('hidrogenioInicial').value),
      hidrogenioFinal: parseInt(document.getElementById('hidrogenioFinal').value),
      inicioAquecimento: document.getElementById('inicioAquecimento').value,
      finalAquecimento: document.getElementById('finalAquecimento').value,
      operador: document.getElementById('operador').value,
      iodo: parseInt(document.getElementById('iodo').value),
      proximaAmostra: document.getElementById('proximaAmostra').value,
      inicioResfriamento: document.getElementById('inicioResfriamento').value,
      temperatura: parseInt(document.getElementById('temperatura').value),
      batelada: document.getElementById('batelada').value,
      finalizado: document.getElementById('finalizado').checked
    };
  
    try {
      const response = await axios.post(url, data);
      console.log(response.data);
      alert("FICHA ATUALIZADA COM SUCESSO")
      criarTabelaUltimoItem()
    } catch (error) {
      console.error(error.response.data);
    }
  }
  
   
            

  //  NUMERO DA CARRETA = 
  // HIDROGENIO = HIDROGENIO FINAL