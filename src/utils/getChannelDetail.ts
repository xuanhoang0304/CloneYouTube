import { Api03 } from "@/common/apiKey";

export default async function getChannelDetail(channelId: string) {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?key=${Api03}&part=snippet,statistics&id=${channelId}`
    );
    const data = await res.json();
    return data;
}
