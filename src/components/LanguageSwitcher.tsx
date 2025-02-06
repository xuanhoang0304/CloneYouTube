"use client";

import Cookies from 'js-cookie';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import useClickOutside from '@/hooks/useClickOutSide';

const LanguageSwitcher = () => {
    const [isShowLanguagesList, setIsShowLanguagesList] = useState(false);

    const t = useTranslations("Header");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locale = Cookies.get("NEXT_LOCALE");
    const fullUrl = `${pathname}${
        searchParams.toString() ? "?" + searchParams.toString() : ""
    }`;
    const handleClose = () => {
        setIsShowLanguagesList(false);
    };
    const handleSwitchLanguage = (e: React.MouseEvent<HTMLLIElement>) => {
        const value = e.currentTarget.getAttribute("data-value");
        if (!value || !locale) {
            return;
        }
        const newUrl = `${fullUrl.replace(locale, value)}`;

        Cookies.set("NEXT_LOCALE", value, { expires: 7 });
        router.push(newUrl, { scroll: false });
        router.refresh();
        setIsShowLanguagesList(false);
    };
    const ref = useClickOutside<HTMLDivElement>(handleClose);
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
                                : "https://cdn.pixabay.com/photo/2012/04/10/16/14/union-jack-26119_1280.png"
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
                        <p className="text-nowrap text-sm">{t("vn")}</p>
                    </li>
                    <li
                        onClick={(e) => handleSwitchLanguage(e)}
                        data-value={"en"}
                        className="flex items-center gap-x-1 cursor-pointer hover:bg-primary-bgcl/30 dark:hover:bg-[#717171] p-2 transition-colors"
                    >
                        <figure className="size-5 rounded-full shrink-0">
                            <Image
                                src="https://cdn.pixabay.com/photo/2012/04/10/16/14/union-jack-26119_1280.png"
                                alt="USA flag"
                                width={50}
                                height={50}
                                className="size-full object-cover rounded-full object-center"
                            ></Image>
                        </figure>
                        <p className="text-nowrap text-sm">{t("eng")}</p>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default LanguageSwitcher;
