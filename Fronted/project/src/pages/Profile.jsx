import { useState } from 'react';
import { Save, Camera, Mail, Phone, Shield, User } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Badge, { roleBadge } from '../components/Badge';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const set = (key) => (e) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Profile' }]} />
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left card - avatar & info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl font-bold mx-auto">
                {user?.fullName.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-md">
                <Camera size={14} />
              </button>
            </div>
            <h2 className="text-lg font-bold text-gray-800">{user?.fullName}</h2>
            <div className="mt-2 flex justify-center">
              {user && <Badge label={user.role} variant={roleBadge(user.role)} />}
            </div>

            <div className="mt-5 space-y-3 text-left">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail size={16} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm text-gray-700 font-medium">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone size={16} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Mobile</p>
                  <p className="text-sm text-gray-700 font-medium">{user?.mobile}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield size={16} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Role</p>
                  <p className="text-sm text-gray-700 font-medium">{user?.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User size={16} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <p className="text-sm text-green-600 font-medium">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - edit form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-5 pb-3 border-b border-gray-100">Personal Information</h3>

            {saved && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input value={form.fullName} onChange={set('fullName')}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input type="email" value={form.email} onChange={set('email')}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
                  <input type="tel" value={form.mobile} onChange={set('mobile')}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
                </div>
              </div>

              <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                <Save size={16} />
                Save Changes
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-5 pb-3 border-b border-gray-100">Change Password</h3>

            <div className="space-y-4">
              {[
                { label: 'Current Password', key: 'currentPassword' },
                { label: 'New Password', key: 'newPassword' },
                { label: 'Confirm New Password', key: 'confirmPassword' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input type="password" value={form[key]} onChange={set(key)} placeholder="••••••••"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
                </div>
              ))}
              <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors">
                <Save size={16} />
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
