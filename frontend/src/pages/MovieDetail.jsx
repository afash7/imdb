// frontend/src/pages/MovieDetail.jsx:
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [reviewError, setReviewError] = useState(null); 

  const fetchReviews = async (movieId) => {
     try {
        const res = await axios.get(`/api/reviews/?movie=${movieId}`);
        setReviews(res.data);
     } catch (err) {
        console.error("Error fetching reviews:", err);
     }
  };


  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      try {
        const movieRes = await axios.get(`/api/movies/${id}/`);
        setMovie(movieRes.data);

        await fetchReviews(id);

        setLoading(false); 
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load movie details."); 
        setLoading(false); 
      }
    };

    fetchMovieAndReviews();
  }, [id]); 

  const handleReviewChange = e => {
    const { name, value } = e.target;
    setNewReview(prevState => ({ ...prevState, [name]: value }));
  };

  const handleReviewSubmit = async e => {
    e.preventDefault();
    setReviewError(null); 

    const token = localStorage.getItem('access_token'); 
    if (!token) {
      console.error("User not authenticated. Please log in to submit a review.");
      setReviewError("Please log in to submit a review.");
      return;
    }

    if (newReview.rating === 0 || newReview.comment.trim() === "") {
        setReviewError("Please provide a rating and a comment.");
        return;
    }


    try {
      await axios.post(
        '/api/reviews/create/', 
        { ...newReview, movie: id }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      await fetchReviews(id);

      setNewReview({ rating: 0, comment: '' });
      alert("Review submitted successfully!"); 

    } catch (error) {
      console.error("Failed to submit review:", error.response ? error.response.data : error);
      if (error.response && error.response.data) {
           if (error.response.data.non_field_errors) {
               setReviewError(error.response.data.non_field_errors[0]);
           } else if (typeof error.response.data === 'object') {
               const fieldErrors = Object.values(error.response.data).flat().join(" ");
                setReviewError(`Submission failed: ${fieldErrors}`);
           } else {
               setReviewError("Failed to submit review. Please try again.");
           }
      } else {
          setReviewError("Failed to submit review. Please check your connection.");
      }
    }
  };


  if (loading) {
    return <div className="p-4 text-white text-center">Loading movie details...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  if (!movie) {
       return <div className="p-4 text-white text-center">Movie not found.</div>;
  }


  return (
    <div className="container mx-auto p-6 text-white">
      <div className="flex flex-col md:flex-row gap-8"> 
        <img
          src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover" 
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-yellow-400 mb-3">{movie.title}</h1> 
          {movie.rating > 0 && (
               <p className="text-xl font-semibold text-gray-300 mb-4 flex items-center">
                    ⭐ <span className="ml-2">{movie.rating.toFixed(1)} / 10</span>
               </p>
          )}
          <p className="text-base text-gray-300 mb-4 leading-relaxed">{movie.description}</p>
          <p className="text-sm text-gray-500">Release Date: {movie.release_date}</p>
        </div>
      </div>

      <div className="mt-12"> 
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">Reviews</h2> 

        <div className="mb-8"> 
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="bg-gray-800 p-5 rounded-lg shadow-md mb-5 border border-gray-700"> 
                <div className="flex justify-between items-center mb-3">
                    <p className="text-yellow-400 font-semibold">{review.user ? review.user.full_name : 'Anonymous'}</p> 
                    <p className="text-sm text-gray-400">Rating: {review.rating} / 10</p> 
                </div>
                <p className="text-gray-300 leading-normal">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No reviews yet. Be the first to write a review!</div>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"> 
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">Add Your Review</h3> 

          {reviewError && (
              <div className="bg-red-500 text-white p-3 rounded mb-4">{reviewError}</div>
          )}

          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-2">Rating:</label> 
              <select
                id="rating"
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 outline-none" 
                required
              >
                <option value="0">Select rating</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rate => (
                  <option key={rate} value={rate}>{rate}</option>
                ))}
              </select>
            </div>
            <div className="mb-6"> 
              <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">Comment:</label> 
              <textarea
                id="comment"
                name="comment"
                rows="4"
                value={newReview.comment}
                onChange={handleReviewChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 outline-none resize-none" 
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 transition-colors duration-300">Submit Review</button> 
          </form>
        </div>
      </div>
    </div>
  );
}