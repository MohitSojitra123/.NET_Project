// import { useState, useEffect } from 'react';

// import { useNavigate, useParams, Link } from 'react-router-dom';

// import { Save, ArrowLeft } from 'lucide-react';

// import Breadcrumb from '../../components/Breadcrumb';

// export default function UserForm() {

//   // =========================================================
//   // GET ID FROM URL
//   //
//   // Add:
//   // /users/add
//   //
//   // Edit:
//   // /users/edit/5
//   //
//   // useParams() gives id = "5"
//   // =========================================================

//   const { id } = useParams();

//   const navigate = useNavigate();

//   // If ID exists -> Edit
//   // If ID doesn't exist -> Add
//   const isEdit = Boolean(id);


//   // =========================================================
//   // ROLES STATE
//   // =========================================================

//   const [Rols, setRoles] = useState([]);


//   // =========================================================
//   // USERS STATE
//   // =========================================================

//   const [users, setUsers] = useState([]);


//   // =========================================================
//   // FORM STATE
//   // =========================================================

//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     mobile: '',
//     role: '',
//     isActive: true,
//     ProfilePic: ''
//   });


//   // =========================================================
//   // ERROR STATE
//   // =========================================================

//   const [errors, setErrors] = useState({});


//   // =========================================================
//   // LOADING STATE
//   // =========================================================

//   const [loading, setLoading] = useState(false);


//   // =========================================================
//   // VALIDATION
//   // =========================================================

//   const validate = () => {

//     const e = {};


//     // Full Name
//     if (!form.fullName.trim()) {
//       e.fullName = 'Full name is required.';
//     }


//     // Email
//     if (!form.email.trim()) {
//       e.email = 'Email is required.';
//     }


//     // Password
//     // Password is required ONLY when adding
//     if (!isEdit && !form.password.trim()) {
//       e.password = 'Password is required.';
//     }


//     // Mobile
//     if (!form.mobile.trim()) {
//       e.mobile = 'Mobile number is required.';
//     }


//     // Role
//     if (!form.role) {
//       e.role = 'Role is required.';
//     }


//     setErrors(e);

//     return Object.keys(e).length === 0;
//   };


//   // =========================================================
//   // HANDLE INPUT CHANGE
//   // =========================================================

//   const field = (key) => (e) => {

//     const value = e.target.value;


//     setForm((prev) => ({
//       ...prev,
//       [key]: value
//     }));


//     // Remove validation error
//     setErrors((prev) => ({
//       ...prev,
//       [key]: ''
//     }));
//   };


//   // =========================================================
//   // FETCH ALL USERS
//   // =========================================================

//   const Fetch_All_Users = async () => {

//     try {

//       const res = await fetch(
//         'https://localhost:7125/api/Users'
//       );


//       if (!res.ok) {
//         throw new Error(
//           `Failed to fetch users: ${res.status}`
//         );
//       }


//       const data = await res.json();


//       console.log('All Users:', data);


//       setUsers(data);


//       return data;

//     } catch (error) {

//       console.error(
//         'Error Fetching Users:',
//         error
//       );


//       return [];

//     }
//   };


//   // =========================================================
//   // FETCH ALL ROLES
//   // =========================================================

//   const Fetch_Role = async () => {

//     try {

//       const res = await fetch(
//         'https://localhost:7125/api/Role'
//       );


//       if (!res.ok) {
//         throw new Error(
//           `Failed to fetch roles: ${res.status}`
//         );
//       }


//       const data = await res.json();


//       console.log('All Roles:', data);


//       setRoles(data);


//       return data;

//     } catch (error) {

//       console.error(
//         'Error Fetching Roles:',
//         error
//       );


//       return [];

//     }
//   };


//   // =========================================================
//   // FETCH ONE USER
//   //
//   // THIS IS THE MOST IMPORTANT PART FOR EDIT
//   // =========================================================

//   const Fetch_One_User = async () => {

//     try {

//       // -----------------------------------------------------
//       // If there is no ID, don't call API
//       //
//       // Otherwise Add page would call:
//       // /api/Users/undefined
//       // -----------------------------------------------------

//       if (!id) {
//         return;
//       }


//       setLoading(true);


//       console.log(
//         'Fetching User ID:',
//         id
//       );


//       // -----------------------------------------------------
//       // GET USER
//       // -----------------------------------------------------

//       const res = await fetch(
//         `https://localhost:7125/api/Users/${id}`
//       );


//       if (!res.ok) {

//         throw new Error(
//           `Failed to fetch user: ${res.status}`
//         );

//       }


//       // -----------------------------------------------------
//       // Convert response into JSON
//       // -----------------------------------------------------

//       const data = await res.json();


//       console.log(
//         'One User API Response:',
//         data
//       );


//       // -----------------------------------------------------
//       // SET USER DATA INTO FORM
//       // -----------------------------------------------------

//       setForm((prev) => ({

//         ...prev,

//         fullName:
//           data.fullName ?? '',

//         email:
//           data.email ?? '',

//         // Don't load existing password
//         password:
//           '',

//         mobile:
//           data.mobileNumber ?? '',

//         // If API directly returns roleId
//         role:
//           data.roleId !== null &&
//           data.roleId !== undefined
//             ? String(data.roleId)
//             : '',

//         isActive:
//           data.isActive ??
//           true,

//         ProfilePic:
//           data.profilePicturePath ?? ''

//       }));


//       // -----------------------------------------------------
//       // DEBUG
//       // -----------------------------------------------------

//       console.log(
//         'Form Data After User Fetch:',
//         {
//           fullName: data.fullName,
//           email: data.email,
//           mobile: data.mobileNumber,
//           roleId: data.roleId,
//           isActive: data.isActive,
//           ProfilePic: data.profilePicturePath
//         }
//       );


//       // =====================================================
//       // ROLE NOT RETURNED FROM USER API?
//       //
//       // If data.roleId is missing, we try to find role
//       // using possible UserRole API.
//       // =====================================================

//       if (
//         data.roleId === null ||
//         data.roleId === undefined
//       ) {

//         try {

//           const roleRes = await fetch(
//             `https://localhost:7125/api/UserRole/${id}`
//           );


//           if (roleRes.ok) {

//             const roleData =
//               await roleRes.json();


//             console.log(
//               'User Role Response:',
//               roleData
//             );


//             // ------------------------------------------------
//             // Depending on API response structure
//             // ------------------------------------------------

//             let roleId = null;


//             if (
//               roleData &&
//               !Array.isArray(roleData)
//             ) {

//               roleId =
//                 roleData.roleId;

//             }


//             if (
//               Array.isArray(roleData) &&
//               roleData.length > 0
//             ) {

//               roleId =
//                 roleData[0].roleId;

//             }


//             if (roleId !== null &&
//                 roleId !== undefined) {

//               setForm((prev) => ({
//                 ...prev,
//                 role: String(roleId)
//               }));

//             }

//           }

//         } catch (roleError) {

//           console.warn(
//             'UserRole API not available:',
//             roleError
//           );

//         }

//       }

//     } catch (error) {

//       console.error(
//         'Error Fetching One User:',
//         error
//       );


//       setErrors((prev) => ({
//         ...prev,
//         api:
//           error.message ||
//           'Failed to fetch user'
//       }));

//     } finally {

//       setLoading(false);

//     }
//   };


//   // =========================================================
//   // USE EFFECT
//   // =========================================================

//   useEffect(() => {

//     // Fetch roles
//     Fetch_Role();


//     // Only fetch user when EDIT page
//     if (isEdit) {

//       Fetch_One_User();

//     }

//   }, [id, isEdit]);


//   // =========================================================
//   // HANDLE SUBMIT
//   // =========================================================

//   const handleSubmit = async (e) => {

//     e.preventDefault();


//     // -------------------------------------------------------
//     // Validate
//     // -------------------------------------------------------

//     if (!validate()) {
//       return;
//     }


//     console.log(
//       'Form Data:',
//       form
//     );


//     // =======================================================
//     // FINAL USER OBJECT
//     // =======================================================

//     const final_send_object = {

//       fullName:
//         form.fullName,

//       email:
//         form.email,

//       mobileNumber:
//         form.mobile,

//       profilePicturePath:
//         form.ProfilePic || null,

//       isActive:
//         form.isActive

//     };


//     // -------------------------------------------------------
//     // Password
//     //
//     // Add -> password required
//     //
//     // Edit -> only send password if user entered new one
//     // -------------------------------------------------------

//     if (form.password.trim()) {

//       final_send_object.password =
//         form.password;

//     }


//     console.log(
//       'Final Send Object:',
//       final_send_object
//     );


//     try {

//       setLoading(true);


//       // =====================================================
//       // EDIT USER
//       // =====================================================

//       if (isEdit) {

//         console.log(
//           'Updating User:',
//           id
//         );


//         const res = await fetch(
//           `https://localhost:7125/api/Users/${id}`,
//           {
//             method: 'PUT',

//             headers: {
//               'Content-Type':
//                 'application/json'
//             },

//             body:
//               JSON.stringify(
//                 final_send_object
//               )
//           }
//         );


//         // ---------------------------------------------------
//         // Check Update Response
//         // ---------------------------------------------------

//         if (!res.ok) {

//           const errorData =
//             await res.text();

//           throw new Error(
//             errorData ||
//             `HTTP Error: ${res.status}`
//           );

//         }


//         console.log(
//           'User Updated Successfully'
//         );


//         // ===================================================
//         // UPDATE USER ROLE
//         // ===================================================

//         const Set_Role = {

//           roleId:
//             Number(form.role),

//           userId:
//             Number(id)

//         };


//         console.log(
//           'Update Role Object:',
//           Set_Role
//         );


//         /*
//          * IMPORTANT
//          *
//          * If your UserRole API uses POST for adding
//          * a relationship, this may work for a new role.
//          *
//          * If your backend has PUT for updating an
//          * existing UserRole, change POST -> PUT.
//          */

//         try {

//           const roleRes = await fetch(
//             'https://localhost:7125/api/UserRole',
//             {
//               method: 'POST',

//               headers: {
//                 'Content-Type':
//                   'application/json'
//               },

//               body:
//                 JSON.stringify(
//                   Set_Role
//                 )
//             }
//           );


//           if (!roleRes.ok) {

//             console.warn(
//               'User updated but role update failed'
//             );

//           }

//         } catch (roleError) {

//           console.warn(
//             'Role update error:',
//             roleError
//           );

//         }


//         alert(
//           'User Updated Successfully'
//         );


//         navigate('/users');


//         return;
//       }


//       // =====================================================
//       // ADD NEW USER
//       // =====================================================

//       console.log(
//         'Adding New User'
//       );


//       const res = await fetch(
//         'https://localhost:7125/api/Users',
//         {
//           method: 'POST',

//           headers: {
//             'Content-Type':
//               'application/json'
//           },

//           body:
//             JSON.stringify(
//               final_send_object
//             )
//         }
//       );


//       // -----------------------------------------------------
//       // Check API response
//       // -----------------------------------------------------

//       if (!res.ok) {

//         const errorData =
//           await res.text();

//         throw new Error(
//           errorData ||
//           `HTTP Error: ${res.status}`
//         );

//       }


//       console.log(
//         'User Added Successfully'
//       );


//       // =====================================================
//       // FETCH ALL USERS
//       // =====================================================

//       const latest_users =
//         await Fetch_All_Users();


//       console.log(
//         'Latest Users:',
//         latest_users
//       );


//       // =====================================================
//       // FIND NEW USER
//       // =====================================================

//       const current_user =
//         latest_users.filter(
//           (v) =>
//             v.email?.toLowerCase() ===
//             form.email.toLowerCase()
//         );


//       console.log(
//         'Current User:',
//         current_user
//       );


//       // =====================================================
//       // CHECK USER FOUND
//       // =====================================================

//       if (
//         current_user.length > 0
//       ) {

//         // ---------------------------------------------------
//         // CREATE USER ROLE OBJECT
//         // ---------------------------------------------------

//         const Set_Role = {

//           roleId:
//             Number(form.role),

//           userId:
//             Number(
//               current_user[0].userId
//             )

//         };


//         console.log(
//           'Add User Role Object:',
//           Set_Role
//         );


//         // ---------------------------------------------------
//         // SET NEW USER ROLE
//         // ---------------------------------------------------

//         const roleRes =
//           await fetch(
//             'https://localhost:7125/api/UserRole',
//             {
//               method: 'POST',

//               headers: {
//                 'Content-Type':
//                   'application/json'
//               },

//               body:
//                 JSON.stringify(
//                   Set_Role
//                 )
//             }
//           );


//         if (!roleRes.ok) {

//           console.warn(
//             'User added but role assignment failed'
//           );

//         } else {

//           console.log(
//             'Role Added Successfully'
//           );

//         }

//       } else {

//         console.warn(
//           'Created user was not found'
//         );

//       }


//       // =====================================================
//       // SUCCESS
//       // =====================================================

//       alert(
//         'User Added Successfully'
//       );


//       navigate('/users');

//     } catch (error) {

//       console.error(
//         'Error:',
//         error
//       );


//       setErrors((prev) => ({
//         ...prev,
//         api:
//           error.message ||
//           'Something went wrong'
//       }));

//     } finally {

//       setLoading(false);

//     }

//   };


//   // =========================================================
//   // UI
//   //
//   // YOUR UI IS NOT CHANGED
//   // =========================================================

//   return (

//     <div>

//       <div className="mb-6">

//         <Breadcrumb
//           items={[
//             {
//               label: 'Users',
//               to: '/users'
//             },
//             {
//               label:
//                 isEdit
//                   ? 'Edit'
//                   : 'Add'
//             }
//           ]}
//         />

//         <h1 className="text-2xl font-bold text-gray-800">
//           {isEdit
//             ? 'Edit User'
//             : 'Add User'}
//         </h1>

//       </div>


//       <div className="max-w-2xl">

//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

//           <h2 className="text-sm font-semibold text-gray-700 mb-5 pb-3 border-b border-gray-100">
//             User Details
//           </h2>


//           {/* =================================================
//               API ERROR
//           ================================================= */}

//           {errors.api && (

//             <p className="text-sm text-red-500 mb-4">
//               {errors.api}
//             </p>

//           )}


//           <form
//             onSubmit={handleSubmit}
//             className="space-y-4"
//           >


//             {/* =================================================
//                 TEXT INPUTS
//             ================================================= */}

//             {[
//               {
//                 label: 'Full Name',
//                 key: 'fullName',
//                 placeholder:
//                   'Enter full name',
//                 type: 'text'
//               },

//               {
//                 label: 'Email',
//                 key: 'email',
//                 placeholder:
//                   'Enter email',
//                 type: 'email'
//               },

//               {
//                 label:
//                   isEdit
//                     ? 'New Password (leave blank to keep)'
//                     : 'Password',

//                 key: 'password',

//                 placeholder:
//                   'Enter login password',

//                 type: 'password'
//               },

//               {
//                 label: 'Mobile',
//                 key: 'mobile',
//                 placeholder:
//                   'Enter mobile number',
//                 type: 'tel'
//               },

//               {
//                 label:
//                   'Profile PicturePath',

//                 key: 'ProfilePic',

//                 placeholder:
//                   'Enter Profile PicturePath',

//                 type: 'url'
//               },

//             ].map(
//               ({
//                 label,
//                 key,
//                 placeholder,
//                 type
//               }) => (

//                 <div key={key}>

//                   <label className="block text-sm font-medium text-gray-700 mb-1.5">

//                     {label}

//                     {key !== 'password' && (
//                       <span className="text-red-500">
//                         *
//                       </span>
//                     )}

//                   </label>


//                   <input

//                     type={type}

//                     value={
//                       String(
//                         form[key] ?? ''
//                       )
//                     }

//                     onChange={field(key)}

//                     placeholder={
//                       placeholder
//                     }

//                     className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${
//                       errors[key]
//                         ? 'border-red-400'
//                         : 'border-gray-200 focus:border-blue-400'
//                     }`}

//                   />


//                   {errors[key] && (

//                     <p className="text-xs text-red-500 mt-1">

//                       {errors[key]}

//                     </p>

//                   )}

//                 </div>

//               )
//             )}


//             {/* =================================================
//                 ROLE
//             ================================================= */}

//             <div>

//               <label className="block text-sm font-medium text-gray-700 mb-1.5">

//                 Role

//                 <span className="text-red-500">
//                   *
//                 </span>

//               </label>


//               <select

//                 value={
//                   String(
//                     form.role ?? ''
//                   )
//                 }

//                 onChange={field('role')}

//                 className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${
//                   errors.role
//                     ? 'border-red-400'
//                     : 'border-gray-200 focus:border-blue-400'
//                 }`}

//               >

//                 <option value="">
//                   -- Select Role --
//                 </option>


//                 {Rols.map(
//                   (val) => (

//                     <option
//                       key={val.roleId}
//                       value={String(
//                         val.roleId
//                       )}
//                     >

//                       {val.roleName}

//                     </option>

//                   )
//                 )}

//               </select>


//               {errors.role && (

//                 <p className="text-xs text-red-500 mt-1">

//                   {errors.role}

//                 </p>

//               )}

//             </div>


//             {/* =================================================
//                 BUTTONS
//             ================================================= */}

//             <div className="flex items-center gap-3 pt-2">

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
//               >

//                 <Save size={16} />

//                 {loading
//                   ? 'Saving...'
//                   : 'Save'}

//               </button>


//               <Link
//                 to="/users"
//                 className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
//               >

//                 <ArrowLeft size={16} />

//                 Back

//               </Link>

//             </div>

//           </form>

//         </div>

//       </div>

//     </div>

//   );
// }



















// import { useState, useEffect } from 'react';

// import { useNavigate, useParams, Link } from 'react-router-dom';

// import { Save, ArrowLeft } from 'lucide-react';

// import Breadcrumb from '../../components/Breadcrumb';

// export default function UserForm() {

//   // =========================================================
//   // GET ID FROM URL
//   //
//   // Add:
//   // /users/add
//   //
//   // Edit:
//   // /users/edit/1
//   // =========================================================

//   const { id } = useParams();

//   const [existingPassword, setExistingPassword] = useState("");

//   const navigate = useNavigate();

//   // true = Edit
//   // false = Add
//   const isEdit = Boolean(id);


//   // =========================================================
//   // ROLES
//   // =========================================================

//   const [Rols, setRoles] = useState([]);


//   // =========================================================
//   // USERS
//   // =========================================================

//   const [users, setUsers] = useState([]);


//   // =========================================================
//   // FORM
//   // =========================================================

//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     mobile: '',
//     role: '',
//     isActive: true,
//     ProfilePic: ''
//   });


//   // =========================================================
//   // ERRORS
//   // =========================================================

//   const [errors, setErrors] = useState({});


//   // =========================================================
//   // LOADING
//   // =========================================================

//   const [loading, setLoading] = useState(false);


//   // =========================================================
//   // VALIDATION
//   // =========================================================

//   const validate = () => {

//     const e = {};


//     if (!form.fullName.trim()) {
//       e.fullName = 'Full name is required.';
//     }


//     if (!form.email.trim()) {
//       e.email = 'Email is required.';
//     }


//     // Password required only on ADD
//     if (!isEdit && !form.password.trim()) {
//       e.password = 'Password is required.';
//     }


//     if (!form.mobile.trim()) {
//       e.mobile = 'Mobile number is required.';
//     }


//     if (!form.role) {
//       e.role = 'Role is required.';
//     }


//     setErrors(e);

//     return Object.keys(e).length === 0;
//   };


//   // =========================================================
//   // HANDLE INPUT CHANGE
//   // =========================================================

//   const field = (key) => (e) => {

//     const value = e.target.value;


//     setForm((prev) => ({
//       ...prev,
//       [key]: value
//     }));


//     // Remove error
//     setErrors((prev) => ({
//       ...prev,
//       [key]: ''
//     }));

//   };


//   // =========================================================
//   // FETCH ALL USERS
//   // =========================================================

//   const Fetch_All_Users = async () => {

//     try {

//       const res = await fetch(
//         'https://localhost:7125/api/Users'
//       );


//       if (!res.ok) {

//         throw new Error(
//           `Failed to fetch users: ${res.status}`
//         );

//       }


//       const data = await res.json();


//       console.log(
//         'All Users:',
//         data
//       );


//       setUsers(data);


//       return data;

//     } catch (error) {

//       console.error(
//         'Error Fetching Users:',
//         error
//       );


//       return [];

//     }

//   };


//   // =========================================================
//   // FETCH ROLES
//   // =========================================================

//   const Fetch_Role = async () => {

//     try {

//       const res = await fetch(
//         'https://localhost:7125/api/Role'
//       );


//       if (!res.ok) {

//         throw new Error(
//           `Failed to fetch roles: ${res.status}`
//         );

//       }


//       const data = await res.json();


//       console.log(
//         'Roles:',
//         data
//       );


//       setRoles(data);


//       return data;

//     } catch (error) {

//       console.error(
//         'Error Fetching Roles:',
//         error
//       );


//       return [];

//     }

//   };


//   // =========================================================
//   // FETCH ONE USER
//   //
//   // THIS LOADS DATA INTO FORM WHEN EDIT PAGE OPENS
//   // =========================================================

// const Fetch_One_User = async () => {
//   try {
//     const res = await fetch(
//       `https://localhost:7125/api/Users/${id}`
//     );

//     const data = await res.json();

//     // Store original API password
//     setExistingPassword(data.password ?? "");

//     setForm({
//       fullName: data.fullName ?? "",
//       email: data.email ?? "",
      
//       // Keep input empty
//       password: "",

//       mobile: data.mobileNumber ?? "",
//       isActive: data.isActive ?? true,
//       role: data.roleId ? String(data.roleId) : "",
//       ProfilePic: data.profilePicturePath ?? ""
//     });

//   } catch (error) {
//     console.error(error);
//   }
// };

//   // =========================================================
//   // USE EFFECT
//   // =========================================================

//   useEffect(() => {

//     // Fetch roles
//     Fetch_Role();


//     // Fetch user only when EDIT
//     if (isEdit) {

//       Fetch_One_User();

//     }

//   }, [id, isEdit]);


//   // =========================================================
//   // HANDLE SUBMIT
//   // =========================================================

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!validate()) return;

//   try {
//     let res;

//     // ============================
//     // ADD USER
//     // ============================
//     if (!isEdit) {

//   const passwordToUpdate =
//   form.password.trim() !== ""
//     ? form.password
//     : existingPassword;

// const updateObject = {
//   fullName: form.fullName,
//   email: form.email,
//   password: passwordToUpdate,
//   mobileNumber: form.mobile,
//   profilePicturePath: form.ProfilePic
// };


//       res = await fetch("https://localhost:7125/api/Users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(final_send_object)
//       });

//       if (!res.ok) {
//         const errorData = await res.text();
//         throw new Error(errorData || `HTTP Error: ${res.status}`);
//       }

//       // Get newly created user
//       const latest_users = await Fetch_All_Users();

//       const current_user = latest_users.filter(
//         (v) => v.email === form.email
//       );

//       if (current_user.length > 0) {
//         const Set_Role = {
//           roleId: Number(form.role),
//           userId: Number(current_user[0].userId)
//         };

//         await fetch("https://localhost:7125/api/UserRole", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(Set_Role)
//         });
//       }

//       alert("User Added Successfully");
//       navigate("/users");
//     }

//     // ============================
//     // UPDATE USER
//     // ============================
//     else {
//       // --------------------------------
//       // DEFAULT PASSWORD
//       // --------------------------------
//       const defaultPassword = "Default@123";

//       // If user entered password
//       //     -> use entered password
//       //
//       // If user did NOT enter password
//       //     -> use default password
//       const passwordToUpdate =
//         form.password.trim() !== ""
//           ? form.password
//           : defaultPassword;

//       const updateObject = {
//         fullName: form.fullName,
//         email: form.email,

//         // Password entered by user OR default password
//         password: passwordToUpdate,

//         mobileNumber: form.mobile,
//         profilePicturePath: form.ProfilePic
//       };

//       console.log("Update Object:", updateObject);

//       res = await fetch(
//         `https://localhost:7125/api/Users/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(updateObject)
//         }
//       );

//       if (!res.ok) {
//         const errorData = await res.text();

//         throw new Error(
//           errorData || `HTTP Error: ${res.status}`
//         );
//       }

//       // ============================
//       // UPDATE ROLE
//       // ============================
//       const roleObject = {
//         roleId: Number(form.role),
//         userId: Number(id)
//       };

//       await fetch(
//         "https://localhost:7125/api/UserRole",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(roleObject)
//         }
//       );

//       alert("User Updated Successfully");

//       navigate("/users");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert(error.message);
//   }
// };


//   // =========================================================
//   // UI
//   // =========================================================

//   return (

//     <div>

//       <div className="mb-6">

//         <Breadcrumb
//           items={[
//             {
//               label: 'Users',
//               to: '/users'
//             },
//             {
//               label:
//                 isEdit
//                   ? 'Edit'
//                   : 'Add'
//             }
//           ]}
//         />

//         <h1 className="text-2xl font-bold text-gray-800">
//           {isEdit
//             ? 'Edit User'
//             : 'Add User'}
//         </h1>

//       </div>


//       <div className="max-w-2xl">

//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

//           <h2 className="text-sm font-semibold text-gray-700 mb-5 pb-3 border-b border-gray-100">
//             User Details
//           </h2>


//           {/* API ERROR */}

//           {errors.api && (

//             <p className="text-sm text-red-500 mb-4">
//               {errors.api}
//             </p>

//           )}


//           <form
//             onSubmit={handleSubmit}
//             className="space-y-4"
//           >


//             {/* =================================================
//                 INPUT FIELDS
//             ================================================= */}

//             {[
//               {
//                 label: 'Full Name',
//                 key: 'fullName',
//                 placeholder:
//                   'Enter full name',
//                 type: 'text'
//               },

//               {
//                 label: 'Email',
//                 key: 'email',
//                 placeholder:
//                   'Enter email',
//                 type: 'email'
//               },

//               {
//                 label:
//                   isEdit
//                     ? 'New Password (leave blank to keep)'
//                     : 'Password',

//                 key: 'password',

//                 placeholder:
//                   'Enter login password',

//                 type: 'password'
//               },

//               {
//                 label: 'Mobile',
//                 key: 'mobile',
//                 placeholder:
//                   'Enter mobile number',
//                 type: 'tel'
//               },

//               {
//                 label:
//                   'Profile PicturePath',

//                 key: 'ProfilePic',

//                 placeholder:
//                   'Enter Profile PicturePath',

//                 type: 'url'
//               },

//             ].map(
//               ({
//                 label,
//                 key,
//                 placeholder,
//                 type
//               }) => (

//                 <div key={key}>

//                   <label className="block text-sm font-medium text-gray-700 mb-1.5">

//                     {label}

//                     {key !== 'password' && (
//                       <span className="text-red-500">
//                         *
//                       </span>
//                     )}

//                   </label>


//                   <input
//                     type={type}

//                     value={
//                       String(
//                         form[key] ?? ''
//                       )
//                     }

//                     onChange={field(key)}

//                     placeholder={
//                       placeholder
//                     }

//                     className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${
//                       errors[key]
//                         ? 'border-red-400'
//                         : 'border-gray-200 focus:border-blue-400'
//                     }`}
//                   />


//                   {errors[key] && (

//                     <p className="text-xs text-red-500 mt-1">
//                       {errors[key]}
//                     </p>

//                   )}

//                 </div>

//               )
//             )}


//             {/* =================================================
//                 ROLE
//             ================================================= */}

//             <div>

//               <label className="block text-sm font-medium text-gray-700 mb-1.5">

//                 Role

//                 <span className="text-red-500">
//                   *
//                 </span>

//               </label>


//               <select
//                 value={
//                   String(
//                     form.role ?? ''
//                   )
//                 }

//                 onChange={field('role')}

//                 className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${
//                   errors.role
//                     ? 'border-red-400'
//                     : 'border-gray-200 focus:border-blue-400'
//                 }`}
//               >

//                 <option value="">
//                   -- Select Role --
//                 </option>


//                 {Rols.map(
//                   (val) => (

//                     <option
//                       key={val.roleId}
//                       value={String(
//                         val.roleId
//                       )}
//                     >
//                       {val.roleName}
//                     </option>

//                   )
//                 )}

//               </select>


//               {errors.role && (

//                 <p className="text-xs text-red-500 mt-1">
//                   {errors.role}
//                 </p>

//               )}

//             </div>


//             {/* =================================================
//                 BUTTONS
//             ================================================= */}

//             <div className="flex items-center gap-3 pt-2">

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
//               >

//                 <Save size={16} />

//                 {loading
//                   ? 'Saving...'
//                   : 'Save'}

//               </button>


//               <Link
//                 to="/users"
//                 className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
//               >

//                 <ArrowLeft size={16} />

//                 Back

//               </Link>

//             </div>

//           </form>

//         </div>

//       </div>

//     </div>

//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';

export default function UserForm() {



  const { id } = useParams();

  const [existingPassword, setExistingPassword] = useState("");

  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [Rols, setRoles] = useState([]);


  const [users, setUsers] = useState([]);


  // =========================================================
  // FORM
  // =========================================================

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    role: '',
    isActive: true,
    ProfilePic: ''
  });


  // =========================================================
  // ERRORS
  // =========================================================

  const [errors, setErrors] = useState({});


  // =========================================================
  // LOADING
  // =========================================================

  const [loading, setLoading] = useState(false);


  // =========================================================
  // VALIDATION
  // =========================================================

  const validate = () => {

    const e = {};

    if (!form.fullName.trim()) {
      e.fullName = 'Full name is required.';
    }

    if (!form.email.trim()) {
      e.email = 'Email is required.';
    }

    // Password required only on ADD
    if (!isEdit && !form.password.trim()) {
      e.password = 'Password is required.';
    }

    if (!form.mobile.trim()) {
      e.mobile = 'Mobile number is required.';
    }

    if (!form.role) {
      e.role = 'Role is required.';
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };


  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const field = (key) => (e) => {

    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [key]: value
    }));

    // Remove error
    setErrors((prev) => ({
      ...prev,
      [key]: ''
    }));
  };


  // =========================================================
  // FETCH ALL USERS
  // =========================================================

  const Fetch_All_Users = async () => {

    try {

      const res = await fetch(
        'https://localhost:7125/api/Users'
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch users: ${res.status}`
        );
      }

      const data = await res.json();

      console.log(
        'All Users:',
        data
      );

      setUsers(data);

      return data;

    } catch (error) {

      console.error(
        'Error Fetching Users:',
        error
      );

      return [];
    }
  };


  // =========================================================
  // FETCH ROLES
  // =========================================================

  const Fetch_Role = async () => {

    try {

      const res = await fetch(
        'https://localhost:7125/api/Role'
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch roles: ${res.status}`
        );
      }

      const data = await res.json();

      console.log(
        'Roles:',
        data
      );

      setRoles(data);

      return data;

    } catch (error) {

      console.error(
        'Error Fetching Roles:',
        error
      );

      return [];
    }
  };


  // =========================================================
  // FETCH ONE USER
  //
  // THIS LOADS DATA INTO FORM WHEN EDIT PAGE OPENS
  // =========================================================

  const Fetch_One_User = async () => {

    try {

      const res = await fetch(
        `https://localhost:7125/api/Users/${id}`
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch user: ${res.status}`
        );
      }

      const data = await res.json();

      console.log(
        'Single User:',
        data
      );


      // =====================================================
      // STORE OLD PASSWORD FROM API
      //
      // Example:
      //
      // data.password = "Old@123"
      //
      // existingPassword = "Old@123"
      // =====================================================

      setExistingPassword(
        data.password ?? ""
      );


      setForm({

        fullName:
          data.fullName ?? "",

        email:
          data.email ?? "",

        // Keep password INPUT EMPTY
        password: "",

        mobile:
          data.mobileNumber ?? "",

        isActive:
          data.isActive ?? true,

        role:
          data.roleId
            ? String(data.roleId)
            : "",

        ProfilePic:
          data.profilePicturePath ?? ""
      });

    } catch (error) {

      console.error(
        'Error Fetching User:',
        error
      );

    }
  };


  // =========================================================
  // USE EFFECT
  // =========================================================

  useEffect(() => {

    // Fetch roles
    Fetch_Role();

    // Fetch user only when EDIT
    if (isEdit) {
      Fetch_One_User();
    }

  }, [id, isEdit]);


  // =========================================================
  // HANDLE SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {

      let res;


      // =====================================================
      // ADD USER
      // =====================================================

      if (!isEdit) {

        // For ADD:
        // User MUST enter password.
        //
        // form.password contains new password.

        const final_send_object = {

          fullName:
            form.fullName,

          email:
            form.email,

          password:
            form.password,

          mobileNumber:
            form.mobile,

          profilePicturePath:
            form.ProfilePic
        };


        console.log(
          "Add Object:",
          final_send_object
        );


        res = await fetch(
          "https://localhost:7125/api/Users",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              final_send_object
            )
          }
        );


        if (!res.ok) {

          const errorData =
            await res.text();

          throw new Error(
            errorData ||
            `HTTP Error: ${res.status}`
          );
        }


        // ===================================================
        // GET NEWLY CREATED USER
        // ===================================================

        const latest_users =
          await Fetch_All_Users();


        const current_user =
          latest_users.filter(
            (v) =>
              v.email === form.email
          );


        // ===================================================
        // SET ROLE
        // ===================================================

        if (current_user.length > 0) {

          const Set_Role = {

            roleId:
              Number(form.role),

            userId:
              Number(
                current_user[0].userId
              )
          };


          await fetch(
            "https://localhost:7125/api/UserRole",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify(
                Set_Role
              )
            }
          );
        }


        alert(
          "User Added Successfully"
        );

        navigate("/users");
      }


      // =====================================================
      // UPDATE USER
      // =====================================================

      else {

        // ===================================================
        // PASSWORD LOGIC
        //
        // User ENTERS password:
        //
        // form.password = "New@123"
        //
        // Result:
        // passwordToUpdate = "New@123"
        //
        //
        // User DOES NOT enter password:
        //
        // form.password = ""
        //
        // Result:
        // passwordToUpdate = existingPassword
        //
        // Example:
        //
        // existingPassword = "Old@123"
        //
        // Result:
        // passwordToUpdate = "Old@123"
        // ===================================================

        const passwordToUpdate =
          form.password.trim() !== ""
            ? form.password
            : existingPassword;


        // ===================================================
        // UPDATE OBJECT
        // ===================================================

        const updateObject = {

          fullName:
            form.fullName,

          email:
            form.email,

          // New Password OR Old Password
          password:
            passwordToUpdate,

          mobileNumber:
            form.mobile,

          profilePicturePath:
            form.ProfilePic
        };


        console.log(
          "Update Object:",
          updateObject
        );


        // ===================================================
        // PUT API
        // ===================================================

        res = await fetch(
          `https://localhost:7125/api/Users/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              updateObject
            )
          }
        );


        if (!res.ok) {

          const errorData =
            await res.text();

          throw new Error(
            errorData ||
            `HTTP Error: ${res.status}`
          );
        }


        // ===================================================
        // UPDATE ROLE
        // ===================================================

        const roleObject = {

          roleId:
            Number(form.role),

          userId:
            Number(id)
        };


        await fetch(
          "https://localhost:7125/api/UserRole",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              roleObject
            )
          }
        );


        alert(
          "User Updated Successfully"
        );

        navigate("/users");
      }

    } catch (error) {

      console.error(
        "Error:",
        error
      );

      alert(
        error.message
      );

    } finally {

      setLoading(false);
    }
  };


  // =========================================================
  // UI
  // =========================================================

  return (

    <div>

      <div className="mb-6">

        <Breadcrumb

          items={[
            {
              label: 'Users',
              to: '/users'
            },

            {
              label:
                isEdit
                  ? 'Edit'
                  : 'Add'
            }
          ]}
        />


        <h1 className="text-2xl font-bold text-gray-800">

          {isEdit
            ? 'Edit User'
            : 'Add User'}

        </h1>

      </div>


      <div className="max-w-2xl">

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

          <h2 className="text-sm font-semibold text-gray-700 mb-5 pb-3 border-b border-gray-100">

            User Details

          </h2>


          {/* =================================================
              API ERROR
          ================================================= */}

          {errors.api && (

            <p className="text-sm text-red-500 mb-4">

              {errors.api}

            </p>

          )}


          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >


            {/* =================================================
                INPUT FIELDS
            ================================================= */}

            {[
              {
                label: 'Full Name',
                key: 'fullName',
                placeholder:
                  'Enter full name',
                type: 'text'
              },

              {
                label: 'Email',
                key: 'email',
                placeholder:
                  'Enter email',
                type: 'email'
              },

              {
                label:
                  isEdit
                    ? 'New Password (leave blank to keep)'
                    : 'Password',

                key: 'password',

                placeholder:
                  'Enter login password',

                type: 'password'
              },

              {
                label: 'Mobile',
                key: 'mobile',
                placeholder:
                  'Enter mobile number',
                type: 'tel'
              },

              {
                label:
                  'Profile PicturePath',

                key: 'ProfilePic',

                placeholder:
                  'Enter Profile PicturePath',

                type: 'url'
              },

            ].map(
              ({
                label,
                key,
                placeholder,
                type
              }) => (

                <div key={key}>

                  <label className="block text-sm font-medium text-gray-700 mb-1.5">

                    {label}

                    {key !== 'password' && (

                      <span className="text-red-500">

                        *

                      </span>

                    )}

                  </label>


                  <input

                    type={type}

                    value={
                      String(
                        form[key] ?? ''
                      )
                    }

                    onChange={
                      field(key)
                    }

                    placeholder={
                      placeholder
                    }

                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${
                      errors[key]
                        ? 'border-red-400'
                        : 'border-gray-200 focus:border-blue-400'
                    }`}
                  />


                  {errors[key] && (

                    <p className="text-xs text-red-500 mt-1">

                      {errors[key]}

                    </p>

                  )}

                </div>

              )
            )}


            {/* =================================================
                ROLE
            ================================================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1.5">

                Role

                <span className="text-red-500">

                  *

                </span>

              </label>


              <select

                value={
                  String(
                    form.role ?? ''
                  )
                }

                onChange={
                  field('role')
                }

                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${
                  errors.role
                    ? 'border-red-400'
                    : 'border-gray-200 focus:border-blue-400'
                }`}
              >

                <option value="">

                  -- Select Role --

                </option>


                {Rols.map(
                  (val) => (

                    <option

                      key={
                        val.roleId
                      }

                      value={
                        String(
                          val.roleId
                        )
                      }
                    >

                      {val.roleName}

                    </option>

                  )
                )}

              </select>


              {errors.role && (

                <p className="text-xs text-red-500 mt-1">

                  {errors.role}

                </p>

              )}

            </div>


            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="flex items-center gap-3 pt-2">

              <button

                type="submit"

                disabled={loading}

                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >

                <Save size={16} />

                {loading
                  ? 'Saving...'
                  : 'Save'}

              </button>


              <Link

                to="/users"

                className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
              >

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