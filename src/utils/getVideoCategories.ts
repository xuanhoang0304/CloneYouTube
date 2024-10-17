import { Api03 } from "@/common/apiKey";

export async function getVideoCategories() {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videoCategories?key=${Api03}&part=snippet&regionCode=VN&hl=vi&regionCode=VN`
    );
    const data = await res.json();
    return data;
}
