import ChannelDetail from '@/feature/channel';

const channelPage = ({ params }: { params: { channelId: string } }) => {
    const channelUrl = decodeURIComponent(params.channelId);

    return (
        <section className="pt-[66px] pl-[269px] w-full pr-[30px] pb-6">
            <ChannelDetail channelUrl={channelUrl}></ChannelDetail>
        </section>
    );
};

export default channelPage;
