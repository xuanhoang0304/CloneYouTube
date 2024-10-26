"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { YoutubeResponseType } from '@/common/types';
import { useApi } from '@/hooks/useAPI';

const options = {
    part: "snippet,contentDetails,statistics",
    maxResults: 50,
    chart: "mostPopular",
    regionCode: "VN",
};
type TagListProps = {
    onSetUrl: (vl: string) => void;
    categoryId: string;
};
const TagList = ({ onSetUrl, categoryId }: TagListProps) => {
    const videoId = useSearchParams().get("v");
    const { data } = useApi<YoutubeResponseType>({
        url: `https://www.googleapis.com/youtube/v3/videos?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&id=${videoId}`,
    });

    const tag = [
        {
            id: 1,
            name: "Tất cả",
            url: `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&videoCategoryId=${categoryId}&type=video&maxResults=${options.maxResults}&order=date&regionCode=${options.regionCode}&location=14.0583,108.2772&locationRadius=1000km`,
            isActive: true,
        },
        {
            id: 2,
            name: `Của ${data?.items[0]?.snippet?.channelTitle}`,
            url: `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&channelId=${data?.items[0]?.snippet?.channelId}&type=video&maxResults=${options.maxResults}&order=date`,
            isActive: false,
        },
    ];
    const [tagList, setTagList] = useState<
        { id: number; name: string; isActive: boolean; url: string }[]
    >([]);
    useEffect(() => {
        setTagList(tag);
    }, [data]);
    const handleClick = (id: number) => {
        onSetUrl(tagList[id - 1].url);
        setTagList(
            tagList.map((item) =>
                item.id === id
                    ? { ...item, isActive: true }
                    : { ...item, isActive: false }
            )
        );
    };
    return (
        <ul className="flex items-center gap-x-2 overflow-x-hidden">
            {tagList.map((item) => (
                <li
                    onClick={() => handleClick(item.id)}
                    key={item.id}
                    className={`text-sm transition-colors py-2 px-3 whitespace-nowrap rounded-lg cursor-pointer ${
                        item.isActive
                            ? "bg-white text-black"
                            : "bg-[#272727] text-white"
                    }`}
                >
                    {item.name}
                </li>
            ))}
        </ul>
    );
};

export default TagList;
