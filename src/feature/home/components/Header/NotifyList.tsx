import NotifyItem from "./NotifyItem";

type NotifyItemType = {
    id: number;
    title: string;
    channelAvt: string;
    thumbnailImg: string;
    createAt: string;
    isCheck: boolean;
};
type NotifyListPropsType = {
    arr: NotifyItemType[];
};

const NotifyList = (props: NotifyListPropsType) => {
    const { arr } = props;
    return (
        <ul className="overflow-auto h-[calc(100%-49px)] w-full">
            {arr.map((item: NotifyItemType) => (
                <NotifyItem
                    key={+new Date().getTime() + Math.random()}
                    item={item}
                ></NotifyItem>
            ))}
        </ul>
    );
};

export default NotifyList;
