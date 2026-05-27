'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, Trash2, AlertTriangle, CheckCircle } from 'lucide-react'

interface User {
  id: string
  name: string | null
  email: string
  role: string
  plan: string
  payment_status: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('creator')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    fetch('/api/user/profile')
      .then(r => r.json())
      .then(d => {
        if (d.user) {
          setUser(d.user)
          setName(d.user.name || '')
          setRole(d.user.role || 'creator')
        }
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    try {
      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      const res = await fetch('/api/user', { method: 'DELETE' })
      if (res.ok) router.push('/')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    )
  }

  const isPaid = user?.plan === 'monthly' || user?.plan === 'lifetime'

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        {/* Profile */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Profile</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-500 bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Email tidak bisa diubah</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
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
              disabled={saving}
              className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{saved ? 'Tersimpan!' : saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </form>
        </div>

        {/* Plan & Billing */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Plan & Billing</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
            <div>
              <p className="font-medium text-gray-900 capitalize">{user?.plan || 'Free'} Plan</p>
              <p className="text-gray-500 text-sm">{isPaid ? 'Active' : 'Upgrade for full access'}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${isPaid ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
              {isPaid ? 'Active' : 'Free'}
            </span>
          </div>
          {!isPaid && (
            <a href="/pricing" className="block w-full text-center bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              Upgrade to Paid Plan →
            </a>
          )}
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-red-100 p-6">
          <h2 className="text-lg font-bold text-red-700 mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Danger Zone</span>
          </h2>
          {!confirmDelete ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Delete Account</p>
                <p className="text-gray-500 text-sm">Hapus akun dan semua data Anda secara permanen</p>
              </div>
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex items-center space-x-1.5 border-2 border-red-200 text-red-600 px-4 py-2 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Akun</span>
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-medium mb-4">⚠️ Yakin ingin menghapus akun? Tindakan ini tidak bisa dibatalkan.</p>
              <div className="flex space-x-3">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center space-x-1.5 bg-red-600 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  <span>{deleting ? 'Menghapus...' : 'Ya, Hapus Akun'}</span>
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-600 font-medium text-sm hover:border-gray-300"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
