import axios from 'axios';

export default async function handleUnSubcriceChannel(
    subscriptionId: string | undefined,
    token: string | undefined
) {
    const response = await axios.delete(
        `https://youtube.googleapis.com/youtube/v3/subscriptions?id=${subscriptionId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );
    return response;
}
