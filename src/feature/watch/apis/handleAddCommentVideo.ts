import axios from 'axios';

export default async function handleAddCommentVideo(
    videoId: string | null | undefined,
    textOriginal: string,
    token: string | undefined
) {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/commentThreads?part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
        {
            snippet: {
                videoId,
                canReply: true,
                topLevelComment: {
                    snippet: {
                        textOriginal,
                    },
                },
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
