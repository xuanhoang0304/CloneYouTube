"use client";
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { TopCommentType } from '@/common/types';
import { cn } from '@/lib/utils';
import { useYouTubeStore } from '@/store/store';
import { calcDayCreate } from '@/utils/calcDayCreate';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

import handleEditCommentVideo from '../../apis/handleEditCommentVideo';
import ReplyComment from './ReplyComment';

type Props = {
    comment: TopCommentType;
    commentEditId: string;
    onEditComment: (id: string) => void;
    onReplyComment: () => void;
    onMuateComment: () => void;
};

const CommentInfo = ({
    comment,
    commentEditId,
    onEditComment,
    onMuateComment,
    onReplyComment,
}: Props) => {
    const [textEdit, setTextEdit] = useState(
        comment.snippet.topLevelComment.snippet.textOriginal
    );
    const { token } = useYouTubeStore();
    const locale = useLocale();
    const [isShowEdit, setIsShowEdit] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const publishedAt = comment.snippet.topLevelComment.snippet.publishedAt;
    const updatedAt = comment.snippet.topLevelComment.snippet.updatedAt;
    useEffect(() => {
        if (commentEditId) {
            inputRef?.current?.focus();
        }
    }, [commentEditId]);

    return (
        <div className="flex-1">
            {comment.id !== commentEditId ? (
                <div className="flex items-center gap-x-2">
                    <Link
                        href={`/channel/${comment.snippet.topLevelComment.snippet.authorChannelId?.value}?title=${comment.snippet.topLevelComment.snippet.authorDisplayName}`}
                    >
                        <h3 className="text-[13px] font-semibold  leading-[18px] ">
                            {
                                comment.snippet.topLevelComment.snippet
                                    .authorDisplayName
                            }
                        </h3>
                    </Link>
                    <p className="text-xs text-[#aaa]">
                        {calcDayCreate(publishedAt,locale)}
                    </p>
                    {publishedAt !== updatedAt && (
                        <p className="text-xs text-[#aaa]">{locale == "vi" ? "(đã chỉnh sửa)" :"(edited)"}</p>
                    )}
                </div>
            ) : (
                <div className="flex-1 relative mr-4">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Viết bình luận..."
                        className="w-full"
                        value={textEdit}
                        onFocus={() => setIsShowEdit(true)}
                        onChange={(e) => setTextEdit(e.target.value)}
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
                        {isShowEdit && (
                            <div className="flex gap-x-2">
                                <button
                                    onClick={() => {
                                        setIsShowEdit(false);
                                        onEditComment("");
                                    }}
                                    className="bg-transparent dark:hover:text-black  dark:hover:bg-[#272727] hover:!bg-[var(--bg-second-white)] rounded-full transition-colors "
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={async () => {
                                        if (token) {
                                            const res =
                                                await handleEditCommentVideo(
                                                    commentEditId,
                                                    textEdit,
                                                    token
                                                );
                                            if (res) {
                                                onMuateComment();
                                                onEditComment("");
                                                setIsShowEdit(false);
                                            }
                                        }
                                    }}
                                    className={cn(
                                        " text-white rounded-full cursor-default pointer-events-none px-4 py-1 transition-colors",
                                        textEdit !==
                                            comment.snippet.topLevelComment
                                                .snippet.textOriginal
                                            ? "bg-blue-500 cursor-pointer pointer-events-auto"
                                            : "bg-[#272727]/50"
                                    )}
                                >
                                    Lưu
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {comment.id !== commentEditId && (
                <>
                    <p className="text-sm leading-[22px] max-w-[90%]  mt-1 ">
                        {comment.snippet.topLevelComment.snippet.textOriginal}
                    </p>
                    <div className="flex items-center gap-x-1">
                        <div className="flex items-center gap-x-1">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className=" size-10  hover:bg-[#717171] transition-colors rounded-full flex items-center justify-center">
                                        <ThumbsUp className="size-5" />
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-[#717171] relative !bottom-[-70px] rounded z-10">
                                        <p className="text-xs px-3 py-1 ">
                                            Thích
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            {comment.snippet.topLevelComment.snippet.likeCount >
                                0 && (
                                <p className="text-xs text-[#aaa]">
                                    {
                                        comment.snippet.topLevelComment.snippet
                                            .likeCount
                                    }
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-x-1">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className=" size-10  hover:bg-[#717171] transition-colors rounded-full flex items-center justify-center">
                                        <ThumbsDown className="size-5" />
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-[#717171] relative !bottom-[-70px] rounded z-10">
                                        <p className="text-xs px-3 py-1 ">
                                            Không thích
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <button
                            onClick={() => {
                                onReplyComment();
                            }}
                            className="px-4 py-2 rounded-full font-bold bg-transparent hover:bg-[#aaa] text-xs transition-colors"
                        >
                            {locale == "vi" ? "Phản hồi" : "Reply"}
                        </button>
                    </div>
                </>
            )}
            {+comment?.snippet?.totalReplyCount > 0 && (
                <ReplyComment
                    comment={comment?.replies?.comments || []}
                ></ReplyComment>
            )}
        </div>
    );
};

export default CommentInfo;
