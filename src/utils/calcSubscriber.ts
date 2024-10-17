export default function calcSubscriber(subscriber: string) {
    const num = parseInt(subscriber);
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2).replace(".00","") + " Tr người đăng ký";
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2).replace(".00","") + " N người đăng ký";
    } else {
        return num;
    }
} 