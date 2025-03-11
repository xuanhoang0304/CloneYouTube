"use client";

import { MoonStar, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useThrottle } from '@/hooks/useThrottle';

const DarkMode = () => {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 200);

  // Xử lý thay đổi chế độ sáng/tối
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Lắng nghe sự kiện scroll để ẩn/hiện header
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const header = document.querySelector(".header") as HTMLElement | null;
    const screenWidth = window.innerWidth;

    if (screenWidth < 1024 && header) {
      if (throttledScrollY < scrollY) {
        header.classList.add("hideHeader");
        header.classList.remove("showHeader"); // Ẩn header khi cuộn xuống
      } else {
        header.classList.add("showHeader");
        header.classList.remove("hideHeader"); // Hiện header khi cuộn lên
      }
    }
  }, [throttledScrollY, scrollY]);

  return (
    <div className="flex items-center gap-x-2">
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
        id="dark-mode"
      />
      <Label
        htmlFor="dark-mode"
        className="dark:text-white text-black cursor-pointer"
      >
        {theme === "light" ? (
          <Sun className="text-yellow-400 size-5 lg:size-6" />
        ) : (
          <MoonStar className="text-yellow-400 size-5 lg:size-6" />
        )}
      </Label>
    </div>
  );
};

export default DarkMode;
