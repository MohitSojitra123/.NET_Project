import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './admin/Dashboard';
import FacultyDashboard from './faculty/Dashboard';
import StudentDashboard from './student/Dashboard';

export default function DashboardRouter() {
  const { user } = useAuth();
  if (user?.role === 'Admin') return <AdminDashboard />;
  if (user?.role === 'Faculty') return <FacultyDashboard />;
  return <StudentDashboard />;
}
