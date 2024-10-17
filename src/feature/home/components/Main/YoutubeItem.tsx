"use client";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Api02 } from "@/common/apiKey";
import { YoutubeItemType, YoutubeResponseType } from "@/common/types";
import { useApi } from "@/hooks/useAPI";
import { calcDayCreate } from "@/utils/calcDayCreate";
import calcView from "@/utils/calcView";
import { parseDuration } from "@/utils/ParseDuration";

const YoutubeItem = ({ item }: { item: YoutubeItemType }) => {
    const { data } = useApi<YoutubeResponseType>({
        url: `https://www.googleapis.com/youtube/v3/channels?key=${Api02}&part=snippet,statistics&id=${item.snippet.channelId}`,
    });
    return (
        <li className="rounded-t-xl pb-3 cursor-pointer">
            <Link href={`watch?v=${item.id}`}>
                <figure className="w-full h-[202px] rounded-xl relative">
                    <Image
                        src={item.snippet.thumbnails.high.url}
                        alt="thumbnail"
                        width={500}
                        height={202}
                        className=" h-auto w-full object-cover max-w-[400px] max-h-[200px] rounded-xl aspect-[400/200] bg-gray-200"
                    ></Image>
                    <p className="text-xs leading-4 font-medium absolute bottom-2 right-2 bg-black/70 px-2 rounded">
                        {parseDuration(item.contentDetails.duration)}
                    </p>
                </figure>
            </Link>

            <div className="mt-3 flex gap-x-3 relative pr-6">
                <Link
                    href={`/channel/${data?.items[0]?.snippet?.customUrl}`}
                    className="flex gap-x-4 size-9 shrink-0"
                >
                    <figure className="size-full rounded-full ">
                        <Image
                            alt="channelAvt"
                            src={
                                data?.items[0]?.snippet?.thumbnails?.high
                                    ?.url || "/images/default.avif"
                            }
                            width={36}
                            height={36}
                            className="img-cover rounded-full aspect-[36/36]"
                        ></Image>
                    </figure>
                </Link>
                <div>
                    <Link href={`/watch/?v=${item.id}`}>
                        <h2 className="leading-[22px] font-medium line-clamp-2">
                            {item.snippet.title}
                        </h2>
                    </Link>
                    <Link href={`/channel/${item.snippet.channelTitle}`}>
                        <h3 className="text-sm text-[#AAA] leading-5">
                            {item.snippet.channelTitle}
                        </h3>
                    </Link>
                    <span className="text-sm text-[#AAA] leading-5">
                        {calcView(+item.statistics.viewCount)}{" "}
                        <span>- {calcDayCreate(item.snippet.publishedAt)}</span>
                    </span>
                </div>
                <EllipsisVertical className="shrink-0 absolute right-0 top-0" />
            </div>
        </li>
    );
};

export default YoutubeItem;
