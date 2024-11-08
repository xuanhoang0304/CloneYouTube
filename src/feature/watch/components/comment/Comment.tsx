import CommentList from './CommentList';

const CommentContainer = ({ totalComment }: { totalComment: string | undefined }) => {
    return (
        <div className="mt-4">
            <CommentList totalComment={totalComment}></CommentList>
        </div>
    );
};

export default CommentContainer;
