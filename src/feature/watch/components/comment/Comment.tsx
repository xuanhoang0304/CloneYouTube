import CommentList from './CommentList';

const CommentContainer = ({
    totalComment,
}: {
    totalComment: string | undefined;
}) => {
    return <CommentList totalComment={totalComment}></CommentList>;
};

export default CommentContainer;
