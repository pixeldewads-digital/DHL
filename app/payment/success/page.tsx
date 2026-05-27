'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }
    // Give webhook a moment to process then refresh user session
    setTimeout(() => setStatus('success'), 2000)
  }, [sessionId])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-gray-600">Memproses pembayaran Anda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Pembayaran Berhasil!</h1>
        <p className="text-gray-600 mb-8">
          Akun Anda sudah diupgrade. Selamat! Sekarang Anda bisa mengakses semua 18 pertanyaan dan generate AI report lengkap.
        </p>
        <div className="space-y-3">
          <Link href="/questionnaire" className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            <span>Mulai Questionnaire</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard" className="block w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:border-violet-300 transition-colors">
            Ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-violet-600" /></div>}>
      <SuccessContent />
    </Suspense>
  )
}
