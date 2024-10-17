"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { YoutubeItemType, YoutubeResponseType } from "@/common/types";
import Loading from "@/components/Loading";
import { useApi } from "@/hooks/useAPI";
import { useYouTubeStore } from "@/store/store";

import YoutubeItem from "./YoutubeItem";

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
    const { data, isLoading } = useApi<YoutubeResponseType>({
        url: `https://www.googleapis.com/youtube/v3/videos?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=${options.part}&chart=${options.chart}&regionCode=${options.regionCode}&maxResults=${options.maxResults}&videoCategoryId=${categoryId}`,
    });

    const { data: newData, isLoading: loading } = useApi<YoutubeResponseType>({
        url: `https://www.googleapis.com/youtube/v3/videos?key=${
            process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
        }&part=${options.part}&chart=${options.chart}&regionCode=${
            options.regionCode
        }&maxResults=${options.maxResults}&videoCategoryId=${categoryId}${
            nextPageToken ? `&pageToken=${nextPageToken}` : ""
        }`,
    });

    const [list, setList] = useState<YoutubeItemType[]>([]);
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
    }, [categoryId, data]);

    return (
        <>
            {isLoading && <Loading></Loading>}
            <InfiniteScroll
                dataLength={list?.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={loading && <Loading></Loading>}
                scrollThreshold={"200px"}
                endMessage={
                    <p className="text-center pb-6">
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                className="!overflow-hidden"
            >
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-x-5 py-4 gap-y-5 pr-6">
                    {list?.map((item: YoutubeItemType) => (
                        <YoutubeItem key={`${item.id}`} item={item} />
                    ))}
                </ul>
            </InfiniteScroll>
        </>
    );
};

export default YoutubeList;
