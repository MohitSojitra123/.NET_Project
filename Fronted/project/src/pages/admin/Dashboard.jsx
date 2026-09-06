import { Users, GraduationCap, BookOpen, FolderKanban, CheckSquare, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/StatCard';
import Breadcrumb from '../../components/Breadcrumb';
import Badge, { statusBadge, priorityBadge } from '../../components/Badge';
import { USERS, PROJECTS, TASKS } from '../../data/mockData';

const STATUS_COLORS = {
  'Completed': '#10b981',
  'In Progress': '#3b82f6',
  'Not Started': '#6b7280',
  'On Hold': '#f59e0b',
};

const PRIORITY_COLORS = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#3b82f6',
  Low: '#6b7280',
};

export default function AdminDashboard() {
  const totalStudents = USERS.filter(u => u.role === 'Student').length;
  const totalFaculty = USERS.filter(u => u.role === 'Faculty').length;
  const activeProjects = PROJECTS.filter(p => p.status === 'In Progress').length;

  const statusData = ['Completed', 'In Progress', 'Not Started', 'On Hold'].map(s => ({
    name: s,
    value: PROJECTS.filter(p => p.status === s).length,
  })).filter(d => d.value > 0);

  const priorityData = ['Critical', 'High', 'Medium', 'Low'].map(p => ({
    name: p,
    value: TASKS.filter(t => t.priority === p).length,
  }));

  const recentTasks = TASKS.slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Dashboard' }]} />
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's an overview of the system.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        <StatCard title="Total Users" value={USERS.length} icon={<Users size={22} />} color="blue" subtitle="registered users" />
        <StatCard title="Total Students" value={totalStudents} icon={<GraduationCap size={22} />} color="teal" subtitle="enrolled students" />
        <StatCard title="Total Faculty" value={totalFaculty} icon={<BookOpen size={22} />} color="violet" subtitle="faculty members" />
        <StatCard title="Total Projects" value={PROJECTS.length} icon={<FolderKanban size={22} />} color="green" subtitle={`${activeProjects} active`} />
        <StatCard title="Total Tasks" value={TASKS.length} icon={<CheckSquare size={22} />} color="amber" subtitle="across all projects" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Project Status Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#6b7280'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Task Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={priorityData} barSize={36}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {priorityData.map((entry) => (
                  <Cell key={entry.name} fill={PRIORITY_COLORS[entry.name] || '#6b7280'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Tasks */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CheckSquare size={16} className="text-blue-600" />
            Recent Tasks
          </h3>
          <div className="space-y-3">
            {recentTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{task.title}</div>
                  <div className="text-xs text-gray-500">{task.project} · {task.assignedTo}</div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <Badge label={task.priority} variant={priorityBadge(task.priority)} />
                  <Badge label={task.status} variant={statusBadge(task.status)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming deadlines */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={16} className="text-amber-500" />
            Active Projects Overview
          </h3>
          <div className="space-y-3">
            {PROJECTS.slice(0, 5).map(project => (
              <div key={project.id} className="py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-800 truncate flex-1 mr-3">{project.title}</span>
                  <Badge label={project.status} variant={statusBadge(project.status)} />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-10 text-right">{project.progress.toFixed(0)}%</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">{project.students.length} students · {project.completedTasks}/{project.totalTasks} tasks</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
