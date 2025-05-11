import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-end items-center gap-6 text-sm">
        <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
        <Link to="/profile" className="hover:text-yellow-400 transition">Profile</Link>
        <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
        <Link to="/register" className="hover:text-yellow-400 transition">Register</Link>
      </div>
    </nav>
  );
}
