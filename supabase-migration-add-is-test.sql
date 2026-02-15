-- 添加 is_test 字段到 posts 表
-- 用于标识测试数据，避免在真实环境中被误认为真实数据

ALTER TABLE posts ADD COLUMN IF NOT EXISTS is_test BOOLEAN DEFAULT true;

-- 添加注释
COMMENT ON COLUMN posts.is_test IS '是否为测试数据：默认为 true，避免测试数据在真实环境中被误认为是真实数据';

-- 更新现有数据，将所有现有数据标记为测试数据（安全起见）
UPDATE posts SET is_test = true WHERE is_test IS NULL;
