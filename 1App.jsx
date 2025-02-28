import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Search } from "lucide-react";

const API_KEY = "YOUR_OMDB_API_KEY";
const API_URL = "https://www.omdbapi.com/";

export default function MovieSearchApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async () => {
    if (!searchTerm) return;
    const response = await fetch(`${API_URL}?s=${searchTerm}&apikey=${API_KEY}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const fetchMovieDetails = async (id) => {
    const response = await fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={searchMovies}><Search size={20} /></Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Card key={movie.imdbID} onClick={() => fetchMovieDetails(movie.imdbID)} className="cursor-pointer">
            <CardContent>
              <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover rounded-lg" />
              <h2 className="text-lg font-bold mt-2">{movie.Title}</h2>
              <p className="text-gray-500">{movie.Year}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMovie && (
        <Dialog open={Boolean(selectedMovie)} onOpenChange={() => setSelectedMovie(null)}>
          <DialogContent>
            <DialogTitle>{selectedMovie.Title} ({selectedMovie.Year})</DialogTitle>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="w-full rounded-lg" />
            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
            <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
            <p><strong>Director:</strong> {selectedMovie.Director}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
