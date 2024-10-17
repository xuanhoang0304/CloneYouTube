import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { SearchVideoItemType } from '@/common/types';
import { calcDayCreate } from '@/utils/calcDayCreate';

type SearchVideoItemProps = {
    item : SearchVideoItemType
}
const SearchVideoItem = ({ item }: SearchVideoItemProps) => {
    return (
        <li>
            <Link href={`/watch?v=${item.id.videoId}`} className="flex gap-4">
                <Image
                    src={item.snippet.thumbnails.high.url}
                    alt="thumbnail video search"
                    width={500}
                    height={280}
                    className="w-[500px] h-[280px] object-cover rounded-lg"
                ></Image>
                <div className="flex-1 relative">
                    <EllipsisVertical className="absolute top-3 right-3" />
                    <h2 className="text-[18px] max-w-[90%] leading-[26px] line-clamp-2  ">
                        {item.snippet.title}
                    </h2>
                    <div className="flex items-center gap-x-2 text-xs text-[#aaa] leading-[18px]">
                        <p className="">{item.snippet.channelTitle}</p>
                        <span className="size-1 bg-[#aaa] rounded-full "></span>
                        <span>{calcDayCreate(item.snippet.publishedAt)}</span>
                    </div>
                    <div className="my-3 flex items-center gap-x-2">
                        <figure className="size-6 rounded-full shrink-0">
                            <Image
                                src={
                                    "https://images.unsplash.com/photo-1726682577615-728e4272a60c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                }
                                alt="channel avt"
                                width={40}
                                height={40}
                                className="rounded-full img-cover"
                            ></Image>
                        </figure>
                        <h3 className="text-xs leading-[18px] text-[#aaa]">
                            {item.snippet.channelTitle}
                        </h3>
                    </div>
                    <p className="text-xs leading-[18px] line-clamp-2 text-[#aaa]">
                        {item.snippet.description != ""
                            ? item.snippet.description
                            : "No description"}
                    </p>
                </div>
            </Link>
        </li>
    );
};

export default SearchVideoItem;
