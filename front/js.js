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
    modalNome.setAttribute("data-id", dragon.id); // Salvar ID do dragão
    modalCategoria.textContent = `Categoria: ${dragon.categoria}`;
    modalRaridade.textContent = `Raridade: ${dragon.raridade}`;
    modalFoto.src = dragon.foto_ovo;
    modalFotoBebe.src = dragon.foto_bebe;
    modalFotoAdulto.src = dragon.foto_adulto;
    modalFoto.alt = dragon.nome;

    // Mostra o modal
    modal.classList.remove("hidden");

    // Adiciona evento no botão Editar para abrir o modal de adicionar com os dados preenchidos
    document.querySelector(".botoes button:nth-child(1)").addEventListener("click", () => abrirModalEdicao(dragon));
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


/*Adicionando o CRUD*/ 
document.querySelector("button").addEventListener("click", () => {
    const modalAdicionar = document.getElementById("modal-adicionar");

    // Limpa os campos antes de abrir o modal
    document.getElementById("nome-dragao").value = "";
    document.getElementById("categoria-dragao").value = "";
    document.getElementById("raridade-dragao").value = "";
    document.getElementById("foto-ovo").value = "";
    document.getElementById("foto-bebe").value = "";
    document.getElementById("foto-jovem").value = "";
    
    // Remove qualquer ID salvo anteriormente (evita que a edição se misture com criação)
    modalAdicionar.removeAttribute("data-id");

    // Modifica a ação do botão para salvar um novo dragão
    document.querySelector("#modal-adicionar button").setAttribute("onclick", "salvarDragao()");

    // Exibe o modal
    modalAdicionar.classList.remove("hidden");
});

function fecharModalAdicionar() {
    document.getElementById("modal-adicionar").classList.add("hidden");
}

document.getElementById("modal-adicionar").addEventListener("click", (event) => {
    const modalContent = document.querySelector(".modal-content-adicionar");
    if (!modalContent.contains(event.target)) {
        fecharModalAdicionar();
    }
});





async function salvarDragao() {

    const nome = document.getElementById("nome-dragao").value;
    const categoria = document.getElementById("categoria-dragao").value;
    const raridade = document.getElementById("raridade-dragao").value;
    const fotoOvo = document.getElementById("foto-ovo").files[0];
    const fotoBebe = document.getElementById("foto-bebe").files[0];
    const fotoJovem = document.getElementById("foto-jovem").files[0];

    if (!nome || !categoria || !raridade) {
        alert("Por favor, preencha todas as informações!");
        return;
    }

    // Verificar se todas as imagens foram adicionadas
    if (!fotoOvo || !fotoBebe || !fotoJovem) {
        alert("Por favor, envie todas as imagens (ovo, bebê e jovem)!");
        return;
    }

    try {
        // Criando o dragão na API
        const response = await axios.post("http://localhost:8000/api/v1/dragon/", {
            nome: nome,
            categoria: categoria,
            raridade: raridade
        });

        const dragonId = response.data.id;
        console.log("Dragão criado com ID:", dragonId);

        // Faz upload das imagens
        await enviarImagem(dragonId, "ovo", fotoOvo);
        await enviarImagem(dragonId, "bebe", fotoBebe);
        await enviarImagem(dragonId, "adulto", fotoJovem);

        alert("Dragão cadastrado com sucesso!");
        fecharModalAdicionar();
        atualizarCarrosselComNovoDragao(response.data);

    } catch (error) {
        console.error("Erro ao cadastrar dragão:", error.response ? error.response.data : error);
        alert("Erro ao salvar. Verifique o console.");
    }
}


function atualizarCarrosselComNovoDragao(dragon) {
    const listDiv = document.querySelector(".list");

    // Cria um novo item para o carrossel
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.style.setProperty("--position", document.querySelectorAll(".item").length + 1);
    itemDiv.innerHTML = `<img src="${dragon.foto_ovo}" alt="Ovo do ${dragon.nome}">`;

    // Adiciona evento para abrir o modal do novo dragão
    itemDiv.addEventListener("click", () => abrirModal(dragon));

    // Adiciona o novo dragão na lista
    listDiv.appendChild(itemDiv);
}




async function enviarImagem(dragonId, fase, file) {
    if (!file) return; // Se não houver imagem, não faz upload

    let formData = new FormData();
    formData.append("foto", file);

    try {
        const response = await axios.post(`http://localhost:8000/api/v1/dragon/upload-foto/${dragonId}?fase=${fase}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        console.log(`Imagem da fase ${fase} enviada com sucesso!`, response.data);
    } catch (error) {
        console.error(`Erro ao enviar imagem da fase ${fase}:`, error.response ? error.response.data : error);
        alert(`Erro ao enviar imagem da fase ${fase}. Verifique o console.`);
    }
}



document.querySelector(".botoes button:nth-child(1)").addEventListener("click", () => {
    editarDragao();
});

document.querySelector(".botoes button:nth-child(2)").addEventListener("click", () => {
    excluirDragao();
});

async function salvarEdicaoDragao() {
    const dragonId = document.getElementById("modal-adicionar").getAttribute("data-id");
    const nome = document.getElementById("nome-dragao").value;
    const categoria = document.getElementById("categoria-dragao").value;
    const raridade = document.getElementById("raridade-dragao").value;
    const fotoOvo = document.getElementById("foto-ovo").files[0];
    const fotoBebe = document.getElementById("foto-bebe").files[0];
    const fotoJovem = document.getElementById("foto-jovem").files[0];

    if (!nome || !categoria || !raridade) {
        alert("Por favor, preencha todas as informações!");
        return;
    }

    try {
        // Atualizar os dados do dragão
        await axios.put(`http://localhost:8000/api/v1/dragon/${dragonId}`, {
            nome: nome,
            categoria: categoria,
            raridade: raridade
        });

        // Se houver novas imagens, envia para a API
        if (fotoOvo) await enviarImagem(dragonId, "ovo", fotoOvo);
        if (fotoBebe) await enviarImagem(dragonId, "bebe", fotoBebe);
        if (fotoJovem) await enviarImagem(dragonId, "adulto", fotoJovem);

        alert("Dragão atualizado com sucesso!");
        fecharModalAdicionar();
        location.reload();
    } catch (error) {
        console.error("Erro ao editar dragão:", error);
        alert("Erro ao editar. Verifique o console.");
    }
}


function abrirModalEdicao(dragon) {
    const modalAdicionar = document.getElementById("modal-adicionar");

    // Preenche o modal de edição com os dados do dragão
    document.getElementById("nome-dragao").value = dragon.nome;
    document.getElementById("categoria-dragao").value = dragon.categoria;
    document.getElementById("raridade-dragao").value = dragon.raridade;
    modalAdicionar.setAttribute("data-id", dragon.id); // Guarda o ID

    // Modifica a ação do botão para salvar a edição
    document.querySelector("#modal-adicionar button").setAttribute("onclick", "salvarEdicaoDragao()");

    // Exibe o modal
    modalAdicionar.classList.remove("hidden");
}



async function excluirDragao() {
    const dragonId = document.getElementById("modal-nome").getAttribute("data-id");

    const confirmar = confirm("Tem certeza que deseja excluir este dragão?");
    if (!confirmar) return;

    try {
        await axios.delete(`http://localhost:8000/api/v1/dragon/${dragonId}`);
        alert("Dragão excluído com sucesso!");
        fecharModal();
        location.reload();
    } catch (error) {
        console.error("Erro ao excluir dragão:", error);
        alert("Erro ao excluir o dragão. Verifique o console.");
    }
}
