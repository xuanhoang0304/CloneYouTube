"use client";

import { NotebookPen, Plus, Radio, Youtube } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import useClickOutside from '@/hooks/useClickOutSide';
import { cn } from '@/utils/cn';

export const CreateAction = () => {
    const [isShow, setIsShow] = useState(false);
    const t = useTranslations("Header");
    const locale = useLocale();
    const router = useRouter();
    const handleClose = () => {
        setIsShow(false);
    };
    const ref = useClickOutside<HTMLDivElement>(handleClose);
    const ProfileAction = [
        {
            icon: <Youtube></Youtube>,
            text: "Tải video lên",
            url: `/${locale}/upload`,
        },
        {
            icon: <Radio></Radio>,
            text: "Phát trực tiếp",
            url: `#`,
        },
        {
            icon: <NotebookPen></NotebookPen>,
            text: "Tạo bài đăng",
            url: `#`,
        },
    ];
    return (
        <div className="relative hidden lg:block" ref={ref}>
            <button
                onClick={() => setIsShow(!isShow)}
                className="flex items-center min-w-[90px]   px-[12px] dark:hover:bg-[#717171] bg-[var(--bg-second-white)] hover:bg-[var(--bg-hover-white)] dark:bg-primary-bgcl rounded-full gap-x-[6px] transition-colors"
            >
                <Plus></Plus>
                <p className="text-xs leading-9 font-medium">{t("create")}</p>
            </button>
            {isShow && (
                <ul
                    className={cn(
                        "absolute z-50 bottom-[-150px]  rounded-lg left-0 w-[180px] bg-[var(--bg-second-white)] dark:bg-primary-bgcl hidden py-2 ",
                        isShow && "block"
                    )}
                >
                    {ProfileAction.map((item) => (
                        <li
                            key={item.text}
                            onClick={() => {
                                router.push(item.url);
                                setIsShow(false);
                            }}
                            className="flex items-center gap-x-2 px-4 py-1 cursor-pointer hover:bg-[#717171] transition-colors"
                        >
                            {item.icon}
                            <p className="text-xs leading-9 font-medium">
                                {item.text}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
