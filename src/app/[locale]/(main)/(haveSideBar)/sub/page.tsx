import { getTranslations } from 'next-intl/server';

import SubList from '@/feature/sub/components/SubList';

const Subs = async () => {
    const t = await getTranslations("SubsPage");
    return (
        <section className="pt-[66px] lg:pl-[269px] w-full md:w-[calc(100%-60px)]  mx-auto lg:pr-[30px] pb-6 ">
            <h1 className="text-4xl text-center font-bold    ">
                {t("heading")}
            </h1>
            <SubList></SubList>
        </section>
    );
};

export default Subs;
