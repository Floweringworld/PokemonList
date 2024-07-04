"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { PokemonType } from "./types/Pokemons";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonType[]>([]);

  useEffect(() => {
    const pokemons = async () => {
      try {
        const response = await axios.get(
          `https://pokemon-list-kappa-livid.vercel.app/api/pokemons`
        );
        setPokemonList(response.data);
        return response.data;
      } catch (error) {
        console.log("error", error);
      }
    };
    pokemons();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4 justify-items-center m-3">
      {pokemonList.map((pokemon, index) => (
        <Link
          key={index}
          className="flex w-64 h-40 flex-col justify-center items-center border rounded-xl"
          href={`PokemonDetail/${pokemon.id}`}
        >
          <p className=" text-left text-xs">도감 번호 : {pokemon.order}</p>
          <Image
            src={pokemon.sprites.front_default}
            width={100}
            height={100}
            alt="pokemon"
          />

          <p>{pokemon.korean_name}</p>
        </Link>
      ))}
    </div>
  );
}
