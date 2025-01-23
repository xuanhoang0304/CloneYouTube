import axios from 'axios';

export default async function handleEditCommentVideo(
    commentId: string | null,
    textOriginal: string,
    token: string | undefined
) {
    const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/comments?part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
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
