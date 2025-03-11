import axios from 'axios';

export default async function handleLikeVideo(
    videoId: string | undefined,
    rating: string,
    token: string | null
) {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/videos/rate?part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&id=${videoId}&rating=${rating}`,
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
