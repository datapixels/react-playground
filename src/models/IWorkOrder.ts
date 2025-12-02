import type { IBaseModel } from "./IBaseModel";


export interface IWorkOrder extends IBaseModel {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    status: 'open' | 'in_progress' | 'completed' | 'closed';
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    updatedAt: Date;
    getCollectionUserDefinedFields(): Record<string, any>;
}