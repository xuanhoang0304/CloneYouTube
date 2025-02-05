export const calcDayCreate = (date: string  , locale : string = "vi") => {
    const today = new Date();
    const createDate = new Date(date);
    const diffTime = Math.abs(today.getTime() - createDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays == 1) {
        if (diffTime < 1000 * 60 * 60) {
            const diffMinutes = Math.ceil(diffTime / (1000 * 60));
            if (diffMinutes == 1) return locale == "vi" ?  "1 phút trước" :  " 1 minutes ago";
            return locale == "vi" ?  `${diffMinutes} phút trước` :  `${diffMinutes} minutes ago` ;
        }
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        return locale == "vi" ?  `${diffHours} giờ trước` :  `${diffHours} hours ago` ;
    }
    if (diffDays < 7) return locale == "vi" ?  `${diffDays} ngày trước` :  `${diffDays} days ago` ; 
    if (diffDays < 30) return locale == "vi" ?  `${Math.ceil(diffDays / 7)} tuần trước` :  `${Math.ceil(diffDays / 7)} weeks ago` ;
    if (diffDays < 365) return locale == "vi" ?  `${Math.ceil(diffDays / 30)} tháng trước` :  `${Math.ceil(diffDays / 30)} months ago` ;
    return locale == "vi" ?  `${Math.ceil(diffDays / 365)} năm trước` :  `${Math.ceil(diffDays / 365)} years ago`  ;
};
