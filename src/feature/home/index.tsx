"use client";
import { Suspense } from 'react';

import Loading from '@/components/Loading';
import SideBar from '@/components/SideBar/SideBar';
import { useAuth } from '@clerk/nextjs';

import YoutubeList from './components/Main/YoutubeList';

export default function HomePage() {
    const { isLoaded, userId } = useAuth();

    if (!isLoaded) {
        return null;
    }

    if (userId) {
        return (
            <section>
                <SideBar></SideBar>
                <div className="w-full pt-[96px] lg:pt-[126px] lg:pl-[269px] ">
                    <Suspense fallback={<Loading />}>
                        <YoutubeList></YoutubeList>
                    </Suspense>
                </div>
            </section>
        );
    }

    return (
        <div className="w-full mt-[66px]">
            <div className="w-[calc(100%-24px)] md:w-[500px] mx-auto py-4 bg-[#333] rounded-lg border border-[#aaa] text-[#fff] text-center">
                <p className="text-2xl font-bold">
                    Try searching to get started
                </p>
                <p className=" text-[#aaa] text-xs mt-1">
                    Start watching videos to help us build a feed of videos you
                    will love.
                </p>
            </div>
        </div>
    );
}
