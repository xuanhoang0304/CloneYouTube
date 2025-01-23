import SubList from '@/feature/sub/components/SubList';

const Subs = () => {
    return (
        <section className="pt-[66px] lg:pl-[269px] w-full md:w-[calc(100%-60px)]  mx-auto lg:pr-[30px] pb-6 ">
            <h1 className="text-4xl text-center font-bold    ">
                Tất cả kênh đã đăng ký
            </h1>
            <SubList></SubList>
        </section>
    );
};

export default Subs;
