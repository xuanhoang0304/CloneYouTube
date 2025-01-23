"use client";
import dynamic from 'next/dynamic';
import { notFound, useSearchParams } from 'next/navigation';

import { YoutubeResponseType } from '@/common/types';
import { useApi } from '@/hooks/useAPI';
import { useYouTubeStore } from '@/store/store';

import CommentContainer from '../comment/Comment';
import RelatedList from '../related&playlist/RelatedList';
import VideoInfo from './VideoInfo';
import VideoLikeAction from './VideoLikeAction';
import VideoPlayer from './VideoPlayer';

const VideoDesc = dynamic(
    () => import("@/feature/watch/components/videoPlayer/VideoDesc"),
    {
        ssr: false,
    }
);
const VideoDetail = () => {
    const { token } = useYouTubeStore();
    const id = useSearchParams().get("v");
    let videoDetail;
    const { data } = useApi<YoutubeResponseType>({
        url: `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/videos?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,statistics&id=${id}`,
    });
    if (data) videoDetail = data?.items[0];

    if (data?.items.length === 0) {
        notFound();
    }

    return (
        <div className="flex flex-col lg:flex-row gap-x-5 gap-y-3">
            <div className="w-full lg:max-h-[500px] rounded-2xl">
                <VideoPlayer></VideoPlayer>
                <h1 className="text-[20px] mt-4 line-clamp-2 font-bold leading-7">
                    {videoDetail?.snippet?.title}
                </h1>
                <div className="flex items-start  md:items-center justify-between mt-3">
                    <VideoInfo
                        channelId={videoDetail?.snippet?.channelId}
                    ></VideoInfo>

                    <VideoLikeAction
                        token={token}
                        videoId={videoDetail?.id}
                    ></VideoLikeAction>
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
            <div className="w-full lg:max-w-[400px]  h-full">
                <RelatedList
                    channelId={data?.items[0].snippet.channelId}
                ></RelatedList>
            </div>
        </div>
    );
};

export default VideoDetail;
