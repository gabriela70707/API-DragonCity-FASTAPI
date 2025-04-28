async function criarSlider() {
    try {
        // Puxa os dados da API
        const response = await axios.get("http://localhost:8000/api/v1/dragon");
        const dragoes = response.data; // Lista de dragões recebida da API
        const sliderDiv = document.getElementById("dragon-container"); // Pegar o container principal

        // Cria o contêiner principal da lista (a div.list)
        const listDiv = document.createElement("div");
        listDiv.classList.add("list"); // Adiciona a classe 'list'
        sliderDiv.appendChild(listDiv); // Adiciona a div.list no #dragon-container

        // Define o número total de itens como variável CSS
        sliderDiv.style.setProperty("--quantity", dragoes.length);

        // Criar dinamicamente os itens do slider
        dragoes.forEach((dragon, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("item");
            itemDiv.style.setProperty("--position", index + 1); // Define a posição dinâmica do item

            // Adiciona apenas a imagem do ovo no item
            itemDiv.innerHTML = `<img src="${dragon.foto_ovo}" alt="Ovo do ${dragon.nome}">`;

            // Adiciona evento de clique para abrir o modal
            itemDiv.addEventListener("click", () => abrirModal(dragon));

            // Adiciona o item na div.list
            listDiv.appendChild(itemDiv);
        });
    } catch (error) {
        console.error("Erro ao puxar dados da API:", error);
    }
}


function abrirModal(dragon) {
    const modal = document.getElementById("modal");
    const modalNome = document.getElementById("modal-nome");
    const modalCategoria = document.getElementById("modal-categoria");
    const modalRaridade = document.getElementById("modal-raridade");
    const modalFoto = document.getElementById("modal-foto");
    const modalFotoBebe = document.getElementById("modal-foto-bebe");
    const modalFotoAdulto = document.getElementById("modal-foto-adulto");

    // Preenche os dados no modal
    modalNome.textContent = dragon.nome;
    modalCategoria.textContent = `Categoria: ${dragon.categoria}`;
    modalRaridade.textContent = `Raridade: ${dragon.raridade}`;
    modalFoto.src = dragon.foto_ovo;
    modalFotoBebe.src = dragon.foto_bebe;
    modalFotoAdulto.src = dragon.foto_adulto;
    modalFoto.alt = dragon.nome;

    // Mostra o modal
    modal.classList.remove("hidden");
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById("modal").classList.add("hidden");
}

// Adiciona evento de clique no botão "X"
document.querySelector(".close").addEventListener("click", fecharModal);


// Detecta cliques fora do conteúdo do modal para fechá-lo
document.getElementById("modal").addEventListener("click", (event) => {
    const modalContent = document.querySelector(".modal-content");
    if (!modalContent.contains(event.target)) {
        fecharModal();
    }
});

//O event.target quando você quer identificar exatamente onde o evento aconteceu.
/*
Exemplo:
imagine uma lista simples:
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>


document.querySelector("ul").addEventListener("click", (event) => {
    console.log(event.target); // Mostra o elemento clicado
});

Se você clicar em Item 1, event.target será o <li> correspondente ao "Item 1".

Se clicar em Item 2, event.target será o <li> correspondente ao "Item 2".

target = para ver onde o evento aconteceu 
exemplo : evento de click como no codigo 
o target mostra onde aconteceu o click
*/

// Chama a função para criar o slider ao carregar a página
criarSlider();
