import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export default function PokemonInfoApp() {
  const [pokemon, setPokemon] = useState("");
  const [data, setData] = useState(null);

  const fetchPokemon = async (query) => {
    if (!query) return;
    try {
      const response = await fetch(`${API_URL}/${query.toLowerCase()}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setData(null);
    }
  };

  const handleNextPrev = (offset) => {
    if (!data) return;
    const newId = data.id + offset;
    if (newId > 0) {
      fetchPokemon(newId);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter Pokémon name or ID..."
          value={pokemon}
          onChange={(e) => setPokemon(e.target.value)}
        />
        <Button onClick={() => fetchPokemon(pokemon)}>Search</Button>
      </div>

      {data && (
        <Card className="mb-4 text-center">
          <CardContent>
            <img src={data.sprites.front_default} alt={data.name} className="w-32 mx-auto" />
            <h2 className="text-lg font-bold capitalize">{data.name}</h2>
            <p>Types: {data.types.map((t) => t.type.name).join(", ")}</p>
            <p>Stats:</p>
            <ul>
              {data.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <Button onClick={() => handleNextPrev(-1)}>Previous</Button>
              <Button onClick={() => handleNextPrev(1)}>Next</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
