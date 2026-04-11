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
  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);

  const navigate = useNavigate();

  async function sendOtp() {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      return toast.error("Email is required");
    }

    try {
      setSending(true);
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/users/send-otp",
        { email: trimmedEmail }
      );
      console.log("OTP Response:", response.data);
      toast.success("OTP sent to your email. Please check your inbox.");
      setOtpSent(true);
    } catch (err) {
      console.error("OTP Error:", err.response?.data || err.message);
      toast.error(
        err?.response?.data?.message || "Failed to send OTP. Please try again."
      );
      setOtpSent(false);
    } finally {
      setSending(false);
    }
  }

  async function resetPassword() {
    if (!otp.trim()) {
      return toast.error("OTP is required");
    }
    if (!newPassword) {
      return toast.error("New password is required");
    }
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match. Please try again.");
    }

    try {
      setResetting(true);
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/users/verify-otp",
        {
          email: email.trim().toLowerCase(),
          otp: otp.trim(),
          newPassword,
        }
      );
      console.log("Reset Response:", response.data);
      toast.success(
        "Password reset successful. You can now log in with your new password."
      );
      navigate("/login");
    } catch (err) {
      console.error("Reset Error:", err.response?.data || err.message);
      toast.error(
        err?.response?.data?.message || "Failed to reset password. Please try again."
      );
    } finally {
      setResetting(false);
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
            Enter your email address and we'll send you an OTP.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendOtp()}
          />

          <button
            onClick={sendOtp}
            disabled={sending}
            className="w-full mt-5 p-3 bg-secondary hover:opacity-90 rounded-2xl text-white font-bold transition disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send OTP"}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="w-full mt-3 p-3 bg-primary/10 hover:bg-primary/15 rounded-2xl text-primary font-bold transition"
          >
            Back to Login
          </button>
        </div>
      ) : (
        <div className="w-full max-w-[430px] bg-white rounded-3xl shadow-2xl border border-primary/10 p-8">
          <h1 className="text-3xl font-black text-primary mb-3">
            Reset Password
          </h1>
          <p className="text-primary/60 mb-2">
            Enter the OTP sent to{" "}
            <span className="font-semibold text-primary">{email}</span>
          </p>
          <p className="text-primary/40 text-sm mb-6">
            OTP is valid for 10 minutes.
          </p>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className={inputClass}
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
            <input
              type="password"
              placeholder="Enter new password (min 6 chars)"
              className={inputClass}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className={inputClass}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && resetPassword()}
            />

            <button
              onClick={resetPassword}
              disabled={resetting}
              className="w-full p-3 bg-secondary hover:opacity-90 rounded-2xl text-white font-bold transition disabled:opacity-50"
            >
              {resetting ? "Resetting..." : "Reset Password"}
            </button>

            <button
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setNewPassword("");
                setConfirmPassword("");
              }}
              className="w-full p-3 bg-primary/10 hover:bg-primary/15 rounded-2xl text-primary font-bold transition"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}