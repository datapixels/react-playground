import type { ICollectionBaseModel } from "./ICollectionBaseModel";

declare const COLLECTION_BRAND: unique symbol;

export interface ICollectionWorkOrder extends ICollectionBaseModel {
    readonly [COLLECTION_BRAND]: void;
    id: string;
    resourceResourceCode: string;
    code: string;
    description: string;
    status: 'open' | 'in_progress' | 'completed' | 'closed';
    priority: 'low' | 'medium' | 'high';
    scheduledStartDate: Date;
    scheduledEndDate: Date;
    getCollectionUserDefinedFields(): Record<string, any>;
}