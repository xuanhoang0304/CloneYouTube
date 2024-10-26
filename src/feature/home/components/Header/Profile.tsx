"use client";
import Image from "next/image";

import { cn } from "@/lib/utils";

type ProfileProps = {
    avt: string;
    username: string;
};
const Profile = ({ avt, username }: ProfileProps) => {
    return (
        <div className="flex items-center gap-x-4">
            <figure
                className={cn(
                    "size-8 rounded-full cursor-pointer",
                    !avt && "bg-red-400 flex items-center justify-center"
                )}
            >
                {avt ? (
                    <Image
                        src={avt}
                        alt="avatar"
                        width={32}
                        height={32}
                        className="img-cover rounded-full"
                    ></Image>
                ) : (
                    <p>{username[0]}</p>
                )}
            </figure>
        </div>
    );
};

export default Profile;
