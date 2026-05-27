'use client'

import { useState, useEffect } from 'react'
import {
  Zap, MessageSquare, Sparkles, BarChart3, ArrowRight,
  CheckCircle, X, ChevronRight,
} from 'lucide-react'

const STORAGE_KEY = 'onboarding_v1_done'

const STEPS = [
  {
    icon: <Zap className="w-8 h-8 text-violet-600" />,
    bg: 'bg-violet-100',
    title: 'Selamat datang di Product AI Prompts!',
    body: 'Sistem validasi produk berbasis AI yang membantu kamu menemukan ide winning dalam 2 minggu — bukan 2 bulan.',
    tip: null,
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
    bg: 'bg-blue-100',
    title: 'Jawab 18 pertanyaan (±20 menit)',
    body: '6 stage, masing-masing 3 pertanyaan. Meliputi ide, problem, pasar, bisnis, hingga positioning produk kamu.',
    tip: 'Jawab sejujur mungkin — semakin detail, semakin akurat analisisnya.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
    bg: 'bg-indigo-100',
    title: 'AI menganalisis semua jawabanmu',
    body: 'Claude AI membaca setiap jawaban dan menghasilkan analisis personal — bukan template generic.',
    tip: 'Proses hanya butuh 10–30 detik setelah kamu submit.',
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-green-600" />,
    bg: 'bg-green-100',
    title: 'Dapatkan report lengkap',
    body: 'Validation score 1-10, top 3 risks, top 3 opportunities, market size estimate, dan 30-day action plan.',
    tip: 'Lifetime users mendapat enhanced report: competitive analysis, pricing strategy, go-to-market brief.',
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-emerald-600" />,
    bg: 'bg-emerald-100',
    title: 'Ambil tindakan nyata',
    body: 'Download PDF report, share ke tim, dan mulai eksekusi 30-day action plan-mu. Stop guessing, start validating.',
    tip: null,
  },
]

export default function OnboardingModal() {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY)
    if (!done) setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'Enter') next()
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      dismiss()
    }
  }

  if (!visible) return null

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Skip tutorial"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step counter */}
        <div className="flex items-center space-x-1.5 mb-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? 'w-6 bg-violet-600'
                  : i < step
                  ? 'w-3 bg-violet-300'
                  : 'w-3 bg-gray-200'
              }`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">{step + 1} / {STEPS.length}</span>
        </div>

        {/* Icon */}
        <div className={`w-16 h-16 ${current.bg} rounded-2xl flex items-center justify-center mb-5`}>
          {current.icon}
        </div>

        {/* Content */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
          {current.title}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          {current.body}
        </p>

        {current.tip && (
          <div className="flex items-start space-x-2.5 bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4">
            <span className="text-amber-500 text-lg leading-none mt-0.5">💡</span>
            <p className="text-amber-800 text-sm leading-relaxed">{current.tip}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={dismiss}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Lewati tutorial
          </button>

          <button
            onClick={next}
            className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            {isLast ? (
              <>
                <span>Mulai Validasi!</span>
                <Zap className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Keyboard hint */}
        {!isLast && (
          <p className="text-center text-xs text-gray-300 mt-3">
            atau tekan <kbd className="font-mono bg-gray-100 px-1 rounded">→</kbd> untuk lanjut
          </p>
        )}
      </div>
    </div>
  )
}
