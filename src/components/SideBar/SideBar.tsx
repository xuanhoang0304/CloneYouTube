"use client"
import {
    ArrowDownToLine, ChevronRight, Clapperboard, Clock4, Flame, Gamepad2, History, House, ListVideo,
    Music, Newspaper, SquarePlay, ThumbsUp, TvMinimalPlay, Youtube
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import SubscriptionsList from '@/components/SideBar/SubscriptionsList';
import { useYouTubeStore } from '@/store/store';

import SideBarLine from './SideBarLine';
import SideBarTabList from './SideBarTabList';

const SideBar = () => {
    const {token} = useYouTubeStore();
    const t = useTranslations("SideBar");
    const locale = useLocale();
    const TabList = [
        {
            id: 0,
            icon: <House className="w-5" />,
            name: t("home"),
            href: `/${locale}`,
        },
        {
            id: 1,
            icon: <Clapperboard className="w-5" />,
            name: t("short"),
            href: `/${locale}/short`,
        },
        {
            id: 2,
            icon: <TvMinimalPlay className="w-5" />,
            name: t("subscriptions"),
            href: `/${locale}/sub`,
        },
        {
            id: 3,
            icon: <SquarePlay className="w-5" />,
            name: "YouTube Studio",
            href: `/${locale}/studio`
        },
        {
            id: 4,
            icon: <History className="w-5" />,
            name: t("history"),
            href: "/feed/history",
        },
        {
            id: 5,
            icon: <ListVideo className="w-5" />,
            name: t("playlists"),
            href: "/feed/playlist",
        },
        {
            id: 6,
            icon: <Youtube className="w-5" />,
            name: t("yourvideos"),
            href: "/feed/channel/videos",
        },
        {
            id: 7,
            icon: <Clock4 className="w-5" />,
            name: t("watchlater"),
            href: "/playlist?list=WL",
        },
        {
            id: 8,
            icon: <ThumbsUp className="w-5" />,
            name: "Video đã thích",
            href: "/playlist?list=LL",
        },
        {
            id: 9,
            icon: <ArrowDownToLine className="w-5" />,
            name: "Nội dung tải xuống",
            href: "/feed/download",
        },
        {
            id: 10,
            icon: <Flame className="w-5" />,
            name: t("trending"),
            href: "/feed/trending",
        },
        {
            id: 11,
            icon: <Music className="w-5" />,
            name: t("music"),
            href: "#",
        },
        {
            id: 12,
            icon: <Gamepad2 className="w-5" />,
            name: t("gaming"),
            href: "/gaming",
        },
        {
            id: 13,
            icon: <Newspaper className="w-5" />,
            name: t("news"),
            href: "/news",
        },
    ];
    return (
        <div className="hidden lg:block ">
            <div className="w-[240px] h-[calc(100vh-60px)] bg-white dark:bg-black  py-3 mb-10 px-4 overflow-hidden hover:overflow-auto  fixed z-40 top-[56px] left-0 ">
                <SideBarTabList list={TabList.slice(0, 4)}></SideBarTabList>
                <SideBarLine></SideBarLine>
                <Link
                    href={`/${locale}/feed/you`}
                    className="flex items-center gap-x-3 w-[198px] transition-colors p-2 hover:bg-[var(--bg-second-white)] dark:hover:bg-primary-bgcl rounded-lg cursor-pointer"
                >
                    <p className="text-sm font-bold">{t("you")}</p>
                    <ChevronRight className="w-5" />
                </Link>
                <SideBarTabList list={TabList.slice(4, 10)}></SideBarTabList>
                <SideBarLine></SideBarLine>
                {token && (
                    <>
                        <h2 className="font-medium my-3 leading-[22px]">
                           {t("subscriptions")}
                        </h2>
                        <SubscriptionsList token={token}></SubscriptionsList>
                        <SideBarLine></SideBarLine>
                    </>
                )}

                <h2 className="font-medium my-3 leading-[22px]">{t("explore")} </h2>
                <SideBarTabList list={TabList.slice(10)}></SideBarTabList>
            </div>
        </div>
    );
};
export default SideBar;
