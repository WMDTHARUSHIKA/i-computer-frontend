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

    useEffect(() => {
        if (loading) {
            const token = localStorage.getItem("token");

            axios
                .get(
                    import.meta.env.VITE_API_URL + "/users/all/" + pageSize + "/" + pageNumber,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                )
                .then((response) => {
                    setUsers(response.data.users);
                    setTotalPages(response.data.totalPages);
                    setLoading(false);
                })
                .catch(() => {
                    toast.error("Failed to load users");
                    setLoading(false);
                });
        }
    }, [loading, pageNumber, pageSize]);

    function toggleBlock(user) {
        axios
            .post(
                import.meta.env.VITE_API_URL + "/users/toggle-block",
                {
                    email: user.email,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                toast.success(response.data.message);
                setLoading(true);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || "Failed to toggle block status");
            });
    }

    function toggleRole(user) {
        axios
            .post(
                import.meta.env.VITE_API_URL + "/users/toggle-role",
                {
                    email: user.email,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                toast.success(response.data.message);
                setLoading(true);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || "Failed to toggle role");
            });
    }

    return (
        <div className="w-full h-full overflow-y-auto hide-scroll-track relative bg-accent rounded-2xl">
            <div className="flex items-center justify-between gap-3 px-5 py-4 bg-primary text-accent border-b border-primary/10 sticky top-0 z-20">
                <div>
                    <h2 className="text-lg font-semibold">Users</h2>
                    <p className="text-sm text-accent/70">Manage your users at a glance</p>
                </div>
            </div>

            {loading ? (
                <div className="w-full h-[500px] flex justify-center items-center">
                    <LoadingAnimation />
                </div>
            ) : (
                <div className="overflow-x-auto pb-24">
                    <table className="min-w-[1200px] w-full text-sm">
                        <thead className="sticky top-[72px] z-10 bg-white">
                            <tr className="border-b border-primary/10">
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Image
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Email
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    First Name
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Last Name
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Role
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Email Verification
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Account Status
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Block
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-primary/70">
                                    Role Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-primary/10">
                            {users.map((user) => (
                                <tr key={user.email} className="hover:bg-white/70 transition">
                                    <td className="px-5 py-4 text-center">
                                        <img
                                            referrerPolicy="no-referrer"
                                            src={user.image}
                                            alt={user.firstName}
                                            className="w-[52px] h-[52px] object-cover rounded-full mx-auto border border-primary/10"
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
                        </tbody>
                    </table>
                </div>
            )}

            <div className="w-full sticky bottom-4 left-0 h-[60px] flex justify-center items-center px-4">
                <div className="w-full max-w-[560px] h-full bg-white shadow-xl rounded-full flex items-center justify-center px-3 gap-3 border border-primary/10">
                    <button
                        className="bg-secondary w-[110px] text-white p-2 rounded-full cursor-pointer hover:opacity-90 transition"
                        onClick={() => {
                            if (pageNumber > 1) {
                                setPageNumber(pageNumber - 1);
                                setLoading(true);
                            } else {
                                toast.success("You are on the first page");
                            }
                        }}
                    >
                        Previous
                    </button>

                    <span className="text-sm text-primary w-[130px] text-center font-medium">
                        Page {pageNumber} of {totalPages}
                    </span>

                    <button
                        className="bg-secondary text-white p-2 rounded-full w-[110px] cursor-pointer hover:opacity-90 transition"
                        onClick={() => {
                            if (pageNumber < totalPages) {
                                setPageNumber(pageNumber + 1);
                                setLoading(true);
                            } else {
                                toast.success("You are on the last page");
                            }
                        }}
                    >
                        Next
                    </button>

                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(parseInt(e.target.value));
                            setPageNumber(1);
                            setLoading(true);
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