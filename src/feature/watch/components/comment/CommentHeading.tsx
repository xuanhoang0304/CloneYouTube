import { SlidersHorizontal, X } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

const CommentHeading = ({
    totalComment,
    onHideCommentList,
}: {
    totalComment: string | undefined;
    onHideCommentList: () => void;
}) => {
    return (
        <div className="flex justify-between sticky top-[55px] z-50 bg-white dark:bg-black lg:static">
            <div className="flex items-center gap-x-6 mb-6 mt-4">
                <p className="text-xl font-bold">{totalComment} bình luận</p>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="flex items-center gap-x-2">
                            <SlidersHorizontal />
                            <span className="text-sm">Sắp xếp theo</span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#717171] relative !bottom-[-70px] px-4 py-2 rounded ">
                            <p className="text-xs">Sắp xếp bình luận</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <button onClick={onHideCommentList} className="lg:hidden">
                <X className="w-6" />
            </button>
        </div>
    );
};

export default CommentHeading;
