export default async function handleReplyComment(
    parentId: string | undefined,
    textOriginal: string,
    token: string | undefined
) {
    // const { data } = await axios.post(
    //     `https://www.googleapis.com/youtube/v3/comments?part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    //     {
    //         snippet: {
    //             parentId : parentId,
    //             textOriginal : textOriginal,
    //         },
    //     },
    //     {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //             Accept: "application/json",
    //         },
    //     }
    // );
    console.log("key", { parentId, textOriginal, token });
    // return data;
}
