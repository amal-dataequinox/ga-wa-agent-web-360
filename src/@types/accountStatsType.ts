
export type AccountStatsType = {
    from: Date;
    to: Date;
    campaigns: Campaigns;
    messages: Messages;
    messageHistory: MessageHistory[];
};

export type Campaigns = {
    created: number;
    inProgress: number;
    completed: number;
    cancelled: number;
    queued:number;
}

export type Messages = {
    queued: number;
    accepted: number;
    delivered: number;
    read: number;
    replied: number;
    failed: number;
}

export type MessageHistory = {
    reportDate: string;
    queued: number;
    accepted: number;
    delivered: number;
    read: number;
    replied: number;
    failed: number;
}
