export async function getVideoCategories() {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videoCategories?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&regionCode=VN&hl=vi&regionCode=VN`
    );
    const data = await res.json();
    return data;
}
