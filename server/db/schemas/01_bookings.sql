-- 01_bookings.sql
-- Run this in your Supabase SQL Editor

-- 1. Create businesses (Tenants) table
CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    booking_provider TEXT NOT NULL DEFAULT 'INTERNAL', -- 'INTERNAL', 'FRESHA', 'WEBHOOK'
    provider_config JSONB DEFAULT '{}'::jsonb, -- Store API keys here securely (encrypted by backend)
    owner_id UUID REFERENCES auth.users(id), -- Nullable for dummy data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on businesses
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
-- Policy: Allow users to access their own businesses, or dummy data where owner_id is NULL
CREATE POLICY "Users can manage their businesses" ON businesses FOR ALL 
USING (owner_id IS NULL OR auth.uid() = owner_id);


-- 2. Create booking_sessions (Short-term memory)
CREATE TABLE IF NOT EXISTS booking_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL UNIQUE,
    business_id UUID REFERENCES businesses(id) NOT NULL,
    status TEXT NOT NULL DEFAULT 'IN_PROGRESS', 
    extracted_data JSONB DEFAULT '{}'::jsonb, -- Stores name, phone, date, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE booking_sessions ENABLE ROW LEVEL SECURITY;
-- Policy: Allow access where business_id matches a business the user owns (or a dummy business)
CREATE POLICY "Users can manage their booking_sessions" ON booking_sessions FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM businesses b 
    WHERE b.id = booking_sessions.business_id 
    AND (b.owner_id IS NULL OR auth.uid() = b.owner_id)
  )
);


-- 3. Create actual bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES businesses(id) NOT NULL,
    external_reference_id TEXT, -- Maps to Fresha ID
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT, -- Important for messaging MVP
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    service_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'CONFIRMED', 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- Policy: Allow access where business_id matches a business the user owns (or a dummy business)
CREATE POLICY "Users can manage their bookings" ON bookings FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM businesses b 
    WHERE b.id = bookings.business_id 
    AND (b.owner_id IS NULL OR auth.uid() = b.owner_id)
  )
);


-- 4. Add an updated_at trigger for booking_sessions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_booking_sessions_modtime
BEFORE UPDATE ON booking_sessions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
