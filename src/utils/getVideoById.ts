export default async function getVideoById(id: string) {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${process.env
            .NEXT_PUBLIC_YOUTUBE_API_KEY!}&part=snippet,statistics&id=${id}`
    );
    const data = await res.json();
    return data.items;
}
