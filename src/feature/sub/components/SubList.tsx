"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { SubChannelItemType } from "@/common/types";
import Loading from "@/components/Loading";
import { useApi } from "@/hooks/useAPI";
import { useYouTubeStore } from "@/store/store";

import SubItem from "./SubItem";

const SubList = () => {
    const { token } = useYouTubeStore();
    const [nextPageToken, setNextPageToken] = useState("");
    const [list, setList] = useState<SubChannelItemType[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const handleFetchNewData = (id: string) => {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);
    };
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
        items: SubChannelItemType[];
        nextPageToken: string;
    }>({
        url: token
            ? `https://www.googleapis.com/youtube/v3/subscriptions?&access_token=${token}&part=snippet,contentDetails&mine=true&maxResults=10`
            : "",
    });
    const { data: newData, isLoading } = useApi<{
        items: SubChannelItemType[];
        nextPageToken: string;
    }>({
        url: token
            ? `https://www.googleapis.com/youtube/v3/subscriptions?&access_token=${token}&part=snippet,contentDetails&mine=true&maxResults=10${
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
                console.log("no more");
            } else {
                setHasMore(true);
                setNextPageToken(data.nextPageToken);
                console.log("more");
            }
        }
    }, [data]);
    return (
        <>
            <InfiniteScroll
                dataLength={list?.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<Loading></Loading>}
                scrollThreshold={"200px"}
            >
                <ul className="flex flex-col gap-y-6 mt-4 px-3 overflow-hidden">
                    {list?.map((item: SubChannelItemType) => (
                        <SubItem
                            key={item.id}
                            item={item}
                            onFetchData={handleFetchNewData}
                        ></SubItem>
                    ))}
                </ul>
                {isLoading && <Loading></Loading>}
            </InfiniteScroll>
        </>
    );
};

export default SubList;
