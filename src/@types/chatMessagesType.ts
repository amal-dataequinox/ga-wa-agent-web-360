
export type ChatMessagesType = {
    conversationMessageId: string;
    conversationId: string;
    messageBody: string;
    messageType: string;
    wamId: string | null;
    status: string |null;
    isInbound:boolean;
    createTime: Date;
    updateTime: Date;
};