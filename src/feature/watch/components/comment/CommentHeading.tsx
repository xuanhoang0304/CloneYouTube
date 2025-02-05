import { SlidersHorizontal, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

const CommentHeading = ({
    totalComment,
    onHideCommentList,
}: {
    totalComment: string | undefined;
    onHideCommentList: () => void;
}) => {
    const t = useTranslations("WatchPage");
    return (
        <div className="flex justify-between fixed bottom-[118px] left-0 right-0 px-2 lg:px-0 z-10 bg-white dark:bg-black lg:static">
            <div className="flex items-center gap-x-6 mb-6 mt-4">
                <p className="text-xl font-bold">{totalComment+ ` ${t("comment")}`}</p>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="flex items-center gap-x-2">
                            <SlidersHorizontal />
                            <span className="text-sm">{t("filter")}</span>
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
