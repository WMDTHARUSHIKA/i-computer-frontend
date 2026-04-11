// AboutPage.jsx (header/hero section removed)
// Brand colors:
// #000000 (black)  #48A111 (green)  #F1F0E9 (cream)

import { Link } from "react-router-dom";
import { BiShieldQuarter, BiSupport, BiPackage } from "react-icons/bi";

function InfoCard({ icon, title, desc }) {
  return (
    <div className="rounded-3xl bg-white border border-black/10 p-6 shadow-sm hover:shadow-lg transition">
      <div className="w-12 h-12 rounded-2xl bg-[#F1F0E9] text-black flex items-center justify-center mb-4 border border-black/10">
        {icon}
      </div>
      <h3 className="text-black font-black text-lg">{title}</h3>
      <p className="text-black/70 mt-2 leading-7 text-sm">{desc}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-[#F1F0E9]">
      {/* Content (starts immediately — no hero/header section) */}
      <section className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
        {/* Small page title (optional, simple) */}
        <div className="mb-10">
          <p className="text-black/60 font-black uppercase tracking-wider text-xs">
            About Isuri Computers
          </p>
          <h1 className="text-3xl lg:text-4xl font-black text-black mt-2">
            Your trusted computer shop for devices, parts, and support.
          </h1>
          <p className="text-black/70 mt-4 max-w-3xl leading-8">
            We help students, professionals, and gamers find the right technology. From laptops
            and desktops to components and accessories—our focus is quality, fair pricing, and
            reliable after-sales support.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="h-[48px] px-6 rounded-2xl bg-[#48A111] text-black font-black flex items-center justify-center hover:bg-[#3D8F0F] transition"
            >
              Browse Products
            </Link>
            <Link
              to="/contact"
              className="h-[48px] px-6 rounded-2xl bg-black text-[#F1F0E9] font-black flex items-center justify-center hover:opacity-90 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-3xl bg-white border border-black/10 shadow-sm p-7">
            <h2 className="text-2xl font-black text-black">Who we are</h2>
            <p className="text-black/70 mt-4 leading-8">
              Isuri Computers is a customer-first computer shop dedicated to providing genuine
              products and honest guidance. We believe buying tech should be simple: understand
              your needs, choose the right product, and get dependable support after the purchase.
            </p>

            <h3 className="text-lg font-black text-black mt-7">What we sell</h3>
            <ul className="mt-3 space-y-2 text-black/75">
              <li>• Laptops & Desktop PCs</li>
              <li>• Components (CPU, RAM, SSD/HDD, GPU, Motherboard, PSU)</li>
              <li>• Peripherals & Accessories (Keyboards, Mouse, Headsets)</li>
              <li>• Networking & Storage solutions</li>
            </ul>

            <h3 className="text-lg font-black text-black mt-7">Our promise</h3>
            <p className="text-black/70 mt-3 leading-8">
              Clear pricing, genuine items, and friendly guidance—so you can buy confidently.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <InfoCard
              icon={<BiShieldQuarter size={24} />}
              title="Genuine Products"
              desc="We prioritize trusted products and quality checks for a better experience."
            />
            <InfoCard
              icon={<BiPackage size={24} />}
              title="Fast Order Handling"
              desc="Smooth processing and clear updates so you know what’s happening."
            />
            <InfoCard
              icon={<BiSupport size={24} />}
              title="Helpful Support"
              desc="Need advice? We help you choose parts and devices that fit your needs."
            />
            <div className="rounded-3xl bg-white border border-black/10 p-6 shadow-sm">
              <h3 className="text-black font-black text-lg">Need help choosing?</h3>
              <p className="text-black/70 mt-2 leading-7 text-sm">
                Contact us and we’ll recommend the best options for your budget.
              </p>
              <Link
                to="/contact"
                className="inline-flex mt-4 h-[44px] px-5 rounded-2xl bg-black text-[#F1F0E9] font-black items-center justify-center hover:opacity-90 transition"
              >
                Get Recommendations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-[28px] bg-black p-8 text-[#F1F0E9] border border-black/10">
          <h2 className="text-2xl font-black">Ready to upgrade?</h2>
          <p className="text-[#F1F0E9]/75 mt-2 leading-7">
            Browse our catalog and pick the right device or component today.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="h-[48px] px-6 rounded-2xl bg-[#48A111] text-black font-black flex items-center justify-center hover:bg-[#3D8F0F] transition"
            >
              Shop Products
            </Link>
            <Link
              to="/contact"
              className="h-[48px] px-6 rounded-2xl border border-white/20 text-[#F1F0E9] font-black flex items-center justify-center hover:bg-[#F1F0E9] hover:text-black transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}