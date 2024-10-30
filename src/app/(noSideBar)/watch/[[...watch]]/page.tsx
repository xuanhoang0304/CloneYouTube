import { getAccessToken } from '@/apis/getAccessToken';
import getVideoById from '@/apis/getVideoById';
import RelatedList from '@/feature/watch/components/RelatedList';
import VideoDetail from '@/feature/watch/components/VideoDetail';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: { v: string };
}) {
    let videoDetail;
    const id = searchParams.v;
    const data = await getVideoById(id);
    if (data) {
        videoDetail = data[0];
    }
    return {
        title: videoDetail?.snippet?.title || "Simple Title",
    };
}
const Video = async () => {
    const token = await getAccessToken();
    return (
        <section className="pt-[86px] flex gap-x-5 h-[100vh] w-[92.35%] mx-auto py-6">
            <VideoDetail token={token}></VideoDetail>
            <div className="w-full max-w-[400px]  h-full">
                <RelatedList></RelatedList>
            </div>
        </section>
    );
};

export default Video;
