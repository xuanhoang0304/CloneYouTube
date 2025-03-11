"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import InputForm from "@/app/[locale]/(main)/(noSideBar)/upload/InputForm";
import {
    createEditSchema,
    FormData,
} from "@/app/[locale]/(main)/(noSideBar)/upload/types/editSchema";
import { SearchVideoItemType, YoutubeItemType } from "@/common/types";
import Loading from "@/components/Loading";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useYouTubeStore } from "@/store/store";
import handleUpdateVideo from "@/utils/handleUpdateVideos";
import { zodResolver } from "@hookform/resolvers/zod";

type EditFormProps = {
    onHideDialog: () => void;
    item: YoutubeItemType | undefined;
    onMutateVideo: () => void;
    onSetMyVideos: (item: SearchVideoItemType) => void;
    onUpdateDetailedData: (item: YoutubeItemType) => void;
};
const EditForm = ({
    onMutateVideo,
    onHideDialog,
    onUpdateDetailedData,
    item,
    onSetMyVideos,
}: EditFormProps) => {
    const t = useTranslations();
    const { token } = useYouTubeStore();
    const [isUpdating, setIsUpdating] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(createEditSchema(t)),
        defaultValues: {
            title: `${item?.snippet.title}`,
            description: `${item?.snippet.description}`,
            privacy: `${item?.status.privacyStatus}`,
        },
    });
    const handleUpload = async (data: any) => {
        try {
            setIsUpdating(true);
            const response = await handleUpdateVideo(
                token,
                "22",
                data,
                item?.id
            );

            if (response.status === 400) {
                toast({
                    className: "bg-bg-red-600",
                    title: "Update thất bại!",
                });
            }
            toast({
                className: "bg-green-600",
                title: "Update thành công!",
                duration: 1000,
            });
            const newResponse = {
                ...response,
                statistics: {
                    viewCount: item?.statistics.viewCount,
                    likeCount: item?.statistics.likeCount,
                },
            };
            if (response) {
                const tempData = {
                    etag: response.etag,
                    id: { videoId: response.id },
                    snippet: {
                        thumbnails: {
                            high: { url: response.snippet.thumbnails.high.url },
                        },
                        title: response.snippet.title,
                        channelTitle: response.snippet.channelTitle,
                        publishedAt: response.snippet.publishedAt,
                        description: response.snippet.description,
                    },
                };
                onSetMyVideos(tempData);
                onUpdateDetailedData(newResponse); // Cập nhật cache dữ liệu chi tiết
            }
            setTimeout(() => {
                onHideDialog();
                setIsUpdating(false);
            }, 1000);
            onMutateVideo();
            reset();
        } catch (error) {
            console.error("Error in handleUpload:", error);
            setIsUpdating(false);
        }
    };
    useEffect(() => {
        if (item) {
            reset({
                title: item.snippet.title || "",
                description: item.snippet.description || "",
                privacy: item.status.privacyStatus || "private",
            });
        }
    }, [item, reset]); // Thêm item và reset vào dependency array
    return (
        <form
            className="formUploadVideo flex flex-col gap-y-5 bg-[var(--bg-second-white)] dark:bg-primary-bgcl p-4 rounded-lg "
            onSubmit={handleSubmit(handleUpload)}
        >
            <h1 className="text-center text-[40px] mt-3">Edit Video</h1>
            {isUpdating && <Loading></Loading>}
            <div className="flex flex-col mt-6 lg:flex-row gap-y-6 gap-x-10 ">
                <div className="input-group flex-1 flex flex-col gap-y-8">
                    <InputForm
                        control={control}
                        labelTitle="Tiêu đề ( Bắt buộc )*"
                        inputId="input-title"
                        error={errors.title}
                        name="title"
                    ></InputForm>

                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <div className="relative">
                                <Textarea
                                    id="DescTextarea"
                                    placeholder=""
                                    className="resize-none  min-h-[200px] border border-solid border-gray-400 focus:ring-0"
                                    {...field}
                                />
                                <label
                                    htmlFor="DescTextarea"
                                    className={cn(
                                        " text-[#aaa] text-sm absolute left-3 top-[20px]  px-1 bg-[var(--bg-second-white)] dark:bg-primary-bgcl"
                                    )}
                                >
                                    Mô tả video ( Bắt buộc )*
                                </label>
                                {errors.description && (
                                    <p className="text-red-500 absolute text-xs mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                    <div>
                        <label
                            htmlFor="input-privacy"
                            className="ml-3 text-[#aaa] text-sm"
                        >
                            Chế độ hiển thị ( Bắt buộc )*
                        </label>
                        <Controller
                            name="privacy"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <select
                                        {...field}
                                        id="input-privacy"
                                        className="w-full mt-1 rounded-lg p-2 bg-white dark:bg-black border border-white border-solid dark:border-primary-bgcl"
                                    >
                                        <option value="private">Private</option>
                                        <option value="unlisted">
                                            Unlisted
                                        </option>
                                        <option value="public">Public</option>
                                    </select>
                                </>
                            )}
                        />
                    </div>
                    <div className="flex items-center gap-x-2 justify-end">
                        <button
                            onClick={onHideDialog}
                            className="px-3 py-2 min-w-[80px] rounded border border-solid transition-colors border-transparent dark:hover:border-black text-sm hover:border-[var(--bg-hover-white)] hover:bg-[var(--bg-hover-white)] dark:hover:bg-black"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 min-w-[80px] py-2 rounded border border-solid transition-colors text-sm bg-[var(--bg-hover-white)] border-[var(--bg-hover-white)] hover:bg-primary-bgcl hover:text-[#fff] dark:bg-black dark:border-black dark:hover:bg-[var(--bg-hover-white)] dark:hover:text-black"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditForm;
