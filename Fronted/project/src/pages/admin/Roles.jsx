// import { useState } from 'react';
// import { Plus, Pencil, Trash2, Search, Shield } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import Breadcrumb from '../../components/Breadcrumb';
// import { ROLES } from '../../data/mockData';

// export default function Roles() {
//   const [roles, setRoles] = useState();
//   const [search, setSearch] = useState('');
//   const [deleteId, setDeleteId] = useState(null);

//   const filtered = roles.filter(r =>
//     r.roleName.toLowerCase().includes(search.toLowerCase()) ||
//     r.description.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleDelete = (id) => {
//     setRoles(prev => prev.filter(r => r.id !== id));
//     setDeleteId(null);
//   };


//     const Fetch_All_Roles=async()=>{
//           const resp =  await fetch('https://localhost:7125/api/Role');
//           const data=await resp.json();
//           setRoles(data);
//     } 



//   return (
//     <div>
//       <div className="mb-6">
//         <Breadcrumb items={[{ label: 'Roles' }]} />
//         <h1 className="text-2xl font-bold text-gray-800">Manage Roles</h1>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
//         <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
//           <div className="relative flex-1 max-w-xs">
//             <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               placeholder="Search roles..."
//               className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
//             />
//           </div>
//           <Link
//             to="/roles/add"
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
//           >
//             <Plus size={16} />
//             Add Role
//           </Link>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-100 bg-gray-50">
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-12">#</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Role Name</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Description</th>
//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-32">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan={4} className="text-center py-12 text-gray-400">
//                     <Shield size={32} className="mx-auto mb-2 opacity-30" />
//                     No roles found
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((role, idx) => (
//                   <tr key={role.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-5 py-3.5 text-sm text-gray-500">{idx + 1}</td>
//                     <td className="px-5 py-3.5">
//                       <span className="text-sm font-semibold text-gray-800">{role.roleName}</span>
//                     </td>
//                     <td className="px-5 py-3.5 text-sm text-gray-600">{role.description}</td>
//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-2">
//                         <Link
//                           to={`/roles/edit/${role.id}`}
//                           className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
//                           title="Edit"
//                         >
//                           <Pencil size={14} />
//                         </Link>
//                         <button
//                           onClick={() => setDeleteId(role.id)}
//                           className="p-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
//                           title="Delete"
//                         >
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

//       {/* Delete modal */}
//       {deleteId && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
//             <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Trash2 size={22} className="text-red-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 text-center">Delete Role?</h3>
//             <p className="text-sm text-gray-500 text-center mt-2">This action cannot be undone. Are you sure?</p>
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












// import { useState, useEffect } from 'react';
// import { Plus, Pencil, Trash2, Search, Shield } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import Breadcrumb from '../../components/Breadcrumb';

// export default function Roles() {
//   const [roles, setRoles] = useState([]);
//   const [search, setSearch] = useState('');
//   const [deleteId, setDeleteId] = useState(null);

//   // Fetch All Roles
// const Fetch_All_Roles = async () => {
//     try {
//       const resp = await fetch('https://localhost:7125/api/Role');

//       if (!resp.ok) {
//         throw new Error(`HTTP Error: ${resp.status}`);
//       }

//       const data = await resp.json();

//       console.log("Roles API Response:", data);

//       setRoles(data);
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//     }
// };





//   // Call API when page loads
//   useEffect(() => {
//     Fetch_All_Roles();
//   }, []);

//   // Search filter
//   const filtered = roles.filter(
//     (r) =>
//       r.roleName.toLowerCase().includes(search.toLowerCase()) ||
//       r.description.toLowerCase().includes(search.toLowerCase())
//   );

//   // Delete
//   const handleDelete = (id) => {
//     setRoles((prev) => prev.filter((r) => r.roleId !== id));
//     setDeleteId(null);
//   };

//   return (
//     <div>
//       <div className="mb-6">
//         <Breadcrumb items={[{ label: 'Roles' }]} />

//         <h1 className="text-2xl font-bold text-gray-800">
//           Manage Roles
//         </h1>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-100 shadow-sm">

//         {/* Header */}
//         <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

//           <div className="relative flex-1 max-w-xs">
//             <Search
//               size={15}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />

//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search roles..."
//               className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
//             />
//           </div>

//           <Link
//             to="/roles/add"
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
//           >
//             <Plus size={16} />
//             Add Role
//           </Link>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full">

//             <thead>
//               <tr className="border-b border-gray-100 bg-gray-50">

//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-12">
//                   #
//                 </th>

//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
//                   Role Name
//                 </th>

//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
//                   Description
//                 </th>

//                 <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-32">
//                   Actions
//                 </th>

//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-50">

//               {filtered.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={4}
//                     className="text-center py-12 text-gray-400"
//                   >
//                     <Shield
//                       size={32}
//                       className="mx-auto mb-2 opacity-30"
//                     />

//                     No roles found
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((role, idx) => (

//                   <tr
//                     key={role.roleId}
//                     className="hover:bg-gray-50 transition-colors"
//                   >

//                     <td className="px-5 py-3.5 text-sm text-gray-500">
//                       {idx + 1}
//                     </td>

//                     <td className="px-5 py-3.5">
//                       <span className="text-sm font-semibold text-gray-800">
//                         {role.roleName}
//                       </span>
//                     </td>

//                     <td className="px-5 py-3.5 text-sm text-gray-600">
//                       {role.description}
//                     </td>

//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-2">

//                         {/* Edit */}
//                         <Link
//                           to={`/roles/edit/${role.roleId}`}
//                           className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
//                           title="Edit"
//                         >
//                           <Pencil size={14} />
//                         </Link>

//                         {/* Delete */}
//                         <button
//                           onClick={() => setDeleteId(role.roleId)}
//                           className="p-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
//                           title="Delete"
//                         >
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

//       {/* Delete Modal */}
//       {deleteId && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

//           <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">

//             <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Trash2 size={22} className="text-red-600" />
//             </div>

//             <h3 className="text-lg font-semibold text-gray-800 text-center">
//               Delete Role?
//             </h3>

//             <p className="text-sm text-gray-500 text-center mt-2">
//               This action cannot be undone. Are you sure?
//             </p>

//             <div className="flex gap-3 mt-6">

//               <button
//                 onClick={() => setDeleteId(null)}
//                 className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={() => handleDelete(deleteId)}
//                 className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
//               >
//                 Delete
//               </button>

//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

export default function Roles() {

  // ==========================================
  // STATE
  // ==========================================

  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState('');

  // Store RoleId which user wants to delete
  const [deleteId, setDeleteId] = useState(null);

  // Loading state for delete operation
  const [isDeleting, setIsDeleting] = useState(false);


  // ==========================================
  // FETCH ALL ROLES
  // ==========================================

  const Fetch_All_Roles = async () => {

    try {

      const response = await fetch(
        'https://localhost:7125/api/Role'
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log('Roles API Response:', data);

      setRoles(data);

    } catch (error) {

      console.error('Error fetching roles:', error);

    }
  };


  // ==========================================
  // CALL API WHEN PAGE LOADS
  // ==========================================

  useEffect(() => {

    Fetch_All_Roles();

  }, []);


  // ==========================================
  // SEARCH FILTER
  // ==========================================

  const filtered = roles.filter((role) => {

    const roleName = role.roleName || '';
    const description = role.description || '';

    return (
      roleName
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      description
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  });


  // ==========================================
  // DELETE ROLE
  // ==========================================

  const handleDelete = async (id) => {

    try {

      setIsDeleting(true);

      console.log('Deleting Role ID:', id);


      // ==========================================
      // DELETE API CALL
      // ==========================================

      const response = await fetch(
        `https://localhost:7125/api/Role/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );


      // ==========================================
      // CHECK API RESPONSE
      // ==========================================

      if (!response.ok) {

        throw new Error(
          `HTTP Error: ${response.status}`
        );

      }


      // ==========================================
      // REMOVE ROLE FROM UI
      // ==========================================

      setRoles((prevRoles) =>
        prevRoles.filter(
          (role) => role.roleId !== id
        )
      );


      // ==========================================
      // CLOSE DELETE MODAL
      // ==========================================

      setDeleteId(null);


      console.log(
        `Role ${id} deleted successfully`
      );

      alert('Role deleted successfully!');

    } catch (error) {

      console.error(
        'Error deleting role:',
        error
      );

      alert(
        'Failed to delete role. Please try again.'
      );

    } finally {

      setIsDeleting(false);

    }
  };


  // ==========================================
  // OPEN DELETE MODAL
  // ==========================================

  const openDeleteModal = (id) => {

    setDeleteId(id);

  };


  // ==========================================
  // CLOSE DELETE MODAL
  // ==========================================

  const closeDeleteModal = () => {

    if (!isDeleting) {
      setDeleteId(null);
    }

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div>

      {/* ==========================================
          PAGE HEADER
          ========================================== */}

      <div className="mb-6">

        <Breadcrumb
          items={[
            {
              label: 'Roles'
            }
          ]}
        />

        <h1 className="text-2xl font-bold text-gray-800">
          Manage Roles
        </h1>

      </div>


      {/* ==========================================
          MAIN CARD
          ========================================== */}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">


        {/* ==========================================
            HEADER
            ========================================== */}

        <div
          className="
            p-4
            border-b
            border-gray-100
            flex
            flex-col
            sm:flex-row
            gap-3
            items-start
            sm:items-center
            justify-between
          "
        >


          {/* ==========================================
              SEARCH
              ========================================== */}

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
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search roles..."
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


          {/* ==========================================
              ADD ROLE BUTTON
              ========================================== */}

          <Link
            to="/roles/add"
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
              shadow-sm
            "
          >

            <Plus size={16} />

            Add Role

          </Link>

        </div>


        {/* ==========================================
            TABLE
            ========================================== */}

        <div className="overflow-x-auto">

          <table className="w-full">


            {/* ==========================================
                TABLE HEADER
                ========================================== */}

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
                    w-12
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
                  Role Name
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
                  Description
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
                    w-32
                  "
                >
                  Actions
                </th>

              </tr>

            </thead>


            {/* ==========================================
                TABLE BODY
                ========================================== */}

            <tbody
              className="
                divide-y
                divide-gray-50
              "
            >

              {filtered.length === 0 ? (

                /* ==========================================
                   NO DATA
                   ========================================== */

                <tr>

                  <td
                    colSpan={4}
                    className="
                      text-center
                      py-12
                      text-gray-400
                    "
                  >

                    <Shield
                      size={32}
                      className="
                        mx-auto
                        mb-2
                        opacity-30
                      "
                    />

                    No roles found

                  </td>

                </tr>

              ) : (

                /* ==========================================
                   ROLE LIST
                   ========================================== */

                filtered.map((role, idx) => (

                  <tr
                    key={role.roleId}
                    className="
                      hover:bg-gray-50
                      transition-colors
                    "
                  >


                    {/* ==================================
                        NUMBER
                        ================================== */}

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


                    {/* ==================================
                        ROLE NAME
                        ================================== */}

                    <td className="px-5 py-3.5">

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-gray-800
                        "
                      >
                        {role.roleName}
                      </span>

                    </td>


                    {/* ==================================
                        DESCRIPTION
                        ================================== */}

                    <td
                      className="
                        px-5
                        py-3.5
                        text-sm
                        text-gray-600
                      "
                    >
                      {role.description || '-'}
                    </td>


                    {/* ==================================
                        ACTIONS
                        ================================== */}

                    <td className="px-5 py-3.5">

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >


                        {/* ==============================
                            EDIT
                            ============================== */}

                        <Link
                          to={`/roles/edit/${role.roleId}`}
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


                        {/* ==============================
                            DELETE
                            ============================== */}

                        <button
                          onClick={() =>
                            openDeleteModal(
                              role.roleId
                            )
                          }
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


      {/* ==========================================
          DELETE CONFIRMATION MODAL
          ========================================== */}

      {deleteId !== null && (

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


            {/* ==================================
                DELETE ICON
                ================================== */}

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

              <Trash2
                size={22}
                className="text-red-600"
              />

            </div>


            {/* ==================================
                TITLE
                ================================== */}

            <h3
              className="
                text-lg
                font-semibold
                text-gray-800
                text-center
              "
            >
              Delete Role?
            </h3>


            {/* ==================================
                MESSAGE
                ================================== */}

            <p
              className="
                text-sm
                text-gray-500
                text-center
                mt-2
              "
            >
              This action cannot be undone.
              Are you sure?
            </p>


            {/* ==================================
                BUTTONS
                ================================== */}

            <div
              className="
                flex
                gap-3
                mt-6
              "
            >


              {/* ==============================
                  CANCEL
                  ============================== */}

              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
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
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                Cancel
              </button>


              {/* ==============================
                  DELETE
                  ============================== */}

              <button
                onClick={() =>
                  handleDelete(deleteId)
                }
                disabled={isDeleting}
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
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >

                {isDeleting
                  ? 'Deleting...'
                  : 'Delete'}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}
