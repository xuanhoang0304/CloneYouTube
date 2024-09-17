"use client";
import { SunMoon } from "lucide-react";
import { useDarkMode } from "usehooks-ts";

const Test = () => {
    const { isDarkMode, toggle, enable, disable } = useDarkMode();
    const theme = isDarkMode ? "dark" : "light";
    return (
        <div>
            <p>Current theme: {theme} </p>
            <button onClick={toggle}>Toggle</button>
            <button onClick={enable}>Enable</button>
            <button onClick={disable}>Disable</button>
            <SunMoon />
        </div>
    );
};

export default Test;
