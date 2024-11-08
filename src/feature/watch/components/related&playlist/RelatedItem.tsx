"use client";
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { RelatedItemType } from '@/common/types';
import { calcDayCreate } from '@/utils/calcDayCreate';
import calcView from '@/utils/calcView';

type Props = {
    item: RelatedItemType;
};
const RelatedItem = ({ item }: Props) => {
    const router = useRouter();
    return (
        <li
            onClick={() => {
                router.push(`/watch?v=${item.id.videoId}`);
            }}
            className="flex  gap-x-3 relative cursor-pointer"
        >
            <figure className="w-[168px] h-[94px] rounded-lg shrink-0">
                <Image
                    src={
                        item.snippet.thumbnails.high.url != "" ? item.snippet.thumbnails.high.url :
                        "https://c8.alamy.com/comp/2X4W7KT/grunge-red-not-available-word-hexagon-rubber-seal-stamp-on-white-background-2X4W7KT.jpg"
                    }
                    alt=""
                    width={168}
                    height={100}
                    className="img-cover rounded-lg"
                ></Image>
            </figure>
            <div className=" max-w-[257px] pr-6 overflow-hidden">
                <h2 className="line-clamp-2 font-medium leading-[22px] cursor-pointer">
                    {item.snippet.title}
                </h2>
                <p className="text-sm leading-[18px] text-[#aaa]">
                    {item.snippet.channelTitle}
                </p>
                <div>
                    {item?.statistics?.viewCount && (
                        <span className="text-xs leading-[18px] text-[#aaa]">
                            {calcView(+item.statistics.viewCount)}
                        </span>
                    )}
                    <span className="text-xs leading-[18px] text-[#aaa]">
                        - {calcDayCreate(item.snippet.publishedAt)}
                    </span>
                </div>
            </div>
            <EllipsisVertical className="absolute top-0 right-0" />
        </li>
    );
};

export default RelatedItem;
