import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

import { TopCommentType } from "@/common/types";

import CommentInfo from "./CommentInfo";

type Props = {
    comment: TopCommentType;
};
const CommentItem = ({ comment }: Props) => {
    return (
        <li className="mb-4 flex gap-x-3 w-full relative">
            <div className="flex flex-1 gap-x-3 w-full">
                <figure className={"rounded-full size-10"}>
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

                <CommentInfo comment={comment}></CommentInfo>
            </div>
            <EllipsisVertical className="absolute right-0 top-0" />
        </li>
    );
};

export default CommentItem;
