import { z } from "zod";

export const createUploadSchema = (t: (key: string, params?: any) => string) =>
    z.object({
        video: z
            .any() // Tạm thời chấp nhận bất kỳ giá trị nào từ input
            .refine((files) => files && files.length > 0, {
                message: t("form.fileRequired"),
            })
            .refine(
                (files) => {
                    const file = files?.[0];
                    return (
                        file &&
                        (file.type === "video/mp4" || file.type === "video/avi")
                    );
                },
                { message: t("form.invalidFileType") }
            ),
        title: z
            .string()
            .min(3, { message: t("form.minLength", { min: 3 }) })
            .max(100, { message: t("form.maxLength", { max: 100 }) }),
        description: z
            .string()
            .min(10, { message: t("form.minLength", { min: 10 }) }),
        privacy: z.enum(["private", "public", "unlisted"], {
            message: t("form.privacyRequired"),
        }),
    });

export type FormData = z.infer<ReturnType<typeof createUploadSchema>>;
