import Link from 'next/link'
import { CheckCircle, X, Star, Zap, ArrowRight, Infinity } from 'lucide-react'

const MONTHLY_FEATURES = [
  '5 validations per month',
  'Full 18-question questionnaire',
  'AI validation score (1-10)',
  'Top 3 risks & opportunities',
  'Market size estimate',
  '30-day action plan',
  'PDF download',
  'Email support (24-48h)',
]

const MONTHLY_LOCKED = [
  'Risk mitigation strategies',
  'Opportunity tactics',
  'Competitive analysis (5 competitors)',
  'Pricing strategy',
  'Go-to-market brief',
  'Discord community',
  'Priority support',
]

const LIFETIME_FEATURES = [
  'Unlimited validations',
  'Everything in Monthly, PLUS:',
  'Enhanced reports (8-10 pages)',
  'Detailed risk mitigation strategies',
  'Actionable opportunity tactics',
  'Competitive analysis (5 competitors)',
  'Pricing strategy & revenue projections',
  'Go-to-market brief (1-page)',
  'Private Discord community',
  'Monthly expert Q&A',
  'Priority support (12-24h)',
  'All future updates & features',
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-blue-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Investasi kecil untuk validasi ide yang bisa menghemat berbulan-bulan wasted effort
          </p>
        </div>

        {/* Pricing grid */}
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
              {['Stage 1 only (3 questions)', 'Email magic link login', 'Save progress'].map((f, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{f}</span>
                </li>
              ))}
              {['Full questionnaire', 'AI report', 'PDF download'].map((f, i) => (
                <li key={i} className="flex items-start space-x-2 opacity-50">
                  <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
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
              <p className="text-gray-400 text-xs mt-1">5 validations per month</p>
            </div>
            <ul className="space-y-3 mb-4">
              {MONTHLY_FEATURES.map((f, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-3 mb-8">
              {MONTHLY_LOCKED.map((f, i) => (
                <li key={i} className="flex items-start space-x-2 opacity-40">
                  <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm line-through">{f}</span>
                </li>
              ))}
            </ul>
            <Link href="/auth/signup?plan=monthly" className="block w-full text-center bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              Mulai Monthly
            </Link>
          </div>

          {/* Lifetime */}
          <div className="bg-gradient-to-br from-violet-900 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="mb-6 relative">
              <div className="inline-flex items-center space-x-1 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                <Star className="w-3 h-3 fill-white" />
                <span>BEST VALUE</span>
              </div>
              <h3 className="text-lg font-bold mb-1">Lifetime</h3>
              <p className="text-white/70 text-sm mb-4">Bayar sekali, pakai selamanya</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-white/70 ml-2">sekali bayar</span>
              </div>
              <div className="flex items-center space-x-1.5 mt-1">
                <Infinity className="w-3.5 h-3.5 text-white/60" />
                <p className="text-white/60 text-xs">Unlimited validations forever</p>
              </div>
            </div>
            <ul className="space-y-3 mb-8 relative">
              {LIFETIME_FEATURES.map((f, i) => (
                <li key={i} className={`flex items-start space-x-2 ${i === 1 ? 'pt-1' : ''}`}>
                  <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${i === 1 ? 'opacity-0' : 'text-white/80'}`} />
                  <span className={`text-sm ${i === 1 ? 'text-white/50 font-semibold uppercase text-xs tracking-wide' : 'text-white/90'}`}>{f}</span>
                </li>
              ))}
            </ul>
            <Link href="/auth/signup?plan=lifetime" className="block w-full text-center bg-white text-violet-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors relative">
              Get Lifetime Access · $79
            </Link>
          </div>
        </div>

        {/* Comparison table */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-16 overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Feature Comparison</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 text-gray-500 font-medium w-1/2">Feature</th>
                <th className="text-center py-3 text-gray-700 font-bold">Monthly</th>
                <th className="text-center py-3 text-violet-700 font-bold">Lifetime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                ['Validations per month', '5', 'Unlimited'],
                ['18-question questionnaire', '✓', '✓'],
                ['AI validation score', '✓', '✓'],
                ['Risks & opportunities', '✓', '✓'],
                ['Market size estimate', 'Basic', 'TAM/SAM/SOM'],
                ['30-day action plan', '✓', 'Enhanced'],
                ['Risk mitigation strategies', '✗', '✓'],
                ['Opportunity tactics', '✗', '✓'],
                ['Competitive analysis', '✗', '5 competitors'],
                ['Pricing strategy', '✗', '✓'],
                ['Go-to-market brief', '✗', '✓'],
                ['PDF download', '✓', '✓'],
                ['Discord community', '✗', '✓'],
                ['Support response time', '24-48h', '12-24h'],
                ['Future updates', 'Current only', 'All included'],
              ].map(([feature, monthly, lifetime], i) => (
                <tr key={i}>
                  <td className="py-3 text-gray-700">{feature}</td>
                  <td className="py-3 text-center text-gray-500">{monthly === '✓' ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : monthly === '✗' ? <X className="w-4 h-4 text-gray-300 mx-auto" /> : monthly}</td>
                  <td className="py-3 text-center text-violet-700 font-medium">{lifetime === '✓' ? <CheckCircle className="w-4 h-4 text-violet-500 mx-auto" /> : lifetime === '✗' ? <X className="w-4 h-4 text-gray-300 mx-auto" /> : lifetime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Kata User Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Andi P.', role: 'Founder', plan: 'Lifetime', text: 'Report-nya 8 halaman penuh dengan competitive analysis dan pricing strategy. Ini setara dengan hiring consultant seharga jutaan rupiah.' },
              { name: 'Sarah W.', role: 'Online Seller', plan: 'Monthly', text: 'Dengan 5 validasi per bulan, saya bisa test berbagai angle dari ide yang sama. Sudah 3 bulan pakai dan revenue naik 40%.' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                  <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">{t.plan}</span>
                </div>
                <p className="text-gray-700 mb-4 text-sm">&ldquo;{t.text}&rdquo;</p>
                <p className="font-bold text-gray-900 text-sm">{t.name} <span className="text-gray-500 font-normal">· {t.role}</span></p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">FAQ</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { q: 'Apakah ada refund?', a: 'Ya, kami menawarkan 7-day money back guarantee jika tidak puas.' },
              { q: 'Apa bedanya basic vs enhanced report?', a: 'Basic (Monthly): validation score, risks, opportunities, action plan. Enhanced (Lifetime): semua di basic + risk mitigation strategies, opportunity tactics, competitive analysis 5 kompetitor, pricing strategy, dan go-to-market brief.' },
              { q: 'Apakah monthly limit reset otomatis?', a: 'Ya, limit 5 validasi reset otomatis setiap 30 hari dari tanggal pertama kali Anda menggunakan.' },
              { q: 'Bagaimana cara pembayaran?', a: 'Kami menerima semua kartu kredit/debit via Stripe. Aman dan terenkripsi.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

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
