"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { SearchVideoItemType } from '@/common/types';
import Loading from '@/components/Loading';
import { useApi } from '@/hooks/useAPI';
import { filterDupList } from '@/utils/filterDupList';

import SearchVideoItem from './SearchVideoItem';

const SearchVideoList = () => {
    const query = useSearchParams().get("q") ?? "";

    const [nextPageToken, setNextPageToken] = useState("");

    const [list, setList] = useState<SearchVideoItemType[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const fetchData = async () => {
        try {
            setHasMore(newData?.nextPageToken ? true : false);
            if (newData) {
                setList([...list, ...newData?.items]);
                setNextPageToken(newData?.nextPageToken);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { data } = useApi<{
        items: SearchVideoItemType[];
        nextPageToken: string;
    }>({
        url: `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&q=${query}&maxResults=50&type=video`,
    });
    const { data: newData, isLoading } = useApi<{
        items: SearchVideoItemType[];
        nextPageToken: string;
    }>({
        url: `https://www.googleapis.com/youtube/v3/search?key=${
            process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
        }&part=snippet&q=${query}&maxResults=50&type=video${
            nextPageToken ? `&pageToken=${nextPageToken}` : ""
        }`,
    });

    useEffect(() => {
        if (data) {
            setList(data.items);
            if (!data.nextPageToken) {
                setHasMore(false);
                setNextPageToken("");
                console.log("no more");
            } else {
                setHasMore(true);
                setNextPageToken(data.nextPageToken);
                console.log("more");
            }
        }
    }, [query, data]);

    if (!list) return <p className="text-center pb-6">No data</p>;
    return (
        <>
            {isLoading && <Loading></Loading>}
            <InfiniteScroll
                dataLength={list?.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<Loading></Loading>}
                scrollThreshold={"200px"}
                endMessage={
                    <p className="text-center pb-6">
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <ul className="flex flex-col gap-4">
                    {filterDupList(list)?.map((item: SearchVideoItemType) => (
                        <SearchVideoItem key={item.id.videoId} item={item} />
                    ))}
                </ul>
                {isLoading && <Loading></Loading>}
            </InfiniteScroll>
        </>
    );
};

export default SearchVideoList;
