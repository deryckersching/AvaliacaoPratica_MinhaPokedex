const pokemonsGrid = document.getElementById("pokemonsGrid");
let todosPokemons = [];

async function pegarPokemons() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await response.json();
        console.log(data)

        todosPokemons = await Promise.all(
            data.results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                return await response.json();
            })

        );

        renderizarPokemons();
    } catch (error) {
        console.log(error);

    };

};

function renderizarPokemons() {
    console.log(todosPokemons);

todosPokemons.forEach(pokemon => {
    const coluna = document.createElement("div");
    coluna.classList.add("col-3");


    const card = document.createElement("div");
    card.classList.add("card");

    const imagem = document.createElement("img");
    imagem.src = pokemon.sprites.other["official-artwork"].front_default;
    imagem.alt = pokemon.name;
    imagem.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const nome = document.createElement("h5");
    nome.textContent = pokemon.name;
    nome.classList.add("card-title");

    card.appendChild(imagem);
    cardBody.appendChild(nome);
    card.appendChild(cardBody);
    coluna.appendChild(card);
    pokemonsGrid.appendChild(coluna);

    card.addEventListener("click", () => {
        abrirModal(pokemon);

        });

    });

}



function abrirModal(pokemon) {
    const modalTitulo = document.getElementById("modalTitulo");
    const modalConteudo = document.getElementById("modalConteudo");
    const modal = document.getElementById("pokemonModal");
    modalTitulo.textContent = pokemon.name;

    modalConteudo.innerHTML = `
        <img
            src="${pokemon.sprites.other["official-artwork"].front_default}"
            alt="${pokemon.name}"
        >
    `;

    const modalBootstrap = new bootstrap.Modal(modal);
    modalBootstrap.show();

}

pegarPokemons();