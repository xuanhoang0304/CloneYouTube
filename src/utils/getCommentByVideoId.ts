export default async function getCommentByVideoId(videoId: string) {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,replies&videoId=${videoId}&maxResults=100`
    );
    const data = await res.json();
    return data.items;
}
