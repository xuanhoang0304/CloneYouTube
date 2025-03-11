"use client";

import { useEffect, useState } from 'react';

type PreviewVideoTypes = {
    videoSrc: string;
    title: string;
    desc: string;
};

const PreviewVideo = ({ videoSrc, title, desc }: PreviewVideoTypes) => {
    const [thumbnail, setThumbnail] = useState<string | null>(null);

    useEffect(() => {
        if (!videoSrc) return;

        const video = document.createElement("video");
        video.src = videoSrc;
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.play();

        video.addEventListener("loadeddata", () => {
            video.currentTime = 30; // Chọn frame tại giây thứ 1
        });

        video.addEventListener("seeked", () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");

            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageUrl = canvas.toDataURL("image/jpeg");
                setThumbnail(imageUrl);
            }

            video.remove(); // Xóa video khỏi bộ nhớ sau khi lấy thumbnail
        });

        return () => {
            video.remove(); // Cleanup khi component unmount
        };
    }, [videoSrc]);

    return (
        <div className="lg:w-[400px] lg:h-[200px]">
            <video
                controls
                poster={thumbnail || "/image/default.avif"}
                src={videoSrc}
                className="size-full object-cover rounded-lg shadow-lg"
            />
            <h2 className="font-bold mt-2 line-clamp-2 max-w-[90%]">{title}</h2>
            <p className="text-[#aaa] text-xs line-clamp-3">{desc || "Mô tả về video"}</p>
        </div>
    );
};

export default PreviewVideo;
