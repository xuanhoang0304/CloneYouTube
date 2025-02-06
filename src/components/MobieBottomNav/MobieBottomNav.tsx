"use client";
import { Film, House, TvMinimalPlay } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useYouTubeStore } from '@/store/store';
import { UserButton } from '@clerk/nextjs';

import SettingBtn from './SettingBtn';

const MobieBottomNav = () => {
    const { token } = useYouTubeStore();
    const pathname = usePathname();
    const t = useTranslations("SideBar");
    const locale = useLocale();
    if (!token) return null;
    return (
        <div className="lg:hidden bg-white dark:bg-[#222]/30 backdrop-blur-lg w-full py-2 fixed z-[2] bottom-0 text-center">
            <div className="flex items-center justify-around ">
                <Link
                    href={`/${locale}`}
                    className="flex flex-col justify-center items-center gap-y-1"
                >
                    <House
                        className={cn(
                            "w-6",
                            pathname == `/${locale}` &&
                                "dark:fill-white fill-black"
                        )}
                    />
                    <p className="text-xs">{t("home")}</p>
                </Link>
                <Link
                    href="/short"
                    className="flex flex-col justify-center items-center gap-y-1"
                >
                    <Film
                        className={cn(
                            "w-6",
                            pathname == `/${locale}/short` && "dark:fill-white fill-black"
                        )}
                    />
                    <p className="text-xs">{t("short")}</p>
                </Link>
                <SettingBtn></SettingBtn>
                <Link
                    href="/sub"
                    className="flex flex-col justify-center items-center gap-y-1"
                >
                    <TvMinimalPlay
                        className={cn(
                            "w-6",
                            pathname == `/${locale}/sub` && "dark:fill-white fill-black"
                        )}
                    />
                    <p className="text-xs">{t("subscriptions")}</p>
                </Link>
                <button className="flex flex-col justify-center items-center gap-y-1">
                    <UserButton></UserButton>
                    <p className="text-xs">{t("you")}</p>
                </button>
            </div>
        </div>
    );
};

export default MobieBottomNav;
