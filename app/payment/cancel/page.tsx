import Link from 'next/link'
import { XCircle, ArrowLeft } from 'lucide-react'

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Pembayaran Dibatalkan</h1>
        <p className="text-gray-600 mb-8">
          Tidak apa-apa! Anda bisa upgrade kapan saja untuk mengakses fitur lengkap.
        </p>
        <div className="space-y-3">
          <Link href="/pricing" className="block w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Lihat Pricing Lagi
          </Link>
          <Link href="/questionnaire" className="flex items-center justify-center space-x-2 w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:border-violet-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Questionnaire</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
