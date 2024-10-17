import { SearchPlayListItemType } from '@/common/types';

import SearchPlayListItem from './SearchPlayListItem';

const SearchPlayList = ({ list }: { list: SearchPlayListItemType[] }) => {
    return (
        <ul className="bg-black max-h-[416px] overflow-auto py-3 rounded-b-2xl ">
            {list?.length > 0 &&
                list?.filter((item : SearchPlayListItemType) => item.snippet.title != "Private video").map((item : SearchPlayListItemType) => (
                    <SearchPlayListItem
                        key={item.id}
                        data={item}
                    ></SearchPlayListItem>
                ))}
        </ul>
    );
};

export default SearchPlayList;
