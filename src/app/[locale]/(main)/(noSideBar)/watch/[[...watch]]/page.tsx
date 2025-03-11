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
        title: videoDetail?.snippet?.title || "YouTube",
    };
}
const Video = () => {
    return (
        <section className="pt-[66px] pb-[84px] lg:pt-[86px]  w-[calc(100%-24px)] mx-auto">
            <VideoDetail></VideoDetail>
        </section>
    );
};

export default Video;
