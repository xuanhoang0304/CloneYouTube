import { Controller, FieldErrors } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type InputFormType = {
    labelTitle: string;
    inputId: string;
    name: string;
    control: any;
    className?: string;
    error?: FieldErrors<FormData>[keyof FormData];
};

const InputForm = ({
    labelTitle,
    inputId,
    name,
    control,
    error,
}: InputFormType) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <>
                    <div className="relative">
                        <Input
                            {...field}
                            id={inputId}
                            placeholder=" " // Placeholder rỗng để kích hoạt :placeholder-shown
                            className="input-field border border-solid border-gray-400 focus:ring-0"
                        />
                        <label
                            htmlFor={inputId}
                            className={cn(
                                "input-label text-[#aaa] text-sm absolute left-3 top-1/2 -translate-y-1/2  px-1 bg-[var(--bg-second-white)] dark:bg-primary-bgcl"
                            )}
                        >
                            {labelTitle.replace(
                                labelTitle[0],
                                labelTitle[0].toUpperCase()
                            )}
                        </label>
                        {error && (
                            <p className="text-red-500 text-xs absolute mt-1">
                                {error.message}
                            </p>
                        )}
                    </div>
                </>
            )}
        />
    );
};

export default InputForm;
