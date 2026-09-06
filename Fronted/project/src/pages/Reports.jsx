import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Breadcrumb from '../components/Breadcrumb';
import { PROJECTS, TASKS, USERS } from '../data/mockData';
import { Download, TrendingUp, Users, FolderKanban, Star } from 'lucide-react';
import { Legend } from 'recharts';

const studentPerformance = USERS.filter(u => u.role === 'Student').map(s => {
  const studentTasks = TASKS.filter(t => t.assignedTo === s.fullName);
  const earned = studentTasks.reduce((sum, t) => sum + (t.earnedScore || 0), 0);
  const assigned = studentTasks.reduce((sum, t) => sum + t.assignedScore, 0);
  const completed = studentTasks.filter(t => t.status === 'Completed').length;
  return {
    name: s.fullName.split(' ')[0],
    earned,
    assigned,
    tasks: studentTasks.length,
    completed,
    score: assigned > 0 ? Math.round((earned / assigned) * 100) : 0,
  };
});

const projectProgress = PROJECTS.map(p => ({
  name: p.title.length > 12 ? p.title.substring(0, 12) + '...' : p.title,
  progress: p.progress,
  tasks: p.totalTasks,
  completed: p.completedTasks,
}));

export default function Reports() {
  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Breadcrumb items={[{ label: 'Reports' }]} />
          <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Comprehensive project and student performance data.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Download size={16} /> Export
        </button>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Projects', value: PROJECTS.length, icon: <FolderKanban size={18} />, color: 'bg-blue-100 text-blue-600' },
          { label: 'Active Projects', value: PROJECTS.filter(p => p.status === 'In Progress').length, icon: <TrendingUp size={18} />, color: 'bg-green-100 text-green-600' },
          { label: 'Total Students', value: USERS.filter(u => u.role === 'Student').length, icon: <Users size={18} />, color: 'bg-teal-100 text-teal-600' },
          { label: 'Completed Tasks', value: TASKS.filter(t => t.status === 'Completed').length, icon: <Star size={18} />, color: 'bg-amber-100 text-amber-600' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className={`inline-flex p-2 rounded-lg mb-2 ${item.color}`}>{item.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{item.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Project Progress Chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Project Progress (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={projectProgress} barSize={30}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="progress" name="Progress" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Student Performance */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Student Score Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={studentPerformance} barSize={24} barGap={2}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="assigned" name="Assigned" fill="#e5e7eb" radius={[2, 2, 0, 0]} />
              <Bar dataKey="earned" name="Earned" fill="#10b981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Performance Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Student Performance Report</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Student</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Total Tasks</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Completed</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Assigned Score</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Earned Score</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {studentPerformance.map(s => (
                <tr key={s.name} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 text-sm font-semibold">
                        {s.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{USERS.find(u => u.fullName.startsWith(s.name))?.fullName || s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">{s.tasks}</td>
                  <td className="px-5 py-3.5 text-sm text-green-600 font-medium">{s.completed}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-700">{s.assigned}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-700">{s.earned}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.score}%` }} />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{s.score}%</span>
                    </div>
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
