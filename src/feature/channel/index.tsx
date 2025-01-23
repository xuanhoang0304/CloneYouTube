"use client";

import { BellRing, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { channelDetailResponse, SubscriptionsItemType } from '@/common/types';
import { useApi } from '@/hooks/useAPI';
import { useYouTubeStore } from '@/store/store';
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
    const { setMoveLogin } = useYouTubeStore();
    const [checkSubscribed, setCheckSubscribed] = useState<boolean | undefined>(
        false
    );
    const { data: channelDetail } = useApi<channelDetailResponse>({
        url: channelUrlId
            ? `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/channels?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,statistics,brandingSettings&id=${channelUrlId}`
            : "",
    });
    const subscriptionsUrl = `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/subscriptions?&access_token=${token}&part=snippet,contentDetails&mine=true&maxResults=50`;
    const { data: subscriptions, mutate: mutateSubscriptions } = useApi<{
        items: SubscriptionsItemType[];
    }>({
        url: token ? subscriptionsUrl : "",
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
        if (!token) {
            setMoveLogin(true);
            return;
        }
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
        <div className="w-[calc(100%-24px)] mx-auto">
            <figure className="w-full md:w-[500px] h-[300px] rounded-xl mx-auto">
                <Image
                    src={
                        channelDetail?.items[0]?.snippet?.thumbnails?.high
                            ?.url || "/image/default.avif"
                    }
                    alt="channel Bg"
                    width={500}
                    height={500}
                    className="h-full w-full object-contain max-h-[300px] rounded-xl aspect-[1000/300] bg-gray-200"
                ></Image>
            </figure>
            <div className="flex flex-col gap-y-3 items-center md:flex-row gap-x-6 lg:gap-x-10 -mt-[80px] md:mt-6">
                <figure className="size-[160px] rounded-full boder-[2px] border-solid dark:border-white border-black">
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
                <div className="text-[#aaa] text-center md:text-left">
                    <h1 className="text-[36px] font-bold leading-[50px] text-black dark:text-white">
                        {channelDetail?.items[0]?.snippet?.title}
                    </h1>
                    <p className=" text-sm leading-5 flex gap-2 flex-wrap justify-center md:justify-start">
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

                    <p className="text-sm leading-4 mt-2 ">
                        {channelDetail?.items[0]?.snippet?.description?.slice(
                            0,
                            60
                        )}
                        <button className="dark:text-white text-black bg-[var(--bg-second-white)] dark:bg-black/50 left-[-24px] pl-6 relative z-1">
                            ...xem thêm
                        </button>
                    </p>
                    {checkSubscribed ? (
                        <button
                            onClick={handleSubscribed}
                            className="w-full md:w-auto justify-center text-black bg-[var(--bg-second-white)] hover:bg-[var(--bg-hover-white)] dark:text-white dark:bg-[#272727] dark:hover:bg-[#373737] transition-colors  px-4 py-2 rounded-full mt-3 flex items-center gap-x-2"
                        >
                            <BellRing className="w-5" />
                            <p>Đã đăng ký</p>
                            <ChevronDown className="w-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubscribed}
                            className="w-full md:w-auto justify-center text-black bg-[var(--bg-second-white)] dark:bg-white px-4 py-2 rounded-full mt-3 hover:bg-[var(--bg-hover-white)] dark:hover:bg-slate-200 transition-colors"
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
