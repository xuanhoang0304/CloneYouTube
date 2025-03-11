import axios from "axios";

export default async function handleDeleteVideo(
    videoId: string,
    token: string | null
) {
    try {
        const response = await axios.delete(
            `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );
        if (response.status !== 204) {
            throw new Error("Delete fail");
        }
        return response.status;
    } catch (error) {
        console.log("error", error);
    }
}
