
export type CampaignStatsType = {
    campaignId: string;
    stats: Stats;
}
export type Stats = {
    queued: number;
    accepted: number;
    delivered: number;
    read: number;
    replied: number;
    failed: number;
    sent: number;
};