import { Api02 } from "@/common/apiKey";

export default async function getVideoSearch(
    q: string,
    pageToken: string = ""
) {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${Api02}&part=snippet&q=${q}&maxResults=50&type=video${
            pageToken ? `&pageToken=${pageToken}` : ""
        }`
    );
    const data = await res.json();
    return data;
}
