
export type GetTemplatesType ={
    count: number;
    filters: Filters;
    limit: number;
    offset: number;
    sort: string[];
    total: number;
    waba_templates: WabaTemplate[];
}

export type WabaTemplate  ={
      category: string;
        components: Component[];
        language: string;
        name: string;
        namespace: string;
        rejected_reason: string;
        status: string;
}

export type Component ={
    format: string;
    type: string;
    text: string;
    buttons: Button[];
    example: Example;
}

export type Button ={
    text: string;
    type: string;
    url: string;
}

export type Example  ={
    body_text: string[][];
    header_handle: string[];
}

export type Filters  ={
  
}