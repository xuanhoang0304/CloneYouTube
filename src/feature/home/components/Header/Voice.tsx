import { Mic } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Voice = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="text-white size-10  bg-primary-bgcl hover:bg-[#717171] transition-colors rounded-full flex items-center justify-center">
                    <Mic className=" stroke-white w-[20px]" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#717171] relative !top-2">
                    <p>Tìm kiếm bằng giọng nói</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default Voice;
