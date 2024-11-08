import { SlidersHorizontal } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

const CommentHeading = ({totalComment} : {totalComment : string | undefined}) => {
    return (
        <div className="flex items-center gap-x-6">
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
    );
};

export default CommentHeading;
