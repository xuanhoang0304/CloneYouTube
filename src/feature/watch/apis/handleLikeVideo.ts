import axios from 'axios';

export default async function handleLikeVideo(
    videoId: string | undefined,
    rating: string,
    token: string | undefined
) {
    const { data } = await axios.post(
        `https://www.googleapis.com/youtube/v3/videos/rate?part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&id=${videoId}&rating=${rating}`,
        {},
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
