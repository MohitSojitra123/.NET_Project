import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import { USERS } from '../../data/mockData';

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    role: '',
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      const user = USERS.find(u => u.id === Number(id));
      if (user) {
        setForm({
          fullName: user.fullName,
          email: user.email,
          password: '',
          mobile: user.mobile,
          role: user.role,
          isActive: user.isActive,
        });
      }
    }
  }, [id, isEdit]);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    if (!isEdit && !form.password.trim()) e.password = 'Password is required.';
    if (!form.mobile.trim()) e.mobile = 'Mobile number is required.';
    if (!form.role) e.role = 'Role is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    navigate('/users');
  };

  const field = (key) => (e) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Users', to: '/users' }, { label: isEdit ? 'Edit' : 'Add' }]} />
        <h1 className="text-2xl font-bold text-gray-800">{isEdit ? 'Edit User' : 'Add User'}</h1>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-5 pb-3 border-b border-gray-100">User Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Full Name', key: 'fullName', placeholder: 'Enter full name', type: 'text' },
              { label: 'Email', key: 'email', placeholder: 'Enter email', type: 'email' },
              { label: isEdit ? 'New Password (leave blank to keep)' : 'Password', key: 'password', placeholder: 'Enter login password', type: 'password' },
              { label: 'Mobile', key: 'mobile', placeholder: 'Enter mobile number', type: 'tel' },
            ].map(({ label, key, placeholder, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {label} {key !== 'password' && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={type}
                  value={String(form[key])}
                  onChange={field(key)}
                  placeholder={placeholder}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${
                    errors[key] ? 'border-red-400' : 'border-gray-200 focus:border-blue-400'
                  }`}
                />
                {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Role <span className="text-red-500">*</span></label>
              <select
                value={form.role}
                onChange={field('role')}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${
                  errors.role ? 'border-red-400' : 'border-gray-200 focus:border-blue-400'
                }`}
              >
                <option value="">-- Select Role --</option>
                <option>Admin</option>
                <option>Faculty</option>
                <option>Student</option>
              </select>
              {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select
                value={form.isActive ? 'Active' : 'Inactive'}
                onChange={e => setForm(prev => ({ ...prev, isActive: e.target.value === 'Active' }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                <Save size={16} />
                Save
              </button>
              <Link to="/users" className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                <ArrowLeft size={16} />
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
