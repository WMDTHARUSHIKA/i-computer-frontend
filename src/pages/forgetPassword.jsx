import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function sendOtp() {
        setOtpSent(true);
        try {
            await axios.post(import.meta.env.VITE_API_URL + "/users/send-otp", {
                email,
            });
            toast.success("OTP sent to your email. Please check your inbox.");
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to send OTP. Please try again."
            );
            setOtpSent(false);
        }
    }

    async function resetPassword() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match. Please try again.");
            return;
        }

        try {
            await axios.post(import.meta.env.VITE_API_URL + "/users/verify-otp", {
                email,
                otp,
                newPassword,
            });

            toast.success(
                "Password reset successful. You can now log in with your new password."
            );
            navigate("/login");
        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                    "Failed to reset password. Please try again."
            );
        }
    }

    const inputClass =
        "w-full p-3 rounded-2xl border border-primary/15 bg-white outline-none focus:ring-2 focus:ring-secondary transition";

    return (
        <div className="flex justify-center items-center min-h-screen bg-accent px-4">
            {!otpSent ? (
                <div className="w-full max-w-[430px] bg-white rounded-3xl shadow-2xl border border-primary/10 p-8">
                    <h1 className="text-3xl font-black text-primary mb-3">
                        Forgot Password
                    </h1>
                    <p className="text-primary/60 mb-6">
                        Enter your email address and we’ll send you an OTP.
                    </p>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className={inputClass}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        onClick={sendOtp}
                        className="w-full mt-5 p-3 bg-secondary hover:opacity-90 rounded-2xl text-white font-bold transition"
                    >
                        Send OTP
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-[430px] bg-white rounded-3xl shadow-2xl border border-primary/10 p-8">
                    <h1 className="text-3xl font-black text-primary mb-3">
                        Reset Password
                    </h1>
                    <p className="text-primary/60 mb-6">
                        Enter the OTP and choose your new password.
                    </p>

                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className={inputClass}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className={inputClass}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className={inputClass}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            onClick={resetPassword}
                            className="w-full p-3 bg-secondary hover:opacity-90 rounded-2xl text-white font-bold transition"
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}