"use client";
import { Keyboard, Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useApi } from '@/hooks/useAPI';
import useClickOutside from '@/hooks/useClickOutSide';
import useDebounce from '@/hooks/useDebounce';
import { useYouTubeStore } from '@/store/store';
import { cn } from '@/utils/cn';
import { slugify } from '@/utils/slugify';

const SearchInput = ({ accessToken }: { accessToken: string | undefined }) => {
    const { token, setToken } = useYouTubeStore();
    const [searchOpen, setSearchOpen] = useState(false);
    const q = useSearchParams().get("q")?.replaceAll("-", " ");
    const SearchIputRef = useRef<HTMLInputElement>(null);
    const [listKeyword, setListKeyword] = useState<
        { id: { videoId: string }; snippet: { title: string } }[]
    >([]);
    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const [searchText, setSearchText] = useState(q || "");
    const [isShow, setIsShow] = useState(false);
    const handleCloseMobieSearch = () => {
        setSearchOpen(false);
        setSearchText("");
    };
    const mobieSearchRef = useClickOutside<HTMLDivElement>(
        handleCloseMobieSearch
    );
    const debouncedSearch = useDebounce(searchText, 500);

    const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        setIsSearchFocus(true);
    };

    const { data: searchKey } = useApi<{ items: [] }>({
        url: debouncedSearch
            ? `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&q=${debouncedSearch}&maxResults=50&type=video`
            : "",
    });
    const router = useRouter();
    const handleSearch = (key: string) => {
        if (key === "") return;
        router.push(`/search?q=${slugify(key)}`);
        setIsShow(false);
        setIsSearchFocus(false);
        setSearchOpen(false);
    };

    const handleFocus = () => {
        setIsSearchFocus(true);
        setIsShow(true);
    };
    const handleKeyUp = (e: KeyboardEvent): void => {
        e.preventDefault();
        if (searchText === "") return;
        if (e.key === "Enter" && searchText !== "") {
            router.push(`/search?q=${slugify(searchText)}`);
            setIsShow(false);
            setIsSearchFocus(false);
        }
    };
    useEffect(() => {
        if (!token) {
            setToken(accessToken);
        }
        if (searchOpen) {
            SearchIputRef?.current?.focus();
            setIsSearchFocus(true);
            setIsShow(true);
        }
        SearchIputRef?.current?.addEventListener("focus", handleFocus);
        if (searchKey) {
            setListKeyword(searchKey?.items);
        }
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            SearchIputRef?.current?.removeEventListener("focus", handleFocus);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [
        debouncedSearch,
        isSearchFocus,
        searchKey,
        searchOpen,
        token,
        setToken,
        accessToken,
    ]);
    return (
        <>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setSearchOpen(true);
                }}
                className="md:hidden size-10 flex items-center justify-center z-50"
            >
                <Search className="dark:text-white text-black w-5" />
            </button>
            <div
                className={cn(
                    " flex-1",
                    searchOpen &&
                        "bg-black/50 w-full fixed inset-0 z-[60] h-[100vh]"
                )}
            >
                <div
                    ref={mobieSearchRef}
                    className={cn(
                        "hidden md:flex md:relative bg-white dark:bg-[#121212] text-[#888]  items-center  rounded-full border border-[#303030] transition-colors",
                        searchOpen &&
                            "absolute top-[10px] left-3 right-3 z-50 flex border-white "
                    )}
                >
                    {searchText &&
                        isShow &&
                        isSearchFocus &&
                        listKeyword?.length > 0 && (
                            <ul className=" w-full fixed md:absolute z-[50] top-[55px]  md:top-[45px] py-3 rounded-lg left-[-1px] right-0 bg-[var(--bg-second-white)] dark:bg-primary-bgcl">
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
                                                    <p className="text-black dark:text-white line-clamp-1">
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
                        className="w-full pl-3 dark:text-[#fff] text-black dark:placeholder:text-[#888] placeholder:text-black"
                        value={searchText}
                        onChange={handleChangeSearchText}
                    ></input>
                    <button className="h-[20px] px-2 shrink-0">
                        <Keyboard className="img-cover " />
                    </button>
                    <button
                        onClick={() => {
                            setSearchText("");
                        }}
                        className={cn(
                            "hidden  transition-colors    ",
                            searchText && "block"
                        )}
                    >
                        <X />
                    </button>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger
                                onClick={() => handleSearch(searchText)}
                                className="flex items-center bg-[var(--bg-second-white)] hover:bg-[var(--bg-hover-white)] dark:bg-primary-bgcl justify-center w-[60px] h-[40px] shrink-0  rounded-r-full"
                            >
                                <Search className=" w-5" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#717171] relative !top-2">
                                <p>Tìm kiếm</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </>
    );
};

export default SearchInput;
