-- ============================================================
-- Product AI Prompts — Full Database Setup
-- Run this ONCE in Supabase SQL Editor to create all tables.
-- Safe to re-run: all statements use IF NOT EXISTS / OR REPLACE.
-- ============================================================

-- ── TABLES ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email                       VARCHAR(255) UNIQUE NOT NULL,
  name                        VARCHAR(255),
  role                        VARCHAR(50)  DEFAULT 'creator',      -- creator | founder | seller
  plan                        VARCHAR(50)  DEFAULT 'free',         -- free | monthly | lifetime
  stripe_customer_id          VARCHAR(255),
  payment_status              VARCHAR(50)  DEFAULT 'pending',      -- pending | paid | failed
  generation_count            INT          DEFAULT 0,              -- total all-time
  generations_used_this_month INT          DEFAULT 0,              -- reset monthly
  last_generation_reset       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  created_at                  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at                  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS auth_tokens (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      VARCHAR(255) NOT NULL,
  token      VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used       BOOLEAN   DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questionnaires (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- Stage 1: Idea & Validation
  stage1_q1 TEXT, stage1_q2 TEXT, stage1_q3 TEXT,
  -- Stage 2: Idea Generation
  stage2_q1 TEXT, stage2_q2 TEXT, stage2_q3 TEXT,
  -- Stage 3: Problem Definition
  stage3_q1 TEXT, stage3_q2 TEXT, stage3_q3 TEXT,
  -- Stage 4: Market & User Validation
  stage4_q1 TEXT, stage4_q2 TEXT, stage4_q3 TEXT,
  -- Stage 5: Business & Feasibility
  stage5_q1 TEXT, stage5_q2 TEXT, stage5_q3 TEXT,
  -- Stage 6: Brand & Positioning
  stage6_q1 TEXT, stage6_q2 TEXT, stage6_q3 TEXT,
  report_generated BOOLEAN   DEFAULT FALSE,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reports (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL REFERENCES users(id)          ON DELETE CASCADE,
  questionnaire_id     UUID NOT NULL REFERENCES questionnaires(id) ON DELETE CASCADE,
  validation_score     INTEGER,
  -- Basic fields (all plans)
  risk1                TEXT,
  risk2                TEXT,
  risk3                TEXT,
  opportunity1         TEXT,
  opportunity2         TEXT,
  opportunity3         TEXT,
  market_size_estimate TEXT,
  action_plan_30_days  TEXT,
  next_step            TEXT,
  -- Enhanced fields (lifetime plan only — null for monthly)
  risk1_mitigation     TEXT,
  risk2_mitigation     TEXT,
  risk3_mitigation     TEXT,
  opportunity1_tactics TEXT,
  opportunity2_tactics TEXT,
  opportunity3_tactics TEXT,
  competitive_analysis JSONB,
  pricing_strategy     JSONB,
  go_to_market_brief   JSONB,
  generated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email                TEXT UNIQUE NOT NULL,
  first_name           TEXT NOT NULL,
  company_name         TEXT,
  role                 TEXT,                           -- Creator | Founder | Online Seller | Freelancer | Other
  current_tool         TEXT,                           -- ChatGPT | Notion | Manual Research | YouTube/Courses | Other
  pain_level           INT,                            -- 1-10
  referral_source      TEXT,                           -- Twitter/X | Instagram | TikTok | Reddit | Google | Friend | Other
  signup_ip            TEXT,
  status               TEXT DEFAULT 'pending',         -- pending | invited | converted
  position_in_waitlist INT NOT NULL,
  invited_at           TIMESTAMP,
  invite_code          TEXT,
  notes                TEXT,
  created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── INDEXES ──────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_users_email                  ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id     ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_auth_tokens_token            ON auth_tokens(token);
CREATE INDEX IF NOT EXISTS idx_auth_tokens_email            ON auth_tokens(email);
CREATE INDEX IF NOT EXISTS idx_questionnaires_user_id       ON questionnaires(user_id);
CREATE INDEX IF NOT EXISTS idx_questionnaires_created_at    ON questionnaires(created_at);
CREATE INDEX IF NOT EXISTS idx_reports_user_id              ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_questionnaire_id     ON reports(questionnaire_id);
CREATE INDEX IF NOT EXISTS idx_reports_created_at           ON reports(created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_email               ON waitlist_signups(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status              ON waitlist_signups(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_position            ON waitlist_signups(position_in_waitlist);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at          ON waitlist_signups(created_at DESC);

-- ── AUTO-UPDATE updated_at ────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER update_questionnaires_updated_at
  BEFORE UPDATE ON questionnaires
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON waitlist_signups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── RATE LIMITS ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS rate_limits (
  id         UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  key        TEXT      NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_key        ON rate_limits(key);
CREATE INDEX IF NOT EXISTS idx_rate_limits_created_at ON rate_limits(created_at);

-- ── SHARE TOKEN (reports) ─────────────────────────────────────
-- Safe to run on existing DB — adds column only if it doesn't exist.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'share_token'
  ) THEN
    ALTER TABLE reports ADD COLUMN share_token TEXT UNIQUE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_reports_share_token ON reports(share_token);

-- ── VERIFY ───────────────────────────────────────────────────
-- Run this after setup to confirm all tables exist:
--
-- SELECT table_name
-- FROM information_schema.tables
-- WHERE table_schema = 'public'
-- ORDER BY table_name;
--
-- Expected output:
--   auth_tokens
--   questionnaires
--   rate_limits
--   reports
--   users
--   waitlist_signups
