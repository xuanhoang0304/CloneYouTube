import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';

import { CommentType } from '@/common/types';

import ReplyInfo from './ReplyInfo';

const ReplyItem = ({ reply }: { reply: CommentType }) => {
    return (
        <li key={reply.id} className="mb-4 flex gap-x-3 w-full pr-5 relative">
            <div className="flex flex-1 gap-x-3 w-full">
                <figure className={"rounded-full size-7"}>
                    <Image
                        src={reply.snippet.authorProfileImageUrl}
                        alt="channel avt"
                        width={50}
                        height={50}
                        className="img-cover rounded-full"
                    ></Image>
                </figure>
                <ReplyInfo reply={reply}></ReplyInfo>
            </div>
            <EllipsisVertical className="absolute right-0 top-0" />
        </li>
    );
};

export default ReplyItem;
