import { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Badge, { statusBadge } from '../../components/Badge';
import { USERS, PROJECTS } from '../../data/mockData';

export default function Faculty() {
  const [faculty] = useState(USERS.filter(u => u.role === 'Faculty'));
  const [search, setSearch] = useState('');

  const filtered = faculty.filter(f =>
    f.fullName.toLowerCase().includes(search.toLowerCase()) ||
    f.email.toLowerCase().includes(search.toLowerCase())
  );

  const getProjectCount = (name) => PROJECTS.filter(p => p.faculty === name).length;

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Faculty' }]} />
        <h1 className="text-2xl font-bold text-gray-800">Manage Faculty</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search faculty..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
          </div>
          <Link to="/users/add" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus size={16} /> Add Faculty
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filtered.map(member => (
            <div key={member.id} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xl font-bold flex-shrink-0">
                  {member.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{member.fullName}</h3>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Mobile</span>
                  <span className="text-gray-700 font-medium">{member.mobile}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Projects Supervised</span>
                  <span className="text-blue-600 font-bold">{getProjectCount(member.fullName)}</span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="text-gray-500">Status</span>
                  <Badge label={member.isActive ? 'Active' : 'Inactive'} variant={statusBadge(member.isActive ? 'Active' : 'Inactive')} />
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <Link to={`/users/edit/${member.id}`} className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-white border border-blue-200 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  <Pencil size={13} /> Edit
                </Link>
                <button className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-white border border-red-200 text-red-500 text-xs font-medium rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 size={13} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
