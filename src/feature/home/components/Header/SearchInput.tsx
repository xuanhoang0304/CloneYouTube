"use client";
import { Keyboard, Search, X } from 'lucide-react';
import { useState } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utils/cn';

const SearchInput = () => {
    const [searchText, setSearchText] = useState("");
    const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };
    return (
        <div className="max-w-[600px] flex-1 text-[#888] flex items-center pl-[16px] rounded-full border border-[#303030]">
            <input
                placeholder="Tìm kiếm"
                className="w-full text-[#fff] placeholder:text-[#888]"
                value={searchText}
                onChange={handleChangeSearchText}
            ></input>
            <button className="h-[20px] px-2 shrink-0">
                <Keyboard className="img-cover hover:stroke-white" />
            </button>
            <button
                onClick={() => setSearchText("")}
                className={cn(
                    "hidden text-white transition-colors    ",
                    searchText && "block"
                )}
            >
                <X />
            </button>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className="flex items-center justify-center w-[60px] h-[40px] shrink-0 bg-primary-bgcl rounded-r-full">
                        <Search className="text-white w-5" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#717171] relative !top-2">
                        <p>Tìm kiếm</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default SearchInput;
