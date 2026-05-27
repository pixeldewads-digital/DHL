import { Stage } from '@/types'

export const STAGES: Stage[] = [
  {
    id: 1,
    title: 'Idea & Validation',
    questions: [
      {
        key: 'stage1_q1',
        text: 'Apa masalah atau gangguan sehari-hari yang orang terima sebagai hal biasa?',
        hint: "Misal: 'Orang masih menggunakan spreadsheet untuk tracking waktu kerja'",
      },
      {
        key: 'stage1_q2',
        text: 'Apa tugas yang orang masih selesaikan dengan spreadsheet tapi mereka benci melakukannya?',
        hint: 'Fokus pada hal yang membuat frustasi atau membuang waktu',
      },
      {
        key: 'stage1_q3',
        text: 'Produk apa yang profesional komplain tentangnya tapi masih mereka pakai?',
        hint: 'Punya competitor? Apa yang tidak mereka sukai dari produk yang sudah ada?',
      },
    ],
  },
  {
    id: 2,
    title: 'Idea Generation',
    questions: [
      {
        key: 'stage2_q1',
        text: 'Masalah apa yang hanya ada di region/industri/situasi tertentu?',
        hint: "Misal: 'Hanya di startups' atau 'Hanya di Asia Tenggara'",
      },
      {
        key: 'stage2_q2',
        text: 'Data atau informasi apa yang orang inginkan tapi tidak bisa diakses sekarang?',
        hint: 'Apa yang akan membuat pekerjaan mereka jauh lebih mudah jika tersedia?',
      },
      {
        key: 'stage2_q3',
        text: 'Workflow apa yang memerlukan terlalu banyak tools untuk diselesaikan?',
        hint: 'Berapa banyak app/tool yang harus mereka buka untuk menyelesaikan satu pekerjaan?',
      },
    ],
  },
  {
    id: 3,
    title: 'Problem Definition',
    questions: [
      {
        key: 'stage3_q1',
        text: 'Siapa yang paling merasakan masalah ini? (Deskripsikan persona/karakter spesifik)',
        hint: "Siapa target user Anda? Job title, industri, usia? Contoh: 'Product Manager berusia 28-40 tahun'",
      },
      {
        key: 'stage3_q2',
        text: 'Kapan masalah ini terjadi dan seberapa sering?',
        hint: 'Harian? Mingguan? Berapa lama waktu yang terbuang?',
      },
      {
        key: 'stage3_q3',
        text: 'Kenapa solusi yang ada sekarang tidak cukup/tidak bagus?',
        hint: 'Terlalu kompleks? Terlalu mahal? Tidak terintegrasi?',
      },
    ],
  },
  {
    id: 4,
    title: 'Market & User Validation',
    questions: [
      {
        key: 'stage4_q1',
        text: 'Siapa early adopter ideal untuk solusi Anda? (Karakteristik spesifik)',
        hint: 'Startup vs Enterprise? Tech-savvy vs Luddite? Budget besar vs bootstrapped?',
      },
      {
        key: 'stage4_q2',
        text: 'Di mana Anda bisa menemukan user-user ini? (Online atau offline)',
        hint: 'Reddit? Twitter? Slack communities? Facebook groups?',
      },
      {
        key: 'stage4_q3',
        text: 'Produk/layanan apa yang mereka SUDAH bayar untuk sekarang?',
        hint: 'Harga per bulan? Siapa competitors mereka? Apa yang mereka spending untuk tools lain?',
      },
    ],
  },
  {
    id: 5,
    title: 'Business & Feasibility',
    questions: [
      {
        key: 'stage5_q1',
        text: 'Berapa kira-kira biaya dan waktu untuk membangun MVP?',
        hint: '1 engineer × 3 bulan = berapa?',
      },
      {
        key: 'stage5_q2',
        text: 'Berapa orang mau bayar per bulan untuk solusi Anda?',
        hint: 'Bandingkan dengan pricing kompetitor',
      },
      {
        key: 'stage5_q3',
        text: 'Apa asumsi PALING BERISIKO yang Anda buat?',
        hint: 'Apa yang kalau salah, produk jadi sia-sia?',
      },
    ],
  },
  {
    id: 6,
    title: 'Brand & Positioning',
    questions: [
      {
        key: 'stage6_q1',
        text: 'Apa yang TIDAK BISA dicopy oleh kompetitor dengan mudah?',
        hint: 'Network effects? Spesifik AI? Deep integration?',
      },
      {
        key: 'stage6_q2',
        text: 'Apa yang SEHARUSNYA dirasakan user setelah menggunakan produk Anda?',
        hint: 'Relief? Excited? Confident? Connected?',
      },
      {
        key: 'stage6_q3',
        text: 'Tulis positioning statement Anda dalam 1-2 kalimat',
        hint: "Format: 'Untuk [user] yang [pain point], [nama produk] adalah [kategori] yang [unique value]'",
      },
    ],
  },
]
