import { Scissors, MapPin, Phone } from "lucide-react";

export default function SalonDemoPage() {
  return (
    <div className="min-h-screen bg-white text-[#2c2a4a]">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-[#7F77DD]">
          <Scissors size={20} />
          Kim Sun Young Hair
        </div>

        <div className="hidden sm:flex gap-6 text-sm text-gray-600">
          <span>Services</span>
          <span>Pricing</span>
          <span>Contact</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 py-16 text-center bg-gradient-to-br from-[#f7f6ff] to-[#f2f0ff]">
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
          Premium Korean Hair Salon in Sydney
        </h1>

        <p className="mt-4 text-sm sm:text-lg text-gray-600 max-w-xl mx-auto">
          Experience expert styling, modern techniques, and personalised care.
        </p>

        <button className="mt-6 px-6 py-3 bg-[#7F77DD] text-white rounded-full shadow hover:scale-105 transition">
          Book Appointment
        </button>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
          Our Services
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <Service title="Haircut" price="From $50" />
          <Service title="Hair Colour" price="From $160" />
          <Service title="Perm / Digital Perm" price="From $180" />
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-12 bg-[#faf9ff] text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          About Us
        </h2>

        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Our experienced stylists specialise in Korean hair trends, offering
          tailored services to suit your hair type and lifestyle.
        </p>
      </section>

      {/* CONTACT */}
      <section className="px-6 py-12 max-w-4xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">
          Visit Us
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-600">

          <div className="flex items-center gap-2 justify-center">
            <MapPin size={16} />
            Sydney NSW
          </div>

          <div className="flex items-center gap-2 justify-center">
            <Phone size={16} />
            (02) 1234 5678
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 Kim Sun Young Hair (Demo)
      </footer>
    </div>
  );
}

/* ---------- Components ---------- */

function Service({ title, price }) {
  return (
    <div className="bg-white border border-[#ecebff] rounded-xl p-5 text-center shadow-sm">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-[#7F77DD] mt-1">{price}</p>
    </div>
  );
}