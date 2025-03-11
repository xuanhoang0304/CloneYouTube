"use client";

import { ListChecks, X } from "lucide-react";
import { useEffect, useState } from "react";

import { SearchVideoItemType } from "@/common/types";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useApi } from "@/hooks/useAPI";
import { cn } from "@/lib/utils";
import { useYouTubeStore } from "@/store/store";

import TableBodyContent from "./TableBodyContent";
import handleDeleteVideo from "@/utils/handleDeleteVideo";
import DeleteDialog from "@/components/DeleteDialog";
import { useLocale, useTranslations } from "next-intl";

export default function ItemsTable() {
    const { token } = useYouTubeStore();
    const locale = useLocale();
    const t = useTranslations("WatchPage");
    const [myVideos, setMyVideos] = useState<SearchVideoItemType[]>([]);
    const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
    const { data, mutate } = useApi<{
        items: SearchVideoItemType[];
    }>({
        url: token
            ? `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/search?&access_token=${token}&part=snippet&forMine=true&maxResults=50&type=video`
            : "",
    });
    const handleSetListVideo = (arr: SearchVideoItemType[]) => {
        setMyVideos(arr);
    };
    const handleCheckAllVideos = () => {
        if (selectedVideos.length == data?.items.length) {
            setSelectedVideos([]);
        } else {
            const newArr = data?.items.map((item) => item.id.videoId);
            if (newArr && newArr.length > 0) {
                setSelectedVideos(newArr);
            }
        }
    };
    const handleSetSelectedVideos = (id: string) => {
        !selectedVideos.includes(id)
            ? setSelectedVideos((prev) => [...prev, id])
            : setSelectedVideos(
                  selectedVideos.filter((videoId) => videoId !== id)
              );
    };
    const handleSetMyVideos = (newItem: SearchVideoItemType) => {
        const arr = [...myVideos];
        const newArr = arr.map((item) =>
            item.id.videoId === newItem.id.videoId ? newItem : item
        );
        setMyVideos(newArr);
    };
    const handleDeleteSelectedVideos = () => {
        selectedVideos.forEach((videoId) => {
            handleDeleteVideo(videoId, token);
            mutate();
        });
    };
    useEffect(() => {
        if (data) {
            setMyVideos(data?.items);
        }
    }, [data]);
    return (
        <>
            {selectedVideos.length > 0 && (
                <div className="dark:bg-white bg-primary-bgcl text-white dark:text-black py-4 px-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-3 flex-wrap gap-y-2 md:gap-x-8 text-sm">
                            <p className="font-bold">
                                Đã chọn {selectedVideos.length}
                            </p>
                            <div className="h-[30px] w-[2px] dark:bg-primary-bgcl bg-[var(--bg-second-white)]"></div>
                            <button>Thêm vào danh sách phát</button>
                            <DeleteDialog
                                handleDelete={() => handleDeleteSelectedVideos}
                                tooltipTxt="Delete"
                                trigger={<button>Xóa vĩnh viễn</button>}
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
                        <button
                            onClick={() => {
                                setSelectedVideos([]);
                            }}
                            className="hover:bg-[#aaa] rounded-full size-6 flex-center"
                        >
                            <X className="w-4" />
                        </button>
                    </div>
                </div>
            )}
            <Table className="mt-6 table-fixed videoTable">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40px] lg:w-[60px]">
                            <button onClick={handleCheckAllVideos}>
                                <ListChecks
                                    className={cn(
                                        "w-5",
                                        selectedVideos.length == data?.items.length &&
                                            "text-red-500"
                                    )}
                                />
                            </button>
                        </TableHead>
                        <TableHead className="w-[180px]">Image</TableHead>
                        <TableHead className="w-[300px]">Title</TableHead>
                        <TableHead className="w-[150px]">
                            Publish Date
                        </TableHead>
                        <TableHead className="w-[150px]">
                            Privacy Status
                        </TableHead>
                        <TableHead className="w-[150px]">Views</TableHead>
                        <TableHead className="w-[150px]">Like</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {myVideos.map((item) => (
                        <TableBodyContent
                            key={item.id.videoId}
                            videoId={item.id.videoId}
                            item={item}
                            onMutateList={() => {
                                mutate();
                            }}
                            myVideos={myVideos}
                            selectedVideos={selectedVideos}
                            onSetSelectedVideos={handleSetSelectedVideos}
                            onSetMyVideos={handleSetMyVideos}
                            onSetListVideos={handleSetListVideo}
                        ></TableBodyContent>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
