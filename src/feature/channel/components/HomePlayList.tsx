import { HomePlayListItemType, HomePlayListResponse } from '@/common/types';
import Loading from '@/components/Loading';
import { useApi } from '@/hooks/useAPI';

import HomePlayListItem from './HomePlayListItem';

const HomePlayList = ({ channelId }: { channelId: string }) => {
    const { data: playlists, isLoading } = useApi<HomePlayListResponse>({
        url: channelId
            ? `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/playlists?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&channelId=${channelId}&maxResults=50`
            : "",
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
