import { EllipsisVertical, Flag, Pencil, Trash2 } from 'lucide-react';
import { memo, Suspense, useState } from 'react';

import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import useClickOutside from '@/hooks/useClickOutSide';
import { cn } from '@/lib/utils';
import { useYouTubeStore } from '@/store/store';

import handleDeleteCommentVideo from '../../apis/handleDeleteCommentVideo';

const CommentAction = ({
    myCmt,
    commentId,
    onDeleteComment,
    onEditComment,
}: {
    myCmt: boolean;
    commentId: string;
    onDeleteComment: (commentId: string) => void;
    onEditComment: (id: string) => void;
}) => {
    const [isShow, setIsShow] = useState(false);
    const handleClose = () => {
        setIsShow(false);
    };

    const { token } = useYouTubeStore();
    const ref = useClickOutside<HTMLDivElement>(handleClose);
    const { toast } = useToast();
    return (
        <div ref={ref}>
            <figure onClick={() => setIsShow(!isShow)}>
                <EllipsisVertical />
            </figure>
            <Suspense fallback={<Loading />}>
                <div
                    className={cn(
                        "absolute top-[40px] z-10 left-0  size-10 py-2 h-auto w-[150px] bg-[#282828] rounded-lg",
                        isShow ? "block" : "hidden"
                    )}
                >
                    {myCmt ? (
                        <div>
                            <button
                                onClick={() => {
                                    onEditComment(commentId);
                                    setIsShow(false);
                                }}
                                className="flex items-center gap-x-2 p-2 bg-transparent hover:bg-[#383838] w-full transition-colors "
                            >
                                <Pencil className="size-4" />
                                <p className="text-sm text-white">Chỉnh sửa</p>
                            </button>
                            <div className="flex   bg-transparent hover:bg-[#383838] w-full transition-colors ">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="text-sm p-2 flex-1 justify-start bg-transparent  h-auto hover:bg-transparent hover:text-white transition-colors"
                                        >
                                            <Trash2 className="size-4" />
                                            <p className="text-sm">Xóa</p>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle className="text-black">
                                                Xóa bình luận
                                            </DialogTitle>
                                            <DialogDescription>
                                                Xóa vĩnh viễn bình luận của bạn?
                                            </DialogDescription>
                                        </DialogHeader>

                                        <DialogFooter className="sm:justify-end">
                                            <DialogClose asChild>
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    className="hover:bg-[#515151] transition-colors"
                                                >
                                                    Hủy
                                                </Button>
                                            </DialogClose>
                                            <Button
                                                onClick={async () => {
                                                    const res =
                                                        await handleDeleteCommentVideo(
                                                            commentId,
                                                            token
                                                        );
                                                    if (res.status === 204) {
                                                        toast({
                                                            className:
                                                                "bg-[#484848] text-white ",
                                                            duration: 2000,
                                                            title: "Đã xóa bình luận",
                                                        });
                                                        onDeleteComment(
                                                            commentId
                                                        );
                                                        setIsShow(false);
                                                    }
                                                }}
                                                type="button"
                                                variant="secondary"
                                                className="bg-[#515151]  hover:text-[#515151] transition-colors"
                                            >
                                                Xóa
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                alert(commentId);
                                setIsShow(false);
                            }}
                            className="flex items-center gap-x-2 p-2 bg-transparent hover:bg-[#383838] w-full transition-colors "
                        >
                            <Flag className="size-4" />
                            <p className="text-sm text-white">
                                Báo cáo vi phạm
                            </p>
                        </button>
                    )}
                </div>
            </Suspense>
        </div>
    );
};

export default memo(CommentAction);
