import { cn } from "@/utils/cn";

type CategoryItems = {
    item: {
        id: string;
        title: string;
        isActive: boolean;
    };
    onSetList: (id: string) => void;
};

const CategoryItems = (props: CategoryItems) => {
    const { item, onSetList } = props;
    return (
        <li
            onClick={() => onSetList(item.id)}
            className={cn(
                "shrink-0 cursor-pointer px-3 py-1 bg-[#717171] rounded-md transition-colors",
                item.isActive && "bg-white text-black"
            )}
        >
            <p className="text-sm">{item.title}</p>
        </li>
    );
};

export default CategoryItems;
