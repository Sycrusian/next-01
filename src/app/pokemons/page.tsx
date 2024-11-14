import Link from 'next/link';

export interface PokemonData {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  }
}

export interface PokemonCollection {
  results: PokemonData[]
}

const catchPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const pokemons: PokemonCollection = await response.json();
  return pokemons;
}

const Pokemons = async () => {
  const pokemons = await catchPokemons();
  return (
    <ul>
      {pokemons.results.map((pokemon, index) => {
        return (
          <Link key={index} href={`/pokemons/${index+1}`}>
            <li>{pokemon.name}</li>
          </Link>
        );
      })}
    </ul>
  );
}

export default Pokemons;