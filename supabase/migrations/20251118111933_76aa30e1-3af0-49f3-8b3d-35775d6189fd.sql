-- Create enum types
CREATE TYPE app_role AS ENUM ('shopper', 'ops_manager', 'admin');
CREATE TYPE order_status AS ENUM ('draft', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned');
CREATE TYPE reward_type AS ENUM ('discount_percentage', 'discount_fixed', 'free_shipping', 'bonus_points');
CREATE TYPE kb_gap_status AS ENUM ('new', 'pending', 'approved', 'rejected');
CREATE TYPE experiment_status AS ENUM ('draft', 'active', 'paused', 'completed');
CREATE TYPE agent_type AS ENUM ('coordinator', 'stylist', 'video_commerce', 'rewards', 'service', 'verification');

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  phone TEXT,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_roles table
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'shopper',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  sub_category TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  image_url TEXT,
  attributes JSONB DEFAULT '{}',
  tags TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create inventory_snapshots table
CREATE TABLE inventory_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  location TEXT DEFAULT 'warehouse_main',
  quantity INTEGER NOT NULL DEFAULT 0,
  reserved_quantity INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status order_status DEFAULT 'draft',
  total_amount DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'INR',
  shipping_address JSONB,
  billing_address JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create order_items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create reward_rules table
CREATE TABLE reward_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  type reward_type NOT NULL,
  conditions JSONB DEFAULT '{}',
  reward JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create reward_events table
CREATE TABLE reward_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id),
  rule_id UUID REFERENCES reward_rules(id),
  incentive_type TEXT NOT NULL,
  incentive_value DECIMAL(10,2) NOT NULL,
  decision_context JSONB DEFAULT '{}',
  applied_at TIMESTAMPTZ DEFAULT now()
);

-- Create agent_action_logs table
CREATE TABLE agent_action_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_type agent_type NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  intent TEXT,
  input_text TEXT,
  output_text TEXT,
  tools_used JSONB DEFAULT '[]',
  uncertainty_score DECIMAL(3,2),
  context JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create stylist_profiles table
CREATE TABLE stylist_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  style_preferences JSONB DEFAULT '{}',
  body_type TEXT,
  budget_range JSONB,
  preferred_colors TEXT[],
  preferred_brands TEXT[],
  size_info JSONB,
  geo_context TEXT,
  last_updated TIMESTAMPTZ DEFAULT now()
);

-- Create wardrobe_items table
CREATE TABLE wardrobe_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT,
  color TEXT,
  season TEXT,
  image_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create video_assets table
CREATE TABLE video_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  source_type TEXT,
  source_url TEXT,
  processed_metadata JSONB DEFAULT '{}',
  extracted_products UUID[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create knowledge_articles table
CREATE TABLE knowledge_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  tags TEXT[],
  category TEXT,
  created_by_user_id UUID REFERENCES auth.users(id),
  source_type TEXT DEFAULT 'manual',
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create kb_gap_candidates table
CREATE TABLE kb_gap_candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_query TEXT NOT NULL,
  resolved_answer_summary TEXT,
  status kb_gap_status DEFAULT 'new',
  session_id TEXT,
  agent_log_id UUID REFERENCES agent_action_logs(id),
  reviewed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ
);

-- Create experiments table
CREATE TABLE experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  status experiment_status DEFAULT 'draft',
  config JSONB DEFAULT '{}',
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create metric_snapshots table
CREATE TABLE metric_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  metric_type TEXT NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  meta JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_action_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE stylist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wardrobe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE kb_gap_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE metric_snapshots ENABLE ROW LEVEL SECURITY;

-- Create function to check roles
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON user_roles FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for products (public read, admin write)
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Ops managers can manage products" ON products FOR ALL USING (
  has_role(auth.uid(), 'ops_manager') OR has_role(auth.uid(), 'admin')
);

-- RLS Policies for inventory
CREATE POLICY "Anyone can view inventory" ON inventory_snapshots FOR SELECT USING (true);
CREATE POLICY "Ops managers can manage inventory" ON inventory_snapshots FOR ALL USING (
  has_role(auth.uid(), 'ops_manager') OR has_role(auth.uid(), 'admin')
);

-- RLS Policies for orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own orders" ON orders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Ops managers can view all orders" ON orders FOR SELECT USING (
  has_role(auth.uid(), 'ops_manager') OR has_role(auth.uid(), 'admin')
);

-- RLS Policies for order_items
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can manage own order items" ON order_items FOR ALL USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- RLS Policies for rewards
CREATE POLICY "Anyone can view active reward rules" ON reward_rules FOR SELECT USING (is_active = true);
CREATE POLICY "Ops managers can manage reward rules" ON reward_rules FOR ALL USING (
  has_role(auth.uid(), 'ops_manager') OR has_role(auth.uid(), 'admin')
);
CREATE POLICY "Users can view own reward events" ON reward_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Ops managers can view all reward events" ON reward_events FOR SELECT USING (
  has_role(auth.uid(), 'ops_manager') OR has_role(auth.uid(), 'admin')
);

-- RLS Policies for agent logs
CREATE POLICY "Users can view own agent logs" ON agent_action_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Ops managers can view all agent logs" ON agent_action_logs FOR SELECT USING (
  has_role(auth.uid(), 'ops_manager') OR has_role(auth.uid(), 'admin')
);
CREATE POLICY "System can create agent logs" ON agent_action_logs FOR INSERT WITH CHECK (true);

-- RLS Policies for stylist profiles and wardrobe
CREATE POLICY "Users can view own stylist profile" ON stylist_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own stylist profile" ON stylist_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own wardrobe" ON wardrobe_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wardrobe" ON wardrobe_items FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for video assets
CREATE POLICY "Users can view own video assets" ON video_assets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own video assets" ON video_assets FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for knowledge base
CREATE POLICY "Anyone can view published articles" ON knowledge_articles FOR SELECT USING (is_published = true);
CREATE POLICY "Ops managers can manage articles" ON knowledge_articles FOR ALL USING (
  has_role(auth.uid(), 'ops_manager') OR has_role(auth.uid(), 'admin')
);
CREATE POLICY "Ops managers can view KB gaps" ON kb_gap_candidates FOR SELECT USING (
  has_role(auth.uid(), 'ops_manager') OR has_role(auth.uid(), 'admin')
);
CREATE POLICY "System can create KB gaps" ON kb_gap_candidates FOR INSERT WITH CHECK (true);

-- RLS Policies for experiments and metrics
CREATE POLICY "Ops managers can manage experiments" ON experiments FOR ALL USING (
  has_role(auth.uid(), 'ops_manager') OR has_role(auth.uid(), 'admin')
);
CREATE POLICY "Ops managers can view metrics" ON metric_snapshots FOR SELECT USING (
  has_role(auth.uid(), 'ops_manager') OR has_role(auth.uid(), 'admin')
);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reward_rules_updated_at BEFORE UPDATE ON reward_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_knowledge_articles_updated_at BEFORE UPDATE ON knowledge_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiments_updated_at BEFORE UPDATE ON experiments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  
  INSERT INTO user_roles (user_id, role)
  VALUES (NEW.id, 'shopper');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();