import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg">Product AI Prompts</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Validasi ide produk Anda dalam 2 minggu dengan AI. Untuk creators, founders, dan online sellers.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/auth/signup" className="hover:text-white transition-colors">Get Started</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/auth/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/settings" className="hover:text-white transition-colors">Settings</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p>© {new Date().getFullYear()} Product AI Prompts. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
