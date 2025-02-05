"use client";

import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { YoutubeItemType, YoutubeResponseType } from '@/common/types';
import Loading from '@/components/Loading';
import { useApi } from '@/hooks/useAPI';
import { useYouTubeStore } from '@/store/store';

import YoutubeItem from './YoutubeItem';

const options = {
    part: "snippet,contentDetails,statistics",
    maxResults: 30,
    chart: "mostPopular",
    regionCode: "VN",
};
const YoutubeList = () => {
    const [nextPageToken, setNextPageToken] = useState("");
    const { categoryId } = useYouTubeStore();

    const [hasMore, setHasMore] = useState(true);

    const { data, isLoading } = useApi<YoutubeResponseType>({
        url: `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/videos?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=${options.part}&chart=${options.chart}&regionCode=${options.regionCode}&maxResults=${options.maxResults}&videoCategoryId=${categoryId}`,
    });

    const { data: newData, isLoading: loading } = useApi<YoutubeResponseType>({
        url: nextPageToken
            ? `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/videos?key=${
                  process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
              }&part=${options.part}&chart=${options.chart}&regionCode=${
                  options.regionCode
              }&maxResults=${options.maxResults}&videoCategoryId=${categoryId}${
                  nextPageToken ? `&pageToken=${nextPageToken}` : ""
              }`
            : "",
    });

    const [list, setList] = useState<YoutubeItemType[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchData = useCallback(() => {
        if (isLoadingMore) return;
        try {
            setIsLoadingMore(true);
            if (newData) {
                setList((prevList) => [...prevList, ...newData.items]);
                setNextPageToken(newData.nextPageToken);
                setHasMore(!!newData.nextPageToken);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [isLoadingMore, newData]);

    useEffect(() => {
        return () => {
            setList([]);
            setNextPageToken("");
            setHasMore(true);
            setIsLoadingMore(false);
        };
    }, [categoryId]);

    useEffect(() => {
        if (data) {
            setList(data.items);
            setNextPageToken(data.nextPageToken || "");
            setHasMore(!!data.nextPageToken);
        }
    }, [categoryId, data]);

    const MemoizedYoutubeItem = React.memo(YoutubeItem);

    return (
        <>
            {isLoading && <Loading></Loading>}
            <InfiniteScroll
                dataLength={list?.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={loading && <Loading></Loading>}
                refreshFunction={fetchData}
                scrollThreshold={"200px"}
                endMessage={
                    <p className="text-center pb-6">
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                className="!overflow-hidden"
            >
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-5 py-4 gap-y-3 px-3 md:px-6 lg:pr-6 lg:pl-0">
                    {list?.map((item: YoutubeItemType) => (
                        <MemoizedYoutubeItem key={`${item.id}`} item={item} />
                    ))}
                </ul>
            </InfiniteScroll>
        </>
    );
};

export default YoutubeList;
