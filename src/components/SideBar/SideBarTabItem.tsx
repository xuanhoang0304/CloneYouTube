"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type SideBarTabItemProps = {
    item: { icon: React.ReactNode; name: string; href: string };
};
const SideBarTabItem = ({ item }: SideBarTabItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === item.href;
    return (
        <li>
            <Link
                href={item.href}
                className={cn(
                    "flex items-center gap-x-3  w-[198px] transition-colors p-2 hover:bg-[#717171] rounded-lg cursor-pointer",
                    isActive ? "bg-[#717171]" : ""
                )}
            >
                {item.icon}
                <span
                    className={cn(
                        "text-white font-medium transition-colors text-sm",
                        isActive && "font-bold"
                    )}
                >
                    {item.name}
                </span>
            </Link>
        </li>
    );
};

export default SideBarTabItem;
