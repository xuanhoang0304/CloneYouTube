const options = {
    part: "snippet,contentDetails,statistics",
    maxResults: 30,
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    chart: "mostPopular",
    regionCode: "VN",
    videoCategoryId: "24",
};

export async function getListVideo(
    pageToken: string = "",
    videoCategoryId: string = "24"
) {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${
            process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
        }&part=${options.part}&chart=${options.chart}&regionCode=${
            options.regionCode
        }&maxResults=${options.maxResults}&videoCategoryId=${videoCategoryId}${
            pageToken ? `&pageToken=${pageToken}` : ""
        }`
    );
    const data = await res.json();
    return data;
}
