import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  const linkClass =
    "text-black/70 hover:text-black transition font-semibold";

  return (
    <footer className="bg-[#b8b6ae] text-black border-t border-black/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-black flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Isuri Computers"
                  className="h-7 w-7 object-contain"
                />
              </div>
              <div>
                <p className="text-lg font-black leading-tight">Isuri Computers</p>
                <p className="text-xs text-black/50">Devices • Parts • Support</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-black/65 leading-7">
              Trusted computer shop for laptops, desktops, components and accessories
              with reliable after-sales support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-black tracking-wide text-black">
              QUICK LINKS
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              <Link className={linkClass} to="/">Home</Link>
              <Link className={linkClass} to="/products">Products</Link>
              <Link className={linkClass} to="/about">About</Link>
              <Link className={linkClass} to="/contact">Contact</Link>
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-black tracking-wide text-black">
              HELP
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              <Link className={linkClass} to="/cart">Cart</Link>
              <Link className={linkClass} to="/login">Login</Link>
              <Link className={linkClass} to="/register">Register</Link>
              <Link className={linkClass} to="/forgot-password">Forgot Password</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-black tracking-wide text-black">
              CONTACT
            </h3>

            <div className="mt-4 space-y-3 text-sm text-black/70">
              <p>
                <span className="font-black text-black">Phone:</span> +94 70 000 0000
              </p>
              <p>
                <span className="font-black text-black">Email:</span> support@isuricomputers.com
              </p>
              <p>
                <span className="font-black text-black">Location:</span> Your City, Sri Lanka
              </p>

              <a
                href="https://wa.me/94700000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-2 h-11 px-5 rounded-2xl bg-black text-[#F1F0E9] font-black items-center justify-center hover:opacity-90 transition"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-black/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-black/55">
            © {year} Isuri Computers. All rights reserved.
          </p>

          <p className="text-xs text-black/55">
            Built with care and support.
          </p>
        </div>
      </div>
    </footer>
  );
}