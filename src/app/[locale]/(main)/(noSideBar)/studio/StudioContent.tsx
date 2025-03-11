"use client";

import { useSearchParams } from 'next/navigation';

import TableContent from './TableContent';

const StudioContent = () => {
    // const t = useTranslations("Header");
    const searchParams = useSearchParams();
    const content = searchParams.get("content");
    if (content == "my-profile") {
        return (
            <div className="pt-6 lg:pl-[264px] flex-1 w-full max-w-full md:max-w-[600px] lg:max-w-full overflow-x-auto ">
                <div className="flex items-center justify-between pr-6">
                    <h1 className="text-[26px]">Thông tin của kênh</h1>
                </div>
            </div>
        );
    }
    return (
        <div className="pt-6 lg:pl-[264px] pl-[144px] flex-1 w-full max-w-full  lg:max-w-full overflow-x-auto ">
            <h1 className="text-[26px]">Videos của kênh</h1>
            <TableContent></TableContent>
        </div>
    );
};

export default StudioContent;
