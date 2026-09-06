import { useState } from 'react';
import { Star, Save, Search } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Badge, { statusBadge, priorityBadge } from '../../components/Badge';
import { TASKS } from '../../data/mockData';

export default function ScoresRemarks() {
  const [tasks, setTasks] = useState(TASKS);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ earnedScore: '', facultyRemarks: '' });

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
    t.project.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditData({ earnedScore: String(task.earnedScore ?? ''), facultyRemarks: task.facultyRemarks });
  };

  const saveEdit = (id) => {
    setTasks(prev => prev.map(t =>
      t.id === id
        ? { ...t, earnedScore: parseFloat(editData.earnedScore) || null, facultyRemarks: editData.facultyRemarks }
        : t
    ));
    setEditingId(null);
  };

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Scores & Remarks' }]} />
        <h1 className="text-2xl font-bold text-gray-800">Scores & Remarks</h1>
        <p className="text-gray-500 text-sm mt-1">Assign earned scores and remarks for completed tasks.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks, students..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Task</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Project</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Student</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Priority</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Assigned Score</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Earned Score</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Remarks</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(task => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-800">{task.title}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{task.project}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 text-xs font-semibold">
                        {task.assignedTo.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-700">{task.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><Badge label={task.priority} variant={priorityBadge(task.priority)} /></td>
                  <td className="px-5 py-3.5"><Badge label={task.status} variant={statusBadge(task.status)} /></td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                      <Star size={14} className="text-amber-400" />
                      {task.assignedScore}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {editingId === task.id ? (
                      <input
                        type="number"
                        value={editData.earnedScore}
                        onChange={e => setEditData(prev => ({ ...prev, earnedScore: e.target.value }))}
                        max={task.assignedScore}
                        min={0}
                        className="w-20 px-2 py-1 border border-blue-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    ) : (
                      <span className={`flex items-center gap-1 text-sm font-semibold ${task.earnedScore !== null ? 'text-green-600' : 'text-gray-400'}`}>
                        {task.earnedScore !== null ? (
                          <><Star size={14} className="text-green-500" />{task.earnedScore}</>
                        ) : '—'}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {editingId === task.id ? (
                      <input
                        value={editData.facultyRemarks}
                        onChange={e => setEditData(prev => ({ ...prev, facultyRemarks: e.target.value }))}
                        placeholder="Add remarks..."
                        className="w-40 px-2 py-1 border border-blue-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    ) : (
                      <span className="text-sm text-gray-600 truncate max-w-[160px] block">{task.facultyRemarks || '—'}</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {editingId === task.id ? (
                      <button onClick={() => saveEdit(task.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors">
                        <Save size={13} /> Save
                      </button>
                    ) : (
                      <button onClick={() => startEdit(task)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium rounded-lg transition-colors">
                        <Star size={13} /> Score
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
