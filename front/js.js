async function criarSlider() {
    try {
        // Puxa os dados da API
        const response = await axios.get("http://localhost:8000/api/v1/dragon");
        const dragoes = response.data; // Lista de dragões recebida da API
        const sliderDiv = document.getElementById("dragon-container"); // Seleciona o container principal

        // Cria o contêiner principal da lista (a div.list)
        const listDiv = document.createElement("div");
        listDiv.classList.add("list"); // Adiciona a classe 'list'
        sliderDiv.appendChild(listDiv); // Adiciona a div.list no #dragon-container

        // Define o número total de itens como variável CSS
        sliderDiv.style.setProperty("--quantity", dragoes.length);

        // Cria dinamicamente os itens do slider
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

// Função para abrir o modal com as informações do dragão
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

// Chama a função para criar o slider ao carregar a página
criarSlider();
