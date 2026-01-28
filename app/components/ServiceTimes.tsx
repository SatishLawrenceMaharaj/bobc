import Link from "next/link";

export default function ServiceTimes() {
  return (
    <section id="services" className="bg-white rounded-lg shadow-md p-8 mb-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Service Times & Info
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">
            Sunday Service
          </h3>
          <p className="text-lg text-gray-700 mb-1">
            🕙 8:00 AM - 10:00 AM every Sunday
          </p>
          <p className="text-gray-600">Main Sanctuary</p>
        </div>
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">
            Children&apos;s Church
          </h3>
          <p className="text-lg text-gray-700 mb-1">🕙 8:30 AM every Sunday</p>
          <p className="text-gray-600">Downstairs Sanctuary</p>
        </div>
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">
            Breakthrough Monday
          </h3>
          <p className="text-lg text-gray-700 mb-1">🕖 7:00 PM every Monday</p>
          <p className="text-gray-600">Main Sanctuary | Live on YouTube</p>
        </div>
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">
            Monthly Prayer Meeting
          </h3>
          <p className="text-lg text-gray-700 mb-1">
            🕐 7:00 PM every last Wednesday and Thursday of the month
          </p>
          <p className="text-gray-600">Main Sanctuary | Live on YouTube</p>
        </div>
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">
            Baptism and Mentorship Class
          </h3>
          <p className="text-lg text-gray-700 mb-1">🕐 5:00 PM every Sunday</p>
          <p className="text-gray-600">Main Sanctuary | Live on YouTube</p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-6" id="contact">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">📍 Address:</span>
            </p>
            <Link
              href="https://maps.app.goo.gl/v5KMTEEdB57MDSBy6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              <p className="text-gray-700">
                Hamilton Dr
                <br />
                Borde Narve, Princes Town, Trinidad and Tobago
              </p>
            </Link>
          </div>
          <div>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">📞 Phone:</span>
            </p>
            <p className="text-gray-700">(868) 764-3100</p>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">📧 Email:</span>
            </p>
            <p className="text-gray-700">info@bobc.church</p>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">
                🙏 Prayer Requests & Testimonies
              </span>
            </p>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSdcWoUqb1T4j6AdATjg4dO355ePrwGSewIBrf5N7wHncf_2_Q/viewform"
              className="text-blue-600 hover:underline"
            >
              Prayer Requests & Testimonies Form
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
