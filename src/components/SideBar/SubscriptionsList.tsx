"use client";
import { useState } from 'react';

import { SubscriptionsItemType } from '@/common/types';
import { useApi } from '@/hooks/useAPI';

import ShowMoreChannel from './ShowMoreChannel';
import SubscriptionsItem from './SubscriptionsItem';

const SubscriptionsList = ({ token }: { token: string }) => {
    const [itemCount, setItemCount] = useState(5);
    const { data: subscriptions, error } = useApi<{ items: [] }>({
        url: `https://www.googleapis.com/youtube/v3/subscriptions?&access_token=${token}&part=snippet,contentDetails&mine=true&maxResults=50`,
    });

    if (error) {
        return (
            <div>Đã xảy ra lỗi khi tải danh sách đăng ký: {error.message}</div>
        );
    }

    if (!subscriptions) {
        return <div>Đang tải danh sách đăng ký...</div>;
    }

    const channelLength = subscriptions?.items?.length;
    const handleShowMore = () => {
        if (channelLength && itemCount < channelLength) {
            setItemCount(itemCount + 10);
        } else {
            setItemCount(5);
        }
    };
    return (
        <>
            <ul>
                {subscriptions?.items
                    .slice(0, itemCount)
                    .map((item: SubscriptionsItemType) => {
                        return (
                            <SubscriptionsItem
                                key={item.id}
                                item={item}
                            ></SubscriptionsItem>
                        );
                    })}
            </ul>
            <ShowMoreChannel
                onShowMore={handleShowMore}
                itemCount={itemCount}
                channelLength={channelLength}
            ></ShowMoreChannel>
        </>
    );
};

export default SubscriptionsList;
