"use client";
import Image from 'next/image';
import Link from 'next/link';
import { memo, useState } from 'react';

import { TopCommentType } from '@/common/types';

import CommentAction from './CommentAction';
import CommentInfo from './CommentInfo';

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
    return (
        <li className="mb-4 flex gap-x-3 w-full relative">
            <div className="flex flex-1 gap-x-3 w-full">
                <Link href={`/channel/${comment.snippet.topLevelComment.snippet.authorChannelId?.value}`}>
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

                <CommentInfo
                    comment={comment}
                    commentEditId={commentEditId}
                    onEditComment={handleEditComment}
                    onMuateComment={onMuateComment}
                ></CommentInfo>
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
