import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type LogoProps = {
    text: string
}
const Logo = ({text} : LogoProps) => {
    return (
        <Link href="/" className="flex items-center pr-[16px] pl:0 lg:px-[16px] py-[18px] relative">
            <figure className='w-[29px] h-[20px]'>
                <Image
                    src="/image/icon.png"
                    alt="logo"
                    width={29}
                    height={20}
                    className='img-cover'
                ></Image>
            </figure>
            <p className='dark:text-white text-black font-semibold tracking-[-1px] text-xl leading-none'>{text}</p>
            <p className='text-[#AAA] absolute right-0 top-3 text-[10px]'>VN</p>
        </Link>
    );
};

export default Logo;
