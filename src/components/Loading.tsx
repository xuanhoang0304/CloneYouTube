const Loading = () => {
    return (
        <div className="bg-black/50 fixed inset-0 z-[100] flex items-center justify-center">
            <div className="size-10 rounded-full border-[4px] border-[#fff] border-t-transparent animate-spin"></div>
        </div>
    );
};

export default Loading;
