export default function calcView(view: number ) {
    if (view >= 1000000000) {
        return `${(view / 1000000000).toFixed(1).replace(".0","")} B`;
    }
    if (view >= 1000000) {
        return `${(view / 1000000).toFixed(1).replace(".0","")} M`;
    }
    if (view >= 1000) {
        return `${(view / 1000).toFixed(1).replace(".0","")} K`;
    }
    return `${view}`;
 
}
