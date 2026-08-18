import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import { PROJECTS, USERS } from '../../data/mockData';

const faculties = USERS.filter(u => u.role === 'Faculty');
const students = USERS.filter(u => u.role === 'Student');
const statuses = ['Not Started', 'In Progress', 'Completed', 'On Hold'];

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Not Started',
    faculty: '',
    students: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit) {
      const project = PROJECTS.find(p => p.id === Number(id));
      if (project) {
        setForm({
          title: project.title,
          description: project.description,
          startDate: project.startDate,
          endDate: project.endDate,
          status: project.status,
          faculty: project.faculty,
          students: project.students,
        });
      }
    }
  }, [id, isEdit]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Project title is required.';
    if (!form.startDate) e.startDate = 'Start date is required.';
    if (!form.endDate) e.endDate = 'End date is required.';
    if (!form.faculty) e.faculty = 'Supervising faculty is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    navigate('/projects');
  };

  const toggleStudent = (name: string) => {
    setForm(prev => ({
      ...prev,
      students: prev.students.includes(name)
        ? prev.students.filter(s => s !== name)
        : [...prev.students, name],
    }));
  };

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Projects', to: '/projects' }, { label: isEdit ? 'Edit' : 'Add' }]} />
        <h1 className="text-2xl font-bold text-gray-800">{isEdit ? 'Edit Project' : 'Add Project'}</h1>
      </div>

      <div className="max-w-3xl">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-5 pb-3 border-b border-gray-100">Project Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Title <span className="text-red-500">*</span></label>
              <input
                value={form.title}
                onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setErrors(p => ({ ...p, title: '' })); }}
                placeholder="Enter project title"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${errors.title ? 'border-red-400' : 'border-gray-200 focus:border-blue-400'}`}
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Enter description"
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={e => { setForm(p => ({ ...p, startDate: e.target.value })); setErrors(p => ({ ...p, startDate: '' })); }}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${errors.startDate ? 'border-red-400' : 'border-gray-200 focus:border-blue-400'}`}
                />
                {errors.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={e => { setForm(p => ({ ...p, endDate: e.target.value })); setErrors(p => ({ ...p, endDate: '' })); }}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${errors.endDate ? 'border-red-400' : 'border-gray-200 focus:border-blue-400'}`}
                />
                {errors.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(p => ({ ...p, status: e.target.value as any }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                >
                  {statuses.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Supervising Faculty <span className="text-red-500">*</span></label>
                <select
                  value={form.faculty}
                  onChange={e => { setForm(p => ({ ...p, faculty: e.target.value })); setErrors(p => ({ ...p, faculty: '' })); }}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${errors.faculty ? 'border-red-400' : 'border-gray-200 focus:border-blue-400'}`}
                >
                  <option value="">-- Select Faculty --</option>
                  {faculties.map(f => <option key={f.id}>{f.fullName}</option>)}
                </select>
                {errors.faculty && <p className="text-xs text-red-500 mt-1">{errors.faculty}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned Students</label>
              <div className="border border-gray-200 rounded-lg p-3 grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {students.map(s => (
                  <label key={s.id} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={form.students.includes(s.fullName)}
                      onChange={() => toggleStudent(s.fullName)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{s.fullName}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">{form.students.length} student(s) selected</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                <Save size={16} /> Save
              </button>
              <Link to="/projects" className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                <ArrowLeft size={16} /> Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
