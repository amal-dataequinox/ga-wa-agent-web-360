import {AllContacts} from "./allContacts"
import { Template } from "./getTemplatesType";

type message = { 
    id: number, 
    messageContent: string, 
    time: string,
     userType: string, 
     isImageMessage: boolean, 
     isFileMessage: boolean,
     isTempalte : boolean;
}
export interface recentChatList  { 
    status : string;
    chatEnabled : boolean;
    // messages : message[] | Template
    conversationId: string;
    whatsAppBusinessId: string;
    displayPhoneNumber: string;
    phoneNumberId: string;
    displayProfileName: string;
    waId: string;
    contactId: string;
    assignedAgentId: string;
    assignedAgentName: string;
    createTime: Date;
    updateTime: Date;
}
