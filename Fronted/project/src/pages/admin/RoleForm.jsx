import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export default function RoleForm() {
  // ==========================================
  // GET ID FROM URL
  // ==========================================

  const { id } = useParams();

  const navigate = useNavigate();

  // If ID exists => Edit
  // If ID doesn't exist => Add
  const isEdit = !!id;

  // ==========================================
  // STATE
  // ==========================================

  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [fetchingRole, setFetchingRole] = useState(false);

  // ==========================================
  // FETCH ROLE BY ID
  // Used when Edit page opens
  // ==========================================

  const Fetch_Role_By_Id = async () => {
    try {
      setFetchingRole(true);
      setError("");

      const response = await fetch(`https://localhost:7125/api/Role/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("Role By ID API Response:", data);

      // ==========================================
      // SET DATA INTO FORM
      // ==========================================

      setRoleName(data.roleName || "");

      setDescription(data.description || "");
    } catch (error) {
      console.error("Error fetching role:", error);

      setError("Unable to load role details.");
    } finally {
      setFetchingRole(false);
    }
  };

  // ==========================================
  // CALL GET API WHEN EDIT PAGE LOADS
  // ==========================================

  useEffect(() => {
    if (isEdit) {
      Fetch_Role_By_Id();
    }
  }, [id, isEdit]);

  // ==========================================
  // ADD ROLE API
  // POST /api/Role
  // ==========================================

  const Insert_Role = async () => {
    const response = await fetch("https://localhost:7125/api/Role", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        roleName: roleName.trim(),
        description: description.trim() ? description.trim() : null,
      }),
    });

    // Check API response

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response;
  };

  // ==========================================
  // UPDATE ROLE API
  // PUT /api/Role/{id}
  // ==========================================

  const Update_Role = async () => {
    const response = await fetch(`https://localhost:7125/api/Role/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        roleName: roleName.trim(),
        description: description.trim() ? description.trim() : null,
      }),
    });

    // Check API response

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response;
  };

  // ==========================================
  // HANDLE FORM SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error

    setError("");

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!roleName.trim()) {
      setError("Role name is required.");

      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // EDIT
      // ==========================================

      if (isEdit) {
        await Update_Role();

        console.log(`Role ${id} updated successfully`);

        alert("Role updated successfully!");
      }

      // ==========================================
      // ADD
      // ==========================================
      else {
        await Insert_Role();

        console.log("Role inserted successfully");

        alert("Role added successfully!");
      }

      // ==========================================
      // REDIRECT TO ROLE LIST
      // ==========================================

      navigate("/roles");
    } catch (error) {
      console.error("Error saving role:", error);

      setError("Failed to save role. Please try again.");
    } finally {
      setLoading(false);
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
              label: "Roles",
              to: "/roles",
            },
            {
              label: isEdit ? "Edit" : "Add",
            },
          ]}
        />

        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? "Edit Role" : "Add Role"}
        </h1>
      </div>

      {/* ==========================================
          FORM CONTAINER
          ========================================== */}

      <div className="max-w-2xl">
        <div
          className="
            bg-white
            rounded-xl
            border
            border-gray-100
            shadow-sm
            p-6
          "
        >
          {/* ==========================================
              FORM TITLE
              ========================================== */}

          <h2
            className="
              text-sm
              font-semibold
              text-gray-700
              mb-5
              pb-3
              border-b
              border-gray-100
            "
          >
            Role Details
          </h2>

          {/* ==========================================
              FETCHING ROLE
              ========================================== */}

          {fetchingRole ? (
            <div
              className="
                py-10
                text-center
                text-sm
                text-gray-500
              "
            >
              Loading role details...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ==========================================
                  ERROR MESSAGE
                  ========================================== */}

              {error && (
                <div
                  className="
                    p-3
                    bg-red-50
                    border
                    border-red-200
                    rounded-lg
                    text-sm
                    text-red-700
                  "
                >
                  {error}
                </div>
              )}

              {/* ==========================================
                  ROLE NAME
                  ========================================== */}

              <div>
                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    mb-1.5
                  "
                >
                  Role Name
                  <span className="text-red-500">*</span>
                </label>

                <input
                  value={roleName}
                  onChange={(e) => {
                    setRoleName(e.target.value);

                    setError("");
                  }}
                  placeholder="Enter role name"
                  disabled={loading}
                  className="
                    w-full
                    px-4
                    py-2.5
                    border
                    border-gray-200
                    rounded-lg
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                    focus:border-blue-400
                    transition-all
                    disabled:bg-gray-100
                    disabled:cursor-not-allowed
                  "
                />
              </div>

              {/* ==========================================
                  DESCRIPTION
                  ========================================== */}

              <div>
                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    mb-1.5
                  "
                >
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  rows={3}
                  disabled={loading}
                  className="
                    w-full
                    px-4
                    py-2.5
                    border
                    border-gray-200
                    rounded-lg
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                    focus:border-blue-400
                    transition-all
                    resize-none
                    disabled:bg-gray-100
                    disabled:cursor-not-allowed
                  "
                />
              </div>

              {/* ==========================================
                  BUTTONS
                  ========================================== */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  pt-2
                "
              >
                {/* ==================================
                    SAVE BUTTON
                    ================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex
                    items-center
                    gap-2
                    px-5
                    py-2.5
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    text-sm
                    font-medium
                    rounded-lg
                    transition-colors
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  <Save size={16} />

                  {loading ? "Saving..." : isEdit ? "Update" : "Save"}
                </button>

                {/* ==================================
                    BACK BUTTON
                    ================================== */}

                <Link
                  to="/roles"
                  className="
                    flex
                    items-center
                    gap-2
                    px-5
                    py-2.5
                    border
                    border-gray-200
                    hover:bg-gray-50
                    text-gray-700
                    text-sm
                    font-medium
                    rounded-lg
                    transition-colors
                  "
                >
                  <ArrowLeft size={16} />
                  Back
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
