"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Import Shadcn UI Progress
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useYouTubeStore } from "@/store/store";

import uploadVideo from "@/utils/uploadVideo";
import { zodResolver } from "@hookform/resolvers/zod";

import InputFile from "./InputFile";
import InputForm from "./InputForm";
import PreviewVideo from "./PreviewVideo";
import { createUploadSchema, FormData } from "./types/uploadSchema";
import createUploadSession from "@/utils/createUploadSession";

export default function UploadForm() {
    const { toast } = useToast();
    const t = useTranslations();
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(createUploadSchema(t)),
        defaultValues: {
            video: undefined,
            title: "",
            description: "",
            privacy: "private",
        },
    });
    const { token } = useYouTubeStore();
    const [uploadProgress, setUploadProgress] = useState(0); // State để lưu tiến độ tải lên
    const file = watch("video");
    const { title, description: desc } = watch();
    const [resetKey, setResetKey] = useState(0);
    const handleReset = () => {
        reset({
            video: undefined,
            title: "",
            description: "",
            privacy: "private",
        });
        setResetKey((prev) => prev + 1); // Ép `InputFile` re-render
    };
    const handleUpload = async (data: any) => {
        if (!data.video) {
            toast({
                variant: "destructive",
                title: "Lỗi",
                description: "Bạn chưa chọn video!",
            });
            return;
        }
     
        try {
            const uploadUrl = await createUploadSession(
                data.title,
                data.description,
                data.privacy,
                token
            );
            if (uploadUrl) {
                await uploadVideo(
                    data.video[0],
                    uploadUrl,
                    token,
                    (progress) => {
                        setUploadProgress(progress);
                        if (progress === 100) {
                            setTimeout(() => {
                                handleReset();
                                setUploadProgress(0);
                            }, 500);
                        }
                    }
                );
                toast({
                    className: "bg-green-600",
                    title: "Upload thành công!",
                });
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Lỗi",
                description: error.message,
            });
        }
    };
    useEffect(() => {
        if (file) {
            const selectedFile = file instanceof FileList ? file[0] : file;
            if (selectedFile instanceof File) {
                const url = URL.createObjectURL(selectedFile);
                setVideoSrc(url);

                // Lấy tên file và bỏ phần mở rộng
                const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");
                setValue("title", fileName);

                return () => URL.revokeObjectURL(url);
            }
        } else {
            setVideoSrc(null);
            setValue("title", ""); // Reset title nếu không có file
        }
    }, [file, setValue]);

    return (
        <form
            className="formUploadVideo flex mb-[84px] flex-col gap-y-5 bg-[var(--bg-second-white)] dark:bg-primary-bgcl px-4 py-6 max-w-fit lg:max-w-[60%]  rounded-lg mx-auto"
            onSubmit={handleSubmit(handleUpload)}
            method="POST"
        >
            <h1 className="text-center text-[40px]">Upload Video</h1>
            {errors.video && (
                <p className="text-red-500 absolute text-xs mt-1">
                    {errors.video.message?.toString()}
                </p>
            )}
            {file && (
                <div className="flex flex-col lg:flex-row gap-y-6 gap-x-10 ">
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
                                        placeholder=""
                                        className="resize-none  min-h-[200px] border border-solid border-gray-400 focus:ring-0"
                                        {...field}
                                    />
                                    <label
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
                                            <option value="private">
                                                Private
                                            </option>
                                            <option value="unlisted">
                                                Unlisted
                                            </option>
                                            <option value="public">
                                                Public
                                            </option>
                                        </select>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    {videoSrc && (
                        <PreviewVideo
                            title={title}
                            desc={desc}
                            videoSrc={videoSrc}
                        ></PreviewVideo>
                    )}
                </div>
            )}
            <div
                className={cn(
                    "flex gap-x-2 lg:justify-start justify-center",
                    !file && "hidden"
                )}
            >
                <Button type="submit">Upload Video</Button>
                <Button
                    onClick={() => {
                        handleReset();
                        setVideoSrc(null);
                    }}
                    type="button"
                >
                    Chọn lại
                </Button>
            </div>
            <div className={cn("", file && "hidden")}>
                <InputFile control={control} resetKey={resetKey}></InputFile>
            </div>
            {/* Thanh tiến độ */}
            {!!uploadProgress && (
                <div className="w-full mt-4">
                    <Progress
                        value={uploadProgress}
                        max={100}
                        className="h-2"
                    />
                </div>
            )}
        </form>
    );
}
