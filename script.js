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
