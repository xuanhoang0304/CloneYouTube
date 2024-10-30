"use client";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { SearchPlayListItemType } from "@/common/types";
import { cn } from "@/utils/cn";

const SearchPlayListItem = ({ data }: { data: SearchPlayListItemType }) => {
    const searchParams = useSearchParams();

    // Convert searchParams to an object
    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return (
        <li
            className={cn(
                "flex gap-x-4 p-1 bg-black hover:bg-gray-600 transition-colors",
                params.index == data.snippet.position &&
                    "bg-[#ffffff1a] text-black"
            )}
        >
            <Link
                href={`watch?v=${data.snippet.resourceId.videoId}&list=${params.list}&listTitle=${params.listTitle}&index=${data.snippet.position}`}
                className="flex gap-x-4 items-center"
            >
                {params.index == data.snippet.position ? (
                    <Play className="w-4 shrink-0" fill="#aaa" />
                ) : (
                    <p className="pl-1 text-sm text-[#aaa]">
                        {+data.snippet.position + 1}
                    </p>
                )}

                <Image
                    src={data?.snippet?.thumbnails?.medium?.url}
                    alt=""
                    width={110}
                    height={90}
                    className="rounded-md"
                />

                <div>
                    <p className="text-white line-clamp-2 text-sm font-medium">
                        {data.snippet.title}
                    </p>
                    <p className="text-xs text-[#ccc] mt-1">
                        {data.snippet.channelTitle}
                    </p>
                </div>
            </Link>
        </li>
    );
};

export default SearchPlayListItem;
