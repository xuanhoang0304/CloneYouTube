import { Api02 } from "@/common/apiKey";

export default async function getChannelDetail(channelId: string) {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?key=${Api02}&part=snippet,statistics&id=${channelId}`
    );
    const data = await res.json();
    return data;
}
