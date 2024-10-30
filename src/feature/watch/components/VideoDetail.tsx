"use client";
import dynamic from 'next/dynamic';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { YoutubeResponseType } from '@/common/types';
import { useApi } from '@/hooks/useAPI';
import { useYouTubeStore } from '@/store/store';

import CommentContainer from './Comment';
import VideoInfo from './VideoInfo';
import VideoLikeAction from './VideoLikeAction';
import VideoPlayer from './VideoPlayer';

const VideoDesc = dynamic(
    () => import("@/feature/watch/components/VideoDesc"),
    {
        ssr: false,
    }
);
const VideoDetail = ({ token }: { token: string | undefined }) => {
    const { setToken } = useYouTubeStore();

    useEffect(() => {
        if (token) setToken(token);
    }, [token, setToken]);

    const id = useSearchParams().get("v");
    let videoDetail ;
    const { data } = useApi<YoutubeResponseType>({
        url: `https://www.googleapis.com/youtube/v3/videos?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,statistics&id=${id}`,
    });
    if (data) videoDetail = data?.items[0];
    if (data?.items.length === 0) {
        notFound();
    }
    return (
        <>
            <div className="w-full max-h-[500px] rounded-2xl">
                <VideoPlayer></VideoPlayer>
                <h1 className="text-[20px] mt-4 line-clamp-2 font-bold leading-7">
                    {videoDetail?.snippet?.title}
                </h1>
                <div className="flex items-center justify-between">
                    <VideoInfo
                        channelId={videoDetail?.snippet?.channelId}
                    ></VideoInfo>

                    <VideoLikeAction token={token} videoId={videoDetail?.id} ></VideoLikeAction>
                </div>
                {videoDetail?.snippet?.description && (
                    <VideoDesc
                        desc={videoDetail?.snippet?.description}
                    ></VideoDesc>
                )}
                <CommentContainer
                    totalComment={videoDetail?.statistics?.commentCount}
                ></CommentContainer>
            </div>
        </>
    );
};

export default VideoDetail;
