"use client";

import { useSearchParams } from 'next/navigation';

const VideoPlayer = () => {
    const id = useSearchParams().get("v");

    return (
        <iframe
            src={`https://www.youtube.com/embed/${id}?rel=0 `}
            className="size-full h-[232px] md:h-[432px] rounded-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; transform "
            allowFullScreen
        ></iframe>
    );
};

export default VideoPlayer;
