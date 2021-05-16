const pokedex = document.getElementById("pokedex");
console.log(pokedex);
const fetchpokemon = () => {
    const promises = [];
    for (let i = 1; i <= 649; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            img: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join('  ')
        }));
        console.log(pokemon);
        displaypokemon(pokemon);
    });
}
function displaypokemon(pokemon) {
    const html = pokemon.map(pokeman =>
        ` <li class = "card">
            <img class = "card-img" src="${pokeman.img}"/>
            <h2 class = "card-title">${pokeman.id}.${pokeman.name}</h2>
            <p class = "card-subtitle">Types: ${pokeman.type}</p>
        </li> `).join(' ');
    pokedex.innerHTML = html;
    const url = 'https://pokeapi.co/api/v2/pokemon-color/pikachu';
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data => {
           console.log(data.name);

        }))
    } 

fetchpokemon();