import { getCollectionData } from "./get-collection-data";
import { queryClient } from "./query-client";

export type DatasourceParameters = Record<string, any>;

export type DatasourceDefinition = {
    name: string;
    remote: string;
    action: string;
    parameters: Record<string, any>;
}

export class Datasource {
    private key: string;
    private definition: DatasourceDefinition

    constructor(definition: Partial<DatasourceDefinition>) {
        this.key = `datasource-${definition.remote}-${definition.action}`;
        this.definition = {
            name: definition.name || '',
            remote: definition.remote || '',
            action: definition.action || '',
            parameters: definition.parameters || {}
        };
    }

    getQueryDefinition(inflatedParameters: DatasourceParameters) {

        return {
            queryKey: [this.key, inflatedParameters],
            queryFn: () =>
                getCollectionData(
                    this.definition.remote,
                    this.definition.action,
                    inflatedParameters
                ),
        };
    }

    load() {
        return queryClient.invalidateQueries({ queryKey: [this.key] });

    }
}