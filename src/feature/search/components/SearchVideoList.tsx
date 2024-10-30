"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import getVideoSearch from "@/apis/getVideoSearch";
import { SearchVideoItemType } from "@/common/types";
import Loading from "@/components/Loading";

import SearchVideoItem from "./SearchVideoItem";

const SearchVideoList = () => {
    const query = useSearchParams().get("q") ?? "";
    const [isLoading, setIsLoading] = useState(false);
    const [nextPageToken, setNextPageToken] = useState("");

    const [list, setList] = useState<SearchVideoItemType[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const fetchData = async () => {
        try {
            const data = await getVideoSearch("", nextPageToken);
            setIsLoading(true);
            setHasMore(data.nextPageToken ? true : false);
            setList([...list, ...data?.items]);
            setNextPageToken(data.nextPageToken);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const getVideo = async () => {
            const res = await getVideoSearch(query, "");
            setList(res.items);
            if (!res.nextPageToken) {
                setHasMore(false);
                setNextPageToken("");
            } else {
                setHasMore(true);
                setNextPageToken(res.nextPageToken);
            }
        };
        getVideo();
    }, [query]);

    if (!list) return <p className="text-center pb-6">No data</p>;
    return (
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
                {list.map((item: SearchVideoItemType) => (
                    <SearchVideoItem key={item.id.videoId} item={item} />
                ))}
            </ul>
            {isLoading && <Loading></Loading>}
        </InfiniteScroll>
    );
};

export default SearchVideoList;
