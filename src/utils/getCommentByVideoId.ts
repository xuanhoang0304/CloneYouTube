import { Api03 } from "@/common/apiKey";

export default async function getCommentByVideoId(videoId: string) {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${Api03}&part=snippet,replies&videoId=${videoId}&maxResults=100`
    );
    const data = await res.json();
    return data.items;
}
