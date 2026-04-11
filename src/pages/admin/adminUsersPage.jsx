import axios from "axios";
import { useEffect, useState } from "react";
import LoadingAnimation from "../../components/loadingAnimation";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/users/all/${pageSize}/${pageNumber}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        setUsers(response.data.users || []);
        setTotalPages(response.data.totalPages || 0);
      })
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, [pageNumber, pageSize, refreshKey]);

  function toggleBlock(user) {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/users/toggle-block",
        { email: user.email },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setRefreshKey((k) => k + 1); // refetch
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to toggle block status");
      });
  }

  function toggleRole(user) {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/users/toggle-role",
        { email: user.email },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setRefreshKey((k) => k + 1); // refetch
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to toggle role");
      });
  }

  return (
    <div className="w-full h-full bg-accent rounded-2xl overflow-hidden flex flex-col">
      {/* ✅ Fixed black header (always visible) */}
      <div className="px-6 py-5 bg-primary text-accent border-b border-primary/10">
        <h2 className="text-xl font-bold">Users</h2>
        <p className="text-sm text-accent/70">Manage your users at a glance</p>
      </div>

      {/* ✅ Table area scrolls (not the header) */}
      <div className="flex-1 min-h-0 p-4">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <LoadingAnimation />
          </div>
        ) : (
          <div className="w-full h-full bg-white rounded-2xl shadow-md border border-primary/10 overflow-hidden">
            {/* scroll container for table */}
            <div className="w-full h-full overflow-auto">
              <table className="min-w-[1200px] w-full text-sm">
                {/* ✅ Sticky table header (NO top-[72px]) */}
                <thead className="sticky top-0 z-20 bg-white">
                  <tr className="border-b border-primary/10">
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-primary/70 w-[110px]">
                      Image
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-primary/70 w-[320px]">
                      Email
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-primary/70 w-[140px]">
                      First Name
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-primary/70 w-[140px]">
                      Last Name
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-primary/70 w-[120px]">
                      Role
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-primary/70 w-[170px]">
                      Email Verification
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-primary/70 w-[150px]">
                      Account Status
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-primary/70 w-[130px]">
                      Block
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-primary/70 w-[150px]">
                      Role Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-primary/10">
                  {users.map((user, idx) => (
                    <tr
                      key={user.email}
                      className={`${idx % 2 === 0 ? "bg-white" : "bg-primary/[0.02]"} hover:bg-primary/[0.04] transition`}
                    >
                      <td className="px-5 py-4 text-center">
                        <img
                          referrerPolicy="no-referrer"
                          src={
                            user.image ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                          alt={user.firstName || "User"}
                          className="w-[52px] h-[52px] object-cover rounded-full mx-auto border border-primary/10 bg-white"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                          }}
                        />
                      </td>

                      <td className="px-5 py-4 text-center text-primary">
                        {user.email}
                      </td>
                      <td className="px-5 py-4 text-center text-primary">
                        {user.firstName}
                      </td>
                      <td className="px-5 py-4 text-center text-primary">
                        {user.lastName}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            user.isEmailVerified
                              ? "bg-secondary/10 text-secondary"
                              : "bg-primary/10 text-primary/70"
                          }`}
                        >
                          {user.isEmailVerified ? "Verified" : "Not Verified"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            user.isBlocked
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <button
                          className={`px-4 py-2 rounded-full text-white font-medium transition ${
                            user.isBlocked
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                          onClick={() => toggleBlock(user)}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <button
                          className={`px-4 py-2 rounded-full text-white font-medium transition ${
                            user.role === "admin"
                              ? "bg-gray-500 hover:bg-gray-600"
                              : "bg-secondary hover:opacity-90"
                          }`}
                          onClick={() => toggleRole(user)}
                        >
                          {user.role === "admin" ? "Make Customer" : "Make Admin"}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {users.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-5 py-16 text-center text-primary/60">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Pagination fixed at bottom (separate from table scroll) */}
      <div className="px-4 pb-4">
        <div className="w-full max-w-[560px] mx-auto h-[60px] bg-white shadow-xl rounded-full flex items-center justify-center px-3 gap-3 border border-primary/10">
          <button
            className="bg-secondary w-[110px] text-white p-2 rounded-full cursor-pointer hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>

          <span className="text-sm text-primary w-[130px] text-center font-medium">
            Page {pageNumber} of {totalPages}
          </span>

          <button
            className="bg-secondary text-white p-2 rounded-full w-[110px] cursor-pointer hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={pageNumber >= totalPages}
            onClick={() => setPageNumber((p) => p + 1)}
          >
            Next
          </button>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value, 10));
              setPageNumber(1);
            }}
            className="border border-primary/20 rounded-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}