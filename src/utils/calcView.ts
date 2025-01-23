export default function calcView(view: number ) {
    if (view >= 1000000000) {
        return `${(view / 1000000000).toFixed(1).replace(".0","")} B lượt xem`;
    }
    if (view >= 1000000) {
        return `${(view / 1000000).toFixed(1).replace(".0","")} Tr lượt xem`;
    }
    if (view >= 1000) {
        return `${(view / 1000).toFixed(1).replace(".0","")} N lượt xem`;
    }
    return `${view} lượt xem`;
 
}
