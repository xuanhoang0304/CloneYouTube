import { notFound } from 'next/navigation';

import HomePage from '@/feature/home';

const Main = ({ params }: { params: { locale: string } }) => {
    const supportedLocales = ["en", "vi"]; // Danh sách locale hợp lệ

    if (!supportedLocales.includes(params.locale)) {
        return notFound(); // Gọi trang 404 nếu locale không hợp lệ
    }
    return <HomePage></HomePage>;
};

export default Main;
