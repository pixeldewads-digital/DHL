import Link from 'next/link'

const LAST_UPDATED = '27 Mei 2026'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-violet-600 to-blue-600 py-12 px-4">
        <div className="max-w-3xl mx-auto text-white">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-white/70 text-sm">Terakhir diperbarui: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 prose prose-gray max-w-none">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Pendahuluan</h2>
            <p className="text-gray-600 leading-relaxed">
              Product AI Prompts (&quot;kami&quot;, &quot;layanan kami&quot;) berkomitmen untuk melindungi privasi Anda.
              Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi
              pribadi Anda saat menggunakan layanan kami di productaiprompts.com.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Dengan menggunakan layanan kami, Anda menyetujui kebijakan ini. Jika Anda tidak setuju,
              mohon hentikan penggunaan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Data yang Kami Kumpulkan</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Data yang Anda berikan langsung:</h3>
                <ul className="text-gray-600 space-y-1 text-sm list-disc list-inside">
                  <li>Alamat email (required untuk akun)</li>
                  <li>Nama (opsional)</li>
                  <li>Role/profesi (creator, founder, atau seller)</li>
                  <li>Jawaban questionnaire validasi produk Anda</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Data yang dikumpulkan otomatis:</h3>
                <ul className="text-gray-600 space-y-1 text-sm list-disc list-inside">
                  <li>Log akses (waktu, halaman yang dikunjungi)</li>
                  <li>Informasi browser dan device (untuk kompatibilitas)</li>
                  <li>Alamat IP (untuk keamanan dan analitik agregat)</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Data pembayaran:</h3>
                <p className="text-gray-600 text-sm">
                  Informasi kartu kredit/debit diproses langsung oleh <strong>Stripe</strong> — kami{' '}
                  <strong>tidak pernah menyimpan</strong> detail kartu Anda di server kami.
                  Kami hanya menerima konfirmasi pembayaran berhasil/gagal dari Stripe.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Bagaimana Kami Menggunakan Data Anda</h2>
            <p className="text-gray-600 leading-relaxed mb-3">Kami menggunakan data Anda untuk:</p>
            <ul className="text-gray-600 space-y-2 text-sm list-disc list-inside">
              <li>Mengirimkan magic link untuk login ke akun Anda</li>
              <li>Menghasilkan AI report validasi produk yang dipersonalisasi</li>
              <li>Memproses dan mengelola pembayaran subscription</li>
              <li>Mengirimkan email konfirmasi pembayaran dan update layanan</li>
              <li>Merespons pertanyaan atau permintaan support Anda</li>
              <li>Meningkatkan kualitas layanan berdasarkan pola penggunaan anonim</li>
              <li>Mematuhi kewajiban hukum yang berlaku</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Berbagi Data dengan Pihak Ketiga</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Kami <strong>tidak menjual, menyewakan, atau memperdagangkan</strong> data pribadi Anda.
              Kami hanya membagikan data yang diperlukan kepada penyedia layanan tepercaya berikut:
            </p>
            <div className="space-y-3">
              {[
                { name: 'Supabase', purpose: 'Database hosting dan penyimpanan data', link: 'https://supabase.com/privacy' },
                { name: 'Stripe', purpose: 'Pemrosesan pembayaran', link: 'https://stripe.com/privacy' },
                { name: 'Anthropic (Claude AI)', purpose: 'Analisis jawaban questionnaire untuk menghasilkan report', link: 'https://anthropic.com/privacy' },
                { name: 'Resend', purpose: 'Pengiriman email transaksional', link: 'https://resend.com/privacy' },
                { name: 'Vercel', purpose: 'Hosting aplikasi web', link: 'https://vercel.com/legal/privacy-policy' },
              ].map((p) => (
                <div key={p.name} className="flex items-start space-x-3 bg-gray-50 rounded-lg p-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">{p.name}</span>
                    <span className="text-gray-600 text-sm"> — {p.purpose}</span>
                    <a href={p.link} className="block text-xs text-violet-600 hover:underline mt-0.5" target="_blank" rel="noopener noreferrer">
                      Lihat Privacy Policy {p.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Semua penyedia layanan di atas terikat perjanjian kerahasiaan dan hanya boleh menggunakan
              data Anda sesuai instruksi kami.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Keamanan Data</h2>
            <p className="text-gray-600 leading-relaxed">
              Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar, termasuk:
            </p>
            <ul className="text-gray-600 space-y-1.5 text-sm list-disc list-inside mt-3">
              <li>Enkripsi HTTPS untuk semua komunikasi</li>
              <li>Autentikasi JWT dengan masa berlaku terbatas</li>
              <li>Akses database terbatas (hanya service role key di server)</li>
              <li>Tidak menyimpan password — menggunakan magic link (passwordless)</li>
              <li>Review keamanan berkala</li>
            </ul>
            <p className="text-gray-600 text-sm mt-3">
              Meski demikian, tidak ada sistem yang 100% aman. Jika Anda menemukan kerentanan keamanan,
              harap laporkan ke <a href="mailto:security@productaiprompts.com" className="text-violet-600 hover:underline">security@productaiprompts.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Kami menggunakan cookie sesi HTTP-only untuk menjaga status login Anda (berlaku 7 hari).
              Cookie ini diperlukan untuk fungsi dasar aplikasi dan tidak dapat dinonaktifkan saat Anda
              menggunakan layanan kami.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Kami tidak menggunakan cookie untuk iklan atau tracking lintas situs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Hak-Hak Anda</h2>
            <p className="text-gray-600 mb-3">Anda memiliki hak untuk:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Akses', desc: 'Meminta salinan data pribadi yang kami simpan' },
                { title: 'Koreksi', desc: 'Memperbarui data yang tidak akurat' },
                { title: 'Penghapusan', desc: 'Meminta penghapusan akun dan semua data Anda' },
                { title: 'Portabilitas', desc: 'Meminta ekspor data Anda dalam format JSON' },
                { title: 'Keberatan', desc: 'Menolak penggunaan data untuk tujuan tertentu' },
                { title: 'Berhenti berlangganan', desc: 'Unsubscribe dari email marketing kapan saja' },
              ].map((r) => (
                <div key={r.title} className="bg-gray-50 rounded-lg p-3">
                  <p className="font-semibold text-gray-900 text-sm">{r.title}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{r.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Untuk menggunakan hak-hak ini, hubungi kami di{' '}
              <a href="mailto:privacy@productaiprompts.com" className="text-violet-600 hover:underline">
                privacy@productaiprompts.com
              </a>
              . Kami akan merespons dalam 7 hari kerja.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Retensi Data</h2>
            <p className="text-gray-600 leading-relaxed">
              Kami menyimpan data Anda selama akun Anda aktif. Setelah permintaan penghapusan akun
              diterima, kami akan menghapus semua data dalam <strong>7 hari kerja</strong>, kecuali
              data yang wajib kami simpan berdasarkan hukum (misalnya catatan transaksi untuk keperluan
              pajak, disimpan max. 5 tahun sesuai regulasi).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Perubahan Kebijakan</h2>
            <p className="text-gray-600 leading-relaxed">
              Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan material akan diberitahukan
              melalui email atau notifikasi di aplikasi minimal 14 hari sebelum berlaku. Penggunaan
              layanan setelah tanggal efektif perubahan dianggap sebagai persetujuan Anda.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Hubungi Kami</h2>
            <p className="text-gray-600 leading-relaxed">
              Jika ada pertanyaan tentang kebijakan privasi ini:
            </p>
            <div className="bg-violet-50 rounded-xl p-4 mt-3">
              <p className="text-violet-900 font-medium">Product AI Prompts</p>
              <p className="text-violet-700 text-sm mt-1">
                Email: <a href="mailto:privacy@productaiprompts.com" className="underline">privacy@productaiprompts.com</a>
              </p>
              <p className="text-violet-700 text-sm">Website: productaiprompts.com</p>
            </div>
          </section>

        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <Link href="/terms" className="text-violet-600 hover:underline mr-4">Terms of Service</Link>
          <Link href="/faq" className="text-violet-600 hover:underline">FAQ</Link>
        </div>
      </div>
    </div>
  )
}
