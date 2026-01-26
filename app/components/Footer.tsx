export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-bold mb-4">About BOBC</h4>
            <p className="text-gray-300 text-sm">
              Bethel Open Bible Church is a community of believers dedicated to
              growing in faith, serving with love, and reaching our community
              with the Gospel of Jesus Christ.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>
                <a href="#home" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#announcements"
                  className="hover:text-white transition"
                >
                  Announcements
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>
                <a href="https://www.facebook.com/bethel.obc" className="hover:text-white transition">
                  Facebook
                </a>
              </p>
              <p>
                <a
                  href="https://www.instagram.com/bethelobcbordenarve?fbclid=IwY2xjawPjns5leHRuA2FlbQIxMABicmlkETE0bWJJY29tTXFIYVN1TWlWc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHvlNM_hE3iilZ1E7-298uGj-dvdMqrLgByfUC-rTLF_8pJVNgWuBW5Wkq6Ze_aem_SWET4vEaNSBY8WY5aQz6qg"
                  className="hover:text-white transition"
                >
                  Instagram
                </a>
              </p>
              <p>
                <a
                  href="https://www.youtube.com/@bethelobcbordenarve"
                  className="hover:text-white transition"
                >
                  YouTube
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} Bethel Open Bible Church. All rights reserved.</p>
          <p className="mt-2">
            For where two or three gather in my name, there am I with them.
            <br />- Matthew 18:20
          </p>
        </div>
      </div>
    </footer>
  );
}
