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
