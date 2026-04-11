import { Link } from "react-router-dom";
import { BiPhone, BiEnvelope, BiMap, BiTime } from "react-icons/bi";

function ContactCard({ icon, title, value, sub }) {
  return (
    <div className="rounded-3xl bg-white border border-black/10 p-6 shadow-sm">
      <div className="w-12 h-12 rounded-2xl bg-[#F1F0E9] text-[#48A111] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-black font-black text-lg">{title}</h3>
      <p className="text-black mt-2 font-semibold">{value}</p>
      {sub && <p className="text-black/60 text-sm mt-2">{sub}</p>}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-[#F1F0E9]">
      {/* Header */}
      <section className="bg-gradient-to-r from-black via-[#0B0F0C] to-[#48A111]/35">
        <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
          <p className="text-[#F1F0E9]/80 font-black uppercase tracking-wider text-sm">
            Contact
          </p>
          <h1 className="text-[#F1F0E9] text-3xl lg:text-5xl font-black mt-3">
            We’re here to help.
          </h1>
          <p className="text-[#F1F0E9]/75 mt-5 max-w-3xl leading-8">
            Ask about product availability, pricing, delivery, or recommendations.
            We’ll respond as soon as possible.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="h-[48px] px-6 rounded-2xl bg-[#48A111] text-black font-black flex items-center justify-center hover:brightness-110 transition"
            >
              Browse Products
            </Link>

            <a
              href="https://wa.me/94700000000"
              target="_blank"
              rel="noreferrer"
              className="h-[48px] px-6 rounded-2xl border border-[#F1F0E9]/30 text-[#F1F0E9] font-black flex items-center justify-center hover:bg-[#F1F0E9] hover:text-black transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ContactCard
            icon={<BiPhone size={24} />}
            title="Phone"
            value="+94 70 000 0000"
            sub="Mon–Sat, 9.00AM – 6.00PM"
          />
          <ContactCard
            icon={<BiEnvelope size={24} />}
            title="Email"
            value="support@isuricomputers.com"
            sub="We reply within 24 hours"
          />
          <ContactCard
            icon={<BiMap size={24} />}
            title="Location"
            value="Your City, Sri Lanka"
            sub="Visit our store for quick help"
          />
          <ContactCard
            icon={<BiTime size={24} />}
            title="Working Hours"
            value="Mon–Sat"
            sub="9.00AM – 6.00PM"
          />
        </div>

        {/* No form – Quick help only */}
        <div className="mt-10 grid lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-3xl bg-white border border-black/10 shadow-sm p-7">
            <h2 className="text-2xl font-black text-black">Quick help</h2>
            <ul className="mt-4 space-y-3 text-black/75 leading-7">
              <li>• Ask for recommendations based on your budget and usage.</li>
              <li>• Confirm stock availability and delivery options.</li>
              <li>• Get help choosing compatible components for builds.</li>
              <li>• After-sales support and troubleshooting guidance.</li>
            </ul>

            <div className="mt-6 rounded-2xl bg-[#F1F0E9] border border-black/10 p-5">
              <p className="text-black font-bold">Tip:</p>
              <p className="text-black/70 mt-2 leading-7">
                Include your preferred brand, budget range, and main use (gaming, office,
                design) for faster recommendations.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-black/10 shadow-sm p-7">
            <h2 className="text-2xl font-black text-black">Contact options</h2>
            <p className="text-black/70 mt-3 leading-7">
              Choose the fastest way to reach us.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="tel:+94700000000"
                className="h-[48px] px-6 rounded-2xl bg-black text-[#F1F0E9] font-black flex items-center justify-center hover:opacity-90 transition"
              >
                Call Now
              </a>
              <a
                href="mailto:support@isuricomputers.com"
                className="h-[48px] px-6 rounded-2xl border border-black/15 text-black font-black flex items-center justify-center hover:bg-black hover:text-[#F1F0E9] transition"
              >
                Email Us
              </a>
              <a
                href="https://wa.me/94700000000"
                target="_blank"
                rel="noreferrer"
                className="h-[48px] px-6 rounded-2xl bg-[#48A111] text-black font-black flex items-center justify-center hover:brightness-110 transition"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}