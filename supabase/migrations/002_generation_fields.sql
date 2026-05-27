-- Add generation tracking columns to users
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS generation_count INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS generations_used_this_month INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_generation_reset TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Add enhanced report fields to reports
ALTER TABLE reports
  ADD COLUMN IF NOT EXISTS risk1_mitigation TEXT,
  ADD COLUMN IF NOT EXISTS risk2_mitigation TEXT,
  ADD COLUMN IF NOT EXISTS risk3_mitigation TEXT,
  ADD COLUMN IF NOT EXISTS opportunity1_tactics TEXT,
  ADD COLUMN IF NOT EXISTS opportunity2_tactics TEXT,
  ADD COLUMN IF NOT EXISTS opportunity3_tactics TEXT,
  ADD COLUMN IF NOT EXISTS competitive_analysis JSONB,
  ADD COLUMN IF NOT EXISTS pricing_strategy JSONB,
  ADD COLUMN IF NOT EXISTS go_to_market_brief JSONB;
