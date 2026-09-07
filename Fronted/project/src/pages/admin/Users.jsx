import { useEffect, useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  Users as UsersIcon,
} from "lucide-react";

import { Link } from "react-router-dom";

import Breadcrumb from "../../components/Breadcrumb";

import Badge, { roleBadge, statusBadge } from "../../components/Badge";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const Fetch_All_Users = async () => {
    try {
      setLoading(true);
      setError("");
      const Res = await fetch("https://localhost:7125/api/Users");
      if (!Res.ok) {
        throw new Error(`HTTP Error: ${Res.status}`);
      }

      const data = await Res.json();
      console.log("Original API Data:", data);

      if (!Array.isArray(data)) {
        throw new Error("API response is not an array");
      }

      const mappedUsers = data.map((user) => {
        return {
          id: user.userId,
          fullName: user.fullName || "Unknown User",
          email: user.email || "No Email",
          mobile: user.mobileNumber || "",
          profilePicturePath: user.profilePicturePath || null,
          role: user.role ?? "Student",
          isActive: user.isActive ?? true,
        };
      });

      setUsers(mappedUsers);
    } catch (error) {
      console.error("Error Fetching Users:", error);

      setError(error.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Fetch_All_Users();
  }, []);

  const filtered = users.filter((u) => {
    const matchSearch =
      (u.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.mobile || "").includes(search);

    const matchRole = roleFilter === "All" || u.role === roleFilter;

    const matchStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" ? u.isActive === true : u.isActive === false);

    return matchSearch && matchRole && matchStatus;
  });

  const handleDelete = (id) => {
    // Remove user from frontend state
    setUsers((prev) => prev.filter((u) => u.id !== id));

    setDeleteId(null);
  };

  const handleReset = () => {
    setRoleFilter("All");

    setStatusFilter("All");

    setSearch("");
  };

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb
          items={[
            {
              label: "Users",
            },
          ]}
        />

        <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-xs">
              <Search
                size={15}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="
                  pl-9
                  pr-4
                  py-2
                  text-sm
                  border
                  border-gray-200
                  rounded-lg
                  w-full
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/30
                  focus:border-blue-400
                "
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  border
                  border-gray-200
                  text-gray-600
                  text-sm
                  rounded-lg
                  hover:bg-gray-50
                  transition-colors
                "
              >
                <Filter size={14} />
                Filters
              </button>

              <Link
                to="/users/add"
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  text-sm
                  font-medium
                  rounded-lg
                  transition-colors
                "
              >
                <Plus size={16} />
                Add User
              </Link>
            </div>
          </div>

          {showFilters && (
            <div
              className="
              mt-3
              flex
              flex-wrap
              gap-3
              pt-3
              border-t
              border-gray-100
            "
            >
              <div className="flex-1 min-w-[160px]">
                <label
                  className="
                  block
                  text-xs
                  text-gray-500
                  mb-1
                "
                >
                  Role
                </label>

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="
                    w-full
                    px-3
                    py-2
                    text-sm
                    border
                    border-gray-200
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                  "
                >
                  <option value="All">All</option>

                  <option value="Admin">Admin</option>

                  <option value="Faculty">Faculty</option>

                  <option value="Student">Student</option>
                </select>
              </div>

              <div className="flex-1 min-w-[160px]">
                <label
                  className="
                  block
                  text-xs
                  text-gray-500
                  mb-1
                "
                >
                  Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="
                    w-full
                    px-3
                    py-2
                    text-sm
                    border
                    border-gray-200
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                  "
                >
                  <option value="All">All</option>

                  <option value="Active">Active</option>

                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div
                className="
                flex
                items-end
                gap-2
              "
              >
                <button
                  className="
                    px-3
                    py-2
                    bg-blue-600
                    text-white
                    text-sm
                    rounded-lg
                    hover:bg-blue-700
                    transition-colors
                  "
                >
                  Apply
                </button>

                <button
                  onClick={handleReset}
                  className="
                    px-3
                    py-2
                    border
                    border-gray-200
                    text-sm
                    rounded-lg
                    hover:bg-gray-50
                    transition-colors
                  "
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="
                border-b
                border-gray-100
                bg-gray-50
              "
              >
                <th
                  className="
                  text-left
                  text-xs
                  font-semibold
                  text-gray-500
                  uppercase
                  tracking-wider
                  px-5
                  py-3
                  w-10
                "
                >
                  #
                </th>

                <th
                  className="
                  text-left
                  text-xs
                  font-semibold
                  text-gray-500
                  uppercase
                  tracking-wider
                  px-5
                  py-3
                "
                >
                  Full Name
                </th>

                <th
                  className="
                  text-left
                  text-xs
                  font-semibold
                  text-gray-500
                  uppercase
                  tracking-wider
                  px-5
                  py-3
                "
                >
                  Email
                </th>

                <th
                  className="
                  text-left
                  text-xs
                  font-semibold
                  text-gray-500
                  uppercase
                  tracking-wider
                  px-5
                  py-3
                "
                >
                  Mobile
                </th>

                <th
                  className="
                  text-left
                  text-xs
                  font-semibold
                  text-gray-500
                  uppercase
                  tracking-wider
                  px-5
                  py-3
                "
                >
                  Role
                </th>

                <th
                  className="
                  text-left
                  text-xs
                  font-semibold
                  text-gray-500
                  uppercase
                  tracking-wider
                  px-5
                  py-3
                "
                >
                  Status
                </th>

                <th
                  className="
                  text-left
                  text-xs
                  font-semibold
                  text-gray-500
                  uppercase
                  tracking-wider
                  px-5
                  py-3
                  w-24
                "
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody
              className="
              divide-y
              divide-gray-50
            "
            >
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="
                      text-center
                      py-12
                      text-gray-400
                    "
                  >
                    Loading users...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={7}
                    className="
                      text-center
                      py-12
                      text-red-500
                    "
                  >
                    {error}
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="
                      text-center
                      py-12
                      text-gray-400
                    "
                  >
                    <UsersIcon
                      size={32}
                      className="
                        mx-auto
                        mb-2
                        opacity-30
                      "
                    />
                    No users found
                  </td>
                </tr>
              ) : (
                filtered.map((user, idx) => (
                  <tr
                    key={user.id}
                    className="
                      hover:bg-gray-50
                      transition-colors
                    "
                  >
                    <td
                      className="
                      px-5
                      py-3.5
                      text-sm
                      text-gray-500
                    "
                    >
                      {idx + 1}
                    </td>

                    <td className="px-5 py-3.5">
                      <div
                        className="
                        flex
                        items-center
                        gap-3
                      "
                      >
                        {user.profilePicturePath ? (
                          <img

                            src={user.profilePicturePath}

                            alt={user.fullName}

                            className="
                              w-[55px]
                              h-[55px]
                              rounded-full
                              object-cover
                              flex-shrink-0
                            "

                          />
  //                         <span
  //                           title={user.fullName}
  //                           className="
  //   w-8
  //   h-8
  //   rounded-full
  //   bg-blue-100
  //   text-blue-700
  //   flex
  //   items-center
  //   justify-center
  //   flex-shrink-0
  //   font-semibold
  //   text-sm
  //   cursor-pointer
  //   transition-all
  //   duration-200
  //   hover:bg-blue-600
  //   hover:text-white
  //   hover:scale-110
  //   hover:shadow-md
  // "
  //                         >
  //                           {user.fullName?.charAt(0).toUpperCase()}
  //                         </span>
                        ) : (
                          <div
                            className="
                            w-8
                            h-8
                            rounded-full
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            text-blue-700
                            text-sm
                            font-semibold
                            flex-shrink-0
                          "
                          >
                            {user.fullName?.charAt(0)?.toUpperCase()}
                          </div>
                        )}

                        <span
                          className="
                          text-sm
                          font-medium
                          text-gray-800
                        "
                        >
                          {user.fullName}
                        </span>
                      </div>
                    </td>

                    <td
                      className="
                      px-5
                      py-3.5
                      text-sm
                      text-gray-600
                    "
                    >
                      {user.email}
                    </td>

                    <td
                      className="
                      px-5
                      py-3.5
                      text-sm
                      text-gray-600
                    "
                    >
                      {user.mobile || "N/A"}
                    </td>

                    <td className="px-5 py-3.5">
                      <Badge label={user.role} variant={roleBadge(user.role)} />
                    </td>

                    <td className="px-5 py-3.5">
                      <Badge
                        label={user.isActive ? "Active" : "Inactive"}
                        variant={statusBadge(
                          user.isActive ? "Active" : "Inactive",
                        )}
                      />
                    </td>

                    <td className="px-5 py-3.5">
                      <div
                        className="
                        flex
                        items-center
                        gap-2
                      "
                      >
                        {/* EDIT */}

                        <Link
                          to={`/users/edit/${user.id}`}
                          className="
                            p-1.5
                            rounded-md
                            bg-blue-50
                            text-blue-600
                            hover:bg-blue-100
                            transition-colors
                          "
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>

                        {/* DELETE */}

                        <button
                          onClick={() => setDeleteId(user.id)}
                          className="
                            p-1.5
                            rounded-md
                            bg-red-50
                            text-red-500
                            hover:bg-red-100
                            transition-colors
                          "
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteId && (
        <div
          className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
          p-4
        "
        >
          <div
            className="
            bg-white
            rounded-2xl
            shadow-xl
            p-6
            max-w-sm
            w-full
          "
          >
            {/* DELETE ICON */}

            <div
              className="
              w-12
              h-12
              bg-red-100
              rounded-full
              flex
              items-center
              justify-center
              mx-auto
              mb-4
            "
            >
              <Trash2 size={22} className="text-red-600" />
            </div>

            {/* TITLE */}

            <h3
              className="
              text-lg
              font-semibold
              text-gray-800
              text-center
            "
            >
              Delete User?
            </h3>

            {/* DESCRIPTION */}

            <p
              className="
              text-sm
              text-gray-500
              text-center
              mt-2
            "
            >
              This action cannot be undone.
            </p>

            {/* BUTTONS */}

            <div
              className="
              flex
              gap-3
              mt-6
            "
            >
              {/* CANCEL */}

              <button
                onClick={() => setDeleteId(null)}
                className="
                  flex-1
                  py-2
                  border
                  border-gray-200
                  rounded-lg
                  text-sm
                  font-medium
                  hover:bg-gray-50
                  transition-colors
                "
              >
                Cancel
              </button>

              {/* DELETE */}

              <button
                onClick={() => handleDelete(deleteId)}
                className="
                  flex-1
                  py-2
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  rounded-lg
                  text-sm
                  font-medium
                  transition-colors
                "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import { Plus, Pencil, Trash2, Search, Filter, Users as UsersIcon, User } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import Breadcrumb from '../../components/Breadcrumb';
// import Badge, { roleBadge, statusBadge } from '../../components/Badge';
// import { USERS } from '../../data/mockData';

// export default function Users() {
//   const [users, setUsers] = useState(USERS);
//   const [search, setSearch] = useState('');
//   const [roleFilter, setRoleFilter] = useState('All');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [showFilters, setShowFilters] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   const filtered = users.filter(u => {
//     const matchSearch =
//       u.fullName.toLowerCase().includes(search.toLowerCase()) ||
//       u.email.toLowerCase().includes(search.toLowerCase()) ||
//       u.mobile.includes(search);
//     const matchRole = roleFilter === 'All' || u.role === roleFilter;
//     const matchStatus = statusFilter === 'All' || (statusFilter === 'Active' ? u.isActive : !u.isActive);
//     return matchSearch && matchRole && matchStatus;
//   });

//   const handleDelete = (id) => {
//     setUsers(prev => prev.filter(u => u.id !== id));
//     setDeleteId(null);
//   };

//     const Fetch_All_Users=async()=>{
//           const Res=await fetch('https://localhost:7125/api/Users');
//            const data=await Res.json();
//            console.log(data);
//     }

//     useEffect(()=>{
//            Fetch_All_Users();
//     },[])

//   return (
//     <div>
//       <div className="mb-6">
//         <Breadcrumb items={[{ label: 'Users' }]} />
//         <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
//         {/* Toolbar */}
//         <div className="p-4 border-b border-gray-100">
//           <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
//             <div className="relative flex-1 max-w-xs">
//               <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 placeholder="Search users..."
//                 className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
//               />
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 <Filter size={14} />
//                 Filters
//               </button>
//               <Link
//                 to="/users/add"
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
//               >
//                 <Plus size={16} />
//                 Add User
//               </Link>
//             </div>
//           </div>

//           {showFilters && (
//             <div className="mt-3 flex flex-wrap gap-3 pt-3 border-t border-gray-100">
//               <div className="flex-1 min-w-[160px]">
//                 <label className="block text-xs text-gray-500 mb-1">Role</label>
//                 <select
//                   value={roleFilter}
//                   onChange={e => setRoleFilter(e.target.value)}
//                   className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
//                 >
//                   <option>All</option>
//                   <option>Admin</option>
//                   <option>Faculty</option>
//                   <option>Student</option>
//                 </select>
//               </div>
//               <div className="flex-1 min-w-[160px]">
//                 <label className="block text-xs text-gray-500 mb-1">Status</label>
//                 <select
//                   value={statusFilter}
//                   onChange={e => setStatusFilter(e.target.value)}
//                   className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
//                 >
//                   <option>All</option>
//                   <option>Active</option>
//                   <option>Inactive</option>
//                 </select>
//               </div>
//               <div className="flex items-end gap-2">
//                 <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">Apply</button>
//                 <button
//                   onClick={() => { setRoleFilter('All'); setStatusFilter('All'); setSearch(''); }}
//                   className="px-3 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-100 bg-gray-50">
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-10">#</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Full Name</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Email</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Mobile</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Role</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-24">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="text-center py-12 text-gray-400">
//                     <UsersIcon size={32} className="mx-auto mb-2 opacity-30" />
//                     No users found
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((user, idx) => (
//                   <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-5 py-3.5 text-sm text-gray-500">{idx + 1}</td>
//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold flex-shrink-0">
//                           {user.fullName.charAt(0)}
//                         </div>
//                         <span className="text-sm font-medium text-gray-800">{user.fullName}</span>
//                       </div>
//                     </td>
//                     <td className="px-5 py-3.5 text-sm text-gray-600">{user.email}</td>
//                     <td className="px-5 py-3.5 text-sm text-gray-600">{user.mobile}</td>
//                     <td className="px-5 py-3.5">
//                       <Badge label={user.role} variant={roleBadge(user.role)} />
//                     </td>
//                     <td className="px-5 py-3.5">
//                       <Badge label={user.isActive ? 'Active' : 'Inactive'} variant={statusBadge(user.isActive ? 'Active' : 'Inactive')} />
//                     </td>
//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-2">
//                         <Link to={`/users/edit/${user.id}`} className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="Edit">
//                           <Pencil size={14} />
//                         </Link>
//                         <button onClick={() => setDeleteId(user.id)} className="p-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors" title="Delete">
//                           <Trash2 size={14} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {deleteId && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
//             <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Trash2 size={22} className="text-red-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 text-center">Delete User?</h3>
//             <p className="text-sm text-gray-500 text-center mt-2">This action cannot be undone.</p>
//             <div className="flex gap-3 mt-6">
//               <button onClick={() => setDeleteId(null)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
//               <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">Delete</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
