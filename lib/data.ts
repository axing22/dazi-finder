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

// 地区数据(全国主要省市)
export const provinces = [
  '北京市', '上海市', '天津市', '重庆市',
  '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省',
  '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省',
  '河南省', '湖北省', '湖南省', '广东省', '海南省',
  '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省',
  '台湾省', '内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区',
  '香港特别行政区', '澳门特别行政区'
];

export const cities: Record<string, string[]> = {
  '北京市': ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区'],
  '上海市': ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'],
  '天津市': ['和平区', '河东区', '河西区', '南开区', '河北区', '红桥区', '东丽区', '西青区', '津南区', '北辰区', '武清区', '宝坻区', '滨海新区', '宁河区', '静海区', '蓟州区'],
  '重庆市': ['万州区', '涪陵区', '渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '綦江区', '大足区', '渝北区', '巴南区', '黔江区', '长寿区', '江津区', '合川区', '永川区', '南川区', '璧山区', '铜梁区', '潼南区', '荣昌区', '开州区', '梁平区', '武隆区'],
  '广东省': ['广州市', '韶关市', '深圳市', '珠海市', '汕头市', '佛山市', '江门市', '湛江市', '茂名市', '肇庆市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'],
  '湖南省': ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永州市', '怀化市', '娄底市', '湘西州'],
  '浙江省': ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'],
  '江苏省': ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'],
  '四川省': ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市', '阿坝州', '甘孜州', '凉山州'],
  // 其他省市默认使用通用区域
  'default': ['市辖区', '县级市', '县', '自治区', '特区'],
};

export const districts: Record<string, string[]> = {
  '北京市': ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区'],
  '上海市': ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'],
  '天津市': ['和平区', '河东区', '河西区', '南开区', '河北区', '红桥区', '东丽区', '西青区', '津南区', '北辰区', '武清区', '宝坻区', '滨海新区', '宁河区', '静海区', '蓟州区'],
  '重庆市': ['万州区', '涪陵区', '渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '綦江区', '大足区', '渝北区', '巴南区', '黔江区', '长寿区', '江津区', '合川区', '永川区', '南川区', '璧山区', '铜梁区', '潼南区', '荣昌区', '开州区', '梁平区', '武隆区'],
  '长沙市': ['岳麓区', '雨花区', '天心区', '开福区', '芙蓉区', '望城区', '长沙县', '浏阳市', '宁乡市'],
  '广州市': ['荔湾区', '越秀区', '海珠区', '天河区', '白云区', '黄埔区', '番禺区', '花都区', '南沙区', '从化区', '增城区'],
  '深圳市': ['罗湖区', '福田区', '南山区', '宝安区', '龙岗区', '盐田区', '龙华区', '坪山区', '光明区', '大鹏新区'],
  '杭州市': ['拱墅区', '上城区', '下城区', '江干区', '拱墅区', '西湖区', '滨江区', '萧山区', '余杭区', '临平区', '钱塘区', '富阳区', '临安区', '桐庐县', '淳安县', '建德市'],
  '南京市': ['玄武区', '秦淮区', '建邺区', '鼓楼区', '浦口区', '栖霞区', '雨花台区', '江宁区', '六合区', '溧水区', '高淳区'],
  '成都市': ['锦江区', '青羊区', '金牛区', '武侯区', '成华区', '龙泉驿区', '青白江区', '新都区', '温江区', '双流区', '郫都区', '新津区', '都江堰市', '彭州市', '邛崃市', '崇州市', '金堂县', '大邑县', '蒲江县', '简阳市'],
  // 其他城市使用默认区域
  'default': ['市辖区', '开发区', '新区', '郊区'],
};

// 时间格式化
export function formatTimeAgo(date: Date | string): string {
  const now = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diff = Math.floor((now.getTime() - targetDate.getTime()) / 1000 / 60);

  if (diff < 60) return `${diff}分钟前`;
  if (diff < 24 * 60) return `${Math.floor(diff / 60)}小时前`;
  return `${Math.floor(diff / (24 * 60))}天前`;
}
