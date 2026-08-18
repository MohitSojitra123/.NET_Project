import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Filter, FolderKanban, ChevronDown, ChevronRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Badge, { statusBadge } from '../../components/Badge';
import { PROJECTS, Project } from '../../data/mockData';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = projects.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Projects' }]} />
        <h1 className="text-2xl font-bold text-gray-800">Manage Projects</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={14} /> Filters
              </button>
              <Link to="/projects/add" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                <Plus size={16} /> Add Project
              </Link>
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 flex flex-wrap gap-3 pt-3 border-t border-gray-100">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs text-gray-500 mb-1">Status</label>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none">
                  <option>All Status</option>
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>
              <div className="flex items-end gap-2">
                <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">Apply</button>
                <button onClick={() => { setStatusFilter('All'); setSearch(''); }} className="px-3 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50 transition-colors">Reset</button>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="w-10 px-5 py-3"></th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">#</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Project Title</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Start Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">End Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Assigned To</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Progress</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-400">
                    <FolderKanban size={32} className="mx-auto mb-2 opacity-30" />
                    No projects found
                  </td>
                </tr>
              ) : (
                filtered.map((project, idx) => (
                  <>
                    <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3.5">
                        <button
                          onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          {expandedId === project.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-500">{idx + 1}</td>
                      <td className="px-5 py-3.5">
                        <Link to={`/projects/${project.id}`} className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">{project.title}</Link>
                        <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">{project.description}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge label={project.status} variant={statusBadge(project.status)} />
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{project.startDate}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{project.endDate}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Users size={14} className="text-gray-400" />
                          <span className="font-medium">{project.faculty}</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">{project.students.length} Students</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${project.progress}%` }} />
                          </div>
                          <span className="text-xs text-gray-500">{project.progress.toFixed(0)}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <Link to={`/projects/edit/${project.id}`} className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"><Pencil size={14} /></Link>
                          <button onClick={() => setDeleteId(project.id)} className="p-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                    {expandedId === project.id && (
                      <tr key={`expand-${project.id}`} className="bg-blue-50/50">
                        <td colSpan={9} className="px-10 py-3">
                          <div className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-2">
                            <Users size={13} /> Assigned Students
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.students.map(student => (
                              <span key={student} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-blue-100 rounded-full text-xs text-gray-700">
                                <span className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold text-[10px]">{student.charAt(0)}</span>
                                {student}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
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
            <h3 className="text-lg font-semibold text-gray-800 text-center">Delete Project?</h3>
            <p className="text-sm text-gray-500 text-center mt-2">This will also remove all associated tasks.</p>
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
