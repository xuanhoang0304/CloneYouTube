import { CommentType } from '@/common/types';

import ReplyItem from './ReplyItem';

const ReplyList = ({ comment }: { comment: CommentType[] }) => {
    return (
        <ul className="mt-2">
            {comment?.map((reply: CommentType) => (
                <ReplyItem key={reply.id} reply={reply}></ReplyItem>
            ))}
        </ul>
    );
};

export default ReplyList;
