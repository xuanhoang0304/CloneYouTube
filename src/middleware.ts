import { NextResponse } from "next/server";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    "/register(.*)",
    "/",
    "/search(.*)",
    "/login(.*)",
    "/watch(.*)",
    "/channel(.*)",
]);

export default clerkMiddleware((auth, request) => {
    const { userId } = auth(); // Lấy thông tin đăng nhập từ Clerk kiểm tra trạng thái đăng nhập

    if (!userId && !isPublicRoute(request)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (userId && request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (userId && request.nextUrl.pathname === "/register") {
        return NextResponse.redirect(new URL("/", request.url));
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
