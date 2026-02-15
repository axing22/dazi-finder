'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityType, ContactType, Post } from '@/lib/types';
import { activityTypes, provinces, cities, districts, formatTimeAgo } from '@/lib/data';

export default function Home() {
  const [page, setPage] = useState<'home' | 'publish' | 'detail'>('home');
  const [publishStep, setPublishStep] = useState<1 | 2 | 3>(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // 发布表单状态
  const [formData, setFormData] = useState({
    activityType: '' as ActivityType | '',
    province: '湖南省',
    city: '长沙市',
    district: '',
    location: '',
    expectedTime: '',
    participantCount: '',
    contactType: 'wechat' as ContactType,
    contactValue: '',
    description: '',
    isTest: false, // 默认为真实数据
  });

  // 搜索关键词
  const [searchKeyword, setSearchKeyword] = useState('');

  // 从 API 获取帖子数据
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setApiError(null);
      const params = new URLSearchParams();
      if (formData.province) params.append('province', formData.province);
      if (formData.city) params.append('city', formData.city);
      if (formData.district) params.append('district', formData.district);
      if (searchKeyword) params.append('keyword', searchKeyword);

      const response = await fetch(`/api/posts?${params.toString()}`);

      // 检查响应状态
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API 错误: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('获取帖子失败:', error);
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      setApiError(errorMessage);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // 筛选后的帖子（直接使用从 API 返回的数据）
  const filteredPosts = posts;

  // 创建新帖子
  const handlePublish = async () => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('发布失败');
      }

      const newPost = await response.json();

      // 刷新帖子列表
      await fetchPosts();
      setPage('home');
      resetForm();

      alert('发布成功！');
    } catch (error) {
      console.error('发布失败:', error);
      alert('发布失败，请稍后重试');
    }
  };

  // 重置表单
  const resetForm = () => {
    setFormData({
      activityType: '' as ActivityType | '',
      province: '湖南省',
      city: '长沙市',
      district: '',
      location: '',
      expectedTime: '',
      participantCount: '',
      contactType: 'wechat' as ContactType,
      contactValue: '',
      description: '',
      isTest: false, // 重置时也保持真实数据模式
    });
    setPublishStep(1);
  };

  // 获取活动类型配置
  const getActivityConfig = (type: ActivityType) => {
    return activityTypes.find(t => t.type === type) || activityTypes[activityTypes.length - 1];
  };

  return (
    <div className="min-h-screen pb-20">
      <AnimatePresence mode="wait">
        {/* 首页 */}
        {page === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto p-4"
          >
            {/* 头部 */}
            <div className="sticky top-0 bg-[#F7F9FC] pb-4 pt-2 z-10">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800">🎯 找搭子</h1>
                <motion.button
                  onClick={() => setPage('publish')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full shadow-lg text-base font-semibold"
                >
                  <span className="text-xl">+</span>
                  <span>发布找搭子</span>
                </motion.button>
              </div>

              {/* 搜索框 */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="搜索活动类型、地点..."
                  value={searchKeyword}
                  onChange={async (e) => {
                    setSearchKeyword(e.target.value);
                    // 使用防抖，延迟 500ms 后搜索
                    setTimeout(() => fetchPosts(), 500);
                  }}
                  className="w-full px-4 py-3 pl-10 bg-white rounded-xl border border-gray-200 focus:border-primary focus:outline-none"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              </div>

              {/* 地区筛选 */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                <select
                  value={formData.province}
                  onChange={async (e) => {
                    const province = e.target.value;
                    const cityList = cities[province] || cities['default'];
                    setFormData({
                      ...formData,
                      province,
                      city: cityList[0],
                      district: ''
                    });
                    // 重新获取数据
                    await fetchPosts();
                  }}
                  className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm whitespace-nowrap"
                >
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select
                  value={formData.city}
                  onChange={async (e) => {
                    const city = e.target.value;
                    const districtList = districts[city] || districts['default'];
                    setFormData({
                      ...formData,
                      city,
                      district: ''
                    });
                    // 重新获取数据
                    await fetchPosts();
                  }}
                  className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm whitespace-nowrap"
                >
                  {(cities[formData.province] || cities['default']).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select
                  value={formData.district}
                  onChange={async (e) => {
                    setFormData({ ...formData, district: e.target.value });
                    // 重新获取数据
                    await fetchPosts();
                  }}
                  className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm whitespace-nowrap"
                >
                  <option value="">全部区域</option>
                  {(districts[formData.city] || districts['default']).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 帖子列表 */}
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-8 text-gray-500">
                  加载中...
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <div className="text-gray-500 mb-4">暂无数据</div>
                  {apiError ? (
                    <div className="text-sm text-gray-400 bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="font-semibold text-red-700 mb-2">⚠️ 连接失败</p>
                      <p className="text-red-600 text-sm mb-2">
                        错误信息: {apiError}
                      </p>
                      <p className="text-red-600 text-xs">
                        请检查 Supabase 配置是否正确。查看浏览器控制台（F12）获取更多详细信息。
                      </p>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="font-semibold text-blue-700 mb-2">👋 欢迎使用找搭子平台</p>
                      <p className="text-blue-600 text-sm">
                        还没有帖子，快来发布第一个找搭子活动吧！
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <AnimatePresence>
                  {filteredPosts.map((post, index) => {
                  const config = getActivityConfig(post.activityType);
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setSelectedPost(post);
                        setPage('detail');
                      }}
                      className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-xl ${config.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                          {config.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-bold text-gray-800">{post.activityType}</h3>
                            {!post.isComplete && (
                              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-600 text-xs rounded">信息不完整</span>
                            )}
                            {post.isTest && (
                              <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded font-semibold">🧪 测试</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center gap-2">
                              <span>📍</span>
                              <span>{post.district}</span>
                              {post.location && <span>· {post.location}</span>}
                            </div>
                            <div className="flex items-center gap-2">
                              <span>⏰</span>
                              <span>{post.expectedTime}</span>
                            </div>
                            {post.participantCount && (
                              <div className="flex items-center gap-2">
                                <span>👤</span>
                                <span>{post.participantCount}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                            <span>{formatTimeAgo(post.createdAt)}</span>
                            <span>💬 {post.contactType === 'wechat' ? '微信' : '电话'}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}

        {/* 发布页面 */}
        {page === 'publish' && (
          <motion.div
            key="publish"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto p-4"
          >
            {/* 头部 */}
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setPage('home')} className="text-2xl">←</button>
              <h1 className="text-2xl font-bold text-gray-800">发布找搭子</h1>
            </div>

            {/* 步骤指示器 */}
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-1 rounded-full ${publishStep >= step ? 'bg-primary' : 'bg-gray-200'}`}
                />
              ))}
            </div>

            {/* Step 1: 选择活动类型 */}
            {publishStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-gray-700">选择活动类型</h2>
                <div className="grid grid-cols-3 gap-3">
                  {activityTypes.map(({ type, icon, color }) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, activityType: type })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.activityType === type
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 bg-white hover:border-primary/50'
                      }`}
                    >
                      <div className={`text-3xl mb-2 ${color.split(' ')[0]} ${color.split(' ')[1]}`}>{icon}</div>
                      <div className="text-sm font-medium">{type}</div>
                    </motion.button>
                  ))}
                </div>
                <button
                  onClick={() => setPublishStep(2)}
                  disabled={!formData.activityType}
                  className="w-full py-3 bg-primary text-white rounded-xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  下一步
                </button>
              </motion.div>
            )}

            {/* Step 2: 填写时间地点 */}
            {publishStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-gray-700">填写时间地点</h2>

                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <select
                      value={formData.province}
                      onChange={(e) => {
                        const province = e.target.value;
                        const cityList = cities[province] || cities['default'];
                        setFormData({
                          ...formData,
                          province,
                          city: cityList[0],
                          district: ''
                        });
                      }}
                      className="px-4 py-3 bg-white rounded-xl border border-gray-200"
                    >
                      {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select
                      value={formData.city}
                      onChange={(e) => {
                        const city = e.target.value;
                        const districtList = districts[city] || districts['default'];
                        setFormData({
                          ...formData,
                          city,
                          district: ''
                        });
                      }}
                      className="px-4 py-3 bg-white rounded-xl border border-gray-200"
                    >
                      {(cities[formData.province] || cities['default']).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="px-4 py-3 bg-white rounded-xl border border-gray-200"
                    >
                      <option value="">选择区县</option>
                      {(districts[formData.city] || districts['default']).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder="具体地点 (选填,如:万达广场3楼)"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200"
                  />

                  <input
                    type="text"
                    placeholder="时间 (必填,如:今天 20:00)"
                    value={formData.expectedTime}
                    onChange={(e) => setFormData({ ...formData, expectedTime: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200"
                  />

                  <input
                    type="text"
                    placeholder="人数要求 (选填,如:3缺1)"
                    value={formData.participantCount}
                    onChange={(e) => setFormData({ ...formData, participantCount: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setPublishStep(1)}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold"
                  >
                    上一步
                  </button>
                  <button
                    onClick={() => setPublishStep(3)}
                    disabled={!formData.district || !formData.expectedTime}
                    className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    下一步
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: 填写联系方式 */}
            {publishStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-gray-700">填写联系方式</h2>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setFormData({ ...formData, contactType: 'wechat' })}
                      className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${
                        formData.contactType === 'wechat'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 bg-white text-gray-700'
                      }`}
                    >
                      微信
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, contactType: 'phone' })}
                      className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${
                        formData.contactType === 'phone'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 bg-white text-gray-700'
                      }`}
                    >
                      手机
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder={formData.contactType === 'wechat' ? '微信号 (必填)' : '手机号 (必填)'}
                    value={formData.contactValue}
                    onChange={(e) => setFormData({ ...formData, contactValue: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200"
                  />

                  <textarea
                    placeholder="活动详情说明 (选填,建议填写以提高匹配率)&#10;如:新手局,20元一局,女生优先"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 h-24 resize-none"
                  />

                  {/* 测试数据选项 */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isTest}
                        onChange={(e) => setFormData({ ...formData, isTest: e.target.checked })}
                        className="mt-1 w-4 h-4 text-primary rounded"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-700 text-sm">🧪 这是测试数据</div>
                        <div className="text-xs text-gray-600 mt-1">
                          勾选后，帖子会显示"测试"标签。仅在测试时勾选，正式发布请保持不勾选状态。
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setPublishStep(2)}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold"
                  >
                    上一步
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={!formData.contactValue}
                    className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    发布
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* 详情页面 */}
        {page === 'detail' && selectedPost && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto p-4"
          >
            {/* 头部 */}
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setPage('home')} className="text-2xl">←</button>
              <h1 className="text-xl font-bold text-gray-800">活动详情</h1>
            </div>

            {/* 内容 */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              {(() => {
                const config = getActivityConfig(selectedPost.activityType);
                return (
                  <>
                    <div className={`w-16 h-16 rounded-2xl ${config.color} flex items-center justify-center text-4xl mb-4`}>
                      {config.icon}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">{selectedPost.activityType}</h2>
                      {selectedPost.isTest && (
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded font-semibold">🧪 测试</span>
                      )}
                    </div>

                    <div className="space-y-3 text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📍</span>
                        <span>{selectedPost.district}</span>
                        {selectedPost.location && <span>· {selectedPost.location}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">⏰</span>
                        <span>{selectedPost.expectedTime}</span>
                      </div>
                      {selectedPost.participantCount && (
                        <div className="flex items-center gap-2">
                          <span className="text-lg">👤</span>
                          <span>{selectedPost.participantCount}</span>
                        </div>
                      )}
                    </div>

                    {selectedPost.description && (
                      <div className="border-t border-gray-100 pt-4 mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2">活动详情</h3>
                    <p className="text-gray-600">{selectedPost.description}</p>
                      </div>
                    )}

                    <div className="border-t border-gray-100 pt-4 mb-4">
                      <h3 className="font-semibold text-gray-700 mb-2">联系方式</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📱</span>
                        <span className="text-gray-800">
                          {selectedPost.contactType === 'wechat' ? '微信' : '电话'}: {selectedPost.contactValue}
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedPost.contactValue);
                            alert('已复制到剪贴板');
                          }}
                          className="px-3 py-1 bg-primary text-white text-sm rounded-lg"
                        >
                          复制
                        </button>
                        {selectedPost.contactType === 'phone' && (
                          <a
                            href={`tel:${selectedPost.contactValue}`}
                            className="px-3 py-1 bg-secondary text-white text-sm rounded-lg"
                          >
                            拨打
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>📅 {formatTimeAgo(selectedPost.createdAt)}</span>
                      <span className={selectedPost.isComplete ? 'text-green-500' : 'text-yellow-500'}>
                        {selectedPost.isComplete ? '✅ 信息完整' : '⚠️ 信息不完整'}
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
