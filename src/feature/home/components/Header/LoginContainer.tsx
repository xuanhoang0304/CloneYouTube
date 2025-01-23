import { CircleUser } from "lucide-react";
import Link from "next/link";

const LoginContainer = () => {
    return (
        <Link
            href="/login"
            className="flex items-center order-2 md:order-3 transition-colors  gap-x-3 px-2 py-1 hover:border-[rgba(62,166,255,0.5)] border border-gray-600 rounded-full hover:bg-[rgba(62,166,255,0.5)] text-[#3ea6ff]"
        >
            <CircleUser className="w-5" />
            <p className="text-sm">Đăng nhập</p>
        </Link>
    );
};

export default LoginContainer;
