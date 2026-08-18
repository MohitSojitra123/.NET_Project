import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Shield, FolderKanban, CheckSquare,
  Star, GraduationCap, BookOpen, LogOut, ChevronDown, ChevronRight,
  UserCog, BarChart3, ClipboardList
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
  label: string;
  to?: string;
  icon: React.ReactNode;
  children?: NavItem[];
  roles?: string[];
}

const allNavItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard size={18} /> },
  {
    label: 'Admin Modules',
    icon: <Shield size={18} />,
    roles: ['Admin'],
    children: [
      { label: 'Manage Roles', to: '/roles', icon: <Shield size={16} /> },
      { label: 'Manage Users', to: '/users', icon: <Users size={16} /> },
      { label: 'Manage Students', to: '/students', icon: <GraduationCap size={16} /> },
      { label: 'Manage Faculty', to: '/faculty', icon: <BookOpen size={16} /> },
      { label: 'Role & Permissions', to: '/role-permissions', icon: <UserCog size={16} /> },
    ],
  },
  {
    label: 'Project Management',
    icon: <FolderKanban size={18} />,
    children: [
      { label: 'Manage Projects', to: '/projects', icon: <FolderKanban size={16} /> },
      { label: 'Manage Tasks', to: '/tasks', icon: <CheckSquare size={16} /> },
      { label: 'Scores & Remarks', to: '/scores', icon: <Star size={16} />, roles: ['Admin', 'Faculty'] },
    ],
  },
  {
    label: 'Reports',
    icon: <BarChart3 size={18} />,
    roles: ['Admin', 'Faculty'],
    children: [
      { label: 'Project Reports', to: '/reports/projects', icon: <ClipboardList size={16} /> },
      { label: 'Performance Report', to: '/reports/performance', icon: <BarChart3 size={16} /> },
    ],
  },
  { label: 'My Projects', to: '/my-projects', icon: <FolderKanban size={18} />, roles: ['Student'] },
  { label: 'My Tasks', to: '/my-tasks', icon: <CheckSquare size={18} />, roles: ['Student'] },
];

function NavItemComp({ item, userRole }: { item: NavItem; userRole: string }) {
  const [open, setOpen] = useState(true);

  if (item.roles && !item.roles.includes(userRole)) return null;

  if (item.children) {
    const visibleChildren = item.children.filter(c => !c.roles || c.roles.includes(userRole));
    if (visibleChildren.length === 0) return null;

    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-blue-200 uppercase tracking-wider hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            {item.icon}
            {item.label}
          </span>
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {open && (
          <div>
            {visibleChildren.map(child => (
              <NavItemComp key={child.to} item={child} userRole={userRole} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.to!}
      className={({ isActive }) =>
        `flex items-center gap-3 px-6 py-2.5 text-sm transition-all ${
          isActive
            ? 'bg-blue-600 text-white font-medium border-r-2 border-blue-300'
            : 'text-blue-100 hover:bg-blue-700/50 hover:text-white'
        }`
      }
    >
      {item.icon}
      {item.label}
    </NavLink>
  );
}

export default function Sidebar({ collapsed, onCollapse }: { collapsed: boolean; onCollapse: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#1a3a5c] to-[#0f2540] flex flex-col z-40 transition-all duration-300 ${
        collapsed ? 'w-0 overflow-hidden' : 'w-64'
      }`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-blue-700/50">
        <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <GraduationCap size={20} className="text-white" />
        </div>
        <div>
          <div className="text-white font-bold text-sm leading-tight">SPMS Admin</div>
          <div className="text-blue-300 text-xs">Student Project Mgmt</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {allNavItems.map((item, i) => (
          <NavItemComp key={i} item={item} userRole={user?.role || ''} />
        ))}
      </nav>

      {/* User info */}
      <div className="border-t border-blue-700/50 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            {user?.fullName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-medium truncate">{user?.fullName}</div>
            <div className="text-blue-300 text-xs">{user?.role}</div>
          </div>
          <button onClick={handleLogout} className="text-blue-300 hover:text-red-400 transition-colors" title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
