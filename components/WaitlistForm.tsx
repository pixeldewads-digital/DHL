'use client'

import { useState } from 'react'
import { Loader2, Mail, User, CheckCircle } from 'lucide-react'
import { UserRole, CurrentTool, ReferralSource } from '@/lib/types/waitlist'

interface FormData {
  email: string
  first_name: string
  role: UserRole | ''
  current_tool: CurrentTool | ''
  pain_level: number
  referral_source: ReferralSource | ''
}

export default function WaitlistForm() {
  const [form, setForm] = useState<FormData>({
    email: '',
    first_name: '',
    role: '',
    current_tool: '',
    pain_level: 7,
    referral_source: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ position: number; alreadyExists: boolean } | null>(null)

  function set<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/waitlist/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          role: form.role || undefined,
          current_tool: form.current_tool || undefined,
          referral_source: form.referral_source || undefined,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Terjadi kesalahan')
        return
      }

      setResult({ position: data.position, alreadyExists: data.alreadyExists })
    } catch {
      setError('Network error. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-9 h-9 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {result.alreadyExists ? 'Kamu sudah terdaftar!' : 'Berhasil masuk waitlist! 🎉'}
        </h2>
        <p className="text-gray-500 mb-4">Posisi kamu di waitlist:</p>
        <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-xl p-6 mb-6">
          <div className="text-5xl font-bold text-violet-600">#{result.position}</div>
        </div>
        {!result.alreadyExists && (
          <p className="text-sm text-gray-500">
            Cek email kamu untuk konfirmasi. Kami akan kirim beta invite saat slot tersedia.
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Daftar Early Access</h2>
      <p className="text-gray-500 text-sm mb-6">
        Dapatkan harga spesial yang dikunci selamanya untuk early users.
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 rounded-xl p-3 mb-4 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              required
              value={form.first_name}
              onChange={e => set('first_name', e.target.value)}
              placeholder="Nama kamu"
              className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              required
              value={form.email}
              onChange={e => set('email', e.target.value)}
              placeholder="email@example.com"
              className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kamu seorang</label>
          <div className="grid grid-cols-3 gap-2">
            {(['Creator', 'Founder', 'Online Seller'] as UserRole[]).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => set('role', r)}
                className={`py-2 rounded-xl border-2 text-xs font-medium transition-all ${
                  form.role === r
                    ? 'border-violet-600 bg-violet-50 text-violet-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seberapa stuck kamu menemukan ide produk yang laku?
          </label>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Biasa</span>
            <input
              type="range"
              min={1}
              max={10}
              value={form.pain_level}
              onChange={e => set('pain_level', Number(e.target.value))}
              className="flex-1 accent-violet-600"
            />
            <span className="text-xs text-gray-400">Banget</span>
            <span className="text-sm font-semibold text-violet-600 w-6 text-right">
              {form.pain_level}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tool yang kamu pakai sekarang (opsional)
          </label>
          <select
            value={form.current_tool}
            onChange={e => set('current_tool', e.target.value as CurrentTool | '')}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Pilih...</option>
            <option value="ChatGPT">ChatGPT</option>
            <option value="Notion">Notion</option>
            <option value="Manual Research">Manual Research</option>
            <option value="YouTube/Courses">YouTube/Courses</option>
            <option value="Other">Lainnya</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tahu Product AI Prompts dari mana? (opsional)
          </label>
          <select
            value={form.referral_source}
            onChange={e => set('referral_source', e.target.value as ReferralSource | '')}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Pilih...</option>
            <option value="Twitter/X">Twitter/X</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="Reddit">Reddit</option>
            <option value="Google">Google</option>
            <option value="Friend">Teman</option>
            <option value="Other">Lainnya</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !form.email || !form.first_name}
          className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /><span>Mendaftar...</span></>
          ) : (
            'Daftar Early Access — Gratis'
          )}
        </button>

        <p className="text-center text-gray-400 text-xs">
          Tidak ada spam. Hanya update tentang launch dan beta invite.
        </p>
      </form>
    </div>
  )
}
