import { SearchPlayListItemType } from '@/common/types';

import WatchPlayListItem from './WatchPlayListItem';

const WatchPlayList = ({ list }: { list: SearchPlayListItemType[] }) => {
    return (
        <ul className="bg-white dark:bg-black max-h-[416px] overflow-auto py-3 rounded-b-2xl ">
            {list?.length > 0 &&
                list
                    ?.filter(
                        (item: SearchPlayListItemType) =>
                            item.snippet.title != "Private video"
                    )
                    .map((item: SearchPlayListItemType) => (
                        <WatchPlayListItem
                            key={item.id}
                            data={item}
                        ></WatchPlayListItem>
                    ))}
        </ul>
    );
};

export default WatchPlayList;
