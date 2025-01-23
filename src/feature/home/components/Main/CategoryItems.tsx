import { cn } from '@/utils/cn';

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
                "shrink-0 cursor-pointer px-3 bg-[var(--bg-second-white)] text-black py-1 dark:bg-[#717171]  dark:hover:bg-white hover:text-white dark:hover:text-black hover:bg-black rounded-md transition-colors",
                item.isActive &&
                    "text-white bg-black dark:bg-white dark:text-black"
            )}
        >
            <p className="text-sm">{item.title}</p>
        </li>
    );
};

export default CategoryItems;
