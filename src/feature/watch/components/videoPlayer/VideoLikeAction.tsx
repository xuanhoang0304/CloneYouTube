"use client";
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useApi } from '@/hooks/useAPI';
import { useYouTubeStore } from '@/store/store';
import { cn } from '@/utils/cn';

import handleLikeVideo from '../../apis/handleLikeVideo';

const VideoLikeAction = ({
    videoId,
    token,
}: {
    videoId: string | undefined;
    token: string | undefined;
}) => {
    const { setMoveLogin } = useYouTubeStore();
    const { data, mutate: mutateRating } = useApi<{
        items: { rating: string }[];
    }>({
        url: token
            ? `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/videos/getRating?access_token=${token}&id=${videoId}`
            : "",
    });
    const statusLike = data?.items?.[0]?.rating;
    const [isLike, setIsLike] = useState<string | undefined>(statusLike);
    const handleLike = () => {
        if (!token) {
            setMoveLogin(true);
            return;
        }
        if (isLike === "like") {
            handleLikeVideo(videoId, "none", token);
            setIsLike("none");
        } else {
            handleLikeVideo(videoId, "like", token);
            setIsLike("like");
        }
        mutateRating();
    };
    const handleUnlike = () => {
        if (!token) {
            setMoveLogin(true);
            return;
        }
        if (isLike === "dislike") {
            handleLikeVideo(videoId, "none", token);
            setIsLike("none");
        } else {
            handleLikeVideo(videoId, "dislike", token);
            setIsLike("dislike");
        }
        mutateRating();
    };
    useEffect(() => {
        setIsLike(statusLike);
    }, [statusLike]);
    return (
        <div className="flex items-center rounded-full shrink-0">
            <button
                onClick={handleLike}
                className={cn(
                    "flex items-center cursor-pointer gap-1 p-2 md:px-3 shrink-0 bg-[var(--bg-second-white)] dark:bg-[#515255] relative md:py-2 rounded-s-full hover:bg-[var(--bg-hover-white)] dark:hover:bg-[#717171] transition-colors",
                    isLike === "like" && "bg-[#717171]"
                )}
            >
                <ThumbsUp
                    className={cn(
                        "shrink-0 size-5",
                        isLike === "like" && " dark:fill-[#fff] fill-black"
                    )}
                />
                <p className="text-xs">2 N</p>
                <div className="w-[2px] h-full bg-[#fff3] absolute right-0 top-0"></div>
            </button>
            <button
                onClick={handleUnlike}
                className={cn(
                    "flex items-center cursor-pointer gap-1 p-2 md:px-3 shrink-0 bg-[var(--bg-second-white)] dark:bg-[#515255] relative md:py-2 rounded-e-full hover:bg-[var(--bg-hover-white)] dark:hover:bg-[#717171] transition-colors",
                    isLike === "dislike" && "bg-[#717171]"
                )}
            >
                <ThumbsDown
                    className={cn(
                        "shrink-0 size-5",
                        isLike === "dislike" && "dark:fill-[#fff] fill-black"
                    )}
                />
            </button>
        </div>
    );
};

export default VideoLikeAction;
