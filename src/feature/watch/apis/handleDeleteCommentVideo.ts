import axios from 'axios';

const url = "https://www.googleapis.com/youtube/v3/comments";

export default async function handleDeleteCommentVideo(
    commentId: string,
    token: string | undefined
) {
    const res = await axios.delete(
        `${url}?id=${commentId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,

        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );
    return res;
    
}
