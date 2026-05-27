'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Loader2, Lock, CheckCircle, Send } from 'lucide-react'
import { STAGES } from '@/lib/questions'

interface Answers {
  [key: string]: string
}

export default function QuestionnairePage() {
  const router = useRouter()
  const [currentStage, setCurrentStage] = useState(1)
  const [answers, setAnswers] = useState<Answers>({})
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [userPlan, setUserPlan] = useState('free')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Load from localStorage first
    const saved = localStorage.getItem('questionnaire_answers')
    if (saved) {
      try { setAnswers(JSON.parse(saved)) } catch {}
    }
    const savedStage = localStorage.getItem('questionnaire_stage')
    if (savedStage) setCurrentStage(parseInt(savedStage))

    // Fetch user plan and saved answers from server
    Promise.all([
      fetch('/api/user/profile').then(r => r.json()),
      fetch('/api/questionnaire').then(r => r.json()),
    ]).then(([userData, qData]) => {
      if (userData.user) setUserPlan(userData.user.plan === 'monthly' || userData.user.plan === 'lifetime' || userData.user.payment_status === 'paid' ? 'paid' : 'free')
      if (qData.questionnaire) {
        const q = qData.questionnaire
        const serverAnswers: Answers = {}
        STAGES.forEach(stage => {
          stage.questions.forEach(q2 => {
            if (q[q2.key]) serverAnswers[q2.key] = q[q2.key]
          })
        })
        setAnswers(prev => ({ ...serverAnswers, ...prev }))
      }
    }).catch(console.error).finally(() => setLoaded(true))
  }, [])

  const isPaid = userPlan === 'paid'

  const isStageComplete = useCallback((stageId: number) => {
    const stage = STAGES[stageId - 1]
    return stage.questions.every(q => answers[q.key]?.trim())
  }, [answers])

  const isStageAccessible = useCallback((stageId: number) => {
    if (stageId === 1) return true
    if (!isPaid) return false
    // All previous stages must be complete
    for (let i = 1; i < stageId; i++) {
      if (!isStageComplete(i)) return false
    }
    return true
  }, [isPaid, isStageComplete])

  const saveToServer = useCallback(async (answersToSave: Answers) => {
    setSaving(true)
    try {
      await fetch('/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answersToSave),
      })
    } catch (e) {
      console.error('Save error:', e)
    } finally {
      setSaving(false)
    }
  }, [])

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!loaded) return
    const timer = setInterval(() => {
      localStorage.setItem('questionnaire_answers', JSON.stringify(answers))
      saveToServer(answers)
    }, 30000)
    return () => clearInterval(timer)
  }, [answers, loaded, saveToServer])

  function handleAnswerChange(key: string, value: string) {
    const updated = { ...answers, [key]: value }
    setAnswers(updated)
    localStorage.setItem('questionnaire_answers', JSON.stringify(updated))
  }

  async function handleNext() {
    if (!isStageComplete(currentStage)) {
      setError('Lengkapi semua pertanyaan di stage ini dulu.')
      return
    }
    setError('')
    await saveToServer(answers)
    const nextStage = currentStage + 1
    setCurrentStage(nextStage)
    localStorage.setItem('questionnaire_stage', String(nextStage))
    window.scrollTo(0, 0)
  }

  function handlePrev() {
    setError('')
    const prevStage = currentStage - 1
    setCurrentStage(prevStage)
    localStorage.setItem('questionnaire_stage', String(prevStage))
    window.scrollTo(0, 0)
  }

  async function handleSubmit() {
    if (!isStageComplete(currentStage)) {
      setError('Lengkapi semua pertanyaan di stage ini dulu.')
      return
    }
    setSubmitting(true)
    setError('')

    try {
      await saveToServer(answers)
      const res = await fetch('/api/report/generate', { method: 'POST' })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to generate report')
        return
      }

      localStorage.removeItem('questionnaire_answers')
      localStorage.removeItem('questionnaire_stage')
      router.push('/report')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    )
  }

  const stage = STAGES[currentStage - 1]
  const isLast = currentStage === 6

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Product Validation</h1>
            {saving && (
              <div className="flex items-center space-x-1.5 text-gray-500 text-sm">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Saving...</span>
              </div>
            )}
          </div>

          {/* Stage indicators */}
          <div className="flex items-center space-x-2 mb-4">
            {STAGES.map(s => {
              const accessible = isStageAccessible(s.id)
              const complete = isStageComplete(s.id)
              const active = s.id === currentStage
              return (
                <button
                  key={s.id}
                  onClick={() => accessible && setCurrentStage(s.id)}
                  disabled={!accessible}
                  className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all ${
                    active
                      ? 'bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-md'
                      : complete
                      ? 'bg-green-500 text-white'
                      : accessible
                      ? 'bg-white border-2 border-gray-200 text-gray-600 hover:border-violet-300'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {complete && !active ? <CheckCircle className="w-4 h-4" /> : !accessible ? <Lock className="w-3 h-3" /> : s.id}
                </button>
              )
            })}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-violet-600 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStage / 6) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Stage {currentStage} dari 6</span>
            <span>{Math.round((currentStage / 6) * 100)}% selesai</span>
          </div>
        </div>

        {/* Stage card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">{stage.id}</span>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Stage {stage.id}</p>
              <h2 className="text-xl font-bold text-gray-900">{stage.title}</h2>
            </div>
          </div>

          {!isPaid && currentStage > 1 ? (
            <div className="text-center py-12">
              <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-700 mb-2">Stage Terkunci</h3>
              <p className="text-gray-500 mb-6">Upgrade ke plan berbayar untuk mengakses semua 6 stages dan mendapatkan AI report Anda.</p>
              <a
                href="/pricing"
                className="inline-block bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Upgrade Sekarang →
              </a>
            </div>
          ) : (
            <div className="space-y-8">
              {stage.questions.map((q, idx) => (
                <div key={q.key}>
                  <label className="block font-semibold text-gray-900 mb-1.5">
                    <span className="text-violet-600 mr-2">{idx + 1}.</span>
                    {q.text}
                  </label>
                  <p className="text-sm text-gray-500 mb-2.5">💡 {q.hint}</p>
                  <textarea
                    value={answers[q.key] || ''}
                    onChange={e => handleAnswerChange(q.key, e.target.value)}
                    placeholder="Tulis jawaban Anda di sini..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                  />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 rounded-xl p-4 text-sm">{error}</div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handlePrev}
              disabled={currentStage === 1}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Sebelumnya</span>
            </button>

            {isLast && isPaid ? (
              <button
                onClick={handleSubmit}
                disabled={submitting || !isStageComplete(6)}
                className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /><span>Generating Report...</span></>
                ) : (
                  <><Send className="w-4 h-4" /><span>Submit & Generate Report</span></>
                )}
              </button>
            ) : !isLast ? (
              <button
                onClick={handleNext}
                disabled={!isStageComplete(currentStage) || (!isPaid && currentStage === 1)}
                className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : null}
          </div>

          {!isPaid && currentStage === 1 && isStageComplete(1) && (
            <div className="mt-4 p-4 bg-violet-50 rounded-xl border border-violet-100 text-center">
              <p className="text-violet-700 font-medium mb-2">Stage 1 selesai! 🎉</p>
              <p className="text-violet-600 text-sm mb-3">Upgrade untuk lanjut ke Stage 2-6 dan dapatkan AI report lengkap.</p>
              <a href="/pricing" className="inline-block bg-gradient-to-r from-violet-600 to-blue-600 text-white px-5 py-2 rounded-lg font-medium text-sm hover:opacity-90">
                Upgrade Sekarang
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
