import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type NotifyItem = {
    item: {
        id: number;
        title: string;
        channelAvt: string;
        thumbnailImg: string;
        createAt: string;
        isCheck: boolean;
    };
};
const NotifyItem = ({ item }: NotifyItem) => {
    return (
        <li>
            <Link href="#" className="py-4 pr-4 flex justify-between">
                <div className="relative shrink-0 ml-1 h-12">
                    {!item.isCheck && (
                        <div className="size-1 abs-center-y  rounded-full  bg-[#3ea6ff]"></div>
                    )}
                    <figure className="size-12 shrink-0  rounded-full ml-4">
                        <Image
                            alt="chanel avt"
                            src={item.channelAvt}
                            width={48}
                            height={48}
                            className="img-cover rounded-full"
                        ></Image>
                    </figure>
                </div>

                <div>
                    <h2 className="max-w-[242px] text-sm leading-5">
                        {item.title}
                    </h2>
                    <p className="text-xs mt-2 leading-[18px] text-[#AAA]">
                        {item.createAt}
                    </p>
                </div>
                <figure className="w-[86px] h-[48px] rounded">
                    <Image
                        alt="chanel avt"
                        src={item.thumbnailImg}
                        width={86}
                        height={48}
                        className="img-cover rounded"
                    ></Image>
                </figure>
                <div>
                    <button className="flex-center relative top-[-10px] size-10 rounded-full active:bg-[#717171] transition-colors bg-transparent">
                        <EllipsisVertical />
                    </button>
                </div>
            </Link>
        </li>
    );
};

export default NotifyItem;
