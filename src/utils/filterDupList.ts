import { SearchVideoItemType } from '@/common/types';

export const filterDupList = (list: SearchVideoItemType[]) => {
    const uniqueList = list.filter((item, index, self) => {
        return index === self.findIndex((t) => t.id.videoId === item.id.videoId);
    });
    return uniqueList;
};
