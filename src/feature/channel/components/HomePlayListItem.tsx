// Import Swiper styles
"use client";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Play } from 'lucide-react';
import Link from 'next/link';
import { Navigation } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useWindowSize } from 'usehooks-ts';

import {
    HomePlayListItemType, SearchPlayListItemType, SearchPlayListResponse
} from '@/common/types';
import { useApi } from '@/hooks/useAPI';

import HomePlayListVideo from './HomePlayListVideo';

const url = "https://www.googleapis.com/youtube/v3/playlistItems";

const HomePlayListItem = ({
    item,
    title,
}: {
    item: HomePlayListItemType;
    title: string;
}) => {
    const { width = 0 } = useWindowSize();
    const { data: playListItems } = useApi<SearchPlayListResponse>({
        url: item.id
            ? `${url}?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,id,contentDetails&playlistId=${item.id}&maxResults=50`
            : "",
    });
    const fristVideoId = playListItems?.items[0]?.snippet?.resourceId?.videoId;
    const position = playListItems?.items[0]?.snippet?.position;
    return (
        <li className="border-b border-[#333] pb-4">
            <div className="flex items-center gap-x-3">
                <p className="text-base md:text-xl font-bold flex-1 md:flex-none  max-w-[70%] md:max-w-[80%] line-clamp-1">
                    {item?.snippet?.title}
                </p>
                <Link
                    href={`/watch?v=${fristVideoId}&list=${item.id}&listTitle=${title}&index=${position}`}
                    className="flex gap-x-2  items-center px-4 py-2 rounded-full bg-transparent hover:bg-[var(--bg-hover-white)] dark:hover:bg-[#515255] transition-colors"
                >
                    <Play fill="white" className="w-5" />
                    <p className="text-xs md:text-base">Phát tất cả</p>
                </Link>
            </div>
            <Swiper
                spaceBetween={20}
                slidesPerView={width < 768 ? 2 : 4}
                tag="ul"
                navigation={true}
                modules={[Navigation]}
                className="HomePlayListVideoSwiper mt-4"
            >
                {playListItems?.items?.map(
                    (playListItem: SearchPlayListItemType) => (
                        <SwiperSlide key={playListItem.id} className="shrink-0">
                            <HomePlayListVideo
                                data={playListItem}
                            ></HomePlayListVideo>
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </li>
    );
};

export default HomePlayListItem;
