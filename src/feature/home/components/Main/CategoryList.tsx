"use client";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
// import required modules
import { Keyboard, Navigation } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { useYouTubeStore } from '@/store/store';

import CategoryItems from './CategoryItems';

type CategoryListProps = {
    list: { id: string; title: string; isActive: boolean }[];
};
const CategoryList = ({ list }: CategoryListProps) => {
    const { setCategoryId } = useYouTubeStore();
    const [screenWidth, setScreenWidth] = useState(0);
    const [categoryList, setCategoryList] = useState(list);
    const pathname = usePathname();
    const locale = Cookies.get("NEXT_LOCALE");
    const handleSetList = (id: string) => {
        const newList = categoryList.map((item) => {
            if (item.id === id) {
                return { ...item, isActive: true };
            } else {
                return { ...item, isActive: false };
            }
        });
        setCategoryList(newList);
        setCategoryId(id);
        window.scrollTo(0, 0);
    };
    const handleSetScreenWidth = () => {
        setScreenWidth(screen.width);
    };
    useEffect(() => {
        window.addEventListener("", handleSetScreenWidth);
        handleSetScreenWidth();
        return () => {
            window.removeEventListener("", handleSetScreenWidth);
        };
    }, [screenWidth]);
    useEffect(() => {
        setCategoryList(list);
    }, [list,locale]);
    if (pathname !== `/${locale}`) return null;
    return (
        <div className="w-[calc(100%-24px)] ml-3 md:ml-[24px] lg:ml-[270px] ">
            <Swiper
                slidesPerView={screenWidth >= 1040 ? 10 : "auto"}
                spaceBetween={10}
                navigation={true}
                keyboard={{
                    enabled: true,
                }}
                // rewind={true}
                modules={[Navigation, Keyboard]}
                className="Category-swiper !w-full !pt-0 !pb-4 md:!py-4"
            >
                {categoryList?.map((item) => (
                    <SwiperSlide key={item.id} className="!w-auto">
                        <CategoryItems
                            item={item}
                            onSetList={handleSetList}
                        ></CategoryItems>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CategoryList;
