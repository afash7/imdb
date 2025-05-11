import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-black p-4">
        <h1 className="text-yellow-400 text-xl font-bold mb-4">IMDb Clone</h1>
        <p className="text-yellow-400 text-lg">Popular Movies</p>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 bg-gray-900 min-h-screen">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-900 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
