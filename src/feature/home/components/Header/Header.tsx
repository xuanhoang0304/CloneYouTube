import { Menu } from 'lucide-react';

import { getVideoCategories } from '@/utils/getVideoCategories';

import CategoryList from '../Main/CategoryList';
import LoginContainer from './LoginContainer';
import Logo from './Logo';
import Profile from './Profile';
import SearchInput from './SearchInput';
import Voice from './Voice';

const isLogin = true;
const isPremium = true;
const user = {
    name: "Xuan Hoang",
    avt: "https://plus.unsplash.com/premium_photo-1678937609110-61b091b7e1ee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
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
                    <Logo text={isPremium ? "Premium" : "YouTube"}></Logo>
                </div>
                <div className="flex items-center gap-x-4 w-full max-w-[600px]">
                    <SearchInput />
                    <Voice></Voice>
                </div>
                {isLogin ? (
                    <Profile avt={user.avt} username={user.name}></Profile>
                ) : (
                    <LoginContainer></LoginContainer>
                )}
            </div>
            <CategoryList list={data}></CategoryList>
        </header>
    );
};

export default Header;
