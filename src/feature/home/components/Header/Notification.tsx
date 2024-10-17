import { Bell, Settings } from 'lucide-react';
import { useState } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useClickOutside from '@/hooks/useClickOutSide';

import NotifyList from './NotifyList';

const arr = [
    {
        id: 0,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: false,
    },
    {
        id: 1,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: false,
    },
    {
        id: 2,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: false,
    },
    {
        id: 3,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
    {
        id: 4,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
    {
        id: 5,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
    {
        id: 6,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
    {
        id: 7,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
    {
        id: 8,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
    {
        id: 9,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
];
const Notification = () => {
    const [isShow, setIsShow] = useState(false);
    const handleClose = () => {
        setIsShow(false);
    };
    const ref = useClickOutside<HTMLDivElement>(handleClose);
    return (
        <div className="relative" ref={ref}>
            <div className="bg-red-600 absolute top-[3px] right-[3px] size-4 rounded-full flex-center">
                <p className="text-white text-[10px]">
                    {arr.filter((item) => item.isCheck == false).length}
                </p>
            </div>
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
                <div className="w-[480px] h-[400px] overflow-hidden z-40 bg-primary-bgcl absolute bottom-[-400px] right-0 rounded-lg ">
                    <div className="flex items-center justify-between pl-4 pr-2 py-1 border-b border-[#666]">
                        <p>Thông báo</p>
                        <button className="size-10  hover:bg-[#717171] transition-colors rounded-full flex items-center justify-center">
                            <Settings className="w-5" />
                        </button>
                    </div>
                    <NotifyList arr={arr}></NotifyList>
                </div>
            )}
        </div>
    );
};

export default Notification;
