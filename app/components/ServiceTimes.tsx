import Link from "next/link";
import type { ContactInfo, ServiceTime } from "@/lib/queries";

export default function ServiceTimes({
  serviceTimes,
  contactInfo,
}: {
  serviceTimes: ServiceTime[];
  contactInfo: ContactInfo | null;
}) {
  return (
    <section id="services" className="mb-12">
      <h2 className="text-5xl font-bold text-gray-900 mb-12 text-center tracking-tight">
        Service Times & Info
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {serviceTimes.map((service) => (
          <div
            key={service.id}
            className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all border border-blue-100 group cursor-pointer"
          >
            <div className="mb-3 text-4xl group-hover:scale-125 transition-transform">🏛️</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">
              {service.title}
            </h3>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-800">🕙 {service.time_text}</p>
              <p className="text-gray-700 font-medium">{service.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white shadow-lg" id="contact">
        <h3 className="text-3xl font-bold mb-8 text-center text-white">Contact Us</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition">
            <p className="text-orange-400 mb-3 font-bold text-lg">
              📍 Location
            </p>

            {contactInfo?.map_url ? (
              <Link
                href={contactInfo.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-orange-400 transition font-medium underline"
              >
                <p className="text-gray-100">
                  {contactInfo.address_line_1}
                  <br />
                  {contactInfo.address_line_2}
                </p>
              </Link>
            ) : (
              <p className="text-gray-100">
                {contactInfo?.address_line_1}
                <br />
                {contactInfo?.address_line_2}
              </p>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition">
              <p className="text-orange-400 mb-2 font-bold">📞 Phone</p>
              <p className="text-gray-100 font-medium">{contactInfo?.phone}</p>
            </div>

            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition">
              <p className="text-orange-400 mb-2 font-bold">📧 Email</p>
              <p className="text-gray-100 font-medium">{contactInfo?.email}</p>
            </div>

            {contactInfo?.prayer_request_form_url && (
              <Link
                href={contactInfo.prayer_request_form_url}
                className="block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg text-center transition shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                🙏 Prayer Requests & Testimonies
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}