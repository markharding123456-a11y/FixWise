import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-fw-gray-800 text-fw-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">FixWise</h3>
            <p className="text-sm leading-relaxed">
              Smart fixes. Trusted pros. Practical DIY guides and experienced
              contractors for every home repair need.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides" className="hover:text-white transition-colors">
                  DIY Guides
                </Link>
              </li>
              <li>
                <Link href="/find-a-pro" className="hover:text-white transition-colors">
                  Find a Pro
                </Link>
              </li>
              <li>
                <Link href="/get-help" className="hover:text-white transition-colors">
                  Get Help
                </Link>
              </li>
              <li>
                <Link href="/for-contractors" className="hover:text-white transition-colors">
                  For Contractors
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Guide Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides?category=General+Repair" className="hover:text-white transition-colors">
                  General Repair
                </Link>
              </li>
              <li>
                <Link href="/guides?category=Water+%26+Mold" className="hover:text-white transition-colors">
                  Water &amp; Mold
                </Link>
              </li>
              <li>
                <Link href="/guides?category=Maintenance" className="hover:text-white transition-colors">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link href="/guides?category=Remodeling" className="hover:text-white transition-colors">
                  Remodeling
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-fw-gray-700 mt-8 pt-6 text-center text-sm text-fw-gray-400">
          &copy; {new Date().getFullYear()} FixWise. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
