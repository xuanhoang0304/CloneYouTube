import getVideoById from '@/apis/getVideoById';
import VideoDetail from '@/feature/watch/components/videoPlayer/VideoDetail';

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
const Video = () => {
    return (
        <section className="pt-[66px] lg:pt-[86px] h-[100vh] w-[calc(100%-24px)] mx-auto py-6">
            <VideoDetail></VideoDetail>
        </section>
    );
};

export default Video;
