export interface User {
  id: string
  email: string
  name: string | null
  role: 'creator' | 'founder' | 'seller'
  plan: 'free' | 'trial' | 'monthly' | 'lifetime'
  stripe_customer_id: string | null
  payment_status: 'pending' | 'paid' | 'failed'
  generation_count: number
  generations_used_this_month: number
  last_generation_reset: string
  created_at: string
  updated_at: string
}

export interface Questionnaire {
  id: string
  user_id: string
  stage1_q1: string | null
  stage1_q2: string | null
  stage1_q3: string | null
  stage2_q1: string | null
  stage2_q2: string | null
  stage2_q3: string | null
  stage3_q1: string | null
  stage3_q2: string | null
  stage3_q3: string | null
  stage4_q1: string | null
  stage4_q2: string | null
  stage4_q3: string | null
  stage5_q1: string | null
  stage5_q2: string | null
  stage5_q3: string | null
  stage6_q1: string | null
  stage6_q2: string | null
  stage6_q3: string | null
  report_generated: boolean
  created_at: string
  updated_at: string
}

export interface MarketSizeEstimate {
  tam: string
  sam: string
  som: string
  comparable_markets: string
  growth_rate: string
}

export interface Competitor {
  name: string
  pricing: string
  strengths: string[]
  weaknesses: string[]
  market_position: string
}

export interface CompetitiveAnalysis {
  competitors: Competitor[]
  competitive_positioning: string
}

export interface PricingStrategy {
  recommended_model: string
  recommended_price: string
  justification: string
  comparison: string
  revenue_projection: string
}

export interface GoToMarketBrief {
  target_customer: string
  key_messaging: string
  launch_channels: string
  first_90_days: string
}

export interface ActionPlan {
  week1: string[]
  week2: string[]
  week3: string[]
  week4: string[]
  milestones: string
}

export interface Report {
  id: string
  user_id: string
  questionnaire_id: string
  validation_score: number
  // Basic fields (both plans)
  risk1: string
  risk2: string
  risk3: string
  opportunity1: string
  opportunity2: string
  opportunity3: string
  market_size_estimate: string | MarketSizeEstimate
  action_plan_30_days: string | ActionPlan
  next_step: string
  // Enhanced fields (lifetime only)
  risk1_mitigation: string | null
  risk2_mitigation: string | null
  risk3_mitigation: string | null
  opportunity1_tactics: string | null
  opportunity2_tactics: string | null
  opportunity3_tactics: string | null
  competitive_analysis: string | CompetitiveAnalysis | null
  pricing_strategy: string | PricingStrategy | null
  go_to_market_brief: string | GoToMarketBrief | null
  generated_at: string
  created_at: string
}

export interface GenerationStatus {
  canGenerate: boolean
  used: number
  limit: number | null
  isLifetime: boolean
  resetsAt: string | null
  daysUntilReset: number | null
}

export interface AuthToken {
  id: string
  email: string
  token: string
  expires_at: string
  used: boolean
  created_at: string
}

export interface Stage {
  id: number
  title: string
  questions: Question[]
}

export interface Question {
  key: string
  text: string
  hint: string
}

export interface SessionUser {
  id: string
  email: string
  name: string | null
  role: string
  plan: string
  payment_status: string
}
