import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('Home component rendering'); 

  useEffect(() => {
    console.log('useEffect is running'); 

    const fetchMovies = async () => {
      console.log('fetchMovies is called'); 
      try {
        console.log('Attempting axios.get'); 
        const res = await axios.get('/api/movies/'); 
        console.log('Received data:', res.data); 
        setMovies(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies.");
        setLoading(false);
      }
    };

    fetchMovies();
    console.log('fetchMovies function called in useEffect');

  }, []);

  console.log('Current movies state:', movies); 


  if (loading) {
    console.log('Rendering Loading state'); 
    return <div className="p-4 text-white text-center">Loading movies...</div>;
  }

  if (error) {
    console.log('Rendering Error state'); 
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  console.log('Rendering movie list with movies:', movies); 

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Popular Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* این خط 👇 است که خطای movies.map ممکن است در آن رخ دهد */}
        {movies.map(movie => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="bg-gray-800 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-3 flex-grow flex flex-col justify-between">
              <div>
                 <h2 className="text-lg font-semibold truncate mb-1">{movie.title}</h2>
                 {movie.rating > 0 && (
                    <p className="text-sm text-gray-400 flex items-center">
                        ⭐ <span className="ml-1">{movie.rating.toFixed(1)} / 10</span>
                    </p>
                 )}
              </div>
            </div>
          </Link>
        ))}
      </div>
       {movies.length === 0 && !loading && !error && (
            <div className="text-center text-gray-500 mt-8">No movies available.</div>
       )}
    </div>
  );
}