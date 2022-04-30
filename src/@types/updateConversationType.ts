
export type UpdateConversationType = {
    conversationId: string;
    whatsAppBusinessId: string;
    displayPhoneNumber: string;
    phoneNumberId: string;
    displayProfileName: string;
    waId: string;
    contactId: string;
    assignedAgentId: string;
    assignedAgentName?: any;
    inboundMessageTime: Date;
    createTime: Date;
    updateTime: Date;
};