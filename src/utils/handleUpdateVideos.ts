import axios from "axios";

type FormUpdate = {
    title: string;
    description: string;
    privacy: "public" | "private" | "unlisted";
};
export default async function handleUpdateVideo(
    token: string | null,
    categoryId: string = "22",
    FormData: FormUpdate,
    videoId: string | undefined
) {
    try {
        const { data } = await axios.put(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,status&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
            {
                id: videoId,
                snippet: {
                    title: FormData.title.replace(/\"/g, '\\"'),
                    description: FormData.description,
                    categoryId,
                },
                status: {
                    privacyStatus: FormData.privacy,
                    embeddable: FormData.privacy != "private" ? true : false,
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
    } catch (error: any) {
        console.error("Error updating video:", error);
        if (error.response) {
            console.error("API response:", error.response.data);
        }
        throw error;
    }
}
