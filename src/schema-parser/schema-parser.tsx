import type { IComponentRegistry, IJsonElement } from "./types/json-element";
import type { ISchema } from "./types/schema";
import type { ElementType } from "react";
import type { IDataset } from "./types/dataset";
import type { AnyFormApi } from "@tanstack/react-form";
import { registry } from "./component-registry";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import Alert from "@mui/material/Alert";

type SchemaParserProps = {
    schema: ISchema;
    model: IDataset;
    componentRegistry?: IComponentRegistry;
};

export function SchemaParser({ schema, model, componentRegistry = registry }: SchemaParserProps) {
    const form = useForm({
        defaultValues: model,
        validationLogic: revalidateLogic(),
        onSubmit: (values) => {
            console.log("Form submitted with values:", values);
        },
        validators: {
            onDynamic: ({ value }) => {
                if (!value.firstName) {
                    return { firstName: 'A first name is required' }
                }
                return undefined
            },
        },
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            {parseElements(schema.body.elements, form, componentRegistry)}

            <Alert severity="error">{(form.state.errorMap.onDynamic as Record<string, string> | undefined)?.firstName}</Alert>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <>
                        <button type="submit" disabled={!canSubmit}>
                            {isSubmitting ? '...' : 'Submit'}
                        </button>
                        <button
                            type="reset"
                            onClick={(e) => {
                                // Avoid unexpected resets of form elements (especially <select> elements)
                                e.preventDefault()
                                form.reset()
                            }}
                        >
                            Reset
                        </button>
                    </>
                )}
            />
        </form>
    );
}

export function parseElements(elements: IJsonElement[], form: AnyFormApi, componentRegistry: IComponentRegistry) {
    return elements.map((element, index) => {
        const Component = componentRegistry[element.element] as ElementType<any> | undefined;
        if (!Component) {
            console.warn(`Component for element type "${element.element}" not found in registry.`);
            return null;
        }
        return <Component key={index} form={form} element={element} />;
    });
}
