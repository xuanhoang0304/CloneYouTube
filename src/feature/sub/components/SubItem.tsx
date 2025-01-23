import { BellRing, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { SubChannelItemType } from '@/common/types';
import { useYouTubeStore } from '@/store/store';
import handleUnSubcriceChannel from '@/utils/handleUnSubcriceChannel';

const SubItem = ({
    item,
    onFetchData,
}: {
    item: SubChannelItemType;
    onFetchData: (id: string) => void;
}) => {
    const { token } = useYouTubeStore();
    const router = useRouter();
    const handleSubscribed = useCallback(async () => {
        const response = await handleUnSubcriceChannel(item.id, token);
        if (response) {
            onFetchData(item.id); // Revalidate subscriptions data
        }
    }, [token, item.id]);
    return (
        <li className="flex flex-col  gap-1 justify-between flex-wrap ">
            <div className="flex gap-x-4 ">
                <figure
                    onClick={() => {
                        router.push(
                            `/channel/${item.snippet.resourceId.channelId}?title=${item.snippet.title}`
                        );
                    }}
                    className="size-[100px] cursor-pointer rounded-full shrink-0 border-[2px] border-white"
                >
                    <Image
                        src={
                            item.snippet.thumbnails.high.url ||
                            "/image/default.avif"
                        }
                        alt="sub-channel-avt"
                        width={100}
                        height={100}
                        className="size-full object-cover rounded-full"
                    ></Image>
                </figure>
                <div
                    onClick={() => {
                        router.push(
                            `/channel/${item.snippet.resourceId.channelId}?title=${item.snippet.title}`
                        );
                    }}
                    className="flex-1 cursor-pointer"
                >
                    <h2 className="text-lg">{item.snippet.title}</h2>
                    <p className="text-[#aaa] text-xs">
                        {item.contentDetails.totalItemCount} Video
                    </p>
                    <p className="text-[#aaa] text-xs line-clamp-3 mt-1">
                        {item.snippet.description}
                    </p>
                </div>
            </div>
            <button
                onClick={handleSubscribed}
                className="w-[50%] md:w-[180px]   justify-center text-black bg-[var(--bg-second-white)] hover:bg-[var(--bg-hover-white)] dark:text-white dark:bg-[#272727] dark:hover:bg-[#373737] transition-colors  px-4 py-2 rounded-full mt-3 flex items-center gap-x-2"
            >
                <BellRing className="w-5" />
                <p>Đã đăng ký</p>
                <ChevronDown className="w-5" />
            </button>
        </li>
    );
};

export default SubItem;
