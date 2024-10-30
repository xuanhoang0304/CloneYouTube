export default async function getVideoSearch(
    q: string,
    pageToken: string = ""
) {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${
            process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
        }&part=snippet&q=${q}&maxResults=50&type=video${
            pageToken ? `&pageToken=${pageToken}` : ""
        }`
    );
    const data = await res.json();
    return data;
}
