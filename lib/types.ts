// 数据类型定义

export type ActivityType = '打麻将' | '打篮球' | '看电影' | '吃饭' | '逛街' | '其他';

export type ContactType = 'wechat' | 'phone';

export interface Post {
  id: string;
  userId: string;
  activityType: ActivityType;
  province: string;
  city: string;
  district: string;
  location?: string;
  expectedTime: string;
  participantCount?: string;
  contactType: ContactType;
  contactValue: string;
  description?: string;
  isComplete: boolean;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface User {
  id: string;
  posts: Post[];
}
