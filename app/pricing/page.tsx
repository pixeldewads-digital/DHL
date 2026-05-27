import Link from 'next/link'
import { CheckCircle, Star, Zap, ArrowRight } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-blue-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Investasi kecil untuk validasi ide yang bisa menghemat berbulan-bulan wasted effort
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Free</h3>
              <p className="text-gray-500 text-sm mb-4">Try before you buy</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">$0</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                'Stage 1 questions (3 pertanyaan)',
                'Email magic link login',
                'Save progress',
              ].map((f, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{f}</span>
                </li>
              ))}
              {[
                'Full 18 questions',
                'AI report',
                'PDF download',
              ].map((f, i) => (
                <li key={i} className="flex items-start space-x-2 opacity-40">
                  <CheckCircle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm line-through">{f}</span>
                </li>
              ))}
            </ul>
            <Link href="/auth/signup" className="block w-full text-center border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:border-gray-400 transition-colors">
              Mulai Gratis
            </Link>
          </div>

          {/* Monthly */}
          <div className="bg-white rounded-2xl border-2 border-violet-200 p-8 shadow-lg">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-1 bg-violet-100 text-violet-700 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                <Zap className="w-3 h-3" />
                <span>POPULAR</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Monthly</h3>
              <p className="text-gray-500 text-sm mb-4">Untuk yang baru mulai</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">$10</span>
                <span className="text-gray-500 ml-2">/bulan</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                '18 pertanyaan full access',
                'AI report lengkap',
                'Validation score (1-10)',
                'Top 3 risks & opportunities',
                'Market size estimate',
                '30-day action plan',
                'Download PDF',
                'Unlimited retakes',
              ].map((f, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <Link href="/auth/signup?plan=monthly" className="block w-full text-center bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              Mulai Monthly
            </Link>
          </div>

          {/* Lifetime */}
          <div className="bg-gradient-to-br from-violet-900 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="mb-6 relative">
              <div className="inline-flex items-center space-x-1 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                <Star className="w-3 h-3" />
                <span>BEST VALUE</span>
              </div>
              <h3 className="text-lg font-bold mb-1">Lifetime</h3>
              <p className="text-white/70 text-sm mb-4">Bayar sekali, pakai selamanya</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-white/70 ml-2">sekali bayar</span>
              </div>
              <p className="text-white/60 text-xs mt-1">≈ $10 × 8 bulan, tapi selamanya!</p>
            </div>
            <ul className="space-y-3 mb-8 relative">
              {[
                'Semua fitur Monthly',
                'Akses seumur hidup',
                'Semua future updates',
                'Priority support',
                'Community Discord access',
                'Early access new features',
              ].map((f, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <Link href="/auth/signup?plan=lifetime" className="block w-full text-center bg-white text-violet-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors relative">
              Get Lifetime Access
            </Link>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Kata User Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Andi P.', role: 'Founder', text: 'ROI langsung — report AI-nya menyelamatkan saya dari membangun produk yang tidak ada market-nya.' },
              { name: 'Sarah W.', role: 'Online Seller', text: 'Dalam 2 jam saya tahu apakah ide saya layak. Worth every penny!' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-700 mb-4">"{t.text}"</p>
                <p className="font-bold text-gray-900">{t.name} <span className="text-gray-500 font-normal text-sm">· {t.role}</span></p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">FAQ</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { q: 'Apakah ada refund?', a: 'Ya, kami menawarkan 7-day money back guarantee jika Anda tidak puas.' },
              { q: 'Apakah harga bisa berubah?', a: 'Harga lifetime terkunci untuk Anda selamanya. Harga baru hanya untuk member baru.' },
              { q: 'Bagaimana cara pembayaran?', a: 'Kami menerima semua kartu kredit/debit via Stripe. Aman dan terenkripsi.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/auth/signup" className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg">
            <span>Mulai Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-500 text-sm mt-3">Tidak perlu kartu kredit untuk trial</p>
        </div>
      </div>
    </div>
  )
}
