"use client"
import { CircleUser } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

const LoginContainer = () => {
    const locale = useLocale();
    return (
        <Link
            href={`/${locale}/login`}
            className="flex items-center shrink-0 order-2 md:order-3 transition-colors  gap-x-2 px-2 py-1 hover:border-[rgba(62,166,255,0.5)] border border-gray-600 rounded-full hover:bg-[rgba(62,166,255,0.5)] text-[#3ea6ff]"
        >
            <CircleUser className="w-5" />
            <p className="text-sm">{locale == "vi" ? "Đăng nhập" :  "Login"}</p>
        </Link>
    );
};

export default LoginContainer;
