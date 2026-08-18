import { FolderKanban, Calendar, Users, CheckSquare } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Badge, { statusBadge } from '../../components/Badge';
import { PROJECTS } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

export default function MyProjects() {
  const { user } = useAuth();
  const myProjects = PROJECTS.filter(p => p.students.includes(user?.fullName || ''));

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'My Projects' }]} />
        <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
        <p className="text-gray-500 text-sm mt-1">Projects assigned to you by your faculty.</p>
      </div>

      {myProjects.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
          <FolderKanban size={40} className="mx-auto mb-3 text-gray-300" />
          <h3 className="text-gray-500 font-medium">No Projects Assigned</h3>
          <p className="text-gray-400 text-sm mt-1">You haven't been assigned to any projects yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {myProjects.map(project => (
            <div key={project.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FolderKanban size={20} className="text-blue-600" />
                  </div>
                  <Badge label={project.status} variant={statusBadge(project.status)} />
                </div>

                <h3 className="text-base font-semibold text-gray-800 mb-1">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users size={13} />
                    <span>Faculty: <span className="font-medium text-gray-700">{project.faculty}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={13} />
                    <span>{project.startDate} → {project.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckSquare size={13} />
                    <span>{project.completedTasks}/{project.totalTasks} tasks completed</span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs font-semibold text-blue-600">{project.progress.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${project.progress}%`,
                      background: project.progress === 100 ? '#10b981' : '#3b82f6',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
