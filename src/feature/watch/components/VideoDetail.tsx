"use client";
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import { Api02 } from '@/common/apiKey';
import { YoutubeResponseType } from '@/common/types';
import { useApi } from '@/hooks/useAPI';

import CommentContainer from './Comment';
import VideoInfo from './VideoInfo';
import VideoPlayer from './VideoPlayer';

// export async function generateMetadata({
//     searchParams,
// }: {
//     searchParams: { v: string };
// }) {
//     let videoDetail;
//     const id = searchParams.v;
//     const data = await getVideoById(id);
//     if (data) {
//         videoDetail = data[0];
//     }
//     return {
//         title: videoDetail?.snippet?.title || "Simple Title",
//     };
// }
const VideoDesc = dynamic(
    () => import("@/feature/watch/components/VideoDesc"),
    {
        ssr: false,
    }
);
const VideoDetail = () => {
    const id = useSearchParams().get("v");
    let videoDetail;
    const { data }= useApi<YoutubeResponseType>({
        url: `https://www.googleapis.com/youtube/v3/videos?key=${Api02}&part=snippet,statistics&id=${id}`,
    });
    if (data) videoDetail = data?.items[0];
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
                    <p>Action</p>
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
