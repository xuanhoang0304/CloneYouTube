"use client";

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { channelDetailResponse, TopCommentType } from '@/common/types';
import Loading from '@/components/Loading';
import { useApi } from '@/hooks/useAPI';
import { cn } from '@/lib/utils';
import { useYouTubeStore } from '@/store/store';

import CommentHeading from './CommentHeading';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

const CommentList = ({
    totalComment,
}: {
    totalComment: string | undefined;
}) => {
    const { token } = useYouTubeStore();
    const videoId = useSearchParams().get("v");
    const [nextPageToken, setNextPageToken] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [isShowComment, setIsShowComment] = useState(false);
    const [list, setList] = useState<TopCommentType[]>([]);
    const handleHideCommentList = () => {
        setIsShowComment(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
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
        url: `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/commentThreads?&access_token=${token}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,replies&videoId=${videoId}&maxResults=100`,
    });
    const {
        data: newData,
        isLoading,
        mutate: mutateData,
    } = useApi<{
        items: TopCommentType[];
        nextPageToken: string;
    }>({
        url: `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/commentThreads?&access_token=${token}&key=${
            process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
        }&part=snippet,replies&videoId=${videoId}&maxResults=100${
            nextPageToken ? `&pageToken=${nextPageToken}` : ""
        }`,
    });

    const { data: channelDetail } = useApi<channelDetailResponse>({
        url: token
            ? `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/channels?access_token=${token}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,statistics,brandingSettings&mine=true`
            : "",
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
                            updatedAt: newComment.createdAt,
                            likeCount: 0,
                        },
                    },
                    totalReplyCount: 0,
                },
            };

            setList((prevList) => [optimisticComment, ...prevList]);
            mutate();
            mutateData();
        }
    };
    const handleMutate = () => {
        mutate();
        mutateData();
    };
    const handleDeleteComment = (commentId: string) => {
        setList((prevList) =>
            prevList.filter((comment) => comment.id !== commentId)
        );
        mutate();
        mutateData();
    };

    useEffect(() => {
        if (data) {
            if (!data.nextPageToken) {
                setHasMore(false);
                setNextPageToken("");
            } else {
                setHasMore(true);
                setNextPageToken(data.nextPageToken);
            }
            setList(data?.items);
        }
    }, [data, videoId]);

    return (
        <>
            <div className={cn("lg:block", isShowComment ? "block" : "hidden")}>
                {isLoading && <Loading></Loading>}
                <CommentHeading
                    totalComment={totalComment}
                    onHideCommentList={handleHideCommentList}
                />
                <CommentInput
                    userAvatar={
                        channelDetail?.items[0]?.snippet?.thumbnails.high.url
                    }
                    videoId={videoId}
                    onCommentAdded={handleCommentAdded}
                    action={"add"}
                ></CommentInput>
                <InfiniteScroll
                    dataLength={list?.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={isLoading && <p>Loading...</p>}
                    scrollThreshold={0.5}
                    scrollableTarget="window"
                    className="!overflow-unset"
                >
                    <ul className="mt-8 flex flex-col gap-y-4">
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
            </div>
            <div
                onClick={() => {
                    setIsShowComment(true);
                }}
                className={cn(
                    "lg:hidden",
                    isShowComment
                        ? "hidden"
                        : "block p-3 bg-[var(--bg-second-white)] dark:bg-[#272727] rounded-lg mt-3"
                )}
            >
                <p className=" font-bold">
                    Bình luận
                    <span className="font-medium text-xs text-gray-400 ml-2">
                        {totalComment != "0" ||
                            "Hãy là người đầu tiên bình luận"}
                    </span>
                </p>
                {totalComment != "0" && (
                    <div className="flex items-center gap-x-3 mt-2">
                        <figure className="size-6 rounded-full shrink-0">
                            <Image
                                src={
                                    list[0]?.snippet?.topLevelComment?.snippet
                                        ?.authorProfileImageUrl ||
                                    "./image/default.avif"
                                }
                                alt="userAvt"
                                width={24}
                                height={24}
                                className="size-full object-cover rounded-full"
                            ></Image>
                        </figure>
                        <p className="line-clamp-1 md:line-clamp-2 text-sm">
                            {list[0]?.snippet?.topLevelComment?.snippet
                                ?.textOriginal ||
                                "Hãy là người đầu tiên bình luận"}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default CommentList;
