export const calcDayCreate = (date: string ) => {
    const today = new Date();
    const createDate = new Date(date);
    const diffTime = Math.abs(today.getTime() - createDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays == 1) {
        if (diffTime < 1000 * 60 * 60) {
            const diffMinutes = Math.ceil(diffTime / (1000 * 60));
            if (diffMinutes == 1) return "1 phút trước";
            return `${diffMinutes} phút trước`;
        }
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        return `${diffHours} giờ trước`;
    }
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} tuần trước`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} tháng trước`;
    return `${Math.ceil(diffDays / 365)} năm trước`;
};
