import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useYouTubeStore } from '@/store/store';
import { cn } from '@/utils/cn';

import handleAddCommentVideo from '../../apis/handleAddCommentVideo';

const CommentInput = ({
    videoId,
    onCommentAdded,
    userAvatar,
}: {
    videoId: string | null;
    onCommentAdded?: (data: {
        content: string;
        createdAt: string;
        id: string;
    }) => void;
    userAvatar: string | undefined;
}) => {
    const [comment, setComment] = useState("");
    const { token } = useYouTubeStore();
    const [isShow, setIsShow] = useState(false);
    return (
        <div className="mt-6 flex gap-x-4">
            <Image
                src={userAvatar || "/image/default.avif"}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full size-10 object-cover"
            />
            <div className="flex-1 relative mr-4">
                <input
                    type="text"
                    placeholder="Viết bình luận..."
                    className="w-full cursor-pointer"
                    value={comment}
                    onFocus={() => setIsShow(true)}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div
                    className={cn(
                        " relative mt-[2px] w-full bg-[#717171] h-[1px] overflow-hidden rounded-full",
                        "after:absolute after:bottom-0 after:left-[50%] after:w-full after:h-full",
                        "after:bg-[#fff] after:translate-x-[-50%]",
                        "after:transition-transform after:duration-500 after:ease-in-out",
                        comment ? "after:scale-x-100 " : "after:scale-x-0 "
                    )}
                ></div>
                <div className="mt-2 w-full flex justify-end">
                    {isShow && (
                        <div className="flex gap-x-2">
                            <Button
                                onClick={() => {
                                    setComment("");
                                    setIsShow(false);
                                }}
                                className="bg-transparent hover:bg-[#272727] rounded-full transition-colors "
                            >
                                Hủy
                            </Button>
                            <button
                                onClick={async () => {
                                    if (token) {
                                        const tempComment = {
                                            content: comment,
                                            createdAt: new Date().toISOString(),
                                            id: Math.random()
                                                .toString(36)
                                                .substring(7),
                                        };

                                        const res = await handleAddCommentVideo(
                                            videoId,
                                            comment,
                                            token
                                        );
                                        if (res) {
                                            setComment("");
                                            onCommentAdded?.(tempComment);
                                        }
                                    }
                                }}
                                className={cn(
                                    " text-white rounded-full cursor-default pointer-events-none px-4 py-1 transition-colors",
                                    comment
                                        ? "bg-blue-500 cursor-pointer pointer-events-auto"
                                        : "bg-[#272727]/50"
                                )}
                            >
                                Bình luận
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentInput;
