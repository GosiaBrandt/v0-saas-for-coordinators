-- Create cases table for storing sprawy
CREATE TABLE IF NOT EXISTS public.cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('senior', 'volunteer', 'match')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'waiting', 'closed')),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  coordinator_id TEXT,
  coordinator_name TEXT,
  related_person_name TEXT,
  related_person_phone TEXT,
  operational_note TEXT,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS cases_status_idx ON public.cases(status);
CREATE INDEX IF NOT EXISTS cases_priority_idx ON public.cases(priority);
CREATE INDEX IF NOT EXISTS cases_type_idx ON public.cases(type);
CREATE INDEX IF NOT EXISTS cases_created_at_idx ON public.cases(created_at DESC);

-- Enable RLS (for now allow all operations - can be restricted later with auth)
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (no auth required for MVP)
CREATE POLICY "Allow all operations on cases" ON public.cases
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_cases_updated_at ON public.cases;
CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON public.cases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
