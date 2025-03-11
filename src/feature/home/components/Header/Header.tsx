"use server";
import { Menu } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

import { getAccessToken } from '@/apis/getAccessToken';
import { getVideoCategories } from '@/apis/getVideoCategories';
import { cn } from '@/lib/utils';

import LoginContainer from './LoginContainer';
import Logo from './Logo';
import SearchInput from './SearchInput';
import Voice from './Voice';

// '../Main/CategoryList'
const DynamicLoginProfile = dynamic(() => import("./LoginProifle"), {
    ssr: false,
});
const CategoryList = dynamic(() => import("../Main/CategoryList"), {
    ssr: false,
});
const DarkMode = dynamic(() => import("./DarkMode"), {
    ssr: false,
});
const LanguageSwitcher = dynamic(
    () => import("@/components/LanguageSwitcher"),
    { ssr: false }
);
const isPremium = true;

const EmptyCategories = [
    "18",
    "19",
    "21",
    "27",
    "30",
    "24",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
];
const Header = async () => {
    const locale = cookies().get("NEXT_LOCALE")?.value || "vi"; // Default to "vi"
    const token = await getAccessToken();

    const category = await getVideoCategories(locale);
    const data = category?.items
        ?.map((item: { id: string; snippet: { title: string } }) => {
            return {
                id: item.id,
                title: item.snippet.title,
                isActive: false,
            };
        })
        ?.filter(
            (item: { id: string; snippet: { title: string } }) =>
                !EmptyCategories.includes(item.id)
        );
    data?.unshift({
        id: "24",
        title: locale == "vi" ? "Tất cả" : "All",
        isActive: true,
    });
    return (
        <header className="header transition-all duration-300 fixed top-0 left-0 right-0 z-[20] bg-white  dark:bg-black/50  backdrop-blur-lg">
            <div className="max-w-[calc(100%-24px)] md:max-w-[calc(100%-48px)]  mx-auto flex gap-x-4 items-center justify-between">
                <div className="flex items-center">
                    <button className="dark:hover:bg-[#222222] hover:bg-[var(--bg-hover-white)] transition-colors hidden lg:block  p-2 rounded-full">
                        <Menu className="dark:text-white text-black" />
                    </button>
                    <Logo
                        text={token && isPremium ? "Premium" : "YouTube"}
                    ></Logo>
                </div>
                <div
                    className={cn(
                        "flex items-center  order-3 md:order-2 gap-x-4 w-full max-w-10 md:max-w-[400px] lg:max-w-[700px]",
                        !token ? "!order-2 !ml-auto md:!ml-0" : ""
                    )}
                >
                    <SearchInput accessToken={token} />
                    <Voice></Voice>
                    <div className="hidden lg:block">
                        <DarkMode></DarkMode>
                    </div>
                    <div className="hidden lg:block">
                        <LanguageSwitcher></LanguageSwitcher>
                    </div>
                </div>
                {token ? (
                    <div className="flex items-center justify-end gap-x-4 order-2 md:order-3 w-full md:w-auto">
                        <DynamicLoginProfile />
                    </div>
                ) : (
                    <LoginContainer></LoginContainer>
                )}
            </div>
            {token && <CategoryList list={data}></CategoryList>}
        </header>
    );
};

export default Header;
