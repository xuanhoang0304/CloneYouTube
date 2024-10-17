"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Api03 } from "@/common/apiKey";
import { TopCommentType } from "@/common/types";
import Loading from "@/components/Loading";
import { useApi } from "@/hooks/useAPI";

import CommentHeading from "./CommentHeading";
import CommentItem from "./CommentItem";

const CommentList = ({ totalComment }: { totalComment: string }) => {
    const videoId = useSearchParams().get("v");
    const [nextPageToken, setNextPageToken] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const fetchData = async () => {
        try {
            if (newData) {
                setHasMore(newData?.nextPageToken ? true : false);
                setList([...list, ...newData?.items]);
                setNextPageToken(newData?.nextPageToken);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { data } = useApi<{ items: TopCommentType[]; nextPageToken: string }>(
        {
            url: `https://www.googleapis.com/youtube/v3/commentThreads?key=${Api03}&part=snippet,replies&videoId=${videoId}&maxResults=50`,
        }
    );
    const { data: newData, isLoading } = useApi<{
        items: TopCommentType[];
        nextPageToken: string;
    }>({
        url: `https://www.googleapis.com/youtube/v3/commentThreads?key=${Api03}&part=snippet,replies&videoId=${videoId}&maxResults=50${
            nextPageToken ? `&pageToken=${nextPageToken}` : ""
        }`,
    });
    const [list, setList] = useState<TopCommentType[]>([]);
    useEffect(() => {
        if (data) {
            setList(data?.items);
            setNextPageToken(data?.nextPageToken);
        }
    }, [data, videoId]);
    return (
        <>
            {isLoading && <Loading></Loading>}
            <CommentHeading totalComment={totalComment} />
            <InfiniteScroll
                dataLength={list?.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={isLoading && <p>Loading...</p>}
                scrollThreshold={0.8}
                scrollableTarget="window"
            >
                <ul className="mt-10">
                    {list?.map((comment: TopCommentType) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                        ></CommentItem>
                    ))}
                </ul>
            </InfiniteScroll>
        </>
    );
};

export default CommentList;
