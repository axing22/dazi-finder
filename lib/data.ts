import { Post } from './types';

// 测试数据
export const mockPosts: Post[] = [
  {
    id: '1',
    userId: 'user1',
    activityType: '打麻将',
    province: '湖南省',
    city: '长沙市',
    district: '岳麓区',
    location: '万达广场3楼棋牌室',
    expectedTime: '今天 20:00',
    participantCount: '3缺1',
    contactType: 'wechat',
    contactValue: 'changsha_mahjong123',
    description: '新手局,20元一局,女生优先',
    isComplete: true,
    status: 'active',
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5分钟前
  },
  {
    id: '2',
    userId: 'user2',
    activityType: '打篮球',
    province: '湖南省',
    city: '长沙市',
    district: '雨花区',
    location: '德思勤篮球场',
    expectedTime: '明天 14:00',
    participantCount: '4缺2',
    contactType: 'phone',
    contactValue: '138****1234',
    description: '业余水平,不强求,一起锻炼身体',
    isComplete: false,
    status: 'active',
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30分钟前
  },
  {
    id: '3',
    userId: 'user3',
    activityType: '看电影',
    province: '湖南省',
    city: '长沙市',
    district: '天心区',
    location: 'IFS国金中心万达影城',
    expectedTime: '今天 19:30',
    participantCount: '2缺1',
    contactType: 'wechat',
    contactValue: 'movie_lover_cs',
    description: '想看《热辣滚烫》,AA制',
    isComplete: true,
    status: 'active',
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1小时前
  },
  {
    id: '4',
    userId: 'user4',
    activityType: '吃饭',
    province: '湖南省',
    city: '长沙市',
    district: '开福区',
    location: '五一广场',
    expectedTime: '今天 18:00',
    participantCount: '2缺1',
    contactType: 'phone',
    contactValue: '139****5678',
    description: '想尝试长沙特色菜,有没有小伙伴一起',
    isComplete: false,
    status: 'active',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小时前
  },
  {
    id: '5',
    userId: 'user5',
    activityType: '逛街',
    province: '湖南省',
    city: '长沙市',
    district: '芙蓉区',
    location: '黄兴路步行街',
    expectedTime: '明天 15:00',
    participantCount: '2缺1',
    contactType: 'wechat',
    contactValue: 'shopping_queen',
    description: '想买春节新衣服,求搭配建议',
    isComplete: false,
    status: 'active',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3小时前
  },
];

// 活动类型配置
export const activityTypes = [
  { type: '打麻将' as const, icon: '🎯', color: 'bg-red-100 text-red-600' },
  { type: '打篮球' as const, icon: '🏀', color: 'bg-orange-100 text-orange-600' },
  { type: '看电影' as const, icon: '🎬', color: 'bg-purple-100 text-purple-600' },
  { type: '吃饭' as const, icon: '🍜', color: 'bg-yellow-100 text-yellow-600' },
  { type: '逛街' as const, icon: '🛍️', color: 'bg-pink-100 text-pink-600' },
  { type: '其他' as const, icon: '➕', color: 'bg-gray-100 text-gray-600' },
];

// 地区数据
export const provinces = ['湖南省'];
export const cities: Record<string, string[]> = {
  '湖南省': ['长沙市', '株洲市', '湘潭市'],
};
export const districts: Record<string, string[]> = {
  '长沙市': ['岳麓区', '雨花区', '天心区', '开福区', '芙蓉区'],
  '株洲市': ['荷塘区', '芦淞区', '石峰区', '天元区'],
  '湘潭市': ['雨湖区', '岳塘区'],
};

// 时间格式化
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);

  if (diff < 60) return `${diff}分钟前`;
  if (diff < 24 * 60) return `${Math.floor(diff / 60)}小时前`;
  return `${Math.floor(diff / (24 * 60))}天前`;
}
