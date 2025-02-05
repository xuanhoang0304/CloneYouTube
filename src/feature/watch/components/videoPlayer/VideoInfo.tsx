"use client";

import { BellRing, ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { SubscriptionsItemType, YoutubeItemType, YoutubeResponseType } from '@/common/types';
import { useApi } from '@/hooks/useAPI';
import { useYouTubeStore } from '@/store/store';
import calcSubscriber from '@/utils/calcSubscriber';
import handleSubcriceChannel from '@/utils/handleSubcriceChannel';
import handleUnSubcriceChannel from '@/utils/handleUnSubcriceChannel';

const VideoInfo = ({ channelId }: { channelId: string | undefined }) => {
    const { data } = useApi<YoutubeResponseType>({
        url: `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/channels?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,statistics&id=${channelId}`,
    });
    const locale = useLocale();
    const tBtn = useTranslations("SubBtn");
    const [list, setList] = useState<YoutubeItemType[]>([]);
    const { token, setMoveLogin } = useYouTubeStore();
    const subscriptionsUrl = `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/subscriptions?&access_token=${token}&part=snippet,contentDetails&mine=true&maxResults=50`;
    const { data: subscriptions, mutate: mutateSubscriptions } = useApi<{
        items: SubscriptionsItemType[];
    }>({
        url: token ? subscriptionsUrl : "",
    });
    const checkSubscribed = useMemo(() => {
        return subscriptions?.items?.some(
            (item) => item?.snippet?.resourceId?.channelId === channelId
        );
    }, [subscriptions, channelId]);
    const [isSubscribed, setIsSubscribed] = useState(checkSubscribed);
    const subscriptionId = subscriptions?.items?.find(
        (item) => item?.snippet?.resourceId?.channelId === channelId
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
                setIsSubscribed(false);
                mutateSubscriptions(); // Revalidate subscriptions data
            }
        } else {
            const data = await handleSubcriceChannel(channelId, token);
            if (data) {
                setIsSubscribed(true);
                mutateSubscriptions(); // Revalidate subscriptions data
            }
        }
    }, [
        checkSubscribed,
        channelId,
        token,
        subscriptionId,
        mutateSubscriptions,
    ]);
    useEffect(() => {
        setIsSubscribed(checkSubscribed);
        if (data) {
            setList(data?.items);
        }
    }, [checkSubscribed, data]);
    if (list?.length <= 0) return null;
    return (
        <>
            {list?.map((item: YoutubeItemType) => (
                <div key={item.id} className="flex flex-wrap  gap-3 ">
                    <Link
                        href={`channel/${item?.id}?title=${item?.snippet?.title}`}
                    >
                        <figure className="size-10 rounded-full shrink-0">
                            <Image
                                src={item?.snippet?.thumbnails?.high?.url}
                                alt=""
                                width={40}
                                height={40}
                                className="img-cover rounded-full"
                            ></Image>
                        </figure>
                    </Link>
                    <div className="max-w-[257px]">
                        <Link href={`channel/${item?.snippet?.customUrl}`}>
                            <h2 className="line-clamp-1 font-medium leading-[22px] cursor-pointer">
                                {item?.snippet?.title}
                            </h2>
                        </Link>
                        <p className="text-xs leading-[18px] text-[#aaa]">
                            {calcSubscriber(item?.statistics?.subscriberCount,locale)}
                        </p>
                    </div>

                    {isSubscribed ? (
                        <button
                            onClick={handleSubscribed}
                            className="w-full md:w-auto justify-center text-black bg-[var(--bg-second-white)] hover:bg-[var(--bg-hover-white)] dark:text-white dark:bg-[#272727] dark:hover:bg-[#373737] transition-colors  px-4 py-2 rounded-full  flex items-center gap-x-2"
                        >
                            <BellRing className="w-5" />
                            <p>{tBtn("subscribed")}</p>
                            <ChevronDown className="w-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubscribed}
                            className="w-full md:w-auto justify-center text-black bg-[var(--bg-second-white)] dark:bg-white px-4 py-2 rounded-full  hover:bg-[var(--bg-hover-white)] dark:hover:bg-slate-200 transition-colors"
                        >
                            {tBtn("subscribe")}
                        </button>
                    )}
                </div>
            ))}
        </>
    );
};

export default VideoInfo;
