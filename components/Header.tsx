'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Zap, Menu, X, User, LogOut, Settings, LayoutDashboard } from 'lucide-react'

interface SessionUser {
  id: string
  email: string
  name: string | null
  plan: string
}

export default function Header() {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/user/profile')
      .then(r => r.json())
      .then(d => { if (d.user) setUser(d.user) })
      .catch(() => {})
  }, [])

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/')
  }

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">Product AI Prompts</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Home</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Pricing</Link>
            {user && (
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Dashboard</Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {(user.name || user.email)[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm">{user.name || user.email.split('@')[0]}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <Link href="/dashboard" className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>
                      <LayoutDashboard className="w-4 h-4" /> <span>Dashboard</span>
                    </Link>
                    <Link href="/settings" className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>
                      <Settings className="w-4 h-4" /> <span>Settings</span>
                    </Link>
                    <button onClick={logout} className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4" /> <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
                <Link href="/auth/signup" className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Mulai Gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-3">
            <Link href="/" className="block py-2 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/pricing" className="block py-2 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Pricing</Link>
            {user ? (
              <>
                <Link href="/dashboard" className="block py-2 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link href="/settings" className="block py-2 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Settings</Link>
                <button onClick={logout} className="block py-2 text-red-600 font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block py-2 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link href="/auth/signup" className="block bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center" onClick={() => setMenuOpen(false)}>
                  Mulai Gratis
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
