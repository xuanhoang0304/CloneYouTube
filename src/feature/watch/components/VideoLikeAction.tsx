import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useApi } from '@/hooks/useAPI';
import { cn } from '@/utils/cn';

import handleLikeVideo from '../apis/handleLikeVideo';

const VideoLikeAction = ({
    videoId,
    token,
}: {
    videoId: string | undefined;
    token: string | undefined;
}) => {
    const { data } = useApi<{ items: { rating: string }[] }>({
        url: `https://www.googleapis.com/youtube/v3/videos/getRating?access_token=${token}&id=${videoId}`,
    });
    const statusLike = data?.items?.[0]?.rating;
    const [isLike, setIsLike] = useState<string | undefined>(statusLike);
    const handleLike = () => {
        if (isLike === "like") {
            handleLikeVideo(videoId, "none", token);
            setIsLike("none");
        } else {
            handleLikeVideo(videoId, "like", token);
            setIsLike("like");
        }
    };
    const handleUnlike = () => {
        if (isLike === "dislike") {
            handleLikeVideo(videoId, "none", token);
            setIsLike("none");
        } else {
            handleLikeVideo(videoId, "dislike", token);
            setIsLike("dislike");
        }
    };
    useEffect(() => {
        setIsLike(statusLike);
    }, [statusLike]);
    return (
        <div className="flex items-center rounded-full ">
            <button
                onClick={handleLike}
                className={cn(
                    "flex items-center cursor-pointer gap-1 px-3 shrink-0 bg-[#515255] relative py-2 rounded-s-full hover:bg-[#717171] transition-colors",
                    isLike === "like" && "bg-[#717171]"
                )}
            >
                <ThumbsUp
                    className={cn(
                        "shrink-0 size-5",
                        isLike === "like" && "text-[#fff] fill-[#fff]"
                    )}
                />
                <p className="text-xs">2 N</p>
                <div className="w-[2px] h-full bg-[#fff3] absolute right-0 top-0"></div>
            </button>
            <button
                onClick={handleUnlike}
                className={cn(
                    "flex items-center cursor-pointer gap-1 px-3 shrink-0 bg-[#515255] relative py-2 rounded-e-full hover:bg-[#717171] transition-colors",
                    isLike === "dislike" && "bg-[#717171]"
                )}
            >
                <ThumbsDown
                    className={cn(
                        "shrink-0 size-5",
                        isLike === "dislike" && "text-[#fff] fill-[#fff]"
                    )}
                />
            </button>
        </div>
    );
};

export default VideoLikeAction;
