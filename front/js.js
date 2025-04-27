async function puxar_api() {
    await axios.get("http://localhost:8000/api/v1/dragon").then((response) => {
        const dragoes = response.data; // Dragões recebidos da API
        console.log(dragoes); // Log para validar os dados

        const container = document.getElementById("dragon-container");
        
        // Loop para cada dragão
        dragoes.forEach(element => {
            const dragonDiv = document.createElement("div");
            dragonDiv.classList.add("dragon");

            dragonDiv.innerHTML = `
                <img src="${element.foto_ovo}" alt="Ovo do Dragão"></img>
                <img src="${element.foto_bebe}" alt="Dragão Bebê"></img>
                <img src="${element.foto_adulto}" alt="Dragão Adulto"></img>
                <h2>${element.nome}</h2>
                <p>Categoria: ${element.categoria}</p>
                <p>Raridade: ${element.raridade}</p>
            `;

            container.appendChild(dragonDiv);
        });
    }).catch(error => {
        console.error("Erro ao puxar dados da API:", error);
    });
}
puxar_api();
