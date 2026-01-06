import { useQuery } from "@tanstack/react-query";
import TestList from "./TestList";
import type { Datasource } from "./utils/datasource";
import { inflateParameters } from "./utils/inflate-parameters";
import type { ReactFormExtendedApi } from "@tanstack/react-form";

export type RemoteListProps = {
    datasource: Datasource;
    form: ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any, any, any>,
    onSelectionChange?: (id: string | any) => void;
};

export function RemoteList({datasource, form, onSelectionChange}: RemoteListProps) {
    const parameters = inflateParameters(
            datasource['definition'].parameters,
             form
        );

    const { data, isFetching, error } = 
      useQuery(datasource.getQueryDefinition(parameters)
         
    );
    if (isFetching) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data</div>;
    }

    const items = (data || []).map((item: any) => ({
        id: item.id,
        primary: item.title || `Item ${item.id}`,
    }));

    return <TestList items={items} onSelectionChange={onSelectionChange} />;
}