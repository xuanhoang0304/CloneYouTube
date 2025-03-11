"use client";

import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';

import { SearchVideoItemType, YoutubeItemType } from '@/common/types';
import useClickOutside from '@/hooks/useClickOutSide';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

import EditForm from './EditForm';

type EditVideoBtnProps = {
    item: YoutubeItemType | undefined;
    onMutateVideo: () => void;
    onSetMyVideos: (item: SearchVideoItemType) => void;
    onUpdateDetailedData : (item : YoutubeItemType) => void;
};
const EditVideoBtn = ({
    item,
    onMutateVideo,
    onSetMyVideos,
    onUpdateDetailedData,
}: EditVideoBtnProps) => {
    const [showDialog, setShowDialog] = useState(false);
    const handleClose = () => {
        setShowDialog(false);
    };
    const ref = useClickOutside<HTMLDivElement>(handleClose);
    useEffect(() => {
        const main = document.querySelector("main");
        const body = document.body;
        if (showDialog) {
            main?.classList.add("relative", "z-30");
            body?.classList.add("overflow-hidden");
        } else {
            main?.classList.remove("relative");
            body?.classList.remove("overflow-hidden");
        }
    }, [showDialog]);

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            className="size-10 rounded-full hover:bg-[var(--bg-second-white)] dark:hover:bg-[#303030] flex-center"
                            onClick={() => setShowDialog(!showDialog)}
                        >
                            <Pencil className="w-4"></Pencil>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#333] px-4 py-2 rounded mb-2 text-white k ">
                        <p>Edit</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            {showDialog && (
                <div className="fixed inset-0 z-[60] flex-center bg-black/50">
                    <div ref={ref} className="w-[80%] lg:w-[30%]">
                        <EditForm
                            key={item?.id}
                            onMutateVideo={onMutateVideo}
                            onHideDialog={handleClose}
                            onSetMyVideos={onSetMyVideos}
                            onUpdateDetailedData={onUpdateDetailedData}
                            item={item}
                        ></EditForm>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditVideoBtn;
