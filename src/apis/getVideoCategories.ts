export async function getVideoCategories(locale : string) {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videoCategories?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&regionCode=${locale == "vi" ? "VN" : "GB"}&hl=${locale == "vi" ? "vi" : "en"}`
    );
    const data = await res.json();
    return data;
}
