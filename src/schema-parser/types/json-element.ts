import type { ElementType } from "react";

export interface IJsonElement {
    element: 'input' | 'select' | 'checkbox' | 'date' | 'number' | 'tabsheet' | 'tab' | 'group' | string;
    attributes?: Record<string, any>;
    elements?: IJsonElement[];
    title?: string;
    [key: string]: unknown;
}

export type IComponentRegistry = Record<string, ElementType<any>>;