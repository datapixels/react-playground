type IRemoteAction = {
    remote: string;
    action: string;
    parameters?: Record<string, any>;
};

export type IPrimaryActions = {
    create?: IRemoteAction;
    load?: IRemoteAction;
    update?: IRemoteAction;
    delete?: IRemoteAction;
}

export type IDatasetField = {
    name: string;
    type?: string;
    default?: any;
    collection?: boolean;
    datasource?: string | number;
}

export type IDataset = {
    name: string;
    fields: IDatasetField[];
    remote: string;
    primaryActions?: IPrimaryActions;
    [key: string]: unknown
}