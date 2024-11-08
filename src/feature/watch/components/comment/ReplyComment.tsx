"use client";
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { CommentType } from '@/common/types';

import ReplyList from './ReplyList';

type Props = {
    comment: CommentType[];
};

const ReplyComment = ({ comment }: Props) => {
    const [isShow, setIsShow] = useState(false);
    return (
        <>
            <button
                onClick={() => setIsShow(!isShow)}
                className="t-2 text-[#3ea6ff] flex items-center gap-x-1 px-4 py-1 rounded-full transition-colors hover:bg-[#3ea6ff]/30"
            >
                {!isShow ? (
                    <ChevronDown className="w-4 h-4" />
                ) : (
                    <ChevronDown className="w-4 h-4 rotate-180" />
                )}
                <p className="text-sm font-semibold ">
                    {comment?.length} phản hồi
                </p>
            </button>
            {isShow && <ReplyList comment={comment}></ReplyList>}
        </>
    );
};

export default ReplyComment;
