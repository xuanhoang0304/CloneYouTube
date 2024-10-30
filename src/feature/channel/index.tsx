"use client";

import { BellRing, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { channelDetailResponse, SubscriptionsItemType } from '@/common/types';
import { useApi } from '@/hooks/useAPI';
import calcSubscriber from '@/utils/calcSubscriber';
import handleSubcriceChannel from '@/utils/handleSubcriceChannel';
import handleUnSubcriceChannel from '@/utils/handleUnSubcriceChannel';

import HomePlayList from './components/HomePlayList';

const ChannelDetail = ({
    token,
    channelUrlId,
}: {
    token: string | undefined;
    channelUrlId: string;
}) => {
    const [checkSubscribed, setCheckSubscribed] = useState<boolean | undefined>(
        false
    );
    const { data: channelDetail } = useApi<channelDetailResponse>({
        url: `https://www.googleapis.com/youtube/v3/channels?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,statistics,brandingSettings&id=${channelUrlId}`,
    });
    const subscriptionsUrl = `https://www.googleapis.com/youtube/v3/subscriptions?&access_token=${token}&part=snippet,contentDetails&mine=true&maxResults=50`;
    const { data: subscriptions, mutate: mutateSubscriptions } = useApi<{
        items: SubscriptionsItemType[];
    }>({
        url: subscriptionsUrl,
    });
    const isSubscribed = useMemo(() => {
        return subscriptions?.items?.some(
            (item) => item?.snippet?.resourceId?.channelId === channelUrlId
        );
    }, [subscriptions, channelUrlId]);
    const subscriptionId = subscriptions?.items?.find(
        (item) => item?.snippet?.resourceId?.channelId === channelUrlId
    )?.id;
    const handleSubscribed = useCallback(async () => {
        if (checkSubscribed) {
            const response = await handleUnSubcriceChannel(
                subscriptionId,
                token
            );
            if (response) {
                setCheckSubscribed(false);
                mutateSubscriptions(); // Revalidate subscriptions data
            }
        } else {
            const data = await handleSubcriceChannel(channelUrlId, token);
            if (data) {
                setCheckSubscribed(true);
                mutateSubscriptions(); // Revalidate subscriptions data
            }
        }
    }, [
        checkSubscribed,
        channelUrlId,
        token,
        subscriptionId,
        mutateSubscriptions,
    ]);

    useLayoutEffect(() => {
        setCheckSubscribed(isSubscribed);
    }, [checkSubscribed, isSubscribed]);

    let channelId: string = "";
    if (channelDetail) {
        if (!channelDetail.items) {
            notFound();
        }
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
                        </span>
                        <span>
                            {channelDetail?.items[0]?.statistics?.videoCount +
                                " video"}
                        </span>
                    </p>

                    <p className="text-sm leading-4 mt-2">
                        {channelDetail?.items[0]?.snippet?.description?.slice(
                            0,
                            90
                        )}
                        <button className="text-white  bg-black/50 left-[-24px] pl-6 relative z-1">
                            ...xem thêm
                        </button>
                    </p>
                    {checkSubscribed ? (
                        <button
                            onClick={handleSubscribed}
                            className="text-white bg-[#272727] hover:bg-[#373737] transition-colors  px-4 py-2 rounded-full mt-3 flex items-center gap-x-2"
                        >
                            <BellRing className="w-5" />
                            <p>Đã đăng ký</p>
                            <ChevronDown className="w-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubscribed}
                            className="text-black bg-white px-4 py-2 rounded-full mt-3 hover:bg-gray-200 transition-colors"
                        >
                            Đăng ký
                        </button>
                    )}
                </div>
            </div>
            {/* home */}
            <HomePlayList channelId={channelId}></HomePlayList>
        </div>
    );
};

export default ChannelDetail;
