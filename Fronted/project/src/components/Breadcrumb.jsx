import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 mb-4">
      <Link to="/dashboard" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
        <Home size={13} />
        <span>Home</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={13} />
          {item.to ? (
            <Link to={item.to} className="hover:text-blue-600 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-gray-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
