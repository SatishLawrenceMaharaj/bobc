import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-center mb-2">
            Bethel Open Bible Church
          </h1>
          <p className="text-center text-blue-100 text-lg">
            Saved, Discipled, Empowered to Serve
          </p>
        </div>
      </header>
      <nav className="bg-blue-700 sticky top-0 z-50 overflow-auto">
        <div className="max-w-7xl mx-auto px-2 py-3 flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8">
          <Link
            href="/"
            className="text-white hover:text-blue-200 font-semibold transition text-sm sm:text-base"
          >
            Home
          </Link>
          <Link
            href="/#announcements"
            className="text-white hover:text-blue-200 font-semibold transition text-sm sm:text-base"
          >
            Announcements
          </Link>
          <Link
            href="/#services"
            className="text-white hover:text-blue-200 font-semibold transition text-sm sm:text-base"
          >
            Services
          </Link>
          <Link
            href="/#contact"
            className="text-white hover:text-blue-200 font-semibold transition text-sm sm:text-base"
          >
            Contact
          </Link>
          <Link
            href="/videos"
            className="text-white hover:text-blue-200 font-semibold transition text-sm sm:text-base"
          >
            Videos
          </Link>
          <Link
            href="/sermons"
            className="text-white hover:text-blue-200 font-semibold transition text-sm sm:text-base"
          >
            Sermons
          </Link>
        </div>
      </nav>
    </>
  );
}
