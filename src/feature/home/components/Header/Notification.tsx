import { Bell, Settings } from "lucide-react";
import { useState } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import useClickOutside from "@/hooks/useClickOutSide";

import NotifyList from "./NotifyList";

const Notification = () => {
    const [isShow, setIsShow] = useState(false);
    const handleClose = () => {
        setIsShow(false);
    };
    const ref = useClickOutside<HTMLDivElement>(handleClose);
    return (
        <div className="relative" ref={ref}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger
                        onClick={() => setIsShow(!isShow)}
                        className="text-white size-10  hover:bg-[#717171] transition-colors rounded-full flex items-center justify-center"
                    >
                        <Bell className="fill-white w-5 "></Bell>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#717171] relative !top-2">
                        <p>Thông báo</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {isShow && (
                <div
                    // ref={ref}
                    className="w-[480px] h-[400px] overflow-hidden bg-primary-bgcl absolute bottom-[-400px] right-0 rounded-lg "
                >
                    <div className="flex items-center justify-between pl-4 pr-2 py-1 border-b border-[#666]">
                        <p>Thông báo</p>
                        <button className="size-10  hover:bg-[#717171] transition-colors rounded-full flex items-center justify-center">
                            <Settings className="w-5" />
                        </button>
                    </div>
                    <NotifyList></NotifyList>
                </div>
            )}
        </div>
    );
};

export default Notification;
