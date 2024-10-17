import ChanelDetail from '@/feature/channel';

const channelPage = ({ params }: { params: { channelId: string } }) => {
    const channelUrl = decodeURIComponent(params.channelId);

    return (
        <section className="pt-[66px] pl-[269px] w-full pr-[30px] pb-6">
            <ChanelDetail channelUrl ={channelUrl}></ChanelDetail>
        </section>
    );
};

export default channelPage;
