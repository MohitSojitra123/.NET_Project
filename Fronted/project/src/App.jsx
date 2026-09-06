import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppLayout from './layouts/AppLayout';
import Login from './pages/Login';
import DashboardRouter from './pages/DashboardRouter';
import Profile from './pages/Profile';
import Reports from './pages/Reports';

// Admin pages
import Roles from './pages/admin/Roles';
import RoleForm from './pages/admin/RoleForm';
import Users from './pages/admin/Users';
import UserForm from './pages/admin/UserForm';
import Students from './pages/admin/Students';
import Faculty from './pages/admin/Faculty';
import RolePermissions from './pages/admin/RolePermissions';
import Projects from './pages/admin/Projects';
import ProjectForm from './pages/admin/ProjectForm';
import Tasks from './pages/admin/Tasks';
import TaskForm from './pages/admin/TaskForm';
import ScoresRemarks from './pages/admin/ScoresRemarks';

// Student pages
import MyProjects from './pages/student/MyProjects';
import MyTasks from './pages/student/MyTasks';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardRouter />} />
            <Route path="profile" element={<Profile />} />

            {/* Roles */}
            <Route path="roles" element={<Roles />} />
            <Route path="roles/add" element={<RoleForm />} />
            <Route path="roles/edit/:id" element={<RoleForm />} />

            {/* Users */}
            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<UserForm />} />
            <Route path="users/edit/:id" element={<UserForm />} />

            {/* Students & Faculty */}
            <Route path="students" element={<Students />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="role-permissions" element={<RolePermissions />} />

            {/* Projects */}
            <Route path="projects" element={<Projects />} />
            <Route path="projects/add" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />

            {/* Tasks */}
            <Route path="tasks" element={<Tasks />} />
            <Route path="tasks/add" element={<TaskForm />} />
            <Route path="tasks/edit/:id" element={<TaskForm />} />

            {/* Scores */}
            <Route path="scores" element={<ScoresRemarks />} />

            {/* Reports */}
            <Route path="reports/projects" element={<Reports />} />
            <Route path="reports/performance" element={<Reports />} />

            {/* Student */}
            <Route path="my-projects" element={<MyProjects />} />
            <Route path="my-tasks" element={<MyTasks />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
