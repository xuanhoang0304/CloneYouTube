"use client";
import { Keyboard, Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useApi } from '@/hooks/useAPI';
import useClickOutside from '@/hooks/useClickOutSide';
import useDebounce from '@/hooks/useDebounce';
import { cn } from '@/utils/cn';
import { slugify } from '@/utils/slugify';

const SearchInput = () => {
    const q = useSearchParams().get("q")?.replaceAll("-", " ");
    const SearchIputRef = useRef<HTMLInputElement>(null);
    const [listKeyword, setListKeyword] = useState<
        { id: { videoId: string }; snippet: { title: string } }[]
    >([]);
    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const [searchText, setSearchText] = useState(q || "");
    const [isShow, setIsShow] = useState(false);
    const handleClose = () => {
        setIsShow(false);
    };
    const ref = useClickOutside<HTMLOListElement>(handleClose);
    const debouncedSearch = useDebounce(searchText, 1500);

    const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        setIsSearchFocus(true);
    };

    const { data: searchKey } = useApi<{ items: [] }>({
        url: `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&q=${debouncedSearch}&maxResults=50&type=video`,
    });
    const router = useRouter();
    const handleSearch = (key: string) => {
        if (key === '') return;
        router.push(`/search?q=${slugify(key)}`);
        setIsShow(false);
        setIsSearchFocus(false);
    };

    const handleFocus = () => {
        setIsSearchFocus(true);
        setIsShow(true);
    };
    const handleKeyUp = (e: KeyboardEvent): void => {
        e.preventDefault();
        if (searchText === '') return;
        if (e.key === 'Enter' && searchText !== '') {
            router.push(`/search?q=${slugify(searchText)}`);
            setIsShow(false);
            setIsSearchFocus(false);
        }
    };
    useEffect(() => {
        if (SearchIputRef.current) {
            SearchIputRef.current.addEventListener("focus", handleFocus);
        }
        if (searchKey) {
            setListKeyword(searchKey?.items);
        }
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            SearchIputRef.current?.removeEventListener("focus", handleFocus);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [debouncedSearch, isSearchFocus, searchKey ]);
    return (
        <div className="max-w-[600px] flex-1 bg-[#121212] text-[#888] flex items-center pl-[16px] rounded-full border border-[#303030] relative">
            {searchText &&
                isShow &&
                isSearchFocus &&
                listKeyword?.length > 0 && (
                    <ul
                        ref={ref}
                        className="w-full absolute z-30 top-[45px] py-3 rounded-lg left-0 right-0 bg-primary-bgcl"
                    >
                        {listKeyword?.length > 0 &&
                            listKeyword
                                ?.slice(0, 10)
                                ?.map(
                                    (item: {
                                        id: { videoId: string };
                                        snippet: { title: string };
                                    }) => (
                                        <li
                                            onClick={() =>
                                                handleSearch(
                                                    item?.snippet.title
                                                )
                                            }
                                            key={item?.id.videoId}
                                            className="py-2 px-4 flex items-center gap-x-3 hover:bg-[#717171]"
                                        >
                                            <Search className="w-5 shrink-0"></Search>
                                            <p className="text-white line-clamp-1">
                                                {item?.snippet.title.toLowerCase()}
                                            </p>
                                        </li>
                                    )
                                )}
                    </ul>
                )}
            <input
                ref={SearchIputRef}
                placeholder="Tìm kiếm"
                className="w-full text-[#fff] placeholder:text-[#888]"
                value={searchText}
                onChange={handleChangeSearchText}
            ></input>
            <button className="h-[20px] px-2 shrink-0">
                <Keyboard className="img-cover hover:stroke-white" />
            </button>
            <button
                onClick={() => setSearchText("")}
                className={cn(
                    "hidden text-white transition-colors    ",
                    searchText && "block"
                )}
            >
                <X />
            </button>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger
                        onClick={() => handleSearch(searchText)}
                        className="flex items-center justify-center w-[60px] h-[40px] shrink-0 bg-primary-bgcl rounded-r-full"
                    >
                        <Search className="text-white w-5" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#717171] relative !top-2">
                        <p>Tìm kiếm</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default SearchInput;
