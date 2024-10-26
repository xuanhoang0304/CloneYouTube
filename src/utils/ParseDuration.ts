export function parseDuration(duration: string) {
    const time = duration
        .replace(/(^PT|S$)/g, "")
        .split(/[^\d]/)
        .map((item) => (item.length < 2 ? "0" + item : item))
        .join(":")
        .replace(/^0/, "");
   
    if (time.length == 2) return `0:${time}`;
    if (time.slice(-2) == ":0") return `${time}0`;
    return time;
}
