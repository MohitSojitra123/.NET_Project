import { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Badge, { statusBadge } from '../../components/Badge';
import { USERS, PROJECTS } from '../../data/mockData';

export default function Students() {
  const [students, setStudents] = useState(USERS.filter(u => u.role === 'Student'));
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const filtered = students.filter(s =>
    s.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const getProjectCount = (name) => PROJECTS.filter(p => p.students.includes(name)).length;

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Students' }]} />
        <h1 className="text-2xl font-bold text-gray-800">Manage Students</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
          </div>
          <Link to="/users/add" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus size={16} /> Add Student
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-10">#</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Student</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Email</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Mobile</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Projects</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((student, idx) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-sm text-gray-500">{idx + 1}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-semibold">
                        {student.fullName.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{student.fullName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{student.email}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{student.mobile}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-semibold text-blue-600">{getProjectCount(student.fullName)}</span>
                    <span className="text-xs text-gray-400 ml-1">projects</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge label={student.isActive ? 'Active' : 'Inactive'} variant={statusBadge(student.isActive ? 'Active' : 'Inactive')} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Link to={`/users/edit/${student.id}`} className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"><Pencil size={14} /></Link>
                      <button onClick={() => setDeleteId(student.id)} className="p-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">Delete Student?</h3>
            <p className="text-sm text-gray-500 text-center mt-2">This action cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
