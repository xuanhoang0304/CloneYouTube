import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Danh sách ngôn ngữ hỗ trợ
const locales = ["en", "vi"];
const defaultLocale = "vi";

// Middleware của Next Intl
const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "always",
});

// Kiểm tra route công khai
const isPublicRoute = createRouteMatcher([
    "/register(.*)",
    "/",
    "/search(.*)",
    "/login(.*)",
    "/watch(.*)",
    "/channel(.*)",
]);

export default clerkMiddleware((auth, request) => {
    const { pathname } = request.nextUrl;

    // Bỏ qua tất cả file tĩnh (ảnh, font, favicon, v.v.)
    if (/\.(avif|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf)$/i.test(pathname)) {
        return NextResponse.next();
    }
    const { userId } = auth(); // Lấy userId từ Clerk

    // Xử lý đa ngôn ngữ trước tiên
    const intlResponse = intlMiddleware(request);
    if (intlResponse) return intlResponse;

    // Nếu chưa đăng nhập và không phải route công khai => Chuyển hướng đến trang login
    if (!userId && !isPublicRoute(request)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Nếu đã đăng nhập mà truy cập trang login/register => Chuyển về trang chủ
    if (userId && ["/login", "/register"].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)", // Middleware luôn chạy với API route
    ],
};
