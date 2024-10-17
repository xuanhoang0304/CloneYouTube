"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Api03 } from '@/common/apiKey';
import { RelatedItemType, RelatedResponseType } from '@/common/types';
import Loading from '@/components/Loading';
import { useApi } from '@/hooks/useAPI';
import { useYouTubeStore } from '@/store/store';

import PlayListWrapper from './PlayListWrapper';
import RelatedItem from './RelatedItem';
import TagList from './TagList';

const options = {
    part: "snippet,contentDetails,statistics",
    maxResults: 50,
    chart: "mostPopular",
    regionCode: "VN",
};

const RelatedList = () => {
    const searchParams = useSearchParams();

    // Convert searchParams to an object
    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
        params[key] = value;
    });
    const playListSearchParams = { ...params };
    const { categoryId } = useYouTubeStore();
    const [url, setUrl] = useState(
        `https://www.googleapis.com/youtube/v3/search?key=${Api03}&part=snippet&videoCategoryId=${categoryId}&type=video&maxResults=${options.maxResults}&order=date&regionCode=${options.regionCode}&location=14.0583,108.2772&locationRadius=1000km`
    );
    const [nextPageToken, setNextPageToken] = useState("");
    const prefixId = useId();
    const [hasMore, setHasMore] = useState(false);
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
    const { data, isLoading } = useApi<RelatedResponseType>({
        url: url,
    });
    const { data: newData, isLoading: loading } = useApi<RelatedResponseType>({
        url: `${url}${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`,
    });
    const handleSetUrl = (vl: string) => {
        setUrl(vl);
        setNextPageToken("");
    };
    const [list, setList] = useState<RelatedItemType[]>([]);
    useEffect(() => {
        if (data) {
            setList(data.items);
            if (!data.nextPageToken) {
                setHasMore(false);
                setNextPageToken("");
            } else {
                setHasMore(true);
                setNextPageToken(data.nextPageToken);
            }
        }
    }, [categoryId, data]);

    return (
        <>
            {isLoading && <Loading></Loading>}
            {params.list && (
                <PlayListWrapper
                    playList={playListSearchParams as { list: string; listTitle: string; v: string; index: string }}
                ></PlayListWrapper>
            )}
            <TagList onSetUrl={handleSetUrl} categoryId={categoryId}></TagList>
            <InfiniteScroll
                dataLength={list?.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={loading && <p>Loading...</p>}
                scrollThreshold={0.8}
                scrollableTarget="window"
                className="no-scrollbar"
            >
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-x-5 py-4 gap-y-5 pr-6">
                    {list?.map((item: RelatedItemType) => (
                        <RelatedItem
                            key={`${item.id}${prefixId}${
                                Math.random() * 10000
                            }`}
                            item={item}
                        />
                    ))}
                </ul>
            </InfiniteScroll>
        </>
    );
};

export default RelatedList;
