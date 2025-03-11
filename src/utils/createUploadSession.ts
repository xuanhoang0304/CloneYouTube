import axios from "axios";

const createUploadSession = async (
    title: string,
    description: string,
    privacy: string,
    accessToken: string | null
) => {
    const response = await axios.post(
        "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
        {
            snippet: { title, description, categoryId: "22" },
            status: { privacyStatus: privacy, embeddable: true },
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "X-Upload-Content-Type": "video/mp4",
            },
        }
    );
    return response.headers.location; // Trả về URL upload
};
export default createUploadSession;
