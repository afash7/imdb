// // frontend/src/pages/Home.jsx:
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export default function Home() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true); // وضعیت جدید برای نشان دادن وضعیت بارگذاری
//   const [error, setError] = useState(null); // وضعیت جدید برای مدیریت خطاها

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const res = await axios.get('/api/movies/'); // استفاده از مسیر /api/ با proxy Vite
//         setMovies(res.data);
//         setLoading(false); // بارگذاری تمام شد
//       } catch (err) {
//         console.error("Error fetching movies:", err);
//         setError("Failed to load movies."); // تنظیم پیام خطا
//         setLoading(false); // بارگذاری تمام شد (با خطا)
//       }
//     };

//     fetchMovies();
//   }, []);

//   // نمایش پیام بارگذاری در حین دریافت اطلاعات
//   if (loading) {
//     return <div className="p-4 text-white text-center">Loading movies...</div>;
//   }

//   // نمایش پیام خطا در صورت بروز مشکل
//   if (error) {
//     return <div className="p-4 text-red-500 text-center">{error}</div>;
//   }

//   return (
//     <div className="p-4 text-white bg-gray-900 min-h-screen">
//       <h1 className="text-3xl font-bold text-yellow-400 mb-6">Popular Movies</h1>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"> {/* اضافه کردن lg:grid-cols-5 برای صفحه نمایش بزرگتر */}
//         {movies.map(movie => (
//           <Link
//             to={`/movie/${movie.id}`}
//             key={movie.id}
//             className="bg-gray-800 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col" // بهبود استایل کادر فیلم
//           >
//             {/* نمایش پوستر فیلم یا یک تصویر پیش‌فرض */}
//             <img
//               src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
//               alt={movie.title}
//               className="w-full h-64 object-cover" // حذف rounded-t-xl از اینجا و اعمال در والد
//             />
//             <div className="p-3 flex-grow flex flex-col justify-between"> {/* flex-grow برای پر کردن فضای باقی‌مانده، flex flex-col justify-between برای چیدمان داخلی */}
//               <div>
//                  <h2 className="text-lg font-semibold truncate mb-1">{movie.title}</h2> {/* بهبود استایل عنوان */}
//                  {/* نمایش امتیاز فیلم اگر بزرگتر از 0 باشد */}
//                  {movie.rating > 0 && (
//                     <p className="text-sm text-gray-400 flex items-center">
//                         ⭐ <span className="ml-1">{movie.rating.toFixed(1)} / 10</span> {/* نمایش ستاره و امتیاز */}
//                     </p>
//                  )}
//               </div>
//               {/* TODO: ممکن است بخواهید سال اکران یا اطلاعات دیگر را نیز نمایش دهید */}
//             </div>
//           </Link>
//         ))}
//       </div>
//        {movies.length === 0 && !loading && !error && ( // نمایش پیام اگر فیلمی پیدا نشد
//             <div className="text-center text-gray-500 mt-8">No movies available.</div>
//        )}
//     </div>
//   );
// }
// frontend/src/pages/Home.jsx:
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('Home component rendering'); // اضافه کنید

  useEffect(() => {
    console.log('useEffect is running'); // اضافه کنید

    const fetchMovies = async () => {
      console.log('fetchMovies is called'); // اضافه کنید
      try {
        console.log('Attempting axios.get'); // اضافه کنید
        const res = await axios.get('/api/movies/'); // خطی که انتظار داریم درخواست شبکه را ایجاد کند
        console.log('Received data:', res.data); // اضافه کنید
        setMovies(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies.");
        setLoading(false);
      }
    };

    fetchMovies();
    console.log('fetchMovies function called in useEffect'); // اضافه کنید

  }, []);

  console.log('Current movies state:', movies); // اضافه کنید (این در هر رندر اجرا می‌شود)


  if (loading) {
    console.log('Rendering Loading state'); // اضافه کنید
    return <div className="p-4 text-white text-center">Loading movies...</div>;
  }

  if (error) {
    console.log('Rendering Error state'); // اضافه کنید
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  console.log('Rendering movie list with movies:', movies); // اضافه کنید

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