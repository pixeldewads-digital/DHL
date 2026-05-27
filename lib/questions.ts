import { Stage } from '@/types'

export const STAGES: Stage[] = [
  {
    id: 1,
    title: 'Idea & Validation',
    questions: [
      {
        key: 'stage1_q1',
        text: 'Masalah atau kesulitan apa yang orang hadapi setiap hari, tapi sudah dianggap "normal" dan dibiarkan begitu saja?',
        hint: 'Fokus pada friction yang sering diabaikan: proses manual, tool yang clunky, workflow yang membuang waktu. Contoh: "Content creators masih track engagement mereka di spreadsheet terpisah meski sudah pakai 5 tool berbeda"',
      },
      {
        key: 'stage1_q2',
        text: 'Layanan, produk, atau cara kerja apa yang sudah tidak berubah dalam 5-10 tahun terakhir tapi jelas butuh inovasi?',
        hint: 'Industri yang lambat berubah = peluang terbesar. Tanyakan: apakah masalah ini growing atau shrinking? Apakah orang aktif mencari solusi?',
      },
      {
        key: 'stage1_q3',
        text: 'Ceritakan ide produk atau solusi yang ingin Anda bangun. Apa yang membuat Anda yakin ini masalah yang worth solving?',
        hint: 'Jelaskan secara spesifik: masalah apa, siapa yang mengalaminya, dan apa yang membuat Anda percaya ini nyata (bukan asumsi). Semakin konkret semakin baik.',
      },
    ],
  },
  {
    id: 2,
    title: 'Idea Generation',
    questions: [
      {
        key: 'stage2_q1',
        text: 'Sebutkan 3 cara BERBEDA untuk solve masalah ini — minimal satu cara yang tidak butuh software/app.',
        hint: 'Jangan langsung commit ke solusi pertama. Contoh: (1) SaaS tool, (2) community + templates, (3) service/consulting. Eksplorasi dulu sebelum pilih.',
      },
      {
        key: 'stage2_q2',
        text: 'Dari semua solusi yang mungkin, mana yang paling Anda excited? Apa unfair advantage Anda untuk membangunnya?',
        hint: 'Unfair advantage bisa berupa: domain expertise, akses ke network, data eksklusif, atau experience personal dengan masalah ini. Antusiasme Anda adalah keunggulan nyata.',
      },
      {
        key: 'stage2_q3',
        text: 'Apakah ini produk standalone yang bisa berdiri sendiri, atau lebih cocok jadi fitur di produk yang sudah ada?',
        hint: 'Jujur di sini sangat penting. Standalone = butuh full GTM strategy. Feature = bisa partnership/integration. Keduanya valid, tapi strateginya beda.',
      },
    ],
  },
  {
    id: 3,
    title: 'Problem Definition',
    questions: [
      {
        key: 'stage3_q1',
        text: 'Siapa yang PALING merasakan masalah ini? Deskripsikan satu persona spesifik: role, income, situasi kerja, dan apa yang bikin mereka frustrasi.',
        hint: 'Bukan "semua orang" — semakin spesifik semakin kuat. Contoh: "Freelance content creator usia 22-28 yang sudah earn $500+/bulan tapi masih bingung validasi ide produk digital"',
      },
      {
        key: 'stage3_q2',
        text: 'Kapan tepatnya masalah ini terjadi? Seberapa sering? Berapa jam per minggu yang terbuang? Dan apa yang memicu masalah ini muncul?',
        hint: 'Quantify the pain: 20 jam/minggu = serious problem. "Sekali-sekali" = mungkin bukan masalah kritis. Identifikasi trigger moment yang paling menyakitkan.',
      },
      {
        key: 'stage3_q3',
        text: 'Apa yang orang lakukan SEKARANG untuk solve masalah ini? Kenapa solusi yang ada belum cukup — terlalu mahal, terlalu ribet, atau tidak ada sama sekali?',
        hint: 'Kalau tidak ada workaround = masalah mungkin tidak urgent. Kalau ada workaround tapi orang tidak suka = golden opportunity. Apa yang paling mereka keluhkan dari solusi existing?',
      },
    ],
  },
  {
    id: 4,
    title: 'Market & User Validation',
    questions: [
      {
        key: 'stage4_q1',
        text: 'Siapa early adopter ideal Anda — orang pertama yang akan bayar sebelum produk sempurna? Deskripsikan mereka: di mana mereka aktif, apa yang mereka baca, dan bagaimana mereka discover tool baru?',
        hint: 'Early adopter berbeda dari mass market. Mereka toleran terhadap bug, aktif kasih feedback, dan willing pay lebih awal. Di mana orang dengan pain level 8-10/10 ini berkumpul?',
      },
      {
        key: 'stage4_q2',
        text: 'Berapa besar market ini secara realistis? Estimasi jumlah orang/bisnis dengan masalah ini. Apakah market ini growing?',
        hint: 'Tidak harus tepat — estimasi kasar sudah cukup. 1000 orang × $10/bulan = $10K MRR viable. 100.000 orang × $5/bulan = besar sekali. Apakah tren menunjukkan market makin besar atau mengecil?',
      },
      {
        key: 'stage4_q3',
        text: 'Tool atau layanan apa yang mereka SUDAH bayar sekarang untuk solve masalah serupa? Berapa harganya? Dan berapa mereka rela bayar untuk solusi yang 10x lebih baik?',
        hint: 'Kalau mereka tidak bayar apa-apa sekarang, sangat susah untuk charge. Harga existing tools = price anchor Anda. Willingness to pay (WTP) adalah metric validasi paling kritis.',
      },
    ],
  },
  {
    id: 5,
    title: 'Business & Feasibility',
    questions: [
      {
        key: 'stage5_q1',
        text: 'Apa model revenue yang paling masuk akal: SaaS monthly, one-time payment, freemium, atau lainnya? Dan berapa minimum revenue yang dibutuhkan agar ini layak sebagai bisnis?',
        hint: 'SaaS = predictable MRR tapi butuh retention. One-time = easier to sell tapi butuh volume lebih besar. Freemium = butuh banyak user untuk convert. Hitung: butuh berapa paying customers untuk break-even?',
      },
      {
        key: 'stage5_q2',
        text: 'Apa yang PALING MINIMUM perlu dibangun untuk membuktikan apakah ide ini berhasil atau tidak? Apa yang bisa ditunda ke versi berikutnya?',
        hint: 'MVP bukan versi kecil dari produk penuh — MVP adalah test hipotesis utama Anda dengan effort minimal. Apa satu fitur yang kalau tidak ada, produk tidak ada value-nya sama sekali?',
      },
      {
        key: 'stage5_q3',
        text: 'Apa asumsi PALING BERISIKO yang Anda buat? Apa yang harus benar agar bisnis ini berhasil, dan bagaimana Anda bisa test asumsi itu dalam 7 hari tanpa membangun produk penuh?',
        hint: 'Contoh asumsi kritis: "Orang mau bayar $10/bulan" atau "Mereka tidak puas dengan ChatGPT". Cara test cepat: landing page + waitlist, interview 10 orang, atau sell manually dulu.',
      },
    ],
  },
  {
    id: 6,
    title: 'Brand & Positioning',
    questions: [
      {
        key: 'stage6_q1',
        text: 'Apa yang membuat produk ini susah dicopy kompetitor? (Network effects, data eksklusif, brand trust, deep integration, atau keahlian domain Anda yang unik?)',
        hint: 'Kalau jawabannya "tidak ada" atau "hanya fitur", itu warning sign. Moat terbaik: data flywheel, komunitas, atau brand yang kuat di niche spesifik. Apa yang Anda miliki yang orang lain tidak?',
      },
      {
        key: 'stage6_q2',
        text: 'Apa yang SEHARUSNYA dirasakan user setelah menggunakan produk Anda — relief, confident, excited, atau sesuatu yang lain? Dan apa satu kalimat yang ingin mereka ceritakan ke temannya?',
        hint: 'Emotion drives word-of-mouth. "Saya akhirnya tahu ide mana yang worth pursuing" lebih powerful dari "tool ini bagus". Apa transformation yang Anda janjikan?',
      },
      {
        key: 'stage6_q3',
        text: 'Tulis positioning statement lengkap: "Untuk [siapa], tidak seperti [alternatif yang ada], [nama produk] adalah [kategori apa] yang membantu [benefit spesifik] — dalam [timeframe jika relevan]."',
        hint: 'Contoh kuat: "Untuk creator yang stuck validasi ide, tidak seperti ChatGPT yang generik, Product AI Prompts adalah framework interaktif yang memberikan validation score + action plan dalam 30 menit."',
      },
    ],
  },
]
