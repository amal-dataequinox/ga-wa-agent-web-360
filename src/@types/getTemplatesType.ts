
export type GetTemplatesType ={
    whatsAppBusinessId: string;
    accountId: string;
    displayName: string;
    businessAccountId: string;
    templates: Template[];
}

export type Template  ={
    name: string;
    components: Component[];
    language: string;
    status: string;
    category: string;
    id: string;
}

export type Component ={
    type:     string;
    format?:  string;
    text?:    string;
    buttons?: Button[];
    example :any
}

export type Button ={
    type: string;
    text: string;
    phone_number: string;
    url: string;
}
