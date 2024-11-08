"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { channelDetailResponse, TopCommentType } from '@/common/types';
import Loading from '@/components/Loading';
import { useApi } from '@/hooks/useAPI';
import { useYouTubeStore } from '@/store/store';

import CommentHeading from './CommentHeading';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

const CommentList = ({
    totalComment,
}: {
    totalComment: string | undefined;
}) => {
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
    const { data, mutate } = useApi<{
        items: TopCommentType[];
        nextPageToken: string;
    }>({
        url: `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,replies&videoId=${videoId}&maxResults=50`,
    });
    const {
        data: newData,
        isLoading,
        mutate: mutateNewData,
    } = useApi<{
        items: TopCommentType[];
        nextPageToken: string;
    }>({
        url: `https://www.googleapis.com/youtube/v3/commentThreads?key=${
            process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
        }&part=snippet,replies&videoId=${videoId}&maxResults=50${
            nextPageToken ? `&pageToken=${nextPageToken}` : ""
        }`,
    });
    const { token } = useYouTubeStore();
    const { data: channelDetail } = useApi<channelDetailResponse>({
        url: `https://www.googleapis.com/youtube/v3/channels?access_token=${token}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,statistics,brandingSettings&mine=true`,
    });
    const handleCommentAdded = (newComment?: {
        content: string;
        createdAt: string;
        id: string;
    }) => {
        if (newComment) {
            const optimisticComment: TopCommentType = {
                id: newComment.id,
                snippet: {
                    topLevelComment: {
                        snippet: {
                            textOriginal: newComment.content,
                            authorDisplayName:
                                channelDetail?.items[0]?.snippet?.customUrl ||
                                "",
                            authorProfileImageUrl:
                                channelDetail?.items[0]?.snippet?.thumbnails
                                    .high.url || "/image/default.avif",
                            publishedAt: newComment.createdAt,
                            likeCount: 0,
                        },
                    },
                    totalReplyCount: 0,
                },
            };

            setList((prevList) => [optimisticComment, ...prevList]);
        }

        mutateNewData();
        mutate();
    };
    const handleMutate = () => {
        mutateNewData();
        mutate();
    };
    const handleDeleteComment = (commentId: string) => {
        setList((prevList) =>
            prevList.filter((comment) => comment.id !== commentId)
        );
        mutate();
    };
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
            <CommentInput
                userAvatar={
                    channelDetail?.items[0]?.snippet?.thumbnails.high.url
                }
                videoId={videoId}
                onCommentAdded={handleCommentAdded}
            ></CommentInput>
            <InfiniteScroll
                dataLength={list?.length}
                next={fetchData}
                hasMore={hasMore}
                loader={isLoading && <p>Loading...</p>}
                scrollThreshold={0.8}
                scrollableTarget="window"
                className="!overflow-unset"
            >
                <ul className="mt-8">
                    {list?.map((comment: TopCommentType) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onDeleteComment={handleDeleteComment}
                            onMuateComment={handleMutate}
                            myCmt={
                                comment.snippet.topLevelComment.snippet
                                    .authorDisplayName ===
                                channelDetail?.items[0]?.snippet?.customUrl
                            }
                        ></CommentItem>
                    ))}
                </ul>
            </InfiniteScroll>
        </>
    );
};

export default CommentList;
