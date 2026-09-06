import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Filter, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Badge, { statusBadge, priorityBadge } from '../../components/Badge';
import { TASKS } from '../../data/mockData';

const priorities = ['All', 'Critical', 'High', 'Medium', 'Low'];
const statuses = ['All', 'Pending', 'In Progress', 'Completed', 'Rejected'];

export default function Tasks() {
  const [tasks, setTasks] = useState(TASKS);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [statusDropdown, setStatusDropdown] = useState(null);

  const filtered = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchSearch && matchPriority && matchStatus;
  });

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    setDeleteId(null);
  };

  const changeStatus = (id, status) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    setStatusDropdown(null);
  };

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Tasks' }]} />
        <h1 className="text-2xl font-bold text-gray-800">Manage Tasks</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={14} /> Filters
              </button>
              <Link to="/tasks/add" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                <Plus size={16} /> Add Task
              </Link>
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 flex flex-wrap gap-3 pt-3 border-t border-gray-100">
              <div className="flex-1 min-w-[160px]">
                <label className="block text-xs text-gray-500 mb-1">Priority</label>
                <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none">
                  {priorities.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[160px]">
                <label className="block text-xs text-gray-500 mb-1">Status</label>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none">
                  {statuses.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex items-end gap-2">
                <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">Apply</button>
                <button onClick={() => { setPriorityFilter('All'); setStatusFilter('All'); setSearch(''); }} className="px-3 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50">Reset</button>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-10">#</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Task Title</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Project</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Priority</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Assigned To</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Due Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    <CheckSquare size={32} className="mx-auto mb-2 opacity-30" />
                    No tasks found
                  </td>
                </tr>
              ) : (
                filtered.map((task, idx) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors relative">
                    <td className="px-5 py-3.5 text-sm text-gray-500">{idx + 1}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-medium text-gray-800">{task.title}</span>
                      <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[180px]">{task.description}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{task.project}</td>
                    <td className="px-5 py-3.5">
                      <Badge label={task.priority} variant={priorityBadge(task.priority)} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="relative">
                        <button
                          onClick={() => setStatusDropdown(statusDropdown === task.id ? null : task.id)}
                          className="flex items-center gap-1"
                        >
                          <Badge label={task.status} variant={statusBadge(task.status)} />
                          <span className="text-gray-400 text-xs">▾</span>
                        </button>
                        {statusDropdown === task.id && (
                          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 min-w-[140px] py-1">
                            {['Pending', 'In Progress', 'Completed', 'Rejected'].map(s => (
                              <button
                                key={s}
                                onClick={() => changeStatus(task.id, s)}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                              >
                                <Badge label={s} variant={statusBadge(s)} />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-sm text-gray-700">{task.assignedTo}</div>
                      <div className="text-xs text-gray-400">(Student)</div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{task.dueDate}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Link to={`/tasks/edit/${task.id}`} className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"><Pencil size={14} /></Link>
                        <button onClick={() => setDeleteId(task.id)} className="p-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
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
            <h3 className="text-lg font-semibold text-gray-800 text-center">Delete Task?</h3>
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
