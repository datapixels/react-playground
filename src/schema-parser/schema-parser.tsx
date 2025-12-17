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

/**
 * Evaluates conditional attributes (e.g., "hidden.if", "disabled.if")
 * Returns an object with the attribute name and its evaluated boolean value
 */
export function evaluateConditionalAttributes(
    attributes: Record<string, any> | undefined,
    formValues: unknown
): Record<string, any> {
    if (!attributes) return {};
    
    const evaluatedAttributes: Record<string, any> = {};
    const values = formValues as Record<string, any>;
    
    Object.entries(attributes).forEach(([key, value]) => {
        // Check if this is a conditional attribute (ends with .if)
        if (key.endsWith('.if')) {
            const attributeName = key.replace('.if', '');
            
            try {
                // Create a function that evaluates the condition
                // Pass model and form values as parameters for access in conditions
                const conditionFn = new Function(
                    'model',
                    `return ${value};`
                );
                
                // Execute the condition function with current form values
                const result = conditionFn(values);
                evaluatedAttributes[attributeName] = result;
                
                console.log(`Attribute condition "${key}: ${value}" evaluated to:`, result);
            } catch (error) {
                console.error(`Error evaluating attribute condition "${key}: ${value}":`, error);
                evaluatedAttributes[attributeName] = false;
            }
        } else {
            // Regular attribute, pass through as-is
            evaluatedAttributes[key] = value;
        }
    });
    
    return evaluatedAttributes;
}

function evaluateTrigger(trigger: string, fieldName: string, formApi: AnyFormApi, actions: ICustomAction[]): void {
    // Check if trigger matches the field that just blurred
    if (trigger === fieldName) {
        // Get all form values for condition evaluation
        const formValues = formApi.state.values;
        
        // Execute all actions for this trigger
        actions.forEach((action) => {
            // Evaluate condition if it exists
            let shouldExecute = true;
            if (action.condition) {
                try {
                    // Create a function that evaluates the condition
                    // Pass form values as individual variables
                    const conditionFn = new Function(
                        ...Object.keys(formValues),
                        `return ${action.condition};`
                    );
                    
                    // Execute the condition function with current form values
                    shouldExecute = conditionFn(...Object.values(formValues));
                    console.log(`Condition "${action.condition}" evaluated to:`, shouldExecute);
                } catch (error) {
                    console.error(`Error evaluating condition "${action.condition}":`, error);
                    shouldExecute = false;
                }
            }
            
            // Execute action if condition is met
            if (shouldExecute && action.action === 'setValue' && action.path) {
                formApi.setFieldValue(action.path, action.value);
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
