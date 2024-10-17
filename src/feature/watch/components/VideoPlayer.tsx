"use client";

import { useSearchParams } from "next/navigation";

const VideoPlayer = () => {
    const id = useSearchParams().get("v");

    return (
        <iframe
            width="420"
            height="315"
            src={`https://www.youtube.com/embed/${id}`}
            className="rounded-2 size-full rounded-2xl"
            allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
};

export default VideoPlayer;
