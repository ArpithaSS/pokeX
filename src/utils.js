export async function getPokemonList() {
    const data = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    ).then((res) => res.json());
    return data.results;
  }
  
  export async function getPokemonDescription(id) {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    ).then((res) => res.json());
    return data.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, "");
  }
  
  export function getPokemonSpriteUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
  }