import { Upload } from 'lucide-react';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function InputFile({ control, resetKey }: { control: any; resetKey: number }) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <Card className="w-full max-w-md mx-auto p-4 shadow-lg">
            <CardContent className="flex flex-col items-center gap-4">
                <div className="w-full">
                    <Label
                        htmlFor="video-upload"
                        className="text-sm font-medium cursor-pointer hover:opacity-70 dark:bg-primary-bgcl bg-[var(--bg-second-white)] size-[100px] rounded-full flex items-center justify-center mx-auto"
                    >
                        <Upload className="size-[40px]" />
                    </Label>
                    <Controller
                        name="video"
                        control={control}
                        render={({ field }) => (
                            <Input
                                key={resetKey} // Bắt buộc re-render khi reset
                                ref={inputRef}
                                type="file"
                                id="video-upload"
                                accept="video/mp4"
                                className="mt-6 mx-auto"
                                onChange={(e) => {
                                    const fileList = e.target.files;
                                    field.onChange(fileList); // Truyền file vào react-hook-form
                                }}
                            />
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
