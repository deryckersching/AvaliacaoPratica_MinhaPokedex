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
    card.classList.add("card", "pokemon-card");

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

    const tipos = pokemon.types.map(item => item.type.name);

    const stats = pokemon.stats.map(stat => {
        return {
            nome: stat.stat.name,
            valor: stat.base_stat
        };
    });

    const hp = stats.find(stat => stat.nome === "hp");

    const attack = stats.find(stat => stat.nome === "attack");

    const defense = stats.find(stat => stat.nome === "defense");

    const specialAttack = stats.find(stat => stat.nome === "special-attack");

    const specialDefense = stats.find(stat => stat.nome === "special-defense");

    const speed = stats.find(stat => stat.nome === "speed");




    modalTitulo.textContent = pokemon.name;

    modalConteudo.innerHTML = `
        <img
            src="${pokemon.sprites.other["official-artwork"].front_default}"
            alt="${pokemon.name}"
        >

        <p>Tipo: ${tipos.join(" / ")}</p>

        <p>HP: ${hp.valor}</p>

        <p>Ataque: ${attack.valor}</p>

        <p>Defesa: ${defense.valor}</p>

        <p>Ataque Especial: ${specialAttack.valor}</p>

        <p>Defesa Especial: ${specialDefense.valor}</p>

        <p>Velocidade: ${speed.valor}</p>
    `;

    const modalBootstrap = new bootstrap.Modal(modal);
    modalBootstrap.show();
}

    

pegarPokemons();