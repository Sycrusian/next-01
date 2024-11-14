import Image from "next/image";
import { PokemonCollection, PokemonData } from "../page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
  const pokemons: PokemonCollection = await response.json();

  return pokemons.results.map((pokemon, index) => ({ id: `${index+1}` }));
}

const Pokemon = async ({ params }: PageProps) => {
  const id = (await params).id;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: PokemonData = await response.json();
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <Image width={500} height={500} src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}

export default Pokemon;