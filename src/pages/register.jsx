// RegisterPage.jsx (modern + uses your brand colors)
// Brand colors:
// #000000 (black)
// #48A111 (green)
// #F1F0E9 (cream)

import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const API = useMemo(() => import.meta.env.VITE_API_URL, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (googleRes) => {
      try {
        setGoogleLoading(true);
        const res = await axios.post(API + "/users/google-login", {
          token: googleRes.access_token,
        });

        localStorage.setItem("token", res.data.token);
        toast.success("Login successful");

        if (res.data.role === "admin") navigate("/admin/");
        else navigate("/");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Google sign up failed. Please try again.");
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => toast.error("Google sign up failed. Please try again."),
  });

  async function signup(e) {
    e?.preventDefault();

    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim().toLowerCase();

    if (!fn) return toast.error("First name is required");
    if (!ln) return toast.error("Last name is required");
    if (!em) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirmPassword) return toast.error("Passwords do not match");

    try {
      setLoading(true);

      await axios.post(API + "/users/", {
        firstName: fn,
        lastName: ln,
        email: em,
        password,
      });

      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  }

  const input =
    "w-full h-[52px] rounded-2xl border border-black/15 bg-white px-4 text-black placeholder:text-black/40 outline-none transition focus:ring-2 focus:ring-[#48A111]/30 focus:border-black/25";

  const primaryBtn =
    "h-[52px] w-full rounded-2xl bg-[#48A111] text-black font-black hover:bg-[#3D8F0F] transition disabled:opacity-60 disabled:cursor-not-allowed";

  const ghostBtn =
    "h-[52px] w-full rounded-2xl border border-black/15 bg-[#F1F0E9] text-black font-black hover:bg-white transition disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <main className="min-h-screen bg-[#F1F0E9]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12">
        <section className="w-full max-w-[980px] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left brand panel */}
            <div className="hidden lg:flex flex-col justify-between p-10 bg-black text-[#F1F0E9]">
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
                  </div>
                  <div>
                    <p className="text-sm text-[#F1F0E9]/70">Welcome to</p>
                    <h1 className="text-2xl font-black tracking-tight">Isuri Computers</h1>
                  </div>
                </div>

                <h2 className="mt-10 text-4xl font-black leading-tight">
                  Create your account
                </h2>
                <p className="mt-4 text-[#F1F0E9]/75 leading-relaxed">
                  Register to shop faster, track orders and manage your profile.
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-[#F1F0E9]/75">
                Tip: Use Google to sign up quickly.
              </div>
            </div>

            {/* Right form */}
            <div className="p-8 sm:p-10">
              <div className="lg:hidden flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
                <div>
                  <p className="text-xs text-black/60">Isuri Computers</p>
                  <h1 className="text-xl font-black">Create Account</h1>
                </div>
              </div>

              <div className="mt-6 lg:mt-0">
                <h2 className="text-3xl font-black text-black tracking-tight">Create account</h2>
                <p className="mt-2 text-black/60">Fill your details to get started.</p>
              </div>

              <form onSubmit={signup} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={input}
                    type="text"
                    placeholder="First name"
                    autoComplete="given-name"
                  />
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={input}
                    type="text"
                    placeholder="Last name"
                    autoComplete="family-name"
                  />
                </div>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className={input}
                  autoComplete="email"
                />

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password (min 6 chars)"
                  className={input}
                  autoComplete="new-password"
                />

                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm password"
                  className={input}
                  autoComplete="new-password"
                />

                <button type="submit" disabled={loading} className={primaryBtn}>
                  {loading ? "Creating..." : "Sign up"}
                </button>

                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-black/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-xs text-black/40">OR</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => googleLogin()}
                  disabled={googleLoading}
                  className={ghostBtn}
                >
                  {googleLoading ? "Connecting..." : "Sign up with Google"}
                </button>

                <p className="text-right text-sm text-black/60 pt-2">
                  Already have an account?{" "}
                  <Link to="/login" className="font-black text-[#48A111] hover:underline">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}