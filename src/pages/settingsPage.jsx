import axios from "axios";
import { useEffect, useState } from "react";
import uploadFile from "../utils/mediaUpload";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [existingImageUrl, setExistingImageUrl] = useState("");
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        setLoadingProfile(true);

        axios
            .get(import.meta.env.VITE_API_URL + "/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setFirstName(response.data.firstName || "");
                setLastName(response.data.lastName || "");
                setExistingImageUrl(response.data.image || "");
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("token");
                toast.error("Please login again");
                window.location.href = "/login";
            })
            .finally(() => {
                setLoadingProfile(false);
            });
    }, []);

    async function updateProfile() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please login again");
                window.location.href = "/login";
                return;
            }

            setUpdatingProfile(true);

            const updatedInfo = {
                firstName,
                lastName,
                image: existingImageUrl,
            };

            if (file != null) {
                updatedInfo.image = await uploadFile(file);
            }

            const response = await axios.put(
                import.meta.env.VITE_API_URL + "/users/",
                updatedInfo,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data?.token) {
                localStorage.setItem("token", response.data.token);
            }

            toast.success("Profile updated successfully");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || "Failed to update profile"
            );
        } finally {
            setUpdatingProfile(false);
        }
    }

    async function changePassword() {
        try {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            if (password.trim() === "") {
                toast.error("Password cannot be empty");
                return;
            }

            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please login again");
                window.location.href = "/login";
                return;
            }

            setChangingPassword(true);

            await axios.post(
                import.meta.env.VITE_API_URL + "/users/update-password",
                {
                    password: password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Password changed successfully");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || "Failed to change password"
            );
        } finally {
            setChangingPassword(false);
        }
    }

    const previewImage = file
        ? URL.createObjectURL(file)
        : existingImageUrl || "";

    if (loadingProfile) {
        return (
            <div className="w-full min-h-[calc(100vh-100px)] bg-accent flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-primary/70">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-accent flex justify-center items-center px-4 py-8">
            <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 justify-center">
                <div className="flex-1 min-w-[300px] rounded-3xl bg-white shadow-md p-6 flex flex-col gap-4 border border-primary/10">
                    <h1 className="text-2xl font-black text-primary text-center">
                        Account Settings
                    </h1>

                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-full object-cover mx-auto border border-primary/10"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-accent mx-auto border border-primary/10" />
                    )}

                    <input
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        className="w-full h-[50px] px-4 border border-primary/15 rounded-2xl bg-accent outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="First Name"
                    />

                    <input
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        className="w-full h-[50px] px-4 border border-primary/15 rounded-2xl bg-accent outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="Last Name"
                    />

                    <input
                        type="file"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                        className="w-full h-[50px] px-4 py-3 border border-primary/15 rounded-2xl bg-accent outline-none"
                    />

                    <button
                        className="w-full h-[50px] bg-secondary text-white rounded-2xl mt-2 font-bold hover:opacity-90 transition disabled:opacity-60"
                        onClick={updateProfile}
                        disabled={updatingProfile}
                    >
                        {updatingProfile ? "Updating..." : "Update Profile"}
                    </button>
                </div>

                <div className="flex-1 min-w-[300px] rounded-3xl bg-white shadow-md p-6 flex flex-col gap-4 border border-primary/10">
                    <h1 className="text-2xl font-black text-primary text-center">
                        Change Password
                    </h1>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className="w-full h-[50px] px-4 border border-primary/15 rounded-2xl bg-accent outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="New Password"
                    />

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        className="w-full h-[50px] px-4 border border-primary/15 rounded-2xl bg-accent outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="Confirm New Password"
                    />

                    <button
                        className="w-full h-[50px] bg-primary text-accent rounded-2xl mt-2 font-bold hover:opacity-90 transition disabled:opacity-60"
                        onClick={changePassword}
                        disabled={changingPassword}
                    >
                        {changingPassword ? "Changing..." : "Change Password"}
                    </button>
                </div>
            </div>
        </div>
    );
}