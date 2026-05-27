export type UserRole = 'Creator' | 'Founder' | 'Online Seller' | 'Freelancer' | 'Other'
export type CurrentTool = 'ChatGPT' | 'Notion' | 'Manual Research' | 'YouTube/Courses' | 'Other'
export type ReferralSource = 'Twitter/X' | 'Instagram' | 'TikTok' | 'Reddit' | 'Google' | 'Friend' | 'Other'
export type WaitlistStatus = 'pending' | 'invited' | 'converted'

export interface WaitlistSignup {
  id: string
  email: string
  first_name: string
  company_name?: string
  role?: UserRole
  current_tool?: CurrentTool
  pain_level?: number
  referral_source?: ReferralSource
  signup_ip?: string
  status: WaitlistStatus
  position_in_waitlist: number
  invited_at?: string
  invite_code?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface WaitlistSignupRequest {
  email: string
  first_name: string
  company_name?: string
  role?: UserRole
  current_tool?: CurrentTool
  pain_level?: number
  referral_source?: ReferralSource
}

export interface WaitlistStats {
  total: number
  byRole: Record<string, number>
  byCurrentTool: Record<string, number>
  byReferral: Record<string, number>
  byStatus: {
    pending: number
    invited: number
    converted: number
  }
  avgPainLevel: number
}
