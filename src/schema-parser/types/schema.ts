import type { IJsonElement } from "./json-element";

export interface IBody {
    elements: IJsonElement[];
}

export interface ITemplate {
    id: string;
    elements: IJsonElement[];
}

export interface ISchema {
    body: IBody;
    templates?: ITemplate[];
}