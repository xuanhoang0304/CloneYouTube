import React, { useState } from 'react';

import { cn } from '@/utils/cn';

interface TextWithLinksProps {
    text: string;
}
const formatText = (text: string): React.ReactNode[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            return (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    {part}
                </a>
            );
        }
        // Chuyển đổi \n thành <br />
        return part.split("\n").map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i !== part.split("\n").length - 1 && <br />}
            </React.Fragment>
        ));
    });
};
const TextWithLinks: React.FC<TextWithLinksProps> = ({ text }) => {
    const [showMore, setShowMore] = useState(false);
    // Hàm để chuyển đổi URL thành thẻ a và \n thành <br />
    if (!text) return null;
    return (
        <div
            id="desc"
            className={cn("text-sm leading-5 relative", showMore && "pb-10")}
        >
            {formatText(showMore ? text : text.slice(0, 400))}{" "}
            <a
                {...(!showMore && { href: "#desc" })}
                onClick={() => setShowMore(!showMore)}
                className={cn(
                    ' cursor-pointer hover:underline transition-all duration-300',
                    showMore && 'bottom-0 left-0 absolute'
                )}
            >
                {!showMore ? "Xem thêm" : "Ẩn bớt"}
            </a>
        </div>
    );
};

export default TextWithLinks;
