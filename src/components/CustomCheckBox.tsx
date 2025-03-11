"use client";
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type CustomCheckBoxType = {
    id: string;
    selectedVideos: string[];
    onSelectedVideos: (id: string) => void;
};
const CustomCheckBox = ({
    id,
    onSelectedVideos,
    selectedVideos,
}: CustomCheckBoxType) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleCheck = () => {
        onSelectedVideos(id);
    };
    useEffect(() => {
        selectedVideos.includes(id)
            ? setIsSelected(true)
            : setIsSelected(false);
    }, [selectedVideos, isSelected]);
    return (
        <div
            onClick={handleCheck}
            className={cn(
                "size-5 rounded  flex-center border cursor-pointer border-[#aaa]",
                isSelected && "bg-[#aaa] ischecked"
            )}
        >
            <Check className={cn("w-4 hidden", isSelected && "block")} />
        </div>
    );
};

export default CustomCheckBox;
