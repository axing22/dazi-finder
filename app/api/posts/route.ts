import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/posts - 获取所有帖子
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const province = searchParams.get('province');
    const city = searchParams.get('city');
    const district = searchParams.get('district');
    const keyword = searchParams.get('keyword');

    let query = supabase
      .from('posts')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    // 应用地区筛选
    if (province) {
      query = query.eq('province', province);
    }
    if (city) {
      query = query.eq('city', city);
    }
    if (district) {
      query = query.eq('district', district);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: `数据库错误: ${error.message}` },
        { status: 500 }
      );
    }

    // 客户端搜索过滤
    let filteredData = data || [];
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      filteredData = filteredData.filter(post =>
        post.activity_type.toLowerCase().includes(lowerKeyword) ||
        (post.location && post.location.toLowerCase().includes(lowerKeyword)) ||
        (post.description && post.description.toLowerCase().includes(lowerKeyword))
      );
    }

    // 转换数据格式以匹配前端期望的格式
    const formattedData = filteredData.map(post => ({
      id: post.id,
      userId: post.user_id,
      activityType: post.activity_type,
      province: post.province,
      city: post.city,
      district: post.district,
      location: post.location,
      expectedTime: post.expected_time,
      participantCount: post.participant_count,
      contactType: post.contact_type,
      contactValue: post.contact_value,
      description: post.description,
      isComplete: post.is_complete,
      isTest: post.is_test,
      status: post.status,
      createdAt: post.created_at, // 保持为字符串
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// POST /api/posts - 创建新帖子
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证必填字段
    if (!body.activityType || !body.province || !body.city || !body.district ||
        !body.expectedTime || !body.contactValue) {
      return NextResponse.json(
        { error: '缺少必填字段' },
        { status: 400 }
      );
    }

    const newPost = {
      activity_type: body.activityType,
      province: body.province,
      city: body.city,
      district: body.district,
      location: body.location || null,
      expected_time: body.expectedTime,
      participant_count: body.participantCount || null,
      contact_type: body.contactType,
      contact_value: body.contactValue,
      description: body.description || null,
      is_complete: !!(body.location && body.description),
      is_test: body.isTest !== undefined ? body.isTest : false, // 默认为 false（真实数据）
      user_id: 'anonymous', // 暂时使用匿名用户
    };

    const { data, error } = await supabase
      .from('posts')
      .insert([newPost])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '创建帖子失败' },
        { status: 500 }
      );
    }

    // 转换数据格式以匹配前端期望的格式
    const formattedPost = {
      id: data.id,
      userId: data.user_id,
      activityType: data.activity_type,
      province: data.province,
      city: data.city,
      district: data.district,
      location: data.location,
      expectedTime: data.expected_time,
      participantCount: data.participant_count,
      contactType: data.contact_type,
      contactValue: data.contact_value,
      description: data.description,
      isComplete: data.is_complete,
      isTest: data.is_test,
      status: data.status,
      createdAt: data.created_at,
    };

    return NextResponse.json(formattedPost, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
