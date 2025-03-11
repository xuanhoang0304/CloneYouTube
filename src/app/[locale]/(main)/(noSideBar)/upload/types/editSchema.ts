import { z } from 'zod';

export const createEditSchema = (t: (key: string, params?: any) => string) =>
    z.object({
        title: z.string().min(3, { message: t("form.minLength", { min: 3 }) }).max(100,{ message: t("form.maxLength", { max: 100 }) }),
        description: z
            .string()
            .min(10, { message: t("form.minLength", { min: 10 }) }),
        privacy: z.enum(["private", "public", "undefined", "unlisted"], {
            message: t("form.privacyRequired"),
        }),
    });

export type FormData = z.infer<ReturnType<typeof createEditSchema>>;
