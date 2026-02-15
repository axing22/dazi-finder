-- 创建 posts 表
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'anonymous',
  activity_type TEXT NOT NULL CHECK (activity_type IN ('打麻将', '打篮球', '看电影', '吃饭', '逛街', '其他')),
  province TEXT NOT NULL,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  location TEXT,
  expected_time TEXT NOT NULL,
  participant_count TEXT,
  contact_type TEXT NOT NULL CHECK (contact_type IN ('wechat', 'phone')),
  contact_value TEXT NOT NULL,
  description TEXT,
  is_complete BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_province ON posts(province);
CREATE INDEX IF NOT EXISTS idx_posts_city ON posts(city);
CREATE INDEX IF NOT EXISTS idx_posts_district ON posts(district);
CREATE INDEX IF NOT EXISTS idx_posts_activity_type ON posts(activity_type);

-- 启用行级安全性 (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取数据
CREATE POLICY "允许所有人查看帖子" ON posts
  FOR SELECT
  USING (true);

-- 允许所有人创建数据
CREATE POLICY "允许所有人创建帖子" ON posts
  FOR INSERT
  WITH CHECK (true);

-- 允许所有人更新自己的数据
CREATE POLICY "允许用户更新自己的帖子" ON posts
  FOR UPDATE
  USING (user_id = 'anonymous');

-- 允许所有人删除自己的数据
CREATE POLICY "允许用户删除自己的帖子" ON posts
  FOR DELETE
  USING (user_id = 'anonymous');

-- 添加注释
COMMENT ON TABLE posts IS '找搭子帖子表';
COMMENT ON COLUMN posts.activity_type IS '活动类型：打麻将、打篮球、看电影、吃饭、逛街、其他';
COMMENT ON COLUMN posts.province IS '省份';
COMMENT ON COLUMN posts.city IS '城市';
COMMENT ON COLUMN posts.district IS '区县';
COMMENT ON COLUMN posts.location IS '具体地点';
COMMENT ON COLUMN posts.expected_time IS '期望时间';
COMMENT ON COLUMN posts.participant_count IS '人数要求';
COMMENT ON COLUMN posts.contact_type IS '联系方式类型：wechat、phone';
COMMENT ON COLUMN posts.contact_value IS '联系方式值：微信号或手机号';
COMMENT ON COLUMN posts.description IS '活动详情描述';
COMMENT ON COLUMN posts.is_complete IS '信息是否完整';
COMMENT ON COLUMN posts.status IS '状态：active、completed、cancelled';
