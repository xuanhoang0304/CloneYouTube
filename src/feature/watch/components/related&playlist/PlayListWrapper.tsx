"use client";

import { SearchPlayListResponse } from '@/common/types';
import Loading from '@/components/Loading';
import { useApi } from '@/hooks/useAPI';

import WatchPlayList from './WatchPlayList';

const PlayListWrapper = ({
    playList,
}: {
    playList: { list: string; listTitle: string; v: string; index: string };
}) => {
    const { data: playListItems, isLoading } = useApi<SearchPlayListResponse>({
        url: `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,id,contentDetails&playlistId=${playList.list}&maxResults=50`,
    });
    return (
        <>
            {isLoading && <Loading></Loading>}
            <div className="bg-[#212121] mb-6 border border-[#ccc] rounded-2xl overflow-hidden">
                <div className="p-4">
                    <h3 className="text-white text-xl line-clamp-1 font-bold">
                        {playList.listTitle}
                    </h3>
                    <h4 className="text-[#fff] text-xs mt-2">
                        {playListItems?.items[0]?.snippet?.channelTitle}
                        <span className="text-[#aaa]">
                            - {+playList.index + 1}/
                            {playListItems?.items.length}
                        </span>
                    </h4>
                </div>
                {playListItems && (
                    <WatchPlayList list={playListItems.items}></WatchPlayList>
                )}
            </div>
        </>
    );
};

export default PlayListWrapper;
