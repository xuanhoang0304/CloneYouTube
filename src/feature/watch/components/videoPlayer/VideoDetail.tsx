"use client";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

import { YoutubeResponseType } from "@/common/types";
import { useApi } from "@/hooks/useAPI";
import { useYouTubeStore } from "@/store/store";

import CommentContainer from "../comment/Comment";
import RelatedList from "../related&playlist/RelatedList";
import VideoInfo from "./VideoInfo";
import VideoLikeAction from "./VideoLikeAction";
import VideoPlayer from "./VideoPlayer";

const VideoDesc = dynamic(
    () => import("@/feature/watch/components/videoPlayer/VideoDesc"),
    {
        ssr: false,
    }
);
const VideoDetail = () => {
    const { token } = useYouTubeStore();
    const id = useSearchParams().get("v");
    const t = useTranslations("NotFound");
    const locale = useLocale();
    let videoDetail;
    const { data } = useApi<YoutubeResponseType>({
        url: `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/videos?access_token=${token}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,statistics,status&id=${id}`,
    });
    if (data) videoDetail = data?.items[0];

    if (data?.items.length === 0) {
        notFound();
    }

    if (data?.items[0].status.privacyStatus == "private") {
        return (
            <>
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[278px] text-center">
                    <Image
                        src="https://www.youtube.com/img/desktop/unavailable/unavailable_video_dark_theme.png"
                        alt="private video page"
                        width={0}
                        height={0}
                        className="w-full h-[160px] object-cover"
                    />
                    <h1 className="text-2xl mt-3">
                        {locale == "vi"
                            ? "Video không có sẵn"
                            : "Video unavailable"}
                    </h1>
                    <p className="text-sm mt-3">
                        {locale == "vi"
                            ? "Đây là video riêng tư"
                            : "This video is private"}
                    </p>
                    <Link
                        href={`/${locale}`}
                        className="block text-sm mt-4 hover:text-red-400 transition-colors  px-2 bg-[var(--bg-second-white)] dark:bg-primary-bgcl py-1 border border-[#aaa] border-solid rounded-full max-w-[120px] mx-auto"
                    >
                        {t("backHome")}
                    </Link>
                </div>
            </>
        );
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
