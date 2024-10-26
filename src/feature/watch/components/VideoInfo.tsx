"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { YoutubeItemType, YoutubeResponseType } from '@/common/types';
import { useApi } from '@/hooks/useAPI';
import calcSubscriber from '@/utils/calcSubscriber';

const VideoInfo = ({ channelId }: { channelId: string | undefined }) => {
    const { data } = useApi<YoutubeResponseType>({
        url: `https://www.googleapis.com/youtube/v3/channels?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,statistics&id=${channelId}`,
    });
    const [list, setList] = useState<YoutubeItemType[]>([]);

    useEffect(() => {
        if (data) {
            setList(data?.items);
        }
    }, [data]);
    if (list?.length <= 0) return null;
    return (
        <>
            {list?.map((item: YoutubeItemType) => (
                <div key={item.id} className="w-full flex  gap-x-3 mt-3">
                    <Link href={`channel/${item?.id}`}>
                        <figure className="size-10 rounded-full shrink-0">
                            <Image
                                src={item?.snippet?.thumbnails?.high?.url}
                                alt=""
                                width={40}
                                height={40}
                                className="img-cover rounded-full"
                            ></Image>
                        </figure>
                    </Link>
                    <div className="max-w-[257px]">
                        <Link href={`channel/${item?.snippet?.customUrl}`}>
                            <h2 className="line-clamp-1 font-medium leading-[22px] cursor-pointer">
                                {item?.snippet?.title}
                            </h2>
                        </Link>
                        <p className="text-xs leading-[18px] text-[#aaa]">
                            {calcSubscriber(item?.statistics?.subscriberCount)}
                        </p>
                    </div>
                    <button className="cursor-pointer text-sm max-h-9 leading-9 font-medium px-4  rounded-full bg-[#515255] hover:bg-[#717171] transition-colors">
                        Tham gia
                    </button>
                    <button className="cursor-pointer text-sm max-h-9 leading-9 font-medium px-4 text-black  rounded-full bg-[#fff] hover:bg-white/90 transition-colors">
                        Đăng ký
                    </button>
                </div>
            ))}
        </>
    );
};

export default VideoInfo;
