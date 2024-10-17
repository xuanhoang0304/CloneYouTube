import CommentList from './CommentList';

const CommentContainer = ({ totalComment }: { totalComment: string }) => {
    return (
        <div className="mt-4 pt-4 border-t border-gray-300">
            <CommentList totalComment={totalComment}></CommentList>
        </div>
    );
};

export default CommentContainer;
