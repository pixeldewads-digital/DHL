'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Mail, CheckCircle, Loader2 } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('creator')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [devLink, setDevLink] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }

      if (data.devMagicLink) setDevLink(data.devMagicLink)
      setSent(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-9 h-9 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Cek Email Anda!</h1>
          <p className="text-gray-600 mb-2">
            Kami sudah kirim magic link ke <strong>{email}</strong>
          </p>
          <p className="text-gray-500 text-sm mb-6">Klik link di email untuk login. Link berlaku 15 menit.</p>
          {devLink && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-left">
              <p className="text-xs text-yellow-700 font-bold mb-1">DEV MODE — Magic Link:</p>
              <a href={devLink} className="text-xs text-blue-600 break-all underline">{devLink}</a>
            </div>
          )}
          <Link href="/" className="mt-4 block text-violet-600 hover:text-violet-700 font-medium">
            Kembali ke Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Buat Akun Gratis</h1>
          <p className="text-gray-600 mt-1">Mulai validasi ide produk Anda hari ini</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl p-4 mb-6 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama (opsional)</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nama Anda"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Saya adalah</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'creator', label: 'Creator' },
                { value: 'founder', label: 'Founder' },
                { value: 'seller', label: 'Seller' },
              ].map(r => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${
                    role === r.value
                      ? 'border-violet-600 bg-violet-50 text-violet-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3.5 rounded-xl font-semibold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /><span>Mengirim...</span></>
            ) : (
              <span>Kirim Magic Link</span>
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Sudah punya akun?{' '}
          <Link href="/auth/login" className="text-violet-600 hover:text-violet-700 font-medium">
            Login
          </Link>
        </p>
        <p className="text-center text-gray-400 text-xs mt-4 leading-relaxed">
          Dengan mendaftar, Anda menyetujui{' '}
          <Link href="/terms" className="underline hover:text-gray-600">Terms of Service</Link>
          {' '}dan{' '}
          <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>{' '}kami.
        </p>
      </div>
    </div>
  )
}
