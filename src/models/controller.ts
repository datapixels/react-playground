import type { IBaseModel } from "./IBaseModel";
import type { ICollectionBaseModel } from "./ICollectionBaseModel";

export class BaseController {

    async getCollection<T extends ICollectionBaseModel>(params?: Record<string, any>): Promise<T[]> {
        // Generic getCollection method logic here
        const query = params
            ? '?' + new URLSearchParams(
                  Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
              ).toString()
            : '';
        const response = await fetch(`/api/collection${query}`, { method: 'GET' });
        if (response.ok) {
            const data = await response.json() as T[];
            return data;
        }
        return [];
    }


    async get<T extends IBaseModel>(id: number): Promise<T | null> {
        // Generic get method logic here
        const response = await fetch(`/api/model/${id}`);
        if (response.ok) {
            const data = await response.json() as T;
            return data;
        }
        return null;
    }
}