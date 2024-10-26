import { Menu } from "lucide-react";
import dynamic from "next/dynamic";

import { getVideoCategories } from "@/utils/getVideoCategories";
import { currentUser } from "@clerk/nextjs/server";

import CategoryList from "../Main/CategoryList";
import LoginContainer from "./LoginContainer";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import Voice from "./Voice";

const DynamicLoginProfile = dynamic(() => import("./LoginProifle"), {
    ssr: false,
});
const isPremium = true;

const channelError = [
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
    const user = await currentUser();
    const category = await getVideoCategories();
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
                !channelError.includes(item.id)
        );
    data?.unshift({
        id: "24",
        title: "Tất cả",
        isActive: true,
    });
    return (
        <header className="fixed top-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-lg">
            <div className="max-w-[calc(100%-48px)]  mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <button className="hover:bg-[#222222] transition-colors p-2 rounded-full">
                        <Menu color="#fff" />
                    </button>
                    <Logo
                        text={user && isPremium ? "Premium" : "YouTube"}
                    ></Logo>
                </div>
                <div className="flex items-center gap-x-4 w-full max-w-[600px]">
                    <SearchInput />
                    <Voice></Voice>
                </div>
                {user ? (
                    <DynamicLoginProfile />
                ) : (
                    <LoginContainer></LoginContainer>
                )}
            </div>
            {user && <CategoryList list={data}></CategoryList>}
        </header>
    );
};

export default Header;
