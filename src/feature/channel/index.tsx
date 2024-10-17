"use client";

import Image from "next/image";

import { Api02 } from "@/common/apiKey";
import { channelDetailResponse } from "@/common/types";
import { useApi } from "@/hooks/useAPI";
import calcSubscriber from "@/utils/calcSubscriber";

import HomePlayList from "./components/HomePlayList";

// https://www.googleapis.com/youtube/v3/playlists
const ChanelDetail = ({ channelUrl }: { channelUrl: string }) => {
    const { data: channelDetail } = useApi<channelDetailResponse>({
        url: `https://www.googleapis.com/youtube/v3/channels?key=${Api02}&part=snippet,statistics,brandingSettings&forHandle=${channelUrl}`,
    });
    let channelId: string = "";
    if (channelDetail) {
        channelId = channelDetail?.items?.[0]?.id;
    }

    return (
        <div className="w-[90%] mx-auto">
            <figure className="w-[500px] h-[300px] rounded-xl mx-auto">
                <Image
                    src={
                        channelDetail?.items[0]?.snippet?.thumbnails?.high
                            ?.url || "/images/default.avif"
                    }
                    alt="channel Bg"
                    width={500}
                    height={500}
                    className="h-full w-full object-fill max-h-[300px] rounded-xl aspect-[1000/300] bg-gray-200"
                ></Image>
            </figure>
            <div className="flex gap-x-10    mt-8">
                <figure className="size-[160px] rounded-full">
                    <Image
                        src={
                            channelDetail?.items[0]?.snippet?.thumbnails?.high
                                ?.url || "/images/default.avif"
                        }
                        alt="channel Bg"
                        width={500}
                        height={200}
                        className="h-auto w-full object-cover max-h-[200px] rounded-full aspect-[160/160] bg-gray-200"
                    ></Image>
                </figure>
                <div className="text-[#aaa]">
                    <h1 className="text-[36px] font-bold leading-[50px] text-white">
                        {channelDetail?.items[0]?.snippet?.title}
                    </h1>
                    <p className=" text-sm leading-5 flex gap-x-3">
                        <span>
                            {channelDetail?.items[0]?.snippet?.customUrl}
                        </span>
                        <span>
                            {calcSubscriber(
                                channelDetail?.items[0]?.statistics
                                    ?.subscriberCount || "0"
                            )}
                            người đăng ký
                        </span>
                        <span>
                            {channelDetail?.items[0]?.statistics?.videoCount}
                            video
                        </span>
                    </p>

                    <p className="text-sm leading-4 mt-2">
                        {channelDetail?.items[0]?.snippet?.description?.slice(
                            0,
                            90
                        )}
                        <button className="text-white bg-black/50 left-[-24px] pl-6 relative z-1">
                            ...xem thêm
                        </button>
                    </p>
                </div>
            </div>
            {/* home */}
            <HomePlayList channelId={channelId}></HomePlayList>
        </div>
    );
};

export default ChanelDetail;
