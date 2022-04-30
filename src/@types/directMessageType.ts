
export type DirectMessageType = {
    conversationMessageId: string;
    conversationId: string;
    messageBody: string;
    messageType: string;
    wamId?: any;
    response?: any;
    status?: any;
    isInbound:boolean;
    createTime: Date;
    updateTime: Date;
};