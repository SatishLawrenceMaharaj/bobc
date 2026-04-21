import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-3 tracking-tight leading-tight">
              Bethel Open Bible Church
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light tracking-wide">
              Saved, Discipled, Empowered to Serve
            </p>
          </div>
        </div>
      </header>
      <nav className="bg-gradient-to-r from-blue-900 to-blue-800 sticky top-0 z-50 shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-12">
          <Link
            href="/"
            className="text-white hover:text-orange-400 font-semibold transition text-sm sm:text-base relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all"></span>
          </Link>
          <Link
            href="/#announcements"
            className="text-white hover:text-orange-400 font-semibold transition text-sm sm:text-base relative group"
          >
            Announcements
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all"></span>
          </Link>
          <Link
            href="/#services"
            className="text-white hover:text-orange-400 font-semibold transition text-sm sm:text-base relative group"
          >
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all"></span>
          </Link>
          <Link
            href="/#contact"
            className="text-white hover:text-orange-400 font-semibold transition text-sm sm:text-base relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all"></span>
          </Link>
          <Link
            href="/videos"
            className="text-white hover:text-orange-400 font-semibold transition text-sm sm:text-base relative group"
          >
            Videos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all"></span>
          </Link>
          <Link
            href="/sermons"
            className="text-white hover:text-orange-400 font-semibold transition text-sm sm:text-base relative group"
          >
            Sermons
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all"></span>
          </Link>
        </div>
      </nav>
    </>
  );
}
