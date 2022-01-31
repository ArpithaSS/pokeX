import { useEffect, useState } from "react";

import { getPokemonList, getPokemonDescription } from "./utils";

export default function App() {
  const [list, setPokemonList] = useState(null);
  //by default we will set the pokemon to 1
  const [selectedPokemon, setSelectedPokemon] = useState(1);
  const [description, setDescription] = useState(1);

  //function to get selected pokemon from select

  function handleSelect(e) {
    setSelectedPokemon(e.target.value);
  }

  console.log(selectedPokemon);

  useEffect(() => {
    //fetching pokemon from poke api
    async function getList() {
      try {
        const list = await getPokemonList();
        setPokemonList(list);

        //now we will get the description of the selected pokemon from different api

        //getPokemonDescription expects id that needs to send to getPokemondescription api
        //we will send index of selected pokemon

        const description = await getPokemonDescription(selectedPokemon);

        setDescription(description);

        // console.log(list);
      } catch (e) {
        console.log(e);
      }
    }
    getList();
    //description is not changing because the app needs to rerender in order to see those changes for description
    //we will add selectedpokemon dependency in useeffect so that app renders again when selected pokemon changes
  }, [selectedPokemon]);

  // console.log(list);

  function togglePokemon(id) {
    //id would be 0 or 1
    //if 0 than we will trigger previous button

    console.log(id);

    if (id === 0) setSelectedPokemon(Number(selectedPokemon) - 1);

    //if 1 than we will trigger next button
    if (id === 1) setSelectedPokemon(Number(selectedPokemon) + 1);
  }

  return (
    <div className="border-solid">
      <select onChange={handleSelect} value={selectedPokemon}>
        {list?.map((pokemon, index) => (
          <option key={index + 1} value={index + 1}>
            {pokemon.name}
          </option>
        ))}
      </select>
      {/* //we got index of pokemon that was selected this index we will send to get image of selected pokemon */}

      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${selectedPokemon}.png`}
        alt="pokemon"
        style={{ width: 200, height: 200 }}
      />

      <p>{description}</p>

      {/* now we will add next and prev button */}

      {/* app breaks when the list of pokemon has the index of -1 in order to fix this we will disable the button */}
      <button disabled={selectedPokemon === 1} onClick={() => togglePokemon(0)}>
        Prev
      </button>

      <button
        disabled={selectedPokemon === list?.length - 1}
        onClick={() => togglePokemon(1)}
      >
        Next
      </button>
    </div>
  );
}