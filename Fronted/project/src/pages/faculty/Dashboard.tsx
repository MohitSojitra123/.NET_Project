import { FolderKanban, CheckSquare, Users, TrendingUp, Clock, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import StatCard from '../../components/StatCard';
import Breadcrumb from '../../components/Breadcrumb';
import Badge, { statusBadge, priorityBadge } from '../../components/Badge';
import { PROJECTS, TASKS } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const myProjects = PROJECTS.filter(p => p.faculty === user?.fullName);
  const myProjectIds = myProjects.map(p => p.id);
  const myTasks = TASKS.filter(t => myProjectIds.includes(t.projectId));
  const completedTasks = myTasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = myTasks.filter(t => t.status === 'Pending').length;

  const studentsSet = new Set(myProjects.flatMap(p => p.students));

  const tasksByProject = myProjects.map(p => ({
    name: p.title.length > 15 ? p.title.substring(0, 15) + '...' : p.title,
    tasks: TASKS.filter(t => t.projectId === p.id).length,
    completed: TASKS.filter(t => t.projectId === p.id && t.status === 'Completed').length,
  }));

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Dashboard' }]} />
        <h1 className="text-2xl font-bold text-gray-800">Faculty Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome, {user?.fullName}! Here's your supervision overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="My Projects" value={myProjects.length} icon={<FolderKanban size={22} />} color="blue" subtitle="supervised projects" />
        <StatCard title="My Students" value={studentsSet.size} icon={<Users size={22} />} color="teal" subtitle="assigned students" />
        <StatCard title="Total Tasks" value={myTasks.length} icon={<CheckSquare size={22} />} color="amber" subtitle={`${pendingTasks} pending`} />
        <StatCard title="Completed" value={completedTasks} icon={<TrendingUp size={22} />} color="green" subtitle="tasks completed" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Tasks per Project</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tasksByProject} barGap={4}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[3, 3, 0, 0]} />
              <Bar dataKey="tasks" name="Total" fill="#3b82f6" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FolderKanban size={16} className="text-blue-600" />
            My Projects Overview
          </h3>
          <div className="space-y-3">
            {myProjects.map(project => (
              <div key={project.id} className="py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">{project.title}</span>
                  <Badge label={project.status} variant={statusBadge(project.status)} />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-10 text-right">{project.progress.toFixed(0)}%</span>
                </div>
                <div className="flex gap-3 mt-1.5">
                  <span className="text-xs text-gray-400">{project.students.length} students</span>
                  <span className="text-xs text-gray-400">{project.completedTasks}/{project.totalTasks} tasks done</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock size={16} className="text-amber-500" />
          Recent Task Activity
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 pb-2">Task</th>
                <th className="text-left text-xs font-semibold text-gray-500 pb-2">Student</th>
                <th className="text-left text-xs font-semibold text-gray-500 pb-2">Priority</th>
                <th className="text-left text-xs font-semibold text-gray-500 pb-2">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 pb-2">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {myTasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="py-2.5 text-sm font-medium text-gray-800">{task.title}</td>
                  <td className="py-2.5 text-sm text-gray-600">{task.assignedTo}</td>
                  <td className="py-2.5"><Badge label={task.priority} variant={priorityBadge(task.priority)} /></td>
                  <td className="py-2.5"><Badge label={task.status} variant={statusBadge(task.status)} /></td>
                  <td className="py-2.5">
                    <span className="flex items-center gap-1 text-sm">
                      {task.earnedScore !== null ? (
                        <span className="text-green-600 font-medium flex items-center gap-1"><Star size={13} className="text-amber-400" />{task.earnedScore}/{task.assignedScore}</span>
                      ) : (
                        <span className="text-gray-400">—/{task.assignedScore}</span>
                      )}
                    </span>
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
