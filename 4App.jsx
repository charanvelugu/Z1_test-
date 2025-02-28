import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectItem } from "@/components/ui/select";

const API_URL = "https://api.thecatapi.com/v1/images/search?limit=10";
const BREEDS_URL = "https://api.thecatapi.com/v1/breeds";

export default function CatGallery() {
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  const fetchCats = async () => {
    const url = selectedBreed ? `${API_URL}&breed_ids=${selectedBreed}` : API_URL;
    const response = await fetch(url);
    const result = await response.json();
    setCats(result);
  };

  const fetchBreeds = async () => {
    const response = await fetch(BREEDS_URL);
    const result = await response.json();
    setBreeds(result);
  };

  useEffect(() => {
    fetchCats();
    fetchBreeds();
  }, [selectedBreed]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex gap-2 mb-4">
        <Select onValueChange={setSelectedBreed} value={selectedBreed}>
          <SelectItem value="">All Breeds</SelectItem>
          {breeds.map((breed) => (
            <SelectItem key={breed.id} value={breed.id}>{breed.name}</SelectItem>
          ))}
        </Select>
        <Button onClick={fetchCats}>Refresh</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cats.map((cat) => (
          <Card key={cat.id}>
            <CardContent>
              <img src={cat.url} alt="Cat" className="w-full h-48 object-cover rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
