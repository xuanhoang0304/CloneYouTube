import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

import { useYouTubeStore } from '@/store/store';
import { cn } from '@/utils/cn';

import handleAddCommentVideo from '../../apis/handleAddCommentVideo';
import handleReplyComment from '../../apis/handleReplyComment';

const CommentInput = ({
    parentId,
    videoId,
    onCommentAdded,
    userAvatar,
    action,
    onCancelReply,
}: {
    videoId?: string | null;
    onCommentAdded?: (data: {
        content: string;
        createdAt: string;
        id: string;
    }) => void;
    onCancelReply?: () => void;
    userAvatar: string | undefined;
    action: "add" | "rep" | "edit";
    parentId?: string;
}) => {
    const [comment, setComment] = useState("");
    const { token } = useYouTubeStore();
    const [isShow, setIsShow] = useState(false);
    const local = useLocale();
    const t = useTranslations("WatchPage");
    if (!token) return <p className="text-yellow-600">{local == "vi" ? "Đăng nhập để có thể bình luận video !" : "Please login to write your comment !"} </p>;
    return (
        <div className="flex gap-x-4 fixed bottom-[62px] left-0 right-0 px-2 lg:px-0 bg-white dark:bg-black z-10 lg:static py-2">
            <figure
                className={cn(
                    "size-10 rounded-full",
                    action == "rep" && "size-6"
                )}
            >
                <Image
                    src={userAvatar || "/image/default.avif"}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="img-cover rounded-full"
                />
            </figure>
            <div className="flex-1 relative mr-4">
                <input
                    type="text"
                    placeholder={
                        action == "rep" ? `${t("reply")}...` : `${t("cmt")}...`
                    }
                    className={"w-full cursor-pointer text-sm"}
                    value={comment}
                    onFocus={() => setIsShow(true)}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div
                    className={cn(
                        " relative mt-[2px] w-full bg-[#b4b3b3] h-[1px] overflow-hidden rounded-full",
                        "after:absolute after:bottom-0 after:left-[50%] after:w-full after:h-full",
                        "after:bg-[#ff4a4a] after:translate-x-[-50%]",
                        "after:transition-transform after:duration-500 after:ease-in-out",
                        comment ? "after:scale-x-100 " : "after:scale-x-0 "
                    )}
                ></div>
                <div className="mt-2 w-full flex justify-end">
                    {isShow && (
                        <div className="flex gap-x-2">
                            <button
                                onClick={() => {
                                    setComment("");
                                    setIsShow(false);
                                    onCancelReply?.();
                                }}
                                className="bg-transparent hover:text-black dark:text-white text-black px-3 dark:hover:bg-[#272727] hover:bg-[var(--bg-second-white)] rounded-full transition-colors "
                            >
                                {t("cancel")}
                            </button>
                            <button
                                onClick={async () => {
                                    if (action == "rep") {
                                        handleReplyComment(
                                            parentId,
                                            comment,
                                            token
                                        );
                                        onCancelReply?.();
                                    } else {
                                        if (token) {
                                            const tempComment = {
                                                content: comment,
                                                createdAt:
                                                    new Date().toISOString(),
                                                id: Math.random()
                                                    .toString(36)
                                                    .substring(7),
                                            };

                                            const res =
                                                await handleAddCommentVideo(
                                                    videoId,
                                                    comment,
                                                    token
                                                );
                                            if (res) {
                                                setComment("");
                                                onCommentAdded?.(tempComment);
                                            }
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
                                {action == "add"
                                    ? `${t("comment")}`
                                    : `${t("reply")}`}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentInput;
