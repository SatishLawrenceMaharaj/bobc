export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white mt-16 border-t-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="group">
            <h4 className="text-xl font-bold mb-4 text-orange-400 group-hover:text-orange-300 transition">About BOBC</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bethel Open Bible Church is a community of believers dedicated to
              growing in faith, serving with love, and reaching our community
              with the Gospel of Jesus Christ.
            </p>
          </div>

          <div className="group">
            <h4 className="text-xl font-bold mb-4 text-orange-400 group-hover:text-orange-300 transition">Quick Links</h4>
            <ul className="text-gray-300 text-sm space-y-3">
              <li>
                <a href="#home" className="hover:text-orange-400 transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#announcements"
                  className="hover:text-orange-400 transition flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                  Announcements
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-400 transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="group">
            <h4 className="text-xl font-bold mb-4 text-orange-400 group-hover:text-orange-300 transition">Follow Us</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>
                <a href="https://www.facebook.com/bethel.obc" className="hover:text-orange-400 transition inline-flex items-center gap-2">
                  f Facebook
                </a>
              </p>
              <p>
                <a
                  href="https://www.instagram.com/bethelobcbordenarve?fbclid=IwY2xjawPjns5leHRuA2FlbQIxMABicmlkETE0bWJJY29tTXFIYVN1TWlWc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHvlNM_hE3iilZ1E7-298uGj-dvdMqrLgByfUC-rTLF_8pJVNgWuBW5Wkq6Ze_aem_SWET4vEaNSBY8WY5aQz6qg"
                  className="hover:text-orange-400 transition inline-flex items-center gap-2"
                >
                  Instagram
                </a>
              </p>
              <p>
                <a
                  href="https://www.youtube.com/@bethelobcbordenarve"
                  className="hover:text-orange-400 transition inline-flex items-center gap-2"
                >
                  YouTube
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm font-medium">© {currentYear} Bethel Open Bible Church. All rights reserved.</p>
          <p className="mt-4 text-gray-500 text-sm leading-relaxed italic">
            For where two or three gather in my name, there am I with them.
            <br />
            <span className="text-orange-400 font-semibold">- Matthew 18:20</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
