import type { IDataset } from "./dataset";
import type { IJsonElement } from "./json-element";

export interface IBody {
    elements: IJsonElement[];
}

export interface ITemplate {
    id: string;
    elements: IJsonElement[];
}

export interface ICustomAction {
    action: string;
    path?: string;
    value?: any;
    [key: string]: any;
}

export interface ICustomActionTrigger {
    trigger: string;
    actions: ICustomAction[];
}

export interface ISchema {
    body: IBody;
    templates?: ITemplate[];
    customActionTriggers?: ICustomActionTrigger[];
    datasets: IDataset[];
    datasources?: [
        {
            id: string | number;
            remote: string;
            action: string;
            parameters?: Record<string, any>;
        }
    ]
}
