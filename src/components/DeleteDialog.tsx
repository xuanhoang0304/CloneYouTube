"use client";

import { useEffect, useState } from "react";

import useClickOutside from "@/hooks/useClickOutSide";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "./ui/button";

const DeleteDialog = ({
    tooltipTxt,
    trigger,
    dialogTitle,
    dialogDesc,
    handleDelete,
    cancelBtn,
    deleteBtn,
}: any) => {
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
                    <TooltipTrigger
                        asChild
                        onClick={() => setShowDialog(!showDialog)}
                    >
                        {trigger}
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#333] px-4 py-2 rounded mb-2 text-white k ">
                        <p>{tooltipTxt}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            {showDialog && (
                <div className="fixed inset-0 z-[60] flex-center bg-black/50">
                    <div ref={ref} className="w-[80%] lg:w-[30%]">
                        <div className="bg-white dark:bg-primary-bgcl p-4 rounded-md">
                            <h3 className="text-2xl dark:text-white text-black">{dialogTitle}</h3>
                            <p className="text-[#aaa] text-sm">{dialogDesc}</p>
                            <div className="flex items-center gap-x-2 justify-end mt-4">
                                <Button
                                    onClick={() => setShowDialog(false)}
                                    type="button"
                                    variant="secondary"
                                    className="hover:bg-[#515151] transition-colors"
                                >
                                    {cancelBtn}
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleDelete();
                                        setShowDialog(false);
                                    }}
                                    type="button"
                                    variant="secondary"
                                    className="bg-[#515151]/30  hover:bg-[#515151] transition-colors"
                                >
                                    {deleteBtn}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteDialog;
