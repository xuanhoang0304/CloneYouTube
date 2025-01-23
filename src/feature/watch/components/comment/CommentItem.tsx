"use client";
import Image from 'next/image';
import Link from 'next/link';
import { memo, useState } from 'react';

import { TopCommentType, YoutubeResponseType } from '@/common/types';
import { useApi } from '@/hooks/useAPI';
import { useYouTubeStore } from '@/store/store';

import CommentAction from './CommentAction';
import CommentInfo from './CommentInfo';
import CommentInput from './CommentInput';

type Props = {
    comment: TopCommentType;
    myCmt: boolean;
    onDeleteComment: (commentId: string) => void;
    onMuateComment: () => void;
};

const CommentItem = ({
    comment,
    myCmt,
    onDeleteComment,
    onMuateComment,
}: Props) => {
    const [commentEditId, setCommentEditId] = useState("");
    const handleEditComment = (id: string) => {
        setCommentEditId(id);
    };

    const { token } = useYouTubeStore();
    const { data } = useApi<YoutubeResponseType>({
        url: token
            ? `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/channels?&access_token=${token}&part=snippet&mine=true`
            : "",
    });
    const userAvt = data?.items[0]?.snippet?.thumbnails?.high?.url;
    const [isShowReply, setIsShowEditReply] = useState(false);

    const handleReply = () => {
        setIsShowEditReply((prev) => !prev);
    };
    const handleCancelReply = () => {
        setIsShowEditReply(false);
    };

    return (
        <li className="flex gap-x-3 w-full relative">
            <div className="flex flex-1 gap-x-3 w-full">
                <Link
                    href={`/channel/${comment.snippet.topLevelComment.snippet.authorChannelId?.value}?title=${comment.snippet.topLevelComment.snippet.authorDisplayName}`}
                >
                    <figure className={"rounded-full size-10 cursor-pointer"}>
                        <Image
                            src={
                                comment.snippet.topLevelComment.snippet
                                    .authorProfileImageUrl
                            }
                            alt="channel avt"
                            width={50}
                            height={50}
                            className="img-cover rounded-full"
                        ></Image>
                    </figure>
                </Link>

                <div className="w-full">
                    <CommentInfo
                        comment={comment}
                        commentEditId={commentEditId}
                        onEditComment={handleEditComment}
                        onMuateComment={onMuateComment}
                        onReplyComment={handleReply}
                    ></CommentInfo>
                    {isShowReply && (
                        <CommentInput
                            parentId={comment.id}
                            userAvatar={userAvt}
                            action={"rep"}
                            onCancelReply={handleCancelReply}
                        ></CommentInput>
                    )}
                </div>
            </div>

            {!commentEditId && (
                <div className="relative cursor-pointer">
                    <CommentAction
                        myCmt={myCmt}
                        commentId={comment.id}
                        onDeleteComment={onDeleteComment}
                        onEditComment={handleEditComment}
                    ></CommentAction>
                </div>
            )}
        </li>
    );
};

export default memo(CommentItem);
