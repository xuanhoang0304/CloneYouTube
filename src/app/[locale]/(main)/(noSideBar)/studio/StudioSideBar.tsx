"use client";
import { UserPen, Video } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';

const StudioSideBar = () => {
    const locale = useLocale();
    const searchParams = useSearchParams();
    const content = searchParams.get("content");
    return (
        <div className="lg:w-[240px]   w-auto shrink-0 border-r border-solid border-[#403f3f] pt-6 fixed top-[56px] left-0 px-2 h-full">
            <div className="profile text-center">
                <figure className="md:size-[100px] size-8 rounded-full mx-auto">
                    <Image
                        src="/image/default.avif"
                        alt="avatar"
                        width={100}
                        height={100}
                        className="rounded-full size-full"
                    />
                </figure>
                <p className="font-semibold mt-3 hidden md:block">
                    Kênh của bạn
                </p>
                <h2 className="text-[#aaa] text-xs hidden md:block">
                    Phạm Xuân Hoàng
                </h2>
            </div>
            <ul className="mt-6 flex flex-col gap-y-1">
                <li
                    className={cn(
                        "w-full  hover:bg-[var(--bg-second-white)] dark:hover:bg-primary-bgcl px-3 py-2 rounded-md",
                        !content &&
                            "dark:bg-primary-bgcl bg-[var(--bg-second-white)] "
                    )}
                >
                    <Link
                        href={`/${locale}/studio`}
                        className="flex items-center gap-x-2"
                    >
                        <Video />
                        <p>Videos</p>
                    </Link>
                </li>
                <li
                    className={cn(
                        "w-full  hover:bg-[var(--bg-second-white)] dark:hover:bg-primary-bgcl px-3 py-2 rounded-md",
                        content == "my-profile" &&
                            "dark:bg-primary-bgcl bg-[var(--bg-second-white)] "
                    )}
                >
                    <Link
                        href={`/${locale}/studio?content=my-profile`}
                        className="flex items-center gap-x-2"
                    >
                        <UserPen />
                        <p>Profile</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default StudioSideBar;
