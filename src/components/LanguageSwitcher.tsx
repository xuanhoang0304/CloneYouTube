"use client";

import Cookies from 'js-cookie';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import useClickOutside from '@/hooks/useClickOutSide';
import { useYouTubeStore } from '@/store/store';

const LanguageSwitcher = () => {
    const [isShowLanguagesList, setIsShowLanguagesList] = useState(false);
    const { token } = useYouTubeStore();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locale = useLocale();
    const fullUrl = `${pathname}${
        searchParams.toString() ? "?" + searchParams.toString() : ""
    }`;
    const handleClose = () => {
        setIsShowLanguagesList(false);
    };
    console.log(Cookies.get("NEXT_LOCALE"));
    const handleSwitchLanguage = (e: React.MouseEvent<HTMLLIElement>) => {
        const value = e.currentTarget.getAttribute("data-value");
        if (!value) {
            return;
        }
        const newUrl = `${fullUrl.replace(locale, value)}`;

        Cookies.set("NEXT_LOCALE", value, { expires: 7 });
        router.push(newUrl);
        setIsShowLanguagesList(false);
    };
    const ref = useClickOutside<HTMLDivElement>(handleClose);
    if (!token) return null;
    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => {
                    setIsShowLanguagesList(!isShowLanguagesList);
                }}
                className=" flex items-center gap-x-1 px-2 py-1 border border-[#aaa] border-solid rounded-full"
            >
                <figure className="size-5 rounded-full">
                    <Image
                        src={`${
                            locale == "vi"
                                ? "https://media.loveitopcdn.com/3807/la-co-viet-nam-dongphusongphu2.png"
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5HbMP_1zV9BBbdga3zlgQnhmtst8Qp4UDw&s"
                        }`}
                        alt="Viet Nam flag"
                        width={50}
                        height={50}
                        className="size-full object-cover rounded-full"
                    ></Image>
                </figure>
                {!isShowLanguagesList ? (
                    <ChevronDown className="w-5" />
                ) : (
                    <ChevronUp className="w-5" />
                )}
            </button>
            {isShowLanguagesList && (
                <ul className="absolute w-auto rounded-sm py-1  flex flex-col gap-y-1 z-50 top-[40px] left-0 bg-[var(--bg-second-white)] dark:bg-primary-bgcl">
                    <li
                        onClick={(e) => handleSwitchLanguage(e)}
                        data-value={"vi"}
                        className="flex items-center gap-x-1 cursor-pointer hover:bg-primary-bgcl/30 dark:hover:bg-[#717171] p-2 transition-colors"
                    >
                        <figure className="size-5 rounded-full shrink-0">
                            <Image
                                src="https://media.loveitopcdn.com/3807/la-co-viet-nam-dongphusongphu2.png"
                                alt="Viet Nam flag"
                                width={50}
                                height={50}
                                className="size-full object-cover rounded-full"
                            ></Image>
                        </figure>
                        <p className="text-nowrap text-sm">Tiếng Việt</p>
                    </li>
                    <li
                        onClick={(e) => handleSwitchLanguage(e)}
                        data-value={"en"}
                        className="flex items-center gap-x-1 cursor-pointer hover:bg-primary-bgcl/30 dark:hover:bg-[#717171] p-2 transition-colors"
                    >
                        <figure className="size-5 rounded-full shrink-0">
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5HbMP_1zV9BBbdga3zlgQnhmtst8Qp4UDw&s"
                                alt="USA flag"
                                width={50}
                                height={50}
                                className="size-full object-cover rounded-full object-center"
                            ></Image>
                        </figure>
                        <p className="text-nowrap text-sm">Tiếng Anh</p>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default LanguageSwitcher;
