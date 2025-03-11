"use client";
import { Trash2, Youtube } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { SearchVideoItemType, YoutubeItemType } from "@/common/types";
import CustomCheckBox from "@/components/CustomCheckBox";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import EditVideoBtn from "@/feature/studio/components/EditVideoBtn";
import { useApi } from "@/hooks/useAPI";
import { cn } from "@/lib/utils";
import { useYouTubeStore } from "@/store/store";
import formatDayCreate from "@/utils/parseDayCreate";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import DeleteDialog from "@/components/DeleteDialog";

type TableBodyContentProps = {
    videoId: string;
    item: SearchVideoItemType;
    myVideos: SearchVideoItemType[];
    onMutateList: () => void;
    selectedVideos: string[];
    onSetSelectedVideos: (id: string) => void;
    onSetListVideos: (arr: SearchVideoItemType[]) => void;
    onSetMyVideos: (item: SearchVideoItemType) => void;
};
const TableBodyContent = ({
    videoId,
    item,
    selectedVideos,
    myVideos,
    onSetListVideos,
    onMutateList,
    onSetSelectedVideos,
    onSetMyVideos,
}: TableBodyContentProps) => {
    const { token } = useYouTubeStore();
    const { data, mutate } = useApi<{
        items: YoutubeItemType[];
    }>({
        url: token
            ? `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/videos?&access_token=${token}&part=snippet,statistics,status,contentDetails&id=${videoId}&maxResults=50`
            : "",
    });

    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("WatchPage");

    const onUpdateDetailedData = (newData: YoutubeItemType) => {
        mutate({ items: [newData] }, false);
    };
    const handleMutateVideo = () => {
        onMutateList();
    };
    const handleDelete = (id: string, token: string | null) => {
        // handleDeleteVideo(id, token)
        console.log("token", token);
        const newVideo = [...myVideos].filter((item) => item.id.videoId !== id);
        onSetListVideos(newVideo);
    };
    return (
        <TableRow
            className={cn(
                "group hover:bg-muted",
                !!selectedVideos.includes(videoId) && "bg-muted"
            )}
        >
            <TableCell>
                <CustomCheckBox
                    id={videoId}
                    selectedVideos={selectedVideos}
                    onSelectedVideos={onSetSelectedVideos}
                ></CustomCheckBox>
            </TableCell>
            <TableCell>
                <figure className="md:w-[150px] md:h-[80px] w-[100px] h-[50px] rounded-md">
                    <Image
                        src={
                            item.snippet.thumbnails.high.url ||
                            "/image/default.avif"
                        }
                        alt="Item image"
                        width={200}
                        height={200}
                        className="rounded-md size-full object-cover"
                    />
                </figure>
            </TableCell>
            <TableCell className="align-top relative">
                <p className="font-medium  w-[70%] line-clamp-1">
                    {item.snippet.title}
                </p>
                <p className="text-[#aaa] text-xs mt-2 w-[70%] line-clamp-1">
                    {item.snippet.description}
                </p>

                <div className="absolute top-[26px] md:top-[30px] bg-muted w-full gap-x-2 left-0 z-10 hidden group-hover:flex">
                    <EditVideoBtn
                        onMutateVideo={handleMutateVideo}
                        onUpdateDetailedData={onUpdateDetailedData}
                        onSetMyVideos={onSetMyVideos}
                        item={data?.items[0]}
                    ></EditVideoBtn>

                    {/* Watch */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => {
                                        router.push(
                                            `/${locale}/watch/?v=${videoId}`
                                        );
                                    }}
                                    variant="outline"
                                    className="bg-inherit rounded-full size-10 hover:bg-[var(--bg-second-white)] dark:hover:bg-primary-bgcl"
                                >
                                    <Youtube />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#333] px-4 py-2 rounded mb-2 text-white k ">
                                <p>Watch videos</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {/*  Delete*/}
                    <DeleteDialog
                        handleDelete={() =>
                            handleDelete(item.id.videoId, token)
                        }
                        videoId={item.id.videoId}
                        tooltipTxt="Delete"
                        trigger={
                            <button className="size-10 rounded-full hover:bg-[var(--bg-second-white)] dark:hover:bg-[#303030] flex-center">
                                <Trash2 className="w-4" />
                            </button>
                        }
                        dialogTitle={
                            locale == "vi"
                                ? "Xóa video đã chọn"
                                : "Delete video"
                        }
                        dialogDesc={
                            locale == "vi"
                                ? " Xóa vĩnh viễn video của bạn?"
                                : "Do you wanna delete your video?"
                        }
                        cancelBtn={t("cancel")}
                        deleteBtn={t("delete")}
                    ></DeleteDialog>
                </div>
            </TableCell>
            <TableCell>{formatDayCreate(item.snippet.publishedAt)}</TableCell>
            <TableCell>{data?.items[0]?.status?.privacyStatus || ""}</TableCell>
            <TableCell>{data?.items[0]?.statistics?.viewCount || ""}</TableCell>
            <TableCell>{data?.items[0]?.statistics?.likeCount}</TableCell>
        </TableRow>
    );
};

export default TableBodyContent;
