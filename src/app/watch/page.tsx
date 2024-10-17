import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import CommentContainer from '@/feature/watch/components/Comment';
import RelatedList from '@/feature/watch/components/RelatedList';
import VideoPlayer from '@/feature/watch/components/VideoPlayer';
import calcSubscriber from '@/utils/calcSubscriber';
import getChannelDetail from '@/utils/getChannelDetail';
import getVideoById from '@/utils/getVideoById';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: { v: string };
}) {
    const id = searchParams.v;
    const data = await getVideoById(id);
    return {
        title: data[0]?.snippet?.title || "Simple Title",
    };
}
const VideoDesc = dynamic(
    () => import("@/feature/watch/components/VideoDesc"),
    {
        ssr: false,
    }
);
const Video = async ({ searchParams }: { searchParams: { v: string } }) => {
    const id = searchParams.v;
    const data = await getVideoById(id);
    const channel = await getChannelDetail(data[0]?.snippet?.channelId);
    if (data.length <= 0) notFound();
    return (
        <section className="pt-[86px] flex gap-x-5 h-[100vh] w-[92.35%] mx-auto py-6">
            <div className="w-full max-h-[500px] rounded-2xl">
                <VideoPlayer></VideoPlayer>
                <h1 className="text-[20px] mt-4 line-clamp-2 font-bold leading-7">
                    {data[0].snippet.title}
                </h1>
                <div className="flex items-center justify-between">
                    <div className="w-full flex  gap-x-3 mt-3">
                        <Link
                            href={`channel/${channel?.items[0].snippet?.customUrl}`}
                        >
                            <figure className="size-10 rounded-full shrink-0">
                                <Image
                                    src={
                                        channel.items[0].snippet.thumbnails.high
                                            .url
                                    }
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="img-cover rounded-full"
                                ></Image>
                            </figure>
                        </Link>
                        <div className="max-w-[257px]">
                            <Link
                                href={`channel/${channel?.items[0].snippet?.customUrl}`}
                            >
                                <h2 className="line-clamp-1 font-medium leading-[22px] cursor-pointer">
                                    {channel.items[0].snippet.title}
                                </h2>
                            </Link>
                            <p className="text-xs leading-[18px] text-[#aaa]">
                                {calcSubscriber(
                                    channel.items[0].statistics.subscriberCount
                                )}
                            </p>
                        </div>
                        <button className="cursor-pointer text-sm max-h-9 leading-9 font-medium px-4  rounded-full bg-[#515255] hover:bg-[#717171] transition-colors">
                            Tham gia
                        </button>
                        <button className="cursor-pointer text-sm max-h-9 leading-9 font-medium px-4 text-black  rounded-full bg-[#fff] hover:bg-white/90 transition-colors">
                            Đăng ký
                        </button>
                    </div>
                    <p>Action</p>
                </div>
                {data[0].snippet.description && (
                    <VideoDesc desc={data[0].snippet.description}></VideoDesc>
                )}
                <CommentContainer
                    totalComment={data[0]?.statistics?.commentCount}
                ></CommentContainer>
            </div>

            <div className="w-full max-w-[400px]  h-full">
                <RelatedList></RelatedList>
            </div>
        </section>
    );
};

export default Video;
