-- ============================================
-- COPY AND PASTE THIS INTO SUPABASE SQL EDITOR
-- ============================================

CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  blocked_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(car_id, blocked_date)
);

CREATE INDEX IF NOT EXISTS idx_blocked_dates_car_id ON blocked_dates(car_id);
CREATE INDEX IF NOT EXISTS idx_blocked_dates_date ON blocked_dates(blocked_date);

ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on blocked_dates" ON blocked_dates;
DROP POLICY IF EXISTS "Allow authenticated users to manage blocked_dates" ON blocked_dates;

CREATE POLICY "Allow public read access on blocked_dates" 
  ON blocked_dates FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage blocked_dates" 
  ON blocked_dates FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- DONE! Table created successfully
-- ============================================

