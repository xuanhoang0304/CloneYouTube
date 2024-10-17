export default async function getChannelDetail(channelId: string) {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,statistics&id=${channelId}`
    );
    const data = await res.json();
    return data;
}
