import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-[#f5ecd7] py-10 mt-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Left: Logo & tagline */}
          <div>
            <h3 className="text-xl! font-bold text-orange-900 mb-2">
              truckkort.se
            </h3>
            <p className="text-sm! text-gray-700 mb-4 md:mb-0">
              Hitta rätt truckutbildare genom oss.
            </p>
          </div>
          {/* Middle: Links */}
          <div>
            <h4 className="text-base font-semibold text-orange-900 mb-2">
              Länkar
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="/alla-kurser"
                  className="hover:underline text-orange-900"
                >
                  Samtliga kurser i Sverige
                </Link>
              </li>
              <li>
                <Link
                  href="/om-oss"
                  className="hover:underline text-orange-900"
                >
                  Om oss
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="hover:underline text-orange-900"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="hover:underline text-orange-900"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
          {/* Right: Newsletter */}
          <div>
            <h4 className="text-base font-semibold text-orange-900 mb-2">
              Nyhetsbrev
            </h4>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Fyll i din e-postadress"
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white rounded px-4 py-2 text-sm font-semibold transition"
              >
                Anmäl dig
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} truckkort.se. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
