import { ThumbsDown, ThumbsUp } from 'lucide-react';

import { TopCommentType } from '@/common/types';
import { calcDayCreate } from '@/utils/calcDayCreate';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

import ReplyComment from './ReplyComment';

type Props = {
    comment: TopCommentType;
};
const CommentInfo = ({ comment }: Props) => {
    return (
        <div className="flex-1">
            <div className="flex items-center gap-x-2">
                <h3 className="text-[13px] font-semibold  leading-[18px] text-[#f1f1f1]">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                </h3>
                <p className="text-xs text-[#aaa]">
                    {calcDayCreate(
                        comment.snippet.topLevelComment.snippet.publishedAt
                    )}
                </p>
            </div>
            <p className="text-sm leading-[22px] max-w-[90%]  mt-1 text-[#f1f1f1]">
                {comment.snippet.topLevelComment.snippet.textOriginal}
            </p>
            <div className="flex items-center gap-x-1">
                <div className="flex items-center gap-x-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="text-white size-10  hover:bg-[#717171] transition-colors rounded-full flex items-center justify-center">
                                <ThumbsUp className="size-5" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#717171] relative !bottom-[-70px] rounded z-10">
                                <p className="text-xs px-3 py-1 ">Thích</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    {comment.snippet.topLevelComment.snippet.likeCount > 0 && (
                        <p className="text-xs text-[#aaa]">
                            {comment.snippet.topLevelComment.snippet.likeCount}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-x-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="text-white size-10  hover:bg-[#717171] transition-colors rounded-full flex items-center justify-center">
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
                <button className="px-4 py-2 rounded-full font-bold bg-transparent hover:bg-[#aaa] text-xs transition-colors">
                    Phản hồi
                </button>
            </div>
            {+comment?.snippet?.totalReplyCount > 0 && (
                <ReplyComment
                    comment={comment?.replies?.comments}
                ></ReplyComment>
            )}
        </div>
    );
};

export default CommentInfo;
