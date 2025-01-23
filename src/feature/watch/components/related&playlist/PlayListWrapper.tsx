"use client";

import { X } from 'lucide-react';
import { useState } from 'react';

import { SearchPlayListResponse } from '@/common/types';
import Loading from '@/components/Loading';
import { useApi } from '@/hooks/useAPI';

import WatchPlayList from './WatchPlayList';

const PlayListWrapper = ({
    playList,
}: {
    playList: { [key: string]: string };
}) => {
    const { data: playListItems, isLoading } = useApi<SearchPlayListResponse>({
        url: `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,id,contentDetails&playlistId=${playList.list}&maxResults=50`,
    });
    const [showPlaylist,setShowPlaylist] = useState(true);
    return (
        <>
            {isLoading && <Loading></Loading>}
            <div className="dark:bg-[#212121] bg-[var(--bg-second-white)] mb-6 border border-[#ccc] rounded-2xl overflow-hidden">
                <div className="p-4">
                    <div className="flex justify-between">
                        <h3 className=" text-xl line-clamp-1 font-bold max-w-[90%]">
                            {playList.listTitle}
                        </h3>
                        <button onClick={()=> setShowPlaylist(!showPlaylist)}>
                            <X className="w-6"/>
                        </button>
                    </div>
                    <h4 className=" text-xs mt-2">
                        {playListItems?.items[0]?.snippet?.channelTitle}
                        <span className="text-[#aaa]">
                            - {+playList.index + 1}/
                            {playListItems?.items.length}
                        </span>
                    </h4>
                </div>
                {playListItems && showPlaylist && (
                    <WatchPlayList list={playListItems.items}></WatchPlayList>
                )}
            </div>
        </>
    );
};

export default PlayListWrapper;
