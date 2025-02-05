import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useLocale } from 'next-intl';

import { CommentType } from '@/common/types';
import { calcDayCreate } from '@/utils/calcDayCreate';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

const ReplyInfo = ({ reply }: { reply: CommentType }) => {
    const locale = useLocale();
    return (
        <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-y-2 md:items-center gap-x-2">
                <h3 className="text-[13px] font-semibold  leading-[18px] ">
                    {reply.snippet.authorDisplayName}
                </h3>
                <p className="text-xs text-[#aaa]">
                    {calcDayCreate(reply.snippet.publishedAt)}
                </p>
            </div>
            <p className="text-sm leading-[22px] max-w-[90%]  mt-1 ">
                {reply.snippet.textOriginal}
            </p>
            <div className="flex items-center gap-x-1">
                <div className="flex items-center gap-x-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className=" size-10  hover:bg-[#717171] transition-colors rounded-full flex items-center justify-center">
                                <ThumbsUp className="size-5" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#717171] relative !bottom-[-70px] rounded z-10">
                                <p className="text-xs px-3 py-1 ">Thích</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    {reply.snippet.likeCount > 0 && (
                        <p className="text-xs text-[#aaa]">
                            {reply.snippet.likeCount}
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
                <button className="px-4 py-2 rounded-full font-bold bg-transparent hover:bg-[#aaa] text-xs transition-colors">
                {locale == "vi" ? "Phản hồi" : "Reply"}
                </button>
            </div>
        </div>
    );
};

export default ReplyInfo;
