import Link from 'next/link'
import { CheckCircle, Zap, Target, TrendingUp, Star, ArrowRight, Clock, Users, BarChart3 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-blue-50 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-violet-100 text-violet-700 rounded-full px-4 py-1.5 mb-6 text-sm font-medium">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Product Validation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Temukan Ide Produk{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
              Winning
            </span>{' '}
            dalam 2 Minggu
            <br />
            <span className="text-3xl md:text-5xl text-gray-600">(Bukan 2 Bulan)</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Sistem validasi AI interaktif yang digunakan 100+ creators. Jawab 18 pertanyaan, dapatkan report personal dengan validation score, risks, opportunities, dan 30-day action plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-violet-200"
            >
              <span>Mulai Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-violet-300 hover:text-violet-700 transition-all"
            >
              <span>Lihat Pricing</span>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Setup in 2 minutes</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>AI-powered insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Product AI Prompts?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stop wasting months building products nobody wants. Validasi dulu, build kemudian.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-7 h-7 text-violet-600" />,
                title: 'Structured Validation Framework',
                desc: '18 pertanyaan across 6 stages yang dirancang oleh product experts. Dari ideasi hingga positioning.',
                color: 'violet',
              },
              {
                icon: <Zap className="w-7 h-7 text-blue-600" />,
                title: 'AI-Powered Analysis',
                desc: 'Claude AI menganalisis jawaban Anda dan memberikan personalized report dengan validation score 1-10.',
                color: 'blue',
              },
              {
                icon: <TrendingUp className="w-7 h-7 text-green-600" />,
                title: '30-Day Action Plan',
                desc: 'Bukan cuma insight, tapi actionable plan. Tahu persis langkah apa yang harus dilakukan minggu ini.',
                color: 'green',
              },
            ].map((b, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 rounded-xl bg-${b.color}-50 flex items-center justify-center mb-5`}>
                  {b.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{b.title}</h3>
                <p className="text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-br from-violet-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cara Kerjanya</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Sign Up', desc: 'Buat akun gratis dengan email Anda' },
              { step: '02', title: 'Jawab 18 Pertanyaan', desc: '6 stages, 3 pertanyaan per stage' },
              { step: '03', title: 'AI Analisis', desc: 'Claude AI menganalisis jawaban Anda' },
              { step: '04', title: 'Terima Report', desc: 'Score, risks, opportunities & action plan' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{s.step}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kata Mereka</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Andi Pratama',
                role: 'Founder, TechStartup ID',
                text: 'Dalam 2 jam saya sudah tahu apakah ide saya layak atau tidak. Report-nya sangat detail dan actionable. Hemat 3 bulan wasted effort!',
                score: 5,
              },
              {
                name: 'Sarah Wijaya',
                role: 'Online Seller, Tokopedia',
                text: 'Validation score saya 8/10 dan ada 3 opportunities yang belum saya pikirkan. Langsung eksekusi dan revenue naik 40% dalam sebulan.',
                score: 5,
              },
              {
                name: 'Budi Santoso',
                role: 'Content Creator, YouTube',
                text: 'Pertanyaan-pertanyaannya sangat tajam. Membuat saya berpikir lebih dalam tentang masalah yang ingin saya selesaikan. Highly recommended!',
                score: 5,
              },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(t.score)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-br from-violet-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pricing Simpel</h2>
            <p className="text-lg text-gray-600">Pilih plan yang sesuai kebutuhan Anda</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-xl font-bold mb-2">Monthly</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">$10</span>
                <span className="text-gray-500 ml-2">/bulan</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['18 pertanyaan full access', 'AI report lengkap', 'Download PDF', 'Email report', 'Unlimited retakes'].map((f, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup" className="block w-full text-center border-2 border-violet-600 text-violet-600 py-3 rounded-xl font-semibold hover:bg-violet-50 transition-colors">
                Mulai Monthly
              </Link>
            </div>
            <div className="bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</div>
              <h3 className="text-xl font-bold mb-2">Lifetime</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-white/80 ml-2">sekali bayar</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Semua fitur Monthly', 'Akses seumur hidup', 'Semua update future', 'Priority support', 'Community Discord access'].map((f, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-white/90">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup" className="block w-full text-center bg-white text-violet-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                Get Lifetime Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">FAQ</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: 'Apa bedanya free trial dengan plan berbayar?',
                a: 'Free trial hanya bisa menjawab 3 pertanyaan pertama (Stage 1). Untuk full 18 pertanyaan dan mendapatkan AI report, perlu upgrade ke plan berbayar.',
              },
              {
                q: 'Berapa lama proses generate report?',
                a: 'Setelah submit, AI akan memproses jawaban Anda dalam 10-30 detik. Hasilnya langsung bisa dilihat di halaman report.',
              },
              {
                q: 'Apakah bisa retake questionnaire?',
                a: 'Ya! User berbayar bisa retake sebanyak yang diinginkan. Setiap retake akan generate report baru berdasarkan jawaban terbaru.',
              },
              {
                q: 'Apakah data saya aman?',
                a: 'Data Anda disimpan secara terenkripsi di Supabase. Kami tidak menjual atau membagikan data Anda ke pihak ketiga.',
              },
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-violet-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Validasi Ide Produk Anda?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Bergabung dengan 100+ creators yang sudah menggunakan Product AI Prompts
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center space-x-2 bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-xl"
          >
            <span>Mulai Gratis Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
