import { ChanelType } from "@/common/types";

export function sortChannelsByStatus(channels: ChanelType[]): ChanelType[] {
    return channels.sort((a, b) => {
        const statusOrder: { [key: string]: number } = {
            streaming: 1,
            active: 2,
            inactive: 3,
        };

        return statusOrder[a.status] - statusOrder[b.status];
    });
}
