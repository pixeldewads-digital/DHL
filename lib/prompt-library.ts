export interface LibraryPrompt {
  id: number
  stage: number
  stageTitle: string
  category: string
  text: string
  description: string
  followUp?: string
}

export const PROMPT_LIBRARY: LibraryPrompt[] = [
  // ── STAGE 1: IDEA & VALIDATION ──────────────────────────────
  {
    id: 1, stage: 1, stageTitle: 'Idea & Validation', category: 'Problem Discovery',
    text: 'What is a daily annoyance people have accepted as "normal"?',
    description: 'The best product opportunities hide in plain sight — recurring friction people stopped noticing.',
    followUp: 'Why do they tolerate it instead of fixing it?',
  },
  {
    id: 2, stage: 1, stageTitle: 'Idea & Validation', category: 'Problem Discovery',
    text: 'What task do people still solve with spreadsheets but hate doing so?',
    description: 'Spreadsheet workarounds are a reliable signal of unmet software needs.',
    followUp: 'What specifically makes the spreadsheet painful — manual entry, formulas, collaboration?',
  },
  {
    id: 3, stage: 1, stageTitle: 'Idea & Validation', category: 'Problem Discovery',
    text: 'What product do professionals complain about but still use daily?',
    description: 'Captive users who hate their tool = massive switching opportunity for the right alternative.',
    followUp: 'What would make them actually switch?',
  },
  {
    id: 4, stage: 1, stageTitle: 'Idea & Validation', category: 'Problem Discovery',
    text: 'What service or workflow hasn\'t fundamentally changed in 10+ years?',
    description: 'Stagnant industries with aging incumbents are often ripe for disruption.',
  },
  {
    id: 5, stage: 1, stageTitle: 'Idea & Validation', category: 'Problem Discovery',
    text: 'What do people manually track that should be automated?',
    description: 'Any recurring manual process is a candidate for automation — and people will pay to get time back.',
    followUp: 'How much time per week does it take them?',
  },
  {
    id: 6, stage: 1, stageTitle: 'Idea & Validation', category: 'Opportunity Signals',
    text: 'What workflow currently requires too many tools or app-switching to complete?',
    description: 'Tool fragmentation creates cognitive overhead. A unified solution can command a premium.',
    followUp: 'What\'s the switching cost between those tools?',
  },
  {
    id: 7, stage: 1, stageTitle: 'Idea & Validation', category: 'Opportunity Signals',
    text: 'What breaks when a team or operation grows past a certain size?',
    description: 'Scaling pain points are predictable — and companies will pay to solve them proactively.',
  },
  {
    id: 8, stage: 1, stageTitle: 'Idea & Validation', category: 'Opportunity Signals',
    text: 'What problem exists only online (or only offline) but could be bridged?',
    description: 'Online/offline gaps represent markets that neither fully-digital nor fully-physical products serve.',
  },

  // ── STAGE 2: IDEA GENERATION ─────────────────────────────────
  {
    id: 9, stage: 2, stageTitle: 'Idea Generation', category: 'Alternative Solutions',
    text: 'What are 3 completely different ways to solve this problem — including one that requires no software?',
    description: 'Constraint-driven thinking surfaces unexpected solutions. The non-software version reveals core value.',
    followUp: 'Which approach gives the most insight into what users actually need?',
  },
  {
    id: 10, stage: 2, stageTitle: 'Idea Generation', category: 'Alternative Solutions',
    text: 'What\'s the simplest, lowest-tech version of this solution you could test next week?',
    description: 'Smoke test before building. A Google Form + email can validate most B2B SaaS concepts.',
  },
  {
    id: 11, stage: 2, stageTitle: 'Idea Generation', category: 'Unfair Advantage',
    text: 'What unique access, expertise, or data do you have that others building this solution don\'t?',
    description: 'Your unfair advantage is what makes you the right founder for this problem, not just the right idea.',
    followUp: 'Would that advantage still matter in 2 years?',
  },
  {
    id: 12, stage: 2, stageTitle: 'Idea Generation', category: 'Scope',
    text: 'Is this a standalone company or a feature that should live inside an existing product?',
    description: 'Features can be acquired; companies are built. Getting this right determines your entire GTM strategy.',
  },
  {
    id: 13, stage: 2, stageTitle: 'Idea Generation', category: 'Scope',
    text: 'What\'s the boring, profitable version of this idea vs the exciting, ambitious version?',
    description: '"Boring but profitable" often wins. Consultants buy boring tools. VCs fund exciting ones. Know which you\'re building.',
  },

  // ── STAGE 3: PROBLEM DEFINITION ──────────────────────────────
  {
    id: 14, stage: 3, stageTitle: 'Problem Definition', category: 'User Persona',
    text: 'Who has this problem the most? Describe one specific person: role, income, company size, geography.',
    description: '"Everyone" is not a customer. Specificity in persona definition leads to specificity in product decisions.',
    followUp: 'Would they describe the problem in the same words you just used?',
  },
  {
    id: 15, stage: 3, stageTitle: 'Problem Definition', category: 'Problem Frequency',
    text: 'When does this problem occur? How often? What triggers it?',
    description: 'Daily problems command higher prices than weekly ones. Triggered problems are easier to intercept in the funnel.',
  },
  {
    id: 16, stage: 3, stageTitle: 'Problem Definition', category: 'Problem Severity',
    text: 'What happens if this problem is ignored? What\'s the cost — in time, money, or emotional drain?',
    description: 'Quantify the pain. Problems costing $10K/year per user justify $99/month pricing easily.',
  },
  {
    id: 17, stage: 3, stageTitle: 'Problem Definition', category: 'Root Cause',
    text: 'What is the ROOT problem underneath the surface problem? Ask "why" 3 times.',
    description: 'Surface problem: "No time to manage social media." Root problem: "No system that turns strategy into daily actions."',
    followUp: 'Are you solving the root cause or just the symptom?',
  },
  {
    id: 18, stage: 3, stageTitle: 'Problem Definition', category: 'Current Solutions',
    text: 'How do people currently solve this problem, and what do they hate most about their current solution?',
    description: 'The gap between "current solution" and "ideal solution" is your product opportunity.',
    followUp: 'What would make them switch immediately vs. "eventually"?',
  },
  {
    id: 19, stage: 3, stageTitle: 'Problem Definition', category: 'Problem Type',
    text: 'Is this a must-have or a nice-to-have problem? Would users be upset if your solution disappeared tomorrow?',
    description: 'Must-have problems survive budget cuts. Nice-to-have features get cancelled first.',
  },

  // ── STAGE 4: MARKET & USER VALIDATION ────────────────────────
  {
    id: 20, stage: 4, stageTitle: 'Market & User Validation', category: 'Early Adopters',
    text: 'Who is your ideal early adopter — someone who feels the problem intensely AND has budget to pay?',
    description: 'Early adopters are not your mass market. They tolerate rough edges, give feedback, and evangelize.',
    followUp: 'Where do they hang out online? What do they read?',
  },
  {
    id: 21, stage: 4, stageTitle: 'Market & User Validation', category: 'Market Size',
    text: 'How many people or companies realistically have this problem? Is that number growing or shrinking?',
    description: 'You don\'t need a huge market — you need a market large enough to reach your revenue goals.',
  },
  {
    id: 22, stage: 4, stageTitle: 'Market & User Validation', category: 'Willingness to Pay',
    text: 'What do these users currently pay for related tools or services? What would they pay for a 10x better solution?',
    description: 'Anchoring WTP to existing spend is more reliable than asking "how much would you pay?" in isolation.',
  },
  {
    id: 23, stage: 4, stageTitle: 'Market & User Validation', category: 'Validation Evidence',
    text: 'What proof do you have that users actually want this — not just feedback that it\'s "interesting"?',
    description: '"Interesting" ≠ demand. Pre-orders, waitlist signups, signed LOIs, or people paying for manual version = real demand.',
  },
  {
    id: 24, stage: 4, stageTitle: 'Market & User Validation', category: 'Competitive Landscape',
    text: 'Are users actively complaining about current solutions, or hacking together DIY workarounds?',
    description: 'Active complaints and hacky workarounds are the strongest leading indicators of product-market fit opportunity.',
    followUp: 'Have people tried to build this before? Why did they fail or stop?',
  },

  // ── STAGE 5: BUSINESS & FEASIBILITY ──────────────────────────
  {
    id: 25, stage: 5, stageTitle: 'Business & Feasibility', category: 'Revenue Model',
    text: 'What revenue model fits the value delivered: subscription, one-time, usage-based, or marketplace?',
    description: 'The right model depends on how often users get value. Daily use → subscription. Event-based → one-time or usage.',
  },
  {
    id: 26, stage: 5, stageTitle: 'Business & Feasibility', category: 'Unit Economics',
    text: 'At what customer count does this become a sustainable business? What\'s your CAC vs LTV estimate?',
    description: 'Rough math: if LTV > 3× CAC, the model is viable. If CAC > LTV, you\'re losing money on every customer.',
  },
  {
    id: 27, stage: 5, stageTitle: 'Business & Feasibility', category: 'MVP Definition',
    text: 'What is the absolute minimum you need to build to TEST your hypothesis — not to impress, but to learn?',
    description: 'The MVP question is: "What\'s the cheapest way to know if this works?" Cut every feature that doesn\'t test the core bet.',
  },
  {
    id: 28, stage: 5, stageTitle: 'Business & Feasibility', category: 'Risk',
    text: 'What\'s your riskiest assumption? What must be true for this to work, and how do you test it in 7 days?',
    description: 'List every assumption ranked by risk. The riskiest one is what you validate first — before writing a single line of code.',
    followUp: 'What would change your mind about pursuing this?',
  },
  {
    id: 29, stage: 5, stageTitle: 'Business & Feasibility', category: 'Switching Costs',
    text: 'What switching costs will users face to adopt your product — data migration, learning curve, workflow change?',
    description: 'High switching costs = harder to acquire customers, but better retention once they\'re in.',
  },

  // ── STAGE 6: BRAND & POSITIONING ─────────────────────────────
  {
    id: 30, stage: 6, stageTitle: 'Brand & Positioning', category: 'Positioning',
    text: 'Complete: "For [user], unlike [current alternative], our [product] is [category] that [key benefit]."',
    description: 'A clear positioning statement forces you to define your target, competitor, and unique value in one breath.',
    followUp: 'Does this resonate when you say it out loud to someone who doesn\'t know your product?',
  },
  {
    id: 31, stage: 6, stageTitle: 'Brand & Positioning', category: 'Core Message',
    text: 'What is the ONE thing you want someone to remember about your product after hearing about it?',
    description: 'If users can\'t repeat your value prop to a friend, you haven\'t found it yet.',
  },
  {
    id: 32, stage: 6, stageTitle: 'Brand & Positioning', category: 'Moat',
    text: 'What would make this product very hard to copy 2 years from now?',
    description: 'Defensible advantages: proprietary data, network effects, deep integrations, brand trust in a niche, or community.',
    followUp: 'Are you building toward that moat from day one?',
  },
  {
    id: 33, stage: 6, stageTitle: 'Brand & Positioning', category: 'Emotional Outcome',
    text: 'What transformation does your product create? How does a user\'s life/work look AFTER using it vs before?',
    description: 'People buy outcomes, not features. "Save 10 hours/week" sells. "AI-powered automation" describes a feature.',
  },
  {
    id: 34, stage: 6, stageTitle: 'Brand & Positioning', category: 'Category',
    text: 'What existing category does your product belong to — and should you own that category or create a new one?',
    description: 'Owning an existing category is faster. Creating a new one is harder but defensible. Which is right for your market timing?',
  },
]

export const STAGE_COLORS: Record<number, string> = {
  1: 'bg-violet-100 text-violet-700',
  2: 'bg-blue-100 text-blue-700',
  3: 'bg-sky-100 text-sky-700',
  4: 'bg-teal-100 text-teal-700',
  5: 'bg-amber-100 text-amber-700',
  6: 'bg-rose-100 text-rose-700',
}

export const STAGE_TITLES: Record<number, string> = {
  1: 'Idea & Validation',
  2: 'Idea Generation',
  3: 'Problem Definition',
  4: 'Market & User Validation',
  5: 'Business & Feasibility',
  6: 'Brand & Positioning',
}
