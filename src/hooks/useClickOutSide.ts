import { useEffect, useRef } from "react";

type ClickOutsideHandler = (event: MouseEvent | null) => void;

function useClickOutside<T extends HTMLElement>(handler: ClickOutsideHandler) {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler(event);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handler]);

    return ref;
}

export default useClickOutside;
