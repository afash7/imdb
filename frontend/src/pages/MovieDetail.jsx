// frontend/src/pages/MovieDetail.jsx:
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [loading, setLoading] = useState(true); // وضعیت بارگذاری
  const [error, setError] = useState(null); // وضعیت خطا
  const [reviewError, setReviewError] = useState(null); // وضعیت خطای ارسال نقد

  // تابع برای واکشی نقدها
  const fetchReviews = async (movieId) => {
     try {
        const res = await axios.get(`/api/reviews/?movie=${movieId}`); // واکشی نقدها برای فیلم مشخص
        setReviews(res.data);
     } catch (err) {
        console.error("Error fetching reviews:", err);
        // TODO: نمایش خطای واکشی نقد به کاربر
     }
  };


  // هوک useEffect برای واکشی اطلاعات فیلم و نقدها
  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      try {
        // دریافت جزئیات فیلم
        const movieRes = await axios.get(`/api/movies/${id}/`);
        setMovie(movieRes.data);

        // دریافت نقدها برای این فیلم
        await fetchReviews(id);

        setLoading(false); // بارگذاری تمام شد
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load movie details."); // تنظیم پیام خطا
        setLoading(false); // بارگذاری تمام شد (با خطا)
      }
    };

    fetchMovieAndReviews();
  }, [id]); // هر بار که ID فیلم تغییر کند، دوباره اطلاعات را واکشی کن

  // تابع برای هندل کردن تغییرات در فرم نقد جدید
  const handleReviewChange = e => {
    const { name, value } = e.target;
    setNewReview(prevState => ({ ...prevState, [name]: value }));
  };

  // تابع برای ارسال نقد جدید
  const handleReviewSubmit = async e => {
    e.preventDefault();
    setReviewError(null); // پاک کردن خطاهای قبلی ارسال نقد

    const token = localStorage.getItem('access_token'); // دریافت توکن JWT
    if (!token) {
      console.error("User not authenticated. Please log in to submit a review.");
      // TODO: کاربر را به صفحه ورود هدایت کن یا پیام مناسب نمایش بده
      setReviewError("Please log in to submit a review.");
      return;
    }

    // اعتبار سنجی اولیه فرم
    if (newReview.rating === 0 || newReview.comment.trim() === "") {
        setReviewError("Please provide a rating and a comment.");
        return;
    }


    try {
      await axios.post(
        '/api/reviews/create/', // مسیر API برای ایجاد نقد
        { ...newReview, movie: id }, // ارسال اطلاعات نقد به همراه id فیلم
        {
          headers: {
            Authorization: `Bearer ${token}` // ارسال توکن JWT در هدر Authorization
          }
        }
      );
      // بازخوانی نقدها پس از ارسال موفق
      await fetchReviews(id);

      // پاک کردن فرم
      setNewReview({ rating: 0, comment: '' });
      alert("Review submitted successfully!"); // نمایش پیام موفقیت (می‌تواند بهبود یابد)

    } catch (error) {
      console.error("Failed to submit review:", error.response ? error.response.data : error);
      // نمایش پیام خطا به کاربر
      if (error.response && error.response.data) {
           // اگر خطا از سمت بک‌اند باشد و پیام داشته باشد
           if (error.response.data.non_field_errors) {
               setReviewError(error.response.data.non_field_errors[0]); // مثلاً خطای unique_together
           } else if (typeof error.response.data === 'object') {
               // برای خطاهای دیگر فیلدها
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


  // نمایش پیام بارگذاری
  if (loading) {
    return <div className="p-4 text-white text-center">Loading movie details...</div>;
  }

  // نمایش پیام خطا
  if (error) {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  // اگر فیلم پیدا نشد (مثلاً ID اشتباه در URL)
  if (!movie) {
       return <div className="p-4 text-white text-center">Movie not found.</div>;
  }


  return (
    <div className="container mx-auto p-6 text-white">
      <div className="flex flex-col md:flex-row gap-8"> {/* افزایش فاصله */}
        {/* نمایش پوستر فیلم */}
        <img
          src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover" // بهبود استایل تصویر
        />
        <div className="flex-1"> {/* استفاده از flex-1 برای پر کردن فضای باقی‌مانده */}
          {/* نمایش عنوان، توضیحات، امتیاز و تاریخ اکران فیلم */}
          <h1 className="text-4xl font-bold text-yellow-400 mb-3">{movie.title}</h1> {/* فونت بزرگتر برای عنوان */}
          {/* نمایش امتیاز میانگین */}
          {movie.rating > 0 && (
               <p className="text-xl font-semibold text-gray-300 mb-4 flex items-center">
                    ⭐ <span className="ml-2">{movie.rating.toFixed(1)} / 10</span>
               </p>
          )}
          <p className="text-base text-gray-300 mb-4 leading-relaxed">{movie.description}</p> {/* بهبود استایل توضیحات */}
          <p className="text-sm text-gray-500">Release Date: {movie.release_date}</p>
        </div>
      </div>

      <div className="mt-12"> {/* افزایش فاصله */}
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">Reviews</h2> {/* فونت بزرگتر برای عنوان نقدها */}

        {/* بخش نمایش لیست نقدها. */}
        <div className="mb-8"> {/* افزایش فاصله */}
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="bg-gray-800 p-5 rounded-lg shadow-md mb-5 border border-gray-700"> {/* بهبود استایل هر نقد */}
                {/* نمایش اطلاعات کاربر نقد کننده و امتیاز */}
                <div className="flex justify-between items-center mb-3">
                    <p className="text-yellow-400 font-semibold">{review.user ? review.user.full_name : 'Anonymous'}</p> {/* نمایش نام کامل کاربر (نیاز به اضافه شدن در سریلایزر بک‌اند) */}
                    <p className="text-sm text-gray-400">Rating: {review.rating} / 10</p> {/* نمایش امتیاز نقد */}
                </div>
                {/* متن نقد */}
                <p className="text-gray-300 leading-normal">{review.comment}</p>
                {/* TODO: نمایش تاریخ نقد */}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No reviews yet. Be the first to write a review!</div>
          )}
        </div>

        {/* بخش فرم افزودن نقد جدید. */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"> {/* بهبود استایل کادر فرم */}
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">Add Your Review</h3> {/* فونت بزرگتر برای عنوان فرم */}

          {/* نمایش خطای ارسال نقد در صورت وجود */}
          {reviewError && (
              <div className="bg-red-500 text-white p-3 rounded mb-4">{reviewError}</div>
          )}

          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-2">Rating:</label> {/* بهبود استایل label */}
              <select
                id="rating"
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 outline-none" // بهبود استایل select
                required
              >
                <option value="0">Select rating</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rate => (
                  <option key={rate} value={rate}>{rate}</option>
                ))}
              </select>
            </div>
            <div className="mb-6"> {/* افزایش فاصله */}
              <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">Comment:</label> {/* بهبود استایل label */}
              <textarea
                id="comment"
                name="comment"
                rows="4"
                value={newReview.comment}
                onChange={handleReviewChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 outline-none resize-none" // بهبود استایل textarea و جلوگیری از تغییر اندازه دستی
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 transition-colors duration-300">Submit Review</button> {/* بهبود استایل دکمه */}
          </form>
        </div>
      </div>
    </div>
  );
}