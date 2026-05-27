import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    category: 'Product',
    items: [
      {
        q: 'Apa bedanya Product AI Prompts dengan ChatGPT biasa?',
        a: 'ChatGPT gratis tapi Anda harus tahu apa yang perlu ditanyakan. Product AI Prompts menyediakan framework lengkap 18 pertanyaan yang sudah terbukti (6 stage dari ideasi hingga positioning) + AI menganalisis jawaban Anda secara spesifik dan menghasilkan report personal — bukan output generic.',
      },
      {
        q: 'Berapa lama waktu yang dibutuhkan untuk mengisi questionnaire?',
        a: 'Rata-rata 20-30 menit untuk menyelesaikan semua 18 pertanyaan. Anda bisa menyimpan progress dan melanjutkan kapan saja — jawaban tersimpan otomatis.',
      },
      {
        q: 'Apa yang ada di dalam report?',
        a: 'Monthly plan mendapatkan: validation score (1-10), top 3 risks, top 3 opportunities, market size estimate, 30-day action plan, dan next critical step. Lifetime plan mendapatkan semua itu plus: mitigation strategies untuk setiap risk, tactics untuk setiap opportunity, competitive analysis (5 competitors), pricing strategy, dan go-to-market brief.',
      },
      {
        q: 'Bisakah saya retake questionnaire?',
        a: 'Ya! User berbayar bisa retake sebanyak yang diinginkan. Setiap retake menghasilkan report baru berdasarkan jawaban terbaru Anda. Monthly plan mendapatkan 5 validations per bulan; Lifetime plan mendapatkan unlimited.',
      },
      {
        q: 'Apakah report bisa didownload?',
        a: 'Ya, setiap report bisa didownload sebagai file PDF profesional langsung dari halaman report.',
      },
      {
        q: 'Bahasa apa yang didukung?',
        a: 'Pertanyaan dalam Bahasa Indonesia. Report dihasilkan dalam Bahasa Inggris untuk memastikan kualitas analisis AI terbaik (Claude AI lebih akurat dalam Bahasa Inggris). Kami berencana menambahkan dukungan laporan Bahasa Indonesia di masa mendatang.',
      },
    ],
  },
  {
    category: 'Pricing & Plans',
    items: [
      {
        q: 'Apa bedanya Monthly dan Lifetime plan?',
        a: 'Monthly ($10/bulan): 5 validations per bulan, basic report (score, risks, opportunities, action plan). Lifetime ($79 sekali bayar): unlimited validations seumur hidup, enhanced report dengan competitive analysis, pricing strategy, dan go-to-market brief, plus akses Discord community dan priority support.',
      },
      {
        q: 'Apakah ada free trial?',
        a: 'Ya. Anda bisa mendaftar gratis dan mencoba Stage 1 (3 pertanyaan pertama) tanpa biaya. Untuk mengakses Stage 2-6 dan mendapatkan AI report, Anda perlu upgrade ke plan berbayar.',
      },
      {
        q: 'Bagaimana cara upgrade dari Monthly ke Lifetime?',
        a: 'Anda bisa upgrade kapan saja dari halaman Pricing atau Dashboard. Pembayaran diproses via Stripe yang aman. Setelah upgrade, akun Anda langsung mendapatkan semua fitur Lifetime.',
      },
      {
        q: 'Kapan monthly limit direset?',
        a: 'Monthly limit direset setiap 30 hari dari tanggal berlangganan Anda. Sisa hari hingga reset ditampilkan di dashboard dan halaman questionnaire.',
      },
      {
        q: 'Apakah harga akan naik?',
        a: 'Kami menawarkan early-bird pricing saat ini. Harga bisa berubah seiring tambahnya fitur. User yang berlangganan sebelum perubahan harga akan tetap mendapatkan harga mereka (monthly) atau tidak terdampak (lifetime).',
      },
    ],
  },
  {
    category: 'Payment & Billing',
    items: [
      {
        q: 'Metode pembayaran apa yang diterima?',
        a: 'Kami menerima semua kartu kredit/debit utama (Visa, Mastercard, Amex) melalui Stripe. Stripe adalah payment processor yang aman dan terpercaya digunakan jutaan bisnis di seluruh dunia.',
      },
      {
        q: 'Apakah data kartu saya aman?',
        a: 'Kami tidak pernah menyimpan detail kartu Anda. Semua transaksi diproses langsung oleh Stripe dengan enkripsi tingkat bank. Kami hanya menerima konfirmasi pembayaran dari Stripe.',
      },
      {
        q: 'Bisakah saya cancel subscription kapan saja?',
        a: 'Ya, subscription bulanan bisa dibatalkan kapan saja tanpa penalti. Akses tetap aktif hingga akhir periode billing yang sudah dibayar.',
      },
      {
        q: 'Apakah ada refund?',
        a: 'Ya, kami menawarkan 30-day money-back guarantee. Jika Anda tidak puas dalam 30 hari pertama, hubungi kami di support@productaiprompts.com dan kami akan proses refund penuh tanpa pertanyaan.',
      },
      {
        q: 'Apakah saya akan mendapatkan receipt/invoice?',
        a: 'Ya. Stripe mengirimkan receipt otomatis ke email Anda setelah setiap pembayaran. Anda juga bisa mengakses invoice history melalui Stripe portal.',
      },
    ],
  },
  {
    category: 'Privacy & Data',
    items: [
      {
        q: 'Data apa yang Anda kumpulkan?',
        a: 'Kami mengumpulkan: email address, nama (opsional), jawaban questionnaire, dan informasi pembayaran yang diproses oleh Stripe. Kami tidak mengumpulkan data yang tidak diperlukan untuk menjalankan layanan.',
      },
      {
        q: 'Apakah jawaban questionnaire saya dibagikan ke pihak lain?',
        a: 'Tidak. Jawaban Anda bersifat private dan hanya digunakan untuk menghasilkan report Anda sendiri. Kami tidak menjual, menyewakan, atau membagikan data Anda ke pihak ketiga manapun.',
      },
      {
        q: 'Bagaimana cara menghapus akun saya?',
        a: 'Kirim email ke support@productaiprompts.com dengan subject "Delete Account". Kami akan menghapus semua data Anda dalam 7 hari kerja. Jika Anda memiliki active subscription, kami akan membatalkannya dan memproses refund jika applicable.',
      },
    ],
  },
  {
    category: 'Technical',
    items: [
      {
        q: 'Browser apa yang didukung?',
        a: 'Product AI Prompts bekerja di semua browser modern: Chrome, Firefox, Safari, Edge. Kami merekomendasikan Chrome atau Safari untuk pengalaman terbaik.',
      },
      {
        q: 'Apakah bisa digunakan di mobile?',
        a: 'Ya, aplikasi fully responsive dan bisa digunakan di smartphone atau tablet. Namun untuk pengalaman terbaik saat mengisi questionnaire yang panjang, kami merekomendasikan desktop.',
      },
      {
        q: 'Apakah progress tersimpan jika saya menutup browser?',
        a: 'Ya. Jawaban Anda tersimpan otomatis setiap 30 detik ke server, dan juga tersimpan di browser lokal. Anda bisa menutup browser dan melanjutkan kapan saja.',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-violet-600 to-blue-600 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-white/80 text-lg">
            Tidak menemukan jawaban yang Anda cari?{' '}
            <a href="mailto:support@productaiprompts.com" className="underline hover:text-white">
              Hubungi kami
            </a>
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {FAQS.map((section) => (
          <div key={section.category} className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <details key={i} className="group bg-white rounded-xl border border-gray-100 shadow-sm">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-medium text-gray-900 pr-4">{item.q}</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-8 text-center text-white mt-8">
          <h3 className="text-xl font-bold mb-2">Masih ada pertanyaan?</h3>
          <p className="text-white/80 mb-5">Tim kami siap membantu dalam 24 jam kerja.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@productaiprompts.com"
              className="bg-white text-violet-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Email Support
            </a>
            <Link
              href="/auth/signup"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors"
            >
              Coba Gratis
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
