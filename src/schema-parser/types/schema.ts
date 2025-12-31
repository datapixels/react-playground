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

export interface IDatasetStandardField {
    name: string;
    type: string;
    default?: any;
}

export interface IDatasetDatasourceField {
    name: string;
    collection: boolean
    datasource: string | number;
}

export interface ISchema {
    body: IBody;
    templates?: ITemplate[];
    customActionTriggers?: ICustomActionTrigger[];
    datasets: [
        {
            name: string;
            fields: (IDatasetStandardField | IDatasetDatasourceField)[];
        }
    ],
    datasources?: [
        {
            id: string | number;
            remote: string;
            action: string;
            parameters?: Record<string, any>;
        }
    ]
}
