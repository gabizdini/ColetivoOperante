function toggleSubmenu(element) {
    const submenu = element.querySelector('.submenu'); // Seleciona o submenu dentro do item
    const arrow = element.querySelector('.arrow'); // Seleciona a seta dentro do item

    submenu.classList.toggle('submenu-active'); // Alterna a visibilidade do submenu
    arrow.classList.toggle('arrow-active'); // Alterna a classe da seta
}

function loadNavbar() {
    fetch("navbar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("navbar").innerHTML = data; // Adiciona o HTML carregado ao elemento
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Carrega a barra de navegação ao iniciar a página
document.addEventListener("DOMContentLoaded", loadNavbar);


// Função para carregar e exibir dados da planilha do Google Sheets
function loadGoogleSheetData() {
    // ID da planilha do Google Sheets
    const spreadsheetId = '1t1KVC8akGxbfKro3eFTMGddUFWP--Yj5vaerVdVuBFE';
    // ID da planilha dentro do documento (geralmente 0 para a primeira planilha)
    const sheetId = 0;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'evento!A2:Z' // Substitua pelo nome da aba que você deseja ler
    }).then(function(response) {
        const data = response.result.values;
        const tableBody = document.querySelector('#actions-table tbody');

        // Limpe qualquer conteúdo existente na tabela
        tableBody.innerHTML = '';

        // Preencha a tabela com os dados da planilha
        data.forEach(function(row) {
            const rowData = row.map(item => item || ''); // Lida com valores nulos ou indefinidos

            const tableRow = document.createElement('tr');
            rowData.forEach(function(cellData) {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                tableRow.appendChild(cell);
            });

            tableBody.appendChild(tableRow);
        });
    });
}

// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyBXzRa51UzuTHkJXUmyxhcmO8Owq4CiTVs',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetData();
    });
}

// Carrega a API do Google Sheets e inicia a aplicação
gapi.load('client', initGoogleSheetsApi);

