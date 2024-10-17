"use client";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
    const pathname = usePathname();
    const [categoryList, setCategoryList] = useState(list);
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
        window.scrollTo({ top: 10, behavior: 'smooth' });
    };
    if (pathname !== "/") return null;
    return (
        <section className="w-[calc(100%-48px)] ml-[270px] mr-auto">
            <Swiper
                slidesPerView={10}
                spaceBetween={10}
                navigation={true}
                keyboard={{
                    enabled: true,
                }}
                modules={[Navigation, Keyboard]}
                className="Category-swiper !w-full !py-4"
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
        </section>
    );
};

export default CategoryList;
