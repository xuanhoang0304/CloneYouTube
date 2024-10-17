import { Radio } from 'lucide-react';
import Image from 'next/image';

import { ChanelType } from '@/common/types';

type subscriptionItemProps = {
    item: ChanelType;
};
const SubscriptionsItem = ({ item }: subscriptionItemProps) => {
    return (
        <li className="flex items-center w-[198px] gap-x-4 transition-colors relative p-2 hover:bg-[#717171] rounded-lg cursor-pointer">
            <figure className="size-6 shrink-0 rounded-full">
                <Image
                    src={item.src}
                    alt="channel Avt"
                    width={24}
                    height={24}
                    className="img-cover rounded-full"
                ></Image>
            </figure>
            <h2 className="line-clamp-1 max-w-[150px] text-xs  leading-5">
                {item.channelName}
            </h2>
            {item.status === "active" ? (
                <div className="w-4 flex-center absolute right-4">
                    <span className="size-1 bg-[#3ea6ff] rounded-full "></span>
                </div>
            ) : item.status === "streaming" ? (
                <Radio className="text-red-700 w-4 absolute right-4"></Radio>
            ) : null}
        </li>
    );
};

export default SubscriptionsItem;
