const url = "https://www.googleapis.com/youtube/v3/subscriptions";
export async function getMySubscriptions(pageToken: string = "") {
    const res = await fetch(
        `${url}?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,contentDetails&mine=true&maxResults=50&pageToken=${pageToken}`
    );
    const data = await res.json();
    return data;
}
