import axios from 'axios';

export default async function handleAddCommentVideo(
    videoId: string | null,
    textOriginal: string,
    token: string | undefined
) {
    const { data } = await axios.post(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
        {
            snippet: {
                videoId,
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
