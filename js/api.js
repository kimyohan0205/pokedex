const pokedex = document.getElementById("pokedex");
const pokeCache = {};
console.log(pokedex);
const fetchpokemon = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=649';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const pokemon = data.results.map((result, index) => ({
        ...result,
        id: index + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,


    }));
    displaypokemon(pokemon);
}
function displaypokemon(pokemon) {
    const html = pokemon.map(pokeman =>
        ` <li class = "card" onclick="selectPokemon(${pokeman.id})">
            <img class = "card-img" src="${pokeman.img}"/>
            <h2 class = "card-title">${pokeman.id}.${pokeman.name}</h2>
           
        </li> `).join(' ');
    pokedex.innerHTML = html;
}
const selectPokemon = async (id) => {
    if(!pokeCache[id]){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    pokeCache[id] = pokeman;
    console.log(pokeCache)
    displayPopup(pokeman);
    }else{
        displayPopup(pokeCache[id]);
    }
    
}
const displayPopup = (pokeman) => {
    console.log(pokeman);
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    const image = pokeman.sprites['front_default'];
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">Close</button>
                <div class = "card">
                    <img class = "card-img" src="${image}"/>
                    <h2 class = "card-title">${pokeman.id}.${pokeman.name}</h2>
                    <p>
                        <small>Height:</small>${pokeman.height} |  <small>weight:</small>${pokeman.weight} | 
                        <small>Types:</small>${type}
                    </p>
                </div> 
        </div>`;
        pokedex.innerHTML = htmlString + pokedex.innerHTML;

};
const closePopup = () =>{
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchpokemon();
    