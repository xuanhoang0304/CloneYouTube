"use client";

import { Settings } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import DarkMode from '@/feature/home/components/Header/DarkMode';

import LanguageSwitcher from '../LanguageSwitcher';

const SettingBtn = () => {
    const locale = useLocale();
    return (
        <Sheet>
            <SheetTrigger className="flex flex-col justify-center items-center gap-y-1">
                <Settings />
                <p className="text-xs">{locale == "vi" ? "Cài đặt" : "Setting"}</p> 
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Setting</SheetTitle>
                </SheetHeader>
                <ul className="flex flex-col gap-y-2 mt-2">
                    <li className="flex items-center gap-x-2">
                        <p>{locale == "vi" ? "Chủ đề (Sáng/Tối) :" : "Theme (Light/Dark) :"}</p>
                        <DarkMode></DarkMode>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <p>{locale == "vi" ? "Ngôn ngữ :" : "Language :"}</p>
                        <LanguageSwitcher></LanguageSwitcher>
                    </li>
                </ul>
            </SheetContent>
        </Sheet>
    );
};

export default SettingBtn;
