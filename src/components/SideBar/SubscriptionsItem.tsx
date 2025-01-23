import Image from 'next/image';
import Link from 'next/link';

import { SubscriptionsItemType } from '@/common/types';

const SubscriptionsItem = ({ item }: { item: SubscriptionsItemType }) => {
    return (
        <li className="flex items-center w-[198px] gap-x-4 transition-colors relative p-2 hover:bg-[var(--bg-second-white)] dark:hover:bg-[#717171] rounded-lg cursor-pointer">
           <Link href={`/channel/${item.snippet.resourceId.channelId}?title=${item.snippet.title}`} className="flex items-center gap-x-4 w-full">
                <figure className="size-6 shrink-0 rounded-full">
                    <Image
                        src={item.snippet.thumbnails.medium.url || "/images/default-avatar.png"}
                        alt="channel Avt"
                        width={24}  
                        height={24}
                        className="img-cover rounded-full"
                    ></Image>
                </figure>
                <h2 className="line-clamp-1 max-w-[60%] text-xs  leading-5">
                    {item.snippet.title || "Simple Title"}
                </h2>
    
                <div className="w-4 flex-center absolute right-4">
                    <span className="size-1 bg-[#3ea6ff] rounded-full "></span>
                </div>
           </Link>
        </li>
    );
};

export default SubscriptionsItem;
