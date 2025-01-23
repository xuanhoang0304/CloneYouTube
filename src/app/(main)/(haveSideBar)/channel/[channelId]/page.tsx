import { getAccessToken } from '@/apis/getAccessToken';
import ChannelDetail from '@/feature/channel';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: { title: string };
}) {
    return {
        title: searchParams.title || "Simple Title",
    };
}
const channelPage = async ({ params }: { params: { channelId: string } }) => {
    const channelUrlId = decodeURIComponent(params.channelId);
    const token = await getAccessToken();
    return (
        <section className="pt-[66px] lg:pl-[269px] w-full lg:pr-[30px] pb-6">
            <ChannelDetail token={token} channelUrlId={channelUrlId}></ChannelDetail>
        </section>
    );
};

export default channelPage;
