async function puxar_api() {
    await axios.get("http://localhost:8000/api/v1/dragon").then((response) => {
        const dragoes = response.data;
        const container = document.getElementById("dragon-container")
        dragoes.forEach(element => {
            const dragonDiv = document.createElement("div");
                dragonDiv.classList.add("dragon");
                dragonDiv.innerHTML = `
                    <img src="${element.foto}"></img>
                    <h2>${element.nome}</h2>
                    <p>${element.categoria}</p>
                `;
                container.appendChild(dragonDiv);
        })
    })
}
puxar_api()