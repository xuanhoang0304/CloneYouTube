import axios from 'axios';

export default async function handleEditCommentVideo(
    commentId: string | null,
    textOriginal: string,
    token: string | undefined
) {
    const { data } = await axios.put(
        `https://www.googleapis.com/youtube/v3/comments?part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
        {
            id: commentId,
            snippet: {
                textOriginal,
            },
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );
    return data;
}
