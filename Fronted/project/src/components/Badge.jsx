const variants = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  gray: 'bg-gray-100 text-gray-600',
  purple: 'bg-violet-100 text-violet-700',
  orange: 'bg-orange-100 text-orange-700',
  teal: 'bg-teal-100 text-teal-700',
};

export function roleBadge(role) {
  return role === 'Admin' ? 'blue' : role === 'Faculty' ? 'teal' : 'orange';
}

export function statusBadge(status) {
  if (status === 'Completed') return 'green';
  if (status === 'In Progress') return 'blue';
  if (status === 'Pending') return 'yellow';
  if (status === 'Rejected') return 'red';
  if (status === 'Not Started') return 'gray';
  if (status === 'On Hold') return 'orange';
  if (status === 'Active') return 'green';
  if (status === 'Inactive') return 'red';
  return 'gray';
}

export function priorityBadge(priority) {
  if (priority === 'Critical') return 'red';
  if (priority === 'High') return 'orange';
  if (priority === 'Medium') return 'blue';
  return 'gray';
}

export default function Badge({ label, variant }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {label}
    </span>
  );
}
