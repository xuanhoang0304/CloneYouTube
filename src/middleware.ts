import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);
const isProtectedRoute = createRouteMatcher(['/:locale/short(.*)', '/:locale/sub(.*)','/:locale/studio(.*)','/:locale/upload(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  // Lấy locale từ pathname (mặc định 'vi')
  const pathnameParts = req.nextUrl.pathname.split('/');
  const locale = pathnameParts[1] || 'vi';

  // Kiểm tra route cần bảo vệ & chuyển hướng nếu chưa đăng nhập
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(`${req.nextUrl.origin}/${locale}/login`);
  }

  // Luôn chạy middleware next-intl để xử lý đa ngôn ngữ
  return handleI18nRouting(req);
});

export const config = {
  matcher: ['/', '/(vi|en)/:path*']
};
