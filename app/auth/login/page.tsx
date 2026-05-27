'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Zap, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Suspense } from 'react'

function LoginContent() {
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [devLink, setDevLink] = useState('')

  const errorMessages: Record<string, string> = {
    invalid_token: 'Link sudah tidak valid. Minta link baru.',
    expired_token: 'Link sudah expired. Minta link baru.',
    missing_token: 'Link tidak lengkap. Minta link baru.',
    user_not_found: 'Akun tidak ditemukan.',
    server_error: 'Server error. Coba lagi.',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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
          <p className="text-gray-600 mb-2">Magic link dikirim ke <strong>{email}</strong></p>
          <p className="text-gray-500 text-sm">Link berlaku 15 menit.</p>
          {devLink && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-left">
              <p className="text-xs text-yellow-700 font-bold mb-1">DEV MODE — Magic Link:</p>
              <a href={devLink} className="text-xs text-blue-600 break-all underline">{devLink}</a>
            </div>
          )}
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
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="text-gray-600 mt-1">Masukkan email Anda, kami kirim magic link</p>
        </div>

        {errorParam && errorMessages[errorParam] && (
          <div className="flex items-center space-x-2 bg-red-50 text-red-600 rounded-xl p-4 mb-6 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessages[errorParam]}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl p-4 mb-6 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
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
          Belum punya akun?{' '}
          <Link href="/auth/signup" className="text-violet-600 hover:text-violet-700 font-medium">
            Daftar Gratis
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full" /></div>}>
      <LoginContent />
    </Suspense>
  )
}
