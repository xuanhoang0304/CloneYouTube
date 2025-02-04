"use client";
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const NotFound = () => {
    const locale = Cookies.get("NEXT_LOCALE");
    const t = useTranslations("NotFound");
    return (
        <>
            <div className="fixed text-center  text-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-red-400 text-[50px] uppercase">
                    {t("title")}
                </h1>
                <p className="text-[#aaa] text-base mt-2">
                    {t("description")}
                </p>
                <Link
                    href={`/${locale}`}
                    className="block text-sm mt-2 hover:text-red-400 transition-colors  px-2 bg-[var(--bg-second-white)] dark:bg-primary-bgcl py-1 border border-[#aaa] border-solid rounded-full max-w-[120px] mx-auto"
                >
                    {t("backHome")}
                </Link>
            </div>
        </>
    );
};

export default NotFound;
