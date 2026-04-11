import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const API = useMemo(() => import.meta.env.VITE_API_URL, []);

  function redirectAfterLogin(role) {
    const from = location.state?.from || "/";
    if (role === "admin") navigate("/admin/");
    else navigate(from);
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (googleRes) => {
      try {
        setGoogleLoading(true);
        const res = await axios.post(API + "/users/google-login", {
          token: googleRes.access_token,
        });

        localStorage.setItem("token", res.data.token);
        toast.success("Login successful");
        redirectAfterLogin(res.data.role);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Google login failed. Please try again.");
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => toast.error("Google login failed. Please try again."),
  });

  async function login(e) {
    e?.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    try {
      setLoading(true);

      const res = await axios.post(API + "/users/login", {
        email: cleanEmail,
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      redirectAfterLogin(res.data.role);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  }

  // Brand colors:
  // Black:   #000000
  // Green:   #48A111
  // Cream:   #F1F0E9

  const card =
    "w-full max-w-[980px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl";

  const input =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#F1F0E9] placeholder:text-[#F1F0E9]/50 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-[#48A111]/40";

  const label = "text-sm font-medium text-[#F1F0E9]/80";

  const primaryBtn =
    "inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#48A111] to-[#66C61E] font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60";

  const ghostBtn =
    "inline-flex h-12 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 font-semibold text-[#F1F0E9] transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <main className="min-h-screen bg-[#000000] text-[#F1F0E9]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 10%, rgba(72,161,17,0.22), transparent 40%),
              radial-gradient(circle at 80% 30%, rgba(72,161,17,0.16), transparent 45%),
              radial-gradient(circle at 50% 90%, rgba(241,240,233,0.06), transparent 45%)
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10">
        <section className={card}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left (Brand / Info) */}
            <div className="hidden lg:flex flex-col justify-between p-10">
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-12 w-12 rounded-2xl bg-white/5 p-2"
                  />
                  <div>
                    <p className="text-sm text-[#F1F0E9]/60">Welcome to</p>
                    <h1 className="text-2xl font-black tracking-tight text-[#F1F0E9]">
                      Isuri Computers
                    </h1>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-4xl font-black leading-tight text-[#F1F0E9]">
                    Sign in and get back to shopping.
                  </h2>
                  <p className="mt-4 text-[#F1F0E9]/65 leading-relaxed">
                    Access your account, track orders, and manage your profile securely.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-[#F1F0E9]/70">
                Tip: Use your Google account for faster login.
              </div>
            </div>

            {/* Right (Form) */}
            <div className="p-8 sm:p-10">
              <div className="lg:hidden flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-11 w-11 rounded-2xl bg-white/5 p-2"
                />
                <div>
                  <p className="text-xs text-[#F1F0E9]/60">Isuri Computers</p>
                  <h1 className="text-xl font-black text-[#F1F0E9]">Login</h1>
                </div>
              </div>

              <div className="mt-6 lg:mt-0">
                <h2 className="text-3xl font-black tracking-tight text-[#F1F0E9]">
                  Welcome back
                </h2>
                <p className="mt-2 text-[#F1F0E9]/60">Sign in to continue.</p>
              </div>

              <form onSubmit={login} className="mt-8 space-y-4">
                <div className="space-y-2">
                  <label className={label}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={input}
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <label className={label}>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className={input}
                    autoComplete="current-password"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-[#66C61E] hover:text-[#48A111] transition"
                  >
                    Forgot password?
                  </Link>

                  <Link
                    to="/register"
                    className="text-sm text-[#F1F0E9]/60 hover:text-[#F1F0E9]/85 transition"
                  >
                    Create account
                  </Link>
                </div>

                <button type="submit" disabled={loading} className={primaryBtn}>
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[#000000] px-3 text-xs text-[#F1F0E9]/50">
                      OR
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => googleLogin()}
                  disabled={googleLoading}
                  className={ghostBtn}
                >
                  {googleLoading ? "Connecting..." : "Continue with Google"}
                </button>

                <p className="pt-2 text-xs text-[#F1F0E9]/45">
                  By continuing, you agree to our terms and privacy policy.
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}