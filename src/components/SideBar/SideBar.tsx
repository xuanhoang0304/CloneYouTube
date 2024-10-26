import {
    ArrowDownToLine, ChevronRight, Clapperboard, Clock4, Flame, Gamepad2, History, House, ListVideo,
    Music, Newspaper, SquarePlay, ThumbsUp, TvMinimalPlay, Youtube
} from 'lucide-react';
import Link from 'next/link';

import SubscriptionsList from '@/components/SideBar/SubscriptionsList';
import { getAccessToken } from '@/utils/getAccessToken';

import SideBarLine from './SideBarLine';
import SideBarTabList from './SideBarTabList';

const TabList = [
    {
        id: 0,
        icon: <House className="w-5" />,
        name: "Trang chủ",
        href: "/",
    },
    {
        id: 1,
        icon: <Clapperboard className="w-5" />,
        name: "Shorts",
        href: "/shorts",
    },
    {
        id: 2,
        icon: <TvMinimalPlay className="w-5" />,
        name: "Kênh đăng ký",
        href: "/sub",
    },
    {
        id: 3,
        icon: <SquarePlay className="w-5" />,
        name: "YouTube Music",
        href: "/ytmusic",
    },
    {
        id: 4,
        icon: <History className="w-5" />,
        name: "Video đã xem",
        href: "/feed/history",
    },
    {
        id: 5,
        icon: <ListVideo className="w-5" />,
        name: "Danh sách phát",
        href: "/feed/playlist",
    },
    {
        id: 6,
        icon: <Youtube className="w-5" />,
        name: "Video của bạn",
        href: "/feed/channel/videos",
    },
    {
        id: 7,
        icon: <Clock4 className="w-5" />,
        name: "Xem sau",
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
        name: "Thịnh hành",
        href: "/feed/trending",
    },
    {
        id: 11,
        icon: <Music className="w-5" />,
        name: "Âm nhạc",
        href: "#",
    },
    {
        id: 12,
        icon: <Gamepad2 className="w-5" />,
        name: "Trò chơi",
        href: "/gaming",
    },
    {
        id: 13,
        icon: <Newspaper className="w-5" />,
        name: "Tin tức",
        href: "/news",
    },
];

const SideBar = async () => {
    const token = await getAccessToken();
    return (
        <section className=" w-[240px] h-[calc(100vh-60px)]  py-3 mb-10 px-4 overflow-hidden hover:overflow-auto  fixed z-40 top-[56px] left-0 ">
            <SideBarTabList list={TabList.slice(0, 4)}></SideBarTabList>
            <SideBarLine></SideBarLine>
            <Link
                href={"/feed/you"}
                className="flex items-center gap-x-3 w-[198px] transition-colors p-2 hover:bg-[#717171] rounded-lg cursor-pointer"
            >
                <p className="text-sm">Bạn</p>
                <ChevronRight className="w-5" />
            </Link>
            <SideBarTabList list={TabList.slice(4, 10)}></SideBarTabList>
            <SideBarLine></SideBarLine>
            {token && (
                <>
                    <h2 className="font-medium my-3 leading-[22px]">
                        Kênh đăng ký{" "}
                    </h2>
                    <SubscriptionsList token={token}></SubscriptionsList>
                    <SideBarLine></SideBarLine>
                </>
            )}
            
            <h2 className="font-medium my-3 leading-[22px]">Khám phá </h2>
            <SideBarTabList list={TabList.slice(10)}></SideBarTabList>
        </section>
    );
};
export default SideBar;
