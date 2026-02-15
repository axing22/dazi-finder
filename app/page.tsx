'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityType, ContactType, Post } from '@/lib/types';
import { mockPosts, activityTypes, provinces, cities, districts, formatTimeAgo } from '@/lib/data';

export default function Home() {
  const [page, setPage] = useState<'home' | 'publish' | 'detail'>('home');
  const [publishStep, setPublishStep] = useState<1 | 2 | 3>(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(mockPosts);

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
  });

  // 筛选后的帖子
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      if (formData.district && post.district !== formData.district) return false;
      return true;
    });
  }, [posts, formData.district]);

  // 创建新帖子
  const handlePublish = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      userId: 'current_user',
      activityType: formData.activityType as ActivityType,
      province: formData.province,
      city: formData.city,
      district: formData.district,
      location: formData.location || undefined,
      expectedTime: formData.expectedTime,
      participantCount: formData.participantCount || undefined,
      contactType: formData.contactType,
      contactValue: formData.contactValue,
      description: formData.description || undefined,
      isComplete: !!(formData.location && formData.description),
      status: 'active',
      createdAt: new Date(),
    };

    setPosts([newPost, ...posts]);
    setPage('home');
    resetForm();
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
              <h1 className="text-2xl font-bold text-gray-800 mb-4">🎯 找搭子</h1>

              {/* 搜索框 */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="搜索活动类型..."
                  className="w-full px-4 py-3 pl-10 bg-white rounded-xl border border-gray-200 focus:border-primary focus:outline-none"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              </div>

              {/* 地区筛选 */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm whitespace-nowrap"
                >
                  <option value="">全部区域</option>
                  {districts['长沙市'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <span className="px-4 py-2 bg-primary text-white rounded-lg text-sm whitespace-nowrap">
                  📍 {formData.city}
                </span>
              </div>
            </div>

            {/* 帖子列表 */}
            <div className="space-y-3">
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
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-800">{post.activityType}</h3>
                            {!post.isComplete && (
                              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-600 text-xs rounded">信息不完整</span>
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
            </div>

            {/* 发布按钮 */}
            <motion.button
              onClick={() => setPage('publish')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center text-2xl"
            >
              +
            </motion.button>
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
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="px-4 py-3 bg-white rounded-xl border border-gray-200"
                    >
                      {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="px-4 py-3 bg-white rounded-xl border border-gray-200"
                    >
                      {cities[formData.province].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="px-4 py-3 bg-white rounded-xl border border-gray-200"
                    >
                      <option value="">选择区县</option>
                      {districts[formData.city].map(d => <option key={d} value={d}>{d}</option>)}
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedPost.activityType}</h2>

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
