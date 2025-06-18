// File: src/layout/MainLayout.jsx
import { Link, Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-4 flex justify-center space-x-4 text-blue-600 font-medium">
          <Link to="/" className="hover:underline">Home</Link>
          <span>|</span>
          <Link to="/login" className="hover:underline">Login</Link>
          <span>|</span>
          <Link to="/profile" className="hover:underline">Profile</Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet /> {/* 👈 this is critical! */}
      </main>
    </div>
  );
}
