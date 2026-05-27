'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Copy, CheckCircle, ArrowRight } from 'lucide-react'
import { PROMPT_LIBRARY, STAGE_COLORS, STAGE_TITLES } from '@/lib/prompt-library'

const ALL = 0

export default function PromptLibraryPage() {
  const [activeStage, setActiveStage] = useState(ALL)
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<number | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return PROMPT_LIBRARY.filter(p => {
      const matchStage = activeStage === ALL || p.stage === activeStage
      const matchSearch = !q || p.text.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      return matchStage && matchSearch
    })
  }, [activeStage, search])

  function copyPrompt(p: typeof PROMPT_LIBRARY[0]) {
    const text = p.followUp
      ? `${p.text}\n\nFollow-up: ${p.followUp}`
      : p.text
    navigator.clipboard.writeText(text)
    setCopied(p.id)
    setTimeout(() => setCopied(null), 2000)
  }

  const stages = Array.from(new Set(PROMPT_LIBRARY.map(p => p.stage))).sort()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-600 to-blue-600 py-14 px-4">
        <div className="max-w-4xl mx-auto text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-sm font-medium mb-4">
            <span>📚</span>
            <span>{PROMPT_LIBRARY.length} strategic prompts</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Prompt Library</h1>
          <p className="text-white/80 max-w-xl">
            Framework pertanyaan strategis untuk setiap tahap product development — dari idea validation sampai brand positioning.
            Copy ke ChatGPT, Claude, atau gunakan langsung sebagai panduan thinking.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari prompt..."
            className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
          />
        </div>

        {/* Stage filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveStage(ALL)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeStage === ALL
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            Semua ({PROMPT_LIBRARY.length})
          </button>
          {stages.map(stage => {
            const count = PROMPT_LIBRARY.filter(p => p.stage === stage).length
            return (
              <button
                key={stage}
                onClick={() => setActiveStage(stage)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeStage === stage
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Stage {stage}: {STAGE_TITLES[stage]} ({count})
              </button>
            )
          })}
        </div>

        {/* Results count */}
        {search && (
          <p className="text-sm text-gray-500 mb-4">
            {filtered.length} prompt ditemukan untuk "{search}"
          </p>
        )}

        {/* Prompt cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">Tidak ada prompt yang cocok.</p>
            <button onClick={() => { setSearch(''); setActiveStage(ALL) }} className="mt-3 text-violet-600 text-sm hover:underline">
              Reset filter
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(prompt => (
              <div
                key={prompt.id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:border-violet-200 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STAGE_COLORS[prompt.stage]}`}>
                        Stage {prompt.stage}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{prompt.category}</span>
                    </div>
                    <p className="font-semibold text-gray-900 leading-snug mb-2">{prompt.text}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{prompt.description}</p>
                    {prompt.followUp && (
                      <p className="text-sm text-violet-600 mt-2 italic">
                        ↳ Follow-up: {prompt.followUp}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => copyPrompt(prompt)}
                    className="shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-violet-300 hover:text-violet-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    {copied === prompt.id ? (
                      <><CheckCircle className="w-3.5 h-3.5 text-green-500" /><span className="text-green-600">Copied</span></>
                    ) : (
                      <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl border border-violet-100 p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Siap validasi ide produk Anda?
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
            Framework prompt ini digunakan sebagai basis questionnaire kami.
            Jawab 18 pertanyaan terstruktur dan dapatkan AI report dengan validation score, risks, dan action plan.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Mulai Validasi Gratis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
