"use client";
import { EllipsisVertical } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { RelatedItemType } from '@/common/types';
import { calcDayCreate } from '@/utils/calcDayCreate';
import calcView from '@/utils/calcView';

type Props = {
    item: RelatedItemType;
};
const RelatedItem = ({ item }: Props) => {
    const locale = useLocale()
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
                        item.snippet.thumbnails.high.url != ""
                            ? item.snippet.thumbnails.high.url
                            : "https://c8.alamy.com/comp/2X4W7KT/grunge-red-not-available-word-hexagon-rubber-seal-stamp-on-white-background-2X4W7KT.jpg"
                    }
                    alt=""
                    width={0}
                    height={0}
                    className="img-cover rounded-lg"
                ></Image>
            </figure>
            <div className=" lg:max-w-[257px] flex-1 mr-8 overflow-hidden">
                <h2 className="line-clamp-2 font-medium leading-[22px] cursor-pointer">
                    {item.snippet.title.replaceAll("&quot;",`"`)}
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
                        - {calcDayCreate(item.snippet.publishedAt,locale)}
                    </span>
                </div>
            </div>
            <EllipsisVertical className="absolute top-0 right-0" />
        </li>
    );
};

export default RelatedItem;
