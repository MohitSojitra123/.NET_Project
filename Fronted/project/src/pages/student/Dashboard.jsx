import { FolderKanban, CheckSquare, Star, TrendingUp, Clock } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import StatCard from '../../components/StatCard';
import Breadcrumb from '../../components/Breadcrumb';
import Badge, { statusBadge, priorityBadge } from '../../components/Badge';
import { PROJECTS, TASKS } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const myProjects = PROJECTS.filter(p => p.students.includes(user?.fullName || ''));
  const myProjectIds = myProjects.map(p => p.id);
  const myTasks = TASKS.filter(t => myProjectIds.includes(t.projectId) && t.assignedTo === user?.fullName);

  const completedTasks = myTasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = myTasks.filter(t => t.status === 'Pending').length;
  const totalEarned = myTasks.reduce((sum, t) => sum + (t.earnedScore || 0), 0);
  const totalAssigned = myTasks.reduce((sum, t) => sum + t.assignedScore, 0);

  const upcomingTasks = myTasks
    .filter(t => t.status !== 'Completed')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 5);

  const taskStatusData = [
    { name: 'Completed', value: completedTasks, fill: '#10b981' },
    { name: 'In Progress', value: myTasks.filter(t => t.status === 'In Progress').length, fill: '#3b82f6' },
    { name: 'Pending', value: pendingTasks, fill: '#f59e0b' },
    { name: 'Rejected', value: myTasks.filter(t => t.status === 'Rejected').length, fill: '#ef4444' },
  ].filter(d => d.value > 0);

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Dashboard' }]} />
        <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome, {user?.fullName}! Here's your academic progress.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="My Projects" value={myProjects.length} icon={<FolderKanban size={22} />} color="blue" subtitle="assigned projects" />
        <StatCard title="My Tasks" value={myTasks.length} icon={<CheckSquare size={22} />} color="teal" subtitle={`${pendingTasks} pending`} />
        <StatCard title="Completed" value={completedTasks} icon={<TrendingUp size={22} />} color="green" subtitle="tasks done" />
        <StatCard title="Total Score" value={totalAssigned > 0 ? `${totalEarned}/${totalAssigned}` : '0'} icon={<Star size={22} />} color="amber" subtitle="earned points" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Task Status Pie */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">My Task Status</h3>
          {taskStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={taskStatusData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                  {taskStatusData.map(entry => <Cell key={entry.name} fill={entry.fill} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-gray-400 text-sm">No tasks assigned yet</div>
          )}
        </div>

        {/* My Projects Progress */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FolderKanban size={16} className="text-blue-600" />
            My Projects
          </h3>
          {myProjects.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-gray-400 text-sm">No projects assigned</div>
          ) : (
            <div className="space-y-4">
              {myProjects.map(project => (
                <div key={project.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-800">{project.title}</span>
                    <Badge label={project.status} variant={statusBadge(project.status)} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 w-10 text-right font-medium">{project.progress.toFixed(0)}%</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Faculty: {project.faculty}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock size={16} className="text-amber-500" />
          Upcoming Tasks
        </h3>
        {upcomingTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <CheckSquare size={28} className="mx-auto mb-2 opacity-30" />
            All tasks completed!
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800">{task.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{task.project} · Due: {task.dueDate}</div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <Badge label={task.priority} variant={priorityBadge(task.priority)} />
                  <Badge label={task.status} variant={statusBadge(task.status)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
