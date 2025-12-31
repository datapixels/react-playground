import type { ISchema } from "../../../schema-parser/types/schema";
import { Datasource } from "./datasource";

export type IModel = {
    [key: string]: any;
    getDirtyModel: () => Record<string, any>;
};

export function createDatasetState(schema: ISchema, context: Record<string, any>): IModel {
    const dataset = schema.datasets.find(ds => ds.name === 'model');
    if (!dataset) {
        throw new Error("Dataset 'model' not found in schema");
    }

    const model: IModel = {
        getDirtyModel: () => {
            return {
               // Implementation of dirty model tracking can be added here
            };
        }
    };
    for (const field of dataset.fields) {
        if ('collection' in field && field.collection === true) {
            // initialize collection fields as empty arrays
            const schemaDatasource = schema.datasources?.find(ds => ds.id === field.datasource);
            if (!schemaDatasource) {
                throw new Error(`Datasource with id '${field.datasource}' not found in schema`);
            }

            const definition = {
                name: field.name,
                remote: schemaDatasource.remote,
                action: schemaDatasource.action,
                parameters: schemaDatasource.parameters
            };

            model[field.name] = new Datasource(definition);
        } else {
            // initialize other fields as null
            model[field.name] = null;
        }
    }

    return model;
}

