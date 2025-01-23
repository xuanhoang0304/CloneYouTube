"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { RelatedItemType, RelatedResponseType } from "@/common/types";
import Loading from "@/components/Loading";
import { useApi } from "@/hooks/useAPI";

import PlayListWrapper from "./PlayListWrapper";
import RelatedItem from "./RelatedItem";

type RelatedListProps = {
    channelId: string | undefined;
};
const RelatedList = ({ channelId }: RelatedListProps) => {
    const searchParams = useSearchParams();
    const [hasMore, setHasMore] = useState(false);
    // Convert searchParams to an object
    const params: { [key: string]: string } = {};
    const [nextPageToken, setNextPageToken] = useState("");
    const [list, setList] = useState<RelatedItemType[]>([]);
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
    searchParams.forEach((value, key) => {
        params[key] = value;
    });
    const { data } = useApi<RelatedResponseType>({
        url: channelId
            ? `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&channelId=${channelId}&type=video&maxResults=100&order=date
        `
            : "",
    });
    const { data: newData, isLoading } = useApi<RelatedResponseType>({
        url: channelId
            ? `https://www.googleapis.com/youtube/v3/search?key=${
                  process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
              }&part=snippet&channelId=${channelId}&type=video&maxResults=100&order=date${
                  nextPageToken ? `&pageToken=${nextPageToken}` : ""
              }`
            : "",
    });

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
    }, [data, channelId]);

    return (
        <>
            {isLoading && <Loading></Loading>}
            {params.list && (
                <PlayListWrapper playList={params}></PlayListWrapper>
            )}

            <InfiniteScroll
                dataLength={list?.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={isLoading && <p>Loading...</p>}
                scrollThreshold={0.5}
                scrollableTarget="window"
                className="no-scrollbar"
            >
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-x-5  gap-y-5">
                    {list?.map((item: RelatedItemType) => (
                        <RelatedItem key={item.id.videoId} item={item} />
                    ))}
                </ul>
            </InfiniteScroll>
        </>
    );
};

export default RelatedList;
