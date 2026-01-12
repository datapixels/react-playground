import { getValueOnPath } from './utils/get-value-on-path';
import { runTriggers, type Trigger } from './utils/run-triggers';
import TestList from './TestList';
import { Input, TextField } from '@mui/material';
import { formOptions, useForm, useStore } from '@tanstack/react-form';
import { createDatasetState, type IModel } from './utils/create-dataset-state';
import type { ISchema } from '../../schema-parser/types/schema';
import { RemoteList } from './RemoteList';
import type { Datasource } from './utils/datasource';
import { useMutation } from '@tanstack/react-query';
import { MiniForm } from './MiniForm';
import InputLookup from '../../components/InputLookup';

type DynamicAction = {
    getValueOnPath: (obj: Record<string, any>, path: string) => any
    // setValueOnPath: (path: string, value: any) => void
}

type SchemaVariables = {
    parameters: {
        resourceId: number;
    }
}

type Schema = {
    variables: SchemaVariables;
}

type DynamicStore = {
    schema: Schema;
    model?: IModel;
    actions: DynamicAction;
};

// Trigger and Action types are now defined and exported from utils/run-triggers.ts


// // Cast the immer creator to a StateCreator to satisfy TypeScript compatibility
// export const useDynamicSetStore = create<DynamicStore>()(immerCreator as unknown as StateCreator<DynamicStore>);

export function DynamicSetExample() {

    console.log("Rendering form");
    const triggers: Trigger[] = [
        {
            trigger: 'model.selectedId',
            actions: [{ action: 'model.details.load()' }],
        },
    ];

    const schema: ISchema = {
        body: { elements: [] },
        datasets: [
            {
                name: 'model',
                remote: 'Asset',
                fields: [
                    { name: 'id', type: 'string' },
                    { name: 'code', type: 'string' },
                    { name: 'siteCode', type: 'string' },
                    { name: 'description', type: 'string' },
                    { name: 'selectedId', type: 'array' },
                    { name: 'details', collection: true, datasource: 1 },
                ],
            },
        ],
        datasources: [
            {
                id: 1,
                remote: 'WorkOrder',
                action: 'GetWorkOrderCollection',
                parameters: {
                    assetId: "model.selectedId"
                }

            }
        ],
    }

    const defaultValues: DynamicStore = {
        schema: {
            variables: {
                parameters: {
                    resourceId: 123,
                },
            },
        },
        actions: {
            getValueOnPath: getValueOnPath,
        },
    }

    const model = createDatasetState(schema, defaultValues);

    const mutation = useMutation({
        mutationFn: (model: IModel) => {
            console.log("Submitting dataset:", model, model.__definition.remote);
            // Simulate an async operation, e.g., API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(model);
                }, 1000);
            });

        },
    })

    const formOpts = formOptions({
        defaultValues: {
            ...defaultValues,
            model: model,
        },
    })

    const form = useForm({
        ...formOpts,
        listeners: {

            onChange: ({ formApi, fieldApi }) => {
                console.log("onChange triggered for field:", fieldApi.name);
                runTriggers(triggers, formApi, fieldApi.name);
            },
            onChangeDebounceMs: 0,
        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            if (!value.model) {
                throw new Error("Model is undefined on form submission");
            }
            await mutation.mutateAsync(value.model);



        },
    })

    // const code = useStore(form.store, (state) => state.values.actions.getValueOnPath(state.values, "model.code"));
    const resourceId = useStore(form.store, (state) => state.values.actions.getValueOnPath(state.values, "schema.variables.parameters.resourceId"));
    const dirtyCode = useStore(form.store, (state) => state.values.actions.getValueOnPath(state.values, "model.getDirtyModel().code"));
    const datasource: Datasource = model.details;
    const myMiniForm = useStore(form.store, (state) => state.values.actions.getValueOnPath(state.values, "model.myMiniForm"));

    // const model = useStore(form.store, (state) => state.values.model);

    const siteCode = useStore(form.store, (state) => state.values.actions.getValueOnPath(state.values, "model.siteCode"));

    const testListItems = [{ id: "ASSET-A", primary: 'Item 1' }, { id: "ASSET-B", primary: 'Item 2' }, { id: "ASSET-C", primary: 'Item 3' }];

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
        }
        }>


            <div>
                {/* <h1>My code {code}</h1> */}
                <h2>{resourceId}</h2>
                <h3>{dirtyCode}</h3>
                {/* <h3>Model Code: {code}</h3> */}
                {/* <h3>Model description: {model.description}</h3> */}
                {/* <h3>Model Site Code: {model.siteCode}</h3> */}
                {/* <h3>Model Selected Ids: {model.selectedId.join(', ')}</h3> */}

            

                <form.Field
                    name="model.code"
                    children={(field) => (
                        <>
                            <TextField
                                label="Code"
                                value={field.state.value ?? ''}
                                onChange={(e) => { field.handleChange(e.target.value); }}
                            ></TextField>
                        </>
                    )}
                />

                <form.Field
                    name="model.selectedId"
                    children={(field) => (
                        <>
                            <TextField
                                label="Selected Ids (comma separated)"
                                value={Array.isArray(field.state.value) ? field.state.value.join(', ') : (field.state.value ?? '')}
                                onChange={(e) => {
                                    const input = e.target.value as string;

                                    field.handleChange(input);
                                }}
                            ></TextField>
                        </>
                    )}
                />

                <form.Field
                    name="model.siteCode"
                    children={(field) => (
                        <>
                          <InputLookup 
                            remote="Asset" 
                            action="GetAssets"
                            codeField="code"
                            descriptionField="description"
                            lookupTemplate="assetLookup"
                            label="Site Code"
                            onChange={(value) => field.handleChange(value?.code)}
                          />
                        </>
                    )}
                />

                    <label>{siteCode}</label>

                <button type="button" onClick={() => {
                    form.setFieldValue("model.code", "NewCode" + Math.floor(Math.random() * 1000));
                }}>Set Code</button>
                <button type="button" onClick={() => {
                    form.setFieldValue("model.siteCode", "SiteCode" + Math.floor(Math.random() * 1000));
                }}>Set Site Code</button>

                <button type="button" onClick={() => {
                    datasource.load();
                }}>Reload Data</button>

                <button type='submit'>Submit</button>

                <button
  type="reset"
  onClick={(event) => {
    event.preventDefault()
    form.reset()
  }}
>
  Reset
</button>

                <h3>TestList Example</h3>
                <TestList
                    items={testListItems}
                    onSelectionChange={(item) =>
                        form.setFieldValue(
                            "model.selectedId", item.id
                        )
                    }
                />

                <RemoteList datasource={datasource} form={form} onSelectionChange={(item) =>
                    form.setFieldValue(
                        "model.myMiniForm", item
                    )
                }></RemoteList>


                <MiniForm model={myMiniForm}></MiniForm>
            </div>
        </form>
    );
}