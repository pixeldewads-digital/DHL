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
/**
 * Landing Page with Integrated Waitlist Form
 * File: app/page.tsx
 * 
 * Shows how to integrate <WaitlistForm /> into your landing page
 * with compelling copy and clear CTAs
 */

'use client';

import { WaitlistForm } from '@/components/WaitlistForm';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">PulseCheck</div>
          <div className="flex gap-4">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a href="#waitlist" className="text-gray-600 hover:text-gray-900">
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
              Standup meetings without the meeting
            </h1>

            <p className="text-xl text-gray-600">
              Replace daily standups with async status updates. Save your team 2+ hours per week.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-gray-900">Context switching kills productivity</p>
                  <p className="text-gray-600 text-sm">Let your team focus on deep work</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-gray-900">Trust beats surveillance</p>
                  <p className="text-gray-600 text-sm">Get visibility without micromanaging</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-gray-900">Built for distributed teams</p>
                  <p className="text-gray-600 text-sm">Works across timezones, not against them</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Beta launching soon. Join the waitlist for early access.
              </p>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-600">Dashboard preview coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600">Simple, lightweight, no learning curve</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Answer 5 questions</h3>
              <p className="text-gray-600">
                "What did you work on?" "Any blockers?" Takes 2 minutes max.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="text-4xl mb-4">👁️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Get visibility</h3>
              <p className="text-gray-600">
                See what everyone's working on without meetings. Searchable archive.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Save time</h3>
              <p className="text-gray-600">
                2+ hours per week per manager. That's your team's focus time back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The problem with standups</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <h3 className="font-semibold text-gray-900 mb-2">Context switching</h3>
              <p className="text-gray-600">
                Pulling engineers out of deep work for a 15-min standup kills focus. It takes 23 minutes to regain deep focus.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <h3 className="font-semibold text-gray-900 mb-2">Time waste</h3>
              <p className="text-gray-600">
                A 10-person team spends 2.5 hours per week on standups. What if that was 10 hours of focused work instead?
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <h3 className="font-semibold text-gray-900 mb-2">Async-unfriendly</h3>
              <p className="text-gray-600">
                Daily standups don't work for distributed teams across timezones. Someone's always joining at 6am or 10pm.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <h3 className="font-semibold text-gray-900 mb-2">No searchability</h3>
              <p className="text-gray-600">
                "Wait, what was that decision from 2 weeks ago?" Standups aren't searchable. Slack threads get buried.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA Section */}
      <section id="waitlist" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Join the beta</h2>
            <p className="text-xl text-blue-100">
              Be among the first to experience standup-free status updates.
              Early access, forever pricing, direct support.
            </p>
          </div>

          {/* Waitlist Form - Main CTA */}
          <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-2xl">
            <WaitlistForm />
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-blue-100">
              ✨ We'll email you when beta is ready. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Who's using PulseCheck</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-4">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Replaced our daily standup meetings. Saved 2 hours per week and our team loves the async-first approach."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">Sarah Chen</p>
                  <p className="text-gray-600 text-xs">Engineering Manager, 12-person team</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-4">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Perfect for distributed teams. No more awkward 6am or 10pm standups. Everyone gives updates when it works for them."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-200 rounded-full" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">Marcus Wong</p>
                  <p className="text-gray-600 text-xs">CTO, distributed 25-person team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Common questions
          </h2>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <details className="border border-gray-200 rounded-lg p-6 cursor-pointer group">
              <summary className="font-semibold text-gray-900 flex justify-between items-center">
                How long does it take to set up?
                <span className="group-open:rotate-180 transition">↓</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Less than 5 minutes. Add your team, set the daily prompt time, and you're done. People can start updating immediately.
              </p>
            </details>

            {/* FAQ 2 */}
            <details className="border border-gray-200 rounded-lg p-6 cursor-pointer group">
              <summary className="font-semibold text-gray-900 flex justify-between items-center">
                What about meetings we actually need?
                <span className="group-open:rotate-180 transition">↓</span>
              </summary>
              <p className="text-gray-600 mt-4">
                PulseCheck replaces daily standups, not all meetings. Use it for routine status syncs. Keep meetings for decisions, planning, and complex discussions.
              </p>
            </details>

            {/* FAQ 3 */}
            <details className="border border-gray-200 rounded-lg p-6 cursor-pointer group">
              <summary className="font-semibold text-gray-900 flex justify-between items-center">
                How much does it cost?
                <span className="group-open:rotate-180 transition">↓</span>
              </summary>
              <p className="text-gray-600 mt-4">
                We're still finalizing pricing. Beta users get early bird pricing locked in for life. Sign up to be among the first!
              </p>
            </details>

            {/* FAQ 4 */}
            <details className="border border-gray-200 rounded-lg p-6 cursor-pointer group">
              <summary className="font-semibold text-gray-900 flex justify-between items-center">
                Can we integrate with Slack?
                <span className="group-open:rotate-180 transition">↓</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Yes! We're building Slack integration for on-demand prompts. Beta users will get this feature.
              </p>
            </details>

            {/* FAQ 5 */}
            <details className="border border-gray-200 rounded-lg p-6 cursor-pointer group">
              <summary className="font-semibold text-gray-900 flex justify-between items-center">
                Is data secure?
                <span className="group-open:rotate-180 transition">↓</span>
              </summary>
              <p className="text-gray-600 mt-4">
                100%. We use industry-standard encryption, SOC 2 compliance (coming soon), and never sell your data. Your team's updates are yours alone.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to save your team's time?</h2>
          <p className="text-xl text-gray-300">
            Join 2,000+ managers building async-first teams
          </p>
          <a
            href="#waitlist"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Join Waitlist Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <p className="font-semibold text-white mb-2">PulseCheck</p>
            <p className="text-sm">Standup meetings without the meeting</p>
          </div>
          <div className="text-right space-y-2">
            <div className="flex gap-4 justify-end">
              <a href="https://twitter.com" className="hover:text-white transition">
                Twitter
              </a>
              <a href="mailto:hi@pulsecheck.com" className="hover:text-white transition">
                Email
              </a>
            </div>
            <p className="text-xs">© 2026 PulseCheck. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
