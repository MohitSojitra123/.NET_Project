export type Role = 'Admin' | 'Faculty' | 'Student';

export interface User {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  role: Role;
  isActive: boolean;
  avatar?: string;
}

export interface RoleRecord {
  id: number;
  roleName: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
  startDate: string;
  endDate: string;
  faculty: string;
  students: string[];
  totalTasks: number;
  completedTasks: number;
  progress: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  project: string;
  projectId: number;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Rejected';
  assignedTo: string;
  dueDate: string;
  assignedScore: number;
  earnedScore: number | null;
  facultyRemarks: string;
  studentRemarks: string;
  startDate: string;
  completedDate: string | null;
}

export const ROLES: RoleRecord[] = [
  { id: 1, roleName: 'Admin', description: 'Full access to all modules and settings.' },
  { id: 2, roleName: 'Student', description: 'Can view and manage own projects and tasks.' },
  { id: 3, roleName: 'Faculty', description: 'Can supervise students and manage project assignments.' },
];

export const USERS: User[] = [
  { id: 1, fullName: 'Aarav Patel', email: 'admin@spms.com', mobile: '9876543210', role: 'Admin', isActive: true },
  { id: 2, fullName: 'Priya Sharma', email: 'priya.sharma@spms.com', mobile: '9876543211', role: 'Faculty', isActive: true },
  { id: 3, fullName: 'Rohan Mehta', email: 'rohan.mehta@spms.com', mobile: '9876543212', role: 'Student', isActive: true },
  { id: 4, fullName: 'Sneha Desai', email: 'sneha.desai@spms.com', mobile: '9876543213', role: 'Student', isActive: true },
  { id: 5, fullName: 'Vikram Singh', email: 'vikram.singh@spms.com', mobile: '9876543214', role: 'Faculty', isActive: false },
  { id: 6, fullName: 'Anita Joshi', email: 'anita.joshi@spms.com', mobile: '9876543215', role: 'Student', isActive: true },
  { id: 7, fullName: 'Dr. Nisha Kapoor', email: 'nisha.kapoor@spms.com', mobile: '9876543216', role: 'Faculty', isActive: true },
  { id: 8, fullName: 'Arjun Reddy', email: 'arjun.reddy@spms.com', mobile: '9876543217', role: 'Student', isActive: true },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Build a full-stack e-commerce web application.',
    status: 'In Progress',
    startDate: '2024-09-01',
    endDate: '2025-03-01',
    faculty: 'Priya Sharma',
    students: ['Rohan Mehta', 'Sneha Desai', 'Arjun Reddy'],
    totalTasks: 8,
    completedTasks: 3,
    progress: 37.5,
  },
  {
    id: 2,
    title: 'Library Management System',
    description: 'Develop a library management system with barcode scanning.',
    status: 'Completed',
    startDate: '2024-08-15',
    endDate: '2025-02-15',
    faculty: 'Priya Sharma',
    students: ['Rohan Mehta', 'Anita Joshi'],
    totalTasks: 6,
    completedTasks: 6,
    progress: 100,
  },
  {
    id: 3,
    title: 'AI Chatbot',
    description: 'Create an AI-powered chatbot for student queries.',
    status: 'In Progress',
    startDate: '2025-01-01',
    endDate: '2025-06-30',
    faculty: 'Dr. Nisha Kapoor',
    students: ['Anita Joshi', 'Arjun Reddy'],
    totalTasks: 5,
    completedTasks: 1,
    progress: 20,
  },
  {
    id: 4,
    title: 'IoT Weather Station',
    description: 'Build an IoT-based weather monitoring station.',
    status: 'Not Started',
    startDate: '2025-03-01',
    endDate: '2025-09-01',
    faculty: 'Dr. Nisha Kapoor',
    students: ['Sneha Desai', 'Rohan Mehta'],
    totalTasks: 4,
    completedTasks: 0,
    progress: 0,
  },
  {
    id: 5,
    title: 'Healthcare Portal',
    description: 'Develop a patient management portal with appointment scheduling.',
    status: 'On Hold',
    startDate: '2024-11-01',
    endDate: '2025-05-01',
    faculty: 'Vikram Singh',
    students: ['Arjun Reddy'],
    totalTasks: 7,
    completedTasks: 2,
    progress: 28.6,
  },
];

export const TASKS: Task[] = [
  {
    id: 1,
    title: 'Design Database Schema',
    description: 'Design normalized database schema for e-commerce platform.',
    project: 'E-Commerce Platform',
    projectId: 1,
    priority: 'High',
    status: 'Pending',
    assignedTo: 'Rohan Mehta',
    dueDate: '2024-09-15',
    assignedScore: 10,
    earnedScore: null,
    facultyRemarks: '',
    studentRemarks: 'Working on the ER diagram.',
    startDate: '2024-09-01',
    completedDate: null,
  },
  {
    id: 2,
    title: 'Setup Project Structure',
    description: 'Initialize project repo and configure CI/CD pipeline.',
    project: 'E-Commerce Platform',
    projectId: 1,
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Rohan Mehta',
    dueDate: '2024-09-20',
    assignedScore: 8,
    earnedScore: null,
    facultyRemarks: '',
    studentRemarks: '',
    startDate: '2024-09-05',
    completedDate: null,
  },
  {
    id: 3,
    title: 'Implement User Authentication',
    description: 'Build JWT-based authentication for the platform.',
    project: 'E-Commerce Platform',
    projectId: 1,
    priority: 'High',
    status: 'Completed',
    assignedTo: 'Rohan Mehta',
    dueDate: '2024-10-01',
    assignedScore: 15,
    earnedScore: 14,
    facultyRemarks: 'Good work, minor improvements needed.',
    studentRemarks: 'Completed with refresh token support.',
    startDate: '2024-09-15',
    completedDate: '2024-09-30',
  },
  {
    id: 4,
    title: 'Create Book Catalog Module',
    description: 'Implement book catalog with search and filter.',
    project: 'Library Management System',
    projectId: 2,
    priority: 'Medium',
    status: 'Completed',
    assignedTo: 'Sneha Desai',
    dueDate: '2024-10-15',
    assignedScore: 12,
    earnedScore: 11,
    facultyRemarks: 'Excellent implementation.',
    studentRemarks: 'Added advanced filters.',
    startDate: '2024-09-20',
    completedDate: '2024-10-12',
  },
  {
    id: 5,
    title: 'Train NLP Model',
    description: 'Train NLP model for chatbot intent recognition.',
    project: 'AI Chatbot',
    projectId: 3,
    priority: 'Critical',
    status: 'In Progress',
    assignedTo: 'Anita Joshi',
    dueDate: '2025-03-01',
    assignedScore: 20,
    earnedScore: null,
    facultyRemarks: '',
    studentRemarks: 'Collecting training data.',
    startDate: '2025-01-10',
    completedDate: null,
  },
  {
    id: 6,
    title: 'Build Product Listing Page',
    description: 'Frontend product listing with pagination and sorting.',
    project: 'E-Commerce Platform',
    projectId: 1,
    priority: 'Medium',
    status: 'Pending',
    assignedTo: 'Sneha Desai',
    dueDate: '2024-11-01',
    assignedScore: 10,
    earnedScore: null,
    facultyRemarks: '',
    studentRemarks: '',
    startDate: '2024-10-15',
    completedDate: null,
  },
  {
    id: 7,
    title: 'Payment Gateway Integration',
    description: 'Integrate Razorpay payment gateway.',
    project: 'E-Commerce Platform',
    projectId: 1,
    priority: 'Critical',
    status: 'Pending',
    assignedTo: 'Arjun Reddy',
    dueDate: '2024-12-01',
    assignedScore: 18,
    earnedScore: null,
    facultyRemarks: '',
    studentRemarks: '',
    startDate: '2024-11-10',
    completedDate: null,
  },
  {
    id: 8,
    title: 'IoT Sensor Setup',
    description: 'Configure Arduino sensors for temperature, humidity.',
    project: 'IoT Weather Station',
    projectId: 4,
    priority: 'High',
    status: 'Pending',
    assignedTo: 'Sneha Desai',
    dueDate: '2025-04-01',
    assignedScore: 15,
    earnedScore: null,
    facultyRemarks: '',
    studentRemarks: '',
    startDate: '2025-03-01',
    completedDate: null,
  },
];

export const LOGGED_IN_USERS = {
  admin: USERS[0],
  faculty: USERS[1],
  student: USERS[2],
};
