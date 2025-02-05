export default function calcSubscriber(subscriber: string , locale : string = "vi") {
    const num = parseInt(subscriber);
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2).replace(".00","") + `${locale == "vi" ? " M người đăng ký" : "M subscribers"}`;
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2).replace(".00","") + `${locale == "vi" ? " K người đăng ký" : "K subscribers"}`;
    } else {
        return num;
    }
} 