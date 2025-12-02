import type { IComponentRegistry, IJsonElement } from "./types/json-element";
import type { ISchema, ICustomActionTrigger, ICustomAction } from "./types/schema";
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

function evaluateTrigger(trigger: string, fieldName: string, formApi: AnyFormApi, actions: ICustomAction[]): void {
    // Parse the trigger pattern (e.g., "model.firstName")
    const triggerParts = trigger.split('.');
    
    // Check if trigger matches the field that just blurred
    if (trigger === fieldName) {
        // Execute all actions for this trigger
        actions.forEach((action) => {
            if (action.action === 'setValue' && action.path) {
                formApi.setFieldValue(action.path, action.value)  // ✅ Use action data
                console.log(`Action executed: setValue on ${action.path} to`, action.value);
            }
            // Add more action types here as needed (e.g., 'show', 'hide', 'disable', etc.)
        });
    }
}

export function SchemaParser({ schema, model, componentRegistry = registry }: SchemaParserProps) {
    const form = useForm({
        defaultValues: model,
        validationLogic: revalidateLogic(),
        onSubmit: (values) => {
            console.log("Form submitted with values:", values);
        },

        listeners: {
            onMount: ({ formApi }) => {
                console.log(formApi.state.values);
            },

            // onChange: ({ formApi, fieldApi }) => {
            //     // autosave logic
            //     if (formApi.state.isValid) {
            //         formApi.handleSubmit()
            //     }

            //     // fieldApi represents the field that triggered the event.
            //     console.log(fieldApi.name, fieldApi.state.value)
            // },
            onBlur: ({ formApi, fieldApi }) => {
                console.log("Field blurred:", fieldApi.name, fieldApi.state.value);
                
                // Evaluate custom action triggers
                if (schema.customActionTriggers) {
                    schema.customActionTriggers.forEach((trigger: ICustomActionTrigger) => {
                        evaluateTrigger(trigger.trigger, fieldApi.name, formApi, trigger.actions);
                    });
                }
            },
            onChangeDebounceMs: 500,
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
