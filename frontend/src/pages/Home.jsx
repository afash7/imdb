import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/movies/')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Popular Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map(movie => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className="bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
          >
            {/* <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-t-xl"
            /> */}
            <img
              src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
              <p className="text-sm text-gray-400">Rating: {movie.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
