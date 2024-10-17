"use client";

import { NotebookPen, Plus, Radio, Youtube } from 'lucide-react';
import { useState } from 'react';

import useClickOutside from '@/hooks/useClickOutSide';
import { cn } from '@/lib/utils';

const ProfileAction = [
    {
        icon: <Youtube></Youtube>,
        text: "Tải video lên",
    },
    {
        icon: <Radio></Radio>,
        text: "Phát trực tiếp",
    },
    {
        icon: <NotebookPen></NotebookPen>,
        text: "Tạo bài đăng",
    },
];
export const CreateAction = () => {
    const [isShow, setIsShow] = useState(false);
    const handleClose = () => {
        setIsShow(false);
    };
    const ref = useClickOutside<HTMLDivElement>(handleClose);
    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsShow(!isShow)}
                className="flex items-center  px-[16px] hover:bg-[#717171] bg-primary-bgcl rounded-full gap-x-[6px] transition-colors"
            >
                <Plus></Plus>
                <p className="text-xs leading-9 font-medium">Tạo</p>
            </button>
            {isShow && (
                <ul
                    className={cn(
                        "absolute z-50 bottom-[-150px]  rounded-lg left-0 w-[180px] bg-primary-bgcl hidden py-2 ",
                        isShow && "block"
                    )}
                >
                    {ProfileAction.map((item) => (
                        <li
                            key={item.text}
                            className="flex items-center gap-x-2 px-4 py-1 cursor-pointer hover:bg-[#717171] transition-colors"
                        >
                            {item.icon}
                            <p className="text-xs leading-9 font-medium">
                                {item.text}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
