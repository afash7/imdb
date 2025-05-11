import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/movies/${id}/`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={movie.poster} alt={movie.title} className="w-full md:w-1/3 rounded-xl" />
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-300 mb-4">{movie.description}</p>
          <p className="text-lg font-semibold">Rating: {movie.rating}</p>
          <p className="text-sm text-gray-500 mt-2">Release Date: {movie.release_date}</p>
        </div>
      </div>
    </div>
  );
}