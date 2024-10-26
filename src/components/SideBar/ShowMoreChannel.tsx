import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

type ShowMoreChannelProps = {
    itemCount: number;
    onShowMore: () => void;
    channelLength: number | undefined;
};
const ShowMoreChannel = ({
    itemCount,
    onShowMore,
    channelLength,
}: ShowMoreChannelProps) => {
    return (
        <button
            onClick={onShowMore}
            className="flex items-center gap-x-4 p-2 w-[198px] hover:bg-[#717171] transition-colors rounded-lg cursor-pointer"
        >
            <ChevronDown
                className={cn(
                    "w-6",
                    itemCount == channelLength ? "rotate-180" : "rotate-0"
                )}
            ></ChevronDown>
            <p className="text-xs leading-5">
                {channelLength && itemCount < channelLength ? "Xem thêm" : "Ẩn bớt"}
            </p>
        </button>
    );
};

export default ShowMoreChannel;
