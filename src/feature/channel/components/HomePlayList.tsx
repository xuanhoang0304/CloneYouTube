import { Api02 } from "@/common/apiKey";
import { HomePlayListItemType, HomePlayListResponse } from "@/common/types";
import Loading from "@/components/Loading";
import { useApi } from "@/hooks/useAPI";

import HomePlayListItem from "./HomePlayListItem";

const HomePlayList = ({ channelId }: { channelId: string }) => {
    const { data: playlists, isLoading } = useApi<HomePlayListResponse>({
        url: `https://www.googleapis.com/youtube/v3/playlists?key=${Api02}&part=snippet&channelId=${
            channelId || "UCkna2OcuN1E6u5I8GVtdkOw"
        }&maxResults=50`,
    });
    return (
        <>
            {isLoading && <Loading></Loading>}
            <ul className="flex flex-col gap-y-6 mt-4">
                {playlists?.items?.map((playlistItem: HomePlayListItemType) => (
                    <HomePlayListItem
                        key={playlistItem.id}
                        item={playlistItem}
                        title={playlistItem.snippet.title}
                    ></HomePlayListItem>
                ))}
            </ul>
        </>
    );
};

export default HomePlayList;
