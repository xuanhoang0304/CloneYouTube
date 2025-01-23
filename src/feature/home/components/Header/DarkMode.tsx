"use client";
import { MoonStar, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useYouTubeStore } from '@/store/store';

const DarkMode = () => {
    const { token } = useYouTubeStore();

    const [value, setValue] = useLocalStorage("theme", "");
    const handleChangeMode = () => {
        value === "light" ? setValue("dark") : setValue("light");
    };
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
    if (!token) return null;
    return (
        <div className="flex md:flex-row flex-col items-center gap-x-2 gap-y-1">
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
