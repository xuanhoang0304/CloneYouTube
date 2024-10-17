import SideBarTabItem from "./SideBarTabItem";
import { TabListType } from "./type";

type SideBarTabListProps = {
    list: TabListType[];
};
const SideBarTabList = ({ list }: SideBarTabListProps) => {
    return (
        <>
            <ul className="flex flex-col gap-y-1 pr-6">
                {list.slice(0, 4).map((item: TabListType) => {
                    return (
                        <SideBarTabItem
                            item={item}
                            key={item.id}
                        ></SideBarTabItem>
                    );
                })}
            </ul>
        </>
    );
};

export default SideBarTabList;
