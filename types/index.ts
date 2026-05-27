export interface User {
  id: string
  email: string
  name: string | null
  role: 'creator' | 'founder' | 'seller'
  plan: 'free' | 'trial' | 'monthly' | 'lifetime'
  stripe_customer_id: string | null
  payment_status: 'pending' | 'paid' | 'failed'
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

export interface Report {
  id: string
  user_id: string
  questionnaire_id: string
  validation_score: number
  risk1: string
  risk2: string
  risk3: string
  opportunity1: string
  opportunity2: string
  opportunity3: string
  market_size_estimate: string
  action_plan_30_days: string
  next_step: string
  generated_at: string
  created_at: string
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
