import Link from 'next/link'

const LAST_UPDATED = '27 Mei 2026'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-violet-600 to-blue-600 py-12 px-4">
        <div className="max-w-3xl mx-auto text-white">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-white/70 text-sm">Terakhir diperbarui: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Penerimaan Syarat</h2>
            <p className="text-gray-600 leading-relaxed">
              Dengan mendaftar atau menggunakan Product AI Prompts (&quot;Layanan&quot;), Anda menyetujui
              untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui syarat ini,
              jangan gunakan Layanan kami.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Anda harus berusia minimal 18 tahun untuk menggunakan Layanan ini. Dengan mendaftar,
              Anda menyatakan bahwa Anda memenuhi persyaratan usia tersebut.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Deskripsi Layanan</h2>
            <p className="text-gray-600 leading-relaxed">
              Product AI Prompts adalah platform validasi produk berbasis AI yang menyediakan:
            </p>
            <ul className="text-gray-600 space-y-1.5 text-sm list-disc list-inside mt-3">
              <li>Questionnaire terstruktur (18 pertanyaan, 6 stage) untuk validasi ide produk</li>
              <li>Analisis AI menggunakan Claude (Anthropic) untuk menghasilkan report personal</li>
              <li>Laporan berisi validation score, risk assessment, opportunities, dan action plan</li>
              <li>Fitur tambahan sesuai plan yang dipilih (Monthly atau Lifetime)</li>
            </ul>
            <p className="text-gray-600 text-sm mt-3">
              Kami berhak untuk memodifikasi, menghentikan, atau menangguhkan Layanan sewaktu-waktu
              dengan pemberitahuan yang wajar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Akun dan Keamanan</h2>
            <p className="text-gray-600 leading-relaxed">
              Anda bertanggung jawab untuk:
            </p>
            <ul className="text-gray-600 space-y-1.5 text-sm list-disc list-inside mt-3">
              <li>Menjaga keamanan akses ke akun Anda (termasuk magic link yang dikirim ke email)</li>
              <li>Tidak berbagi akses akun dengan pihak lain</li>
              <li>Segera menghubungi kami jika ada akses tidak sah ke akun Anda</li>
              <li>Memastikan informasi akun Anda akurat dan terkini</li>
            </ul>
            <p className="text-gray-600 text-sm mt-3">
              Kami berhak menangguhkan atau menghapus akun yang melanggar syarat ini.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Penggunaan yang Diizinkan</h2>
            <p className="text-gray-600 mb-3">Anda <strong>boleh</strong> menggunakan Layanan untuk:</p>
            <ul className="text-gray-600 space-y-1 text-sm list-disc list-inside">
              <li>Memvalidasi ide produk atau bisnis Anda sendiri</li>
              <li>Mengunduh dan menyimpan report untuk penggunaan pribadi atau bisnis Anda</li>
              <li>Berbagi temuan dari report dengan tim atau mitra bisnis Anda</li>
            </ul>
            <p className="text-gray-600 mt-4 mb-3">Anda <strong>tidak boleh</strong>:</p>
            <ul className="text-gray-600 space-y-1 text-sm list-disc list-inside">
              <li>Menjual kembali, mendistribusikan, atau me-sublicense akses ke Layanan</li>
              <li>Menggunakan layanan untuk tujuan ilegal atau merugikan orang lain</li>
              <li>Mencoba mengakses sistem backend atau database kami secara tidak sah</li>
              <li>Menggunakan automated bot untuk mengisi questionnaire secara massal</li>
              <li>Mereplikasi atau membuat produk kompetitif menggunakan metodologi eksklusif kami</li>
              <li>Menghapus atau menyembunyikan atribusi atau branding Product AI Prompts dari report</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Harga dan Pembayaran</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Plan dan Harga:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="font-bold text-gray-900">Monthly Plan</p>
                    <p className="text-violet-600 font-semibold">$10/bulan</p>
                    <p className="text-gray-500 text-xs mt-1">5 validations/bulan, basic report</p>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="font-bold text-gray-900">Lifetime Plan</p>
                    <p className="text-violet-600 font-semibold">$79 sekali bayar</p>
                    <p className="text-gray-500 text-xs mt-1">Unlimited, enhanced report</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Ketentuan Pembayaran:</h3>
                <ul className="text-gray-600 space-y-1.5 text-sm list-disc list-inside">
                  <li>Pembayaran diproses secara aman melalui Stripe</li>
                  <li>Monthly plan ditagih setiap 30 hari secara otomatis</li>
                  <li>Harga yang tertera sudah termasuk pajak (jika applicable)</li>
                  <li>Kami berhak mengubah harga dengan pemberitahuan 30 hari sebelumnya</li>
                  <li>Pengguna existing dengan monthly plan tidak terdampak perubahan harga selama subscription aktif</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Kebijakan Pembatalan dan Refund</h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <p className="font-semibold text-green-800 mb-1">30-Day Money-Back Guarantee</p>
              <p className="text-green-700 text-sm">
                Jika Anda tidak puas dalam 30 hari pertama setelah pembayaran, hubungi kami untuk
                mendapatkan refund penuh tanpa pertanyaan.
              </p>
            </div>
            <ul className="text-gray-600 space-y-1.5 text-sm list-disc list-inside">
              <li>Monthly plan dapat dibatalkan kapan saja; akses tetap aktif hingga akhir periode billing</li>
              <li>Setelah 30 hari, tidak ada refund untuk periode yang sudah berjalan</li>
              <li>Lifetime plan adalah pembelian sekali bayar; refund hanya dalam 30 hari pertama</li>
              <li>Untuk cancel atau refund: email ke <a href="mailto:support@productaiprompts.com" className="text-violet-600 hover:underline">support@productaiprompts.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Hak Kekayaan Intelektual</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>Konten Layanan:</strong> Semua konten, framework, metodologi, kode, dan desain
              yang merupakan bagian dari Product AI Prompts adalah milik kami dan dilindungi oleh hak cipta.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>Report yang dihasilkan:</strong> Report AI yang dihasilkan berdasarkan jawaban Anda
              adalah milik Anda. Anda bebas menggunakannya untuk keperluan pribadi atau bisnis.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Konten yang Anda berikan:</strong> Jawaban questionnaire Anda tetap menjadi milik
              Anda. Anda memberikan kami lisensi terbatas untuk memproses jawaban tersebut guna
              menghasilkan report Anda.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Penafian dan Batasan Tanggung Jawab</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <p className="text-amber-800 text-sm font-medium">
                Report yang dihasilkan adalah analisis AI berdasarkan informasi yang Anda berikan.
                Ini bukan saran investasi, hukum, atau profesional. Selalu lakukan due diligence
                tambahan sebelum membuat keputusan bisnis penting.
              </p>
            </div>
            <ul className="text-gray-600 space-y-1.5 text-sm list-disc list-inside">
              <li>Layanan disediakan &quot;sebagaimana adanya&quot; tanpa jaminan apapun</li>
              <li>Kami tidak menjamin keakuratan 100% dari analisis AI</li>
              <li>Kami tidak bertanggung jawab atas kerugian bisnis berdasarkan rekomendasi report</li>
              <li>Tanggung jawab total kami tidak melebihi jumlah yang Anda bayar dalam 12 bulan terakhir</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Layanan Pihak Ketiga</h2>
            <p className="text-gray-600 leading-relaxed">
              Layanan kami menggunakan pihak ketiga termasuk Stripe (pembayaran), Anthropic (AI),
              Supabase (database), dan Resend (email). Penggunaan layanan pihak ketiga tersebut
              tunduk pada ketentuan masing-masing penyedia. Kami tidak bertanggung jawab atas
              gangguan atau kebijakan dari pihak ketiga tersebut.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Penangguhan dan Penghentian</h2>
            <p className="text-gray-600 leading-relaxed">
              Kami berhak menangguhkan atau menghentikan akun Anda jika:
            </p>
            <ul className="text-gray-600 space-y-1.5 text-sm list-disc list-inside mt-3">
              <li>Anda melanggar Syarat dan Ketentuan ini</li>
              <li>Pembayaran gagal dan tidak diselesaikan dalam 7 hari</li>
              <li>Kami mendeteksi penyalahgunaan layanan</li>
              <li>Diwajibkan oleh hukum yang berlaku</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Perubahan Syarat</h2>
            <p className="text-gray-600 leading-relaxed">
              Kami dapat memperbarui Syarat ini sewaktu-waktu. Perubahan material akan diberitahukan
              melalui email minimal 14 hari sebelum berlaku. Penggunaan Layanan setelah tanggal efektif
              perubahan merupakan persetujuan Anda terhadap syarat yang diperbarui.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Hukum yang Berlaku</h2>
            <p className="text-gray-600 leading-relaxed">
              Syarat ini diatur oleh hukum yang berlaku. Setiap sengketa yang timbul akan diselesaikan
              melalui musyawarah terlebih dahulu. Jika tidak tercapai kesepakatan, diselesaikan melalui
              jalur hukum yang berlaku.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">13. Hubungi Kami</h2>
            <p className="text-gray-600 leading-relaxed">
              Pertanyaan tentang Syarat ini dapat dikirimkan ke:
            </p>
            <div className="bg-violet-50 rounded-xl p-4 mt-3">
              <p className="text-violet-900 font-medium">Product AI Prompts</p>
              <p className="text-violet-700 text-sm mt-1">
                Email: <a href="mailto:legal@productaiprompts.com" className="underline">legal@productaiprompts.com</a>
              </p>
              <p className="text-violet-700 text-sm">Website: productaiprompts.com</p>
            </div>
          </section>

        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <Link href="/privacy" className="text-violet-600 hover:underline mr-4">Privacy Policy</Link>
          <Link href="/faq" className="text-violet-600 hover:underline">FAQ</Link>
        </div>
      </div>
    </div>
  )
}
