"use client";
import { MoonStar, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useThrottle } from '@/hooks/useThrottle';

const DarkMode = () => {
    const [value, setValue] = useLocalStorage("theme", "");
    const handleChangeMode = () => {
        value === "light" ? setValue("dark") : setValue("light");
    };

    const [scrollY, setScrollY] = useState(0);

    const throttledScrollY = useThrottle(scrollY, 200); // Giới hạn kiểm tra mỗi 200ms

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const header = document.querySelector(".header");
        const ScreenWidth = screen.width;
        if (ScreenWidth < 1024 && header && throttledScrollY + 1 < scrollY) {
            header.classList.remove("showHeader");
            header.classList.add("hideHeader"); // Cuộn xuống -> Ẩn header
        } else if (
            ScreenWidth < 1024 &&
            header &&
            throttledScrollY + 1 > scrollY
        ) {
            header.classList.remove("hideHeader");
            header.classList.add("showHeader"); // Cuộn lên -> Hiện header
        }
    }, [throttledScrollY, scrollY]);
    useEffect(() => {
        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        if (!value) {
            setValue(theme);
        }
        if (value === "dark") {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
        }
        if (value === "light") {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        }
    }, [value]);
    // if (!token) return null;
    return (
        <div
            className={`flex items-center gap-x-2 `}
        >
            <Switch
                checked={value == "light" ? false : true}
                onClick={handleChangeMode}
                id="dark-mode"
            />
            <Label
                onClick={handleChangeMode}
                htmlFor="dark-mode"
                className="dark:text-white text-black"
            >
                {value == "light" ? (
                    <Sun className="text-yellow-400 size-5 lg:size-6" />
                ) : (
                    <MoonStar className="text-yellow-400 size-5 lg:size-6" />
                )}
            </Label>
        </div>
    );
};

export default DarkMode;
