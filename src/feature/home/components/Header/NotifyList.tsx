import NotifyItem from './NotifyItem';

const arr = [
    {
        id: 0,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: false,
    },
    {
        id: 1,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: false,
    },
    {
        id: 2,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: false,
    },
    {
        id: 3,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
    {
        id: 4,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
    {
        id: 5,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
    {
        id: 6,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
    {
        id: 7,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
    {
        id: 8,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
    {
        id: 9,
        title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, enim.",
        channelAvt:
            "https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumbnailImg:
            "https://images.unsplash.com/photo-1726486896376-4d1340e2f672?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        createAt: "4 giờ trước",
        isCheck: true,
    },
];
const NotifyList = () => {
    return (
        <ul className="overflow-auto h-[calc(100%-49px)] w-full">
            {arr.map((item) => (
                <NotifyItem
                    key={+new Date().getTime() + Math.random()}
                    item={item}
                ></NotifyItem>
            ))}
        </ul>
    );
};

export default NotifyList;
