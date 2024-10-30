import axios from 'axios';

export default async function handleSubcriceChannel(
    channelUrlId: string | undefined,
    token: string | undefined
) {
    const { data } = await axios.post(
        `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
        {
            snippet: {
                resourceId: {
                    kind: "youtube#channel",
                    channelId: channelUrlId,
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
