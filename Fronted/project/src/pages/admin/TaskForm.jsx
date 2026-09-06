import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import { TASKS, PROJECTS, USERS } from '../../data/mockData';

const students = USERS.filter(u => u.role === 'Student');

export default function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '',
    description: '',
    projectId: '',
    priority: 'Medium',
    status: 'Pending',
    assignedType: 'Student',
    assignedTo: '',
    dueDate: '',
    assignedScore: '',
    facultyRemarks: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      const task = TASKS.find(t => t.id === Number(id));
      if (task) {
        setForm({
          title: task.title,
          description: task.description,
          projectId: String(task.projectId),
          priority: task.priority,
          status: task.status,
          assignedType: 'Student',
          assignedTo: task.assignedTo,
          dueDate: task.dueDate,
          assignedScore: String(task.assignedScore),
          facultyRemarks: task.facultyRemarks,
        });
      }
    }
  }, [id, isEdit]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Task title is required.';
    if (!form.projectId) e.projectId = 'Project is required.';
    if (!form.dueDate) e.dueDate = 'Due date is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    navigate('/tasks');
  };

  const set = (key) => (e) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Tasks', to: '/tasks' }, { label: isEdit ? 'Edit' : 'Add' }]} />
        <h1 className="text-2xl font-bold text-gray-800">{isEdit ? 'Edit Task' : 'Add Task'}</h1>
      </div>

      <div className="max-w-3xl">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-5 pb-3 border-b border-gray-100">Task Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Task Title <span className="text-red-500">*</span></label>
              <input value={form.title} onChange={set('title')} placeholder="Enter task title"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${errors.title ? 'border-red-400' : 'border-gray-200 focus:border-blue-400'}`} />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea value={form.description} onChange={set('description')} placeholder="Enter description" rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Project <span className="text-red-500">*</span></label>
                <select value={form.projectId} onChange={set('projectId')}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${errors.projectId ? 'border-red-400' : 'border-gray-200 focus:border-blue-400'}`}>
                  <option value="">-- Select Project --</option>
                  {PROJECTS.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
                {errors.projectId && <p className="text-xs text-red-500 mt-1">{errors.projectId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Due Date <span className="text-red-500">*</span></label>
                <input type="date" value={form.dueDate} onChange={set('dueDate')}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${errors.dueDate ? 'border-red-400' : 'border-gray-200 focus:border-blue-400'}`} />
                {errors.dueDate && <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
                <select value={form.priority} onChange={set('priority')}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400">
                  {['Low', 'Medium', 'High', 'Critical'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select value={form.status} onChange={set('status')}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400">
                  {['Pending', 'In Progress', 'Completed', 'Rejected'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned Type</label>
                <select value={form.assignedType} onChange={set('assignedType')}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400">
                  <option>Student</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned To</label>
                <select value={form.assignedTo} onChange={set('assignedTo')}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400">
                  <option value="">-- Select Project First --</option>
                  {students.map(s => <option key={s.id}>{s.fullName}</option>)}
                </select>
              </div>
            </div>

            {isEdit && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Faculty Remarks</label>
                <textarea value={form.facultyRemarks} onChange={set('facultyRemarks')} placeholder="Enter remarks" rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none" />
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                <Save size={16} /> Save
              </button>
              <Link to="/tasks" className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                <ArrowLeft size={16} /> Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
