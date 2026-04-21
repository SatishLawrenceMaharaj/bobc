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
    <section id="services" className="bg-white rounded-lg shadow-md p-8 mb-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Service Times & Info
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {serviceTimes.map((service) => (
          <div key={service.id} className="text-center p-6 bg-blue-50 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">
              {service.title}
            </h3>
            <p className="text-lg text-gray-700 mb-1">🕙 {service.time_text}</p>
            <p className="text-gray-600">{service.location}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 rounded-lg p-6" id="contact">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">📍 Address:</span>
            </p>

            {contactInfo?.map_url ? (
              <Link
                href={contactInfo.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <p className="text-gray-700">
                  {contactInfo.address_line_1}
                  <br />
                  {contactInfo.address_line_2}
                </p>
              </Link>
            ) : (
              <p className="text-gray-700">
                {contactInfo?.address_line_1}
                <br />
                {contactInfo?.address_line_2}
              </p>
            )}
          </div>

          <div>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">📞 Phone:</span>
            </p>
            <p className="text-gray-700">{contactInfo?.phone}</p>

            <p className="text-gray-600 mt-2">
              <span className="font-semibold">📧 Email:</span>
            </p>
            <p className="text-gray-700">{contactInfo?.email}</p>

            <p className="text-gray-600 mt-2">
              <span className="font-semibold">
                🙏 Prayer Requests & Testimonies
              </span>
            </p>

            {contactInfo?.prayer_request_form_url && (
              <Link
                href={contactInfo.prayer_request_form_url}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prayer Requests & Testimonies Form
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}