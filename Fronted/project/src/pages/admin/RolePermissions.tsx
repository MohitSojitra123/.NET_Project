import { useState } from 'react';
import { Plus, Save, Trash2, UserCog } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Badge, { roleBadge } from '../../components/Badge';
import { USERS, ROLES } from '../../data/mockData';

interface UserRoleEntry {
  id: number;
  userId: number;
  roleId: number;
}

const initial: UserRoleEntry[] = USERS.map((u, i) => ({
  id: i + 1,
  userId: u.id,
  roleId: ROLES.find(r => r.roleName === u.role)?.id || 1,
}));

export default function RolePermissions() {
  const [entries, setEntries] = useState<UserRoleEntry[]>(initial);
  const [newUserId, setNewUserId] = useState('');
  const [newRoleId, setNewRoleId] = useState('');
  const [saved, setSaved] = useState(false);

  const handleAdd = () => {
    if (!newUserId || !newRoleId) return;
    const exists = entries.find(e => e.userId === Number(newUserId) && e.roleId === Number(newRoleId));
    if (exists) return;
    setEntries(prev => [...prev, { id: Date.now(), userId: Number(newUserId), roleId: Number(newRoleId) }]);
    setNewUserId('');
    setNewRoleId('');
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Role & Permissions' }]} />
        <h1 className="text-2xl font-bold text-gray-800">Role & Permissions</h1>
        <p className="text-gray-500 text-sm mt-1">Manage user-role assignments.</p>
      </div>

      {/* Add assignment */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Assign Role to User</h3>
        <div className="flex flex-wrap gap-3">
          <select value={newUserId} onChange={e => setNewUserId(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30">
            <option value="">-- Select User --</option>
            {USERS.map(u => <option key={u.id} value={u.id}>{u.fullName}</option>)}
          </select>
          <select value={newRoleId} onChange={e => setNewRoleId(e.target.value)}
            className="flex-1 min-w-[160px] px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30">
            <option value="">-- Select Role --</option>
            {ROLES.map(r => <option key={r.id} value={r.id}>{r.roleName}</option>)}
          </select>
          <button onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus size={16} /> Assign
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">Current Assignments</span>
          <button onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Save size={15} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">#</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">User</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Email</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Assigned Role</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {entries.map((entry, idx) => {
                const user = USERS.find(u => u.id === entry.userId);
                const role = ROLES.find(r => r.id === entry.roleId);
                if (!user || !role) return null;
                return (
                  <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm text-gray-500">{idx + 1}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold">
                          {user.fullName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{user.fullName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{user.email}</td>
                    <td className="px-5 py-3.5">
                      <Badge label={role.roleName} variant={roleBadge(role.roleName as any)} />
                    </td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => setEntries(prev => prev.filter(e => e.id !== entry.id))}
                        className="p-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
