"use client";

import DOMPurify from "dompurify";

import TextWithLinks from "@/components/TextWithLink";

type VideoDescProps = {
    desc: string;
};
const VideoDesc = ({ desc }: VideoDescProps) => {
    const sanitizedHTML = DOMPurify.sanitize(desc);
    if (!desc) return null;
    return (
        <div className="p-3 rounded-xl bg-[#272727] mt-3">
            <TextWithLinks text={sanitizedHTML}></TextWithLinks>
        </div>
    );
};

export default VideoDesc;
