"use client";
import { Film, House, TvMinimalPlay } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import DarkMode from '@/feature/home/components/Header/DarkMode';
import { cn } from '@/lib/utils';
import { useYouTubeStore } from '@/store/store';
import { UserButton } from '@clerk/nextjs';

const MobieBottomNav = () => {
    const { token } = useYouTubeStore();
    const patchname = usePathname();
    if (!token) return null;
    return (
        <div className="lg:hidden bg-white dark:bg-[#222]/30 backdrop-blur-lg w-full py-2 fixed z-[2] bottom-0 text-center">
            <div className="flex items-center justify-around ">
                <Link
                    href="/"
                    className="flex flex-col justify-center items-center gap-y-1"
                >
                    <House
                        className={cn("w-6", patchname == "/" && "dark:fill-white fill-black")}
                    />
                    <p className="text-xs">Trang chủ</p>
                </Link>
                <Link
                    href="/sort"
                    className="flex flex-col justify-center items-center gap-y-1"
                >
                    <Film
                        className={cn(
                            "w-6",
                            patchname == "/sort" && "dark:fill-white fill-black"
                        )}
                    />
                    <p className="text-xs">Short</p>
                </Link>
                <DarkMode></DarkMode>
                <Link
                    href="/sub"
                    className="flex flex-col justify-center items-center gap-y-1"
                >
                    <TvMinimalPlay
                        className={cn(
                            "w-6",
                            patchname == "/sub" && "dark:fill-white fill-black"
                        )}
                    />
                    <p className="text-xs">Kênh đăng ký</p>
                </Link>
                <button className="flex flex-col justify-center items-center gap-y-1">
                    <UserButton></UserButton>
                    <p className="text-xs">Bạn</p>
                </button>
            </div>
        </div>
    );
};

export default MobieBottomNav;
