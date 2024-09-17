import { Menu } from 'lucide-react';

import Logo from './Logo';
import Profile from './Profile';
import SearchInput from './SearchInput';
import Voice from './Voice';

const isPremium = true;
const user = {
    name: "Xuan Hoang",
    avt: "https://plus.unsplash.com/premium_photo-1678937609110-61b091b7e1ee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const Header = () => {
    return (
        <header className="max-w-[calc(100%-48px)] mx-auto flex items-center justify-between">
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
            <Profile avt={user.avt} username={user.name}></Profile>
        </header>
    );
};

export default Header;
