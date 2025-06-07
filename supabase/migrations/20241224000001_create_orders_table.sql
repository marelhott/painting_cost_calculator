-- supabase/migrations/20241224000001_create_orders_table.sql

-- Create orders table for storing painting cost estimates
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    surface_type TEXT,
    repair_level TEXT,
    paint_provision TEXT,
    furniture_handling TEXT,
    empty_space TEXT,
    carpet_presence TEXT,
    space_type TEXT,
    total_area DECIMAL(10,2),
    room_count INTEGER,
    ceiling_height DECIMAL(10,2),
    preferred_date TEXT,
    additional_info TEXT,
    calculated_cost DECIMAL(12,2),
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (preview mode)
CREATE POLICY "preview_allow_all"
ON public.orders
FOR ALL TO public
USING (true) WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- Create trigger for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();