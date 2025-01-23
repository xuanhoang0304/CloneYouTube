import { Mic } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Voice = () => {
    return (
        <div className="hidden lg:block">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className="text-white size-10  bg-[var(--bg-second-white)] hover:bg-[var(--bg-hover-white)] dark:bg-primary-bgcl dark:hover:bg-[#717171] transition-colors rounded-full flex items-center justify-center">
                        <Mic className=" dark:stroke-white stroke-black w-[20px]" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#717171] relative !top-2">
                        <p>Tìm kiếm bằng giọng nói</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default Voice;
