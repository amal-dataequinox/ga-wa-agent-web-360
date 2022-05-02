export type CreateWBAccount = {
    whatsAppBusinessId: string;
    accountId: string;
    displayName: string;
    nameSpace: string;
    apiKey: string;
    status: string;
    createTime: Date;
    updateTime: Date;
    teams: Teams[];
}


export type Teams = {
    whatsAppBusinessTeamId: string;
    whatsAppBusinessId: string;
    teamId: string;
    team: Team;
}

export type Team = {
    teamId: string;
    teamName: string;
    accountId: string;
    createTime: Date;
    updateTime: Date;
}


export type TeamID = {
    teamId: string;
}

export type UpdateWBAccount = {
    whatsAppBusinessId: string;
    accountId: string;
    displayName: string;
    nameSpace: string;
    apiKey: string;
    status: string;
    createTime: Date;
    updateTime: Date;
}