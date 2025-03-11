import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { SearchPlayListItemType } from '@/common/types';
import { calcDayCreate } from '@/utils/calcDayCreate';

const HomePlayListVideo = ({ data }: { data: SearchPlayListItemType }) => {
    const locale = useLocale();
    return (
        <li
            className={`${
                data?.snippet?.title === "Private video" ? "hideVideo" : ""
            }`}
        >
            <Link href={`/${locale}/watch?v=${data?.snippet?.resourceId?.videoId}`}>
                <figure className="w-full h-[118px]">
                    <Image
                        src={data?.snippet?.thumbnails?.medium?.url || "/image/default.avif"}
                        alt="video bg"
                        width={500}
                        height={200}
                        className="h-full w-full object-cover max-h-[200px] rounded-t-xl aspect-[1000/200] bg-gray-200"
                    ></Image>
                </figure>
                <h2 className="dark:text-white text-black text-sm line-clamp-2 mt-3">
                    {data?.snippet?.title}
                </h2>

                <h3 className="text-sm text-[#aaa] mt-1">
                    {data?.snippet?.channelTitle}
                </h3>
                <p className="text-xs text-[#aaa] mt-1">
                    {calcDayCreate(data?.snippet?.publishedAt, locale)}
                </p>
            </Link>
        </li>
    );
};

export default HomePlayListVideo;
