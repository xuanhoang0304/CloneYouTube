import { getAccessToken } from '@/apis/getAccessToken';
import ChannelDetail from '@/feature/channel';

const channelPage = async ({ params }: { params: { channelId: string } }) => {
    const channelUrlId = decodeURIComponent(params.channelId);
    const token = await getAccessToken();
    return (
        <section className="pt-[66px] pl-[269px] w-full pr-[30px] pb-6">
            <ChannelDetail token={token} channelUrlId={channelUrlId}></ChannelDetail>
        </section>
    );
};

export default channelPage;
