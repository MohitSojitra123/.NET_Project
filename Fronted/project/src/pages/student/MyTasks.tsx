import { useState } from 'react';
import { CheckSquare, Star, MessageSquare } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Badge, { statusBadge, priorityBadge } from '../../components/Badge';
import { TASKS, Task } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

export default function MyTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(TASKS.filter(t => t.assignedTo === user?.fullName));
  const [remarkingId, setRemarkingId] = useState<number | null>(null);
  const [remark, setRemark] = useState('');
  const [activeTab, setActiveTab] = useState<string>('All');

  const tabs = ['All', 'Pending', 'In Progress', 'Completed', 'Rejected'];

  const filtered = activeTab === 'All' ? tasks : tasks.filter(t => t.status === activeTab);

  const saveRemark = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, studentRemarks: remark } : t));
    setRemarkingId(null);
    setRemark('');
  };

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'My Tasks' }]} />
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <p className="text-gray-500 text-sm mt-1">Track your project tasks and progress.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'
            }`}>
              {tab === 'All' ? tasks.length : tasks.filter(t => t.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <CheckSquare size={36} className="mx-auto mb-3 text-gray-300" />
          <p className="text-gray-400 text-sm">No tasks in this category.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(task => (
            <div key={task.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold text-gray-800">{task.title}</h3>
                      <Badge label={task.priority} variant={priorityBadge(task.priority)} />
                      <Badge label={task.status} variant={statusBadge(task.status)} />
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{task.description}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-500">
                      <div>
                        <span className="block text-gray-400">Project</span>
                        <span className="font-medium text-gray-700">{task.project}</span>
                      </div>
                      <div>
                        <span className="block text-gray-400">Due Date</span>
                        <span className="font-medium text-gray-700">{task.dueDate}</span>
                      </div>
                      <div>
                        <span className="block text-gray-400">Assigned Score</span>
                        <span className="font-medium text-gray-700 flex items-center gap-1">
                          <Star size={12} className="text-amber-400" />{task.assignedScore}
                        </span>
                      </div>
                      <div>
                        <span className="block text-gray-400">Earned Score</span>
                        <span className={`font-medium flex items-center gap-1 ${task.earnedScore !== null ? 'text-green-600' : 'text-gray-400'}`}>
                          {task.earnedScore !== null ? (
                            <><Star size={12} className="text-green-500" />{task.earnedScore}</>
                          ) : '—'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                {task.status === 'Completed' && (
                  <div className="mt-3 h-1.5 bg-green-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full w-full" />
                  </div>
                )}

                {/* Remarks */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {task.facultyRemarks && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs font-semibold text-blue-700 mb-1">Faculty Remarks</p>
                      <p className="text-xs text-blue-600">{task.facultyRemarks}</p>
                    </div>
                  )}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-semibold text-gray-600 mb-1">My Remarks</p>
                    {remarkingId === task.id ? (
                      <div className="flex gap-2">
                        <input
                          value={remark}
                          onChange={e => setRemark(e.target.value)}
                          placeholder="Add your remark..."
                          className="flex-1 text-xs px-2 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                        <button onClick={() => saveRemark(task.id)} className="px-2 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">Save</button>
                        <button onClick={() => setRemarkingId(null)} className="px-2 py-1 border border-gray-200 text-xs rounded-lg hover:bg-gray-100">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{task.studentRemarks || 'No remarks added yet.'}</p>
                        <button
                          onClick={() => { setRemarkingId(task.id); setRemark(task.studentRemarks); }}
                          className="ml-2 text-blue-600 hover:text-blue-700 text-xs flex items-center gap-1"
                        >
                          <MessageSquare size={11} /> Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
