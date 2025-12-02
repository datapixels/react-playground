/**
 * DynamicForm Component - Renders forms from JSON schema using TanStack Form
 * For advanced UI rendering, use DynamicUIRenderer instead
 */

import React, { useMemo } from 'react';
import { useForm } from '@tanstack/react-form';
import { Button, Box, Container, Paper } from '@mui/material';
import type { UISchema, FormValues } from './types';
import type { UIElement } from './types';
import { DynamicField } from './DynamicField';
import { buildZodSchema, getDefaultValues } from './schemaValidator';

interface DynamicFormProps {
    schema: UISchema;
    onSubmit?: (values: FormValues) => void | Promise<void>;
    onReset?: () => void;
    submitButtonLabel?: string;
    resetButtonLabel?: string;
    loading?: boolean;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
    schema,
    onSubmit,
    onReset,
    submitButtonLabel = 'Submit',
    resetButtonLabel = 'Reset',
    loading = false,
}) => {
    const elements = schema.body?.elements || schema.elements || [];
    const formElements = elements.filter((el: UIElement) => el.element !== 'button');
    const buttonElements = elements.filter((el: UIElement) => el.element === 'button');

    // Build Zod schema from form elements
    const zodSchema = useMemo(() => buildZodSchema(formElements), [formElements]);

    // Get default values
    const defaultValues = useMemo(() => getDefaultValues(formElements), [formElements]);

    // Initialize form with TanStack Form
    const form = useForm({
        defaultValues,
        validators: {
            onChange: ({ value }) => {
                try {
                    zodSchema.parse(value);
                    return undefined;
                } catch (error: any) {
                    return error.issues?.[0]?.message || 'Validation error';
                }
            },
        },
        onSubmit: async ({ value }) => {
            if (onSubmit) {
                await onSubmit(value);
            }
        },
    });

    const handleReset = () => {
        form.reset();
        onReset?.();
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Render all form fields */}
                        {formElements.map((element: UIElement) => {
                            if (!element.field) return null;

                            return (
                                <form.Field
                                    key={element.field}
                                    name={element.field as keyof typeof defaultValues}
                                    children={(field) => {
                                        const errors = field.state.meta.errors;
                                        const error =
                                            field.state.meta.isTouched && errors.length > 0
                                                ? errors[0]
                                                : undefined;

                                        return (
                                            <DynamicField
                                                element={element}
                                                value={field.state.value as FormValues[string]}
                                                onChange={field.handleChange}
                                                onBlur={field.handleBlur}
                                                error={error as string}
                                            />
                                        );
                                    }}
                                />
                            );
                        })}

                        {/* Button actions */}
                        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                fullWidth
                            >
                                {submitButtonLabel}
                            </Button>
                            <Button
                                type="button"
                                variant="outlined"
                                color="secondary"
                                onClick={handleReset}
                                disabled={loading}
                            >
                                {resetButtonLabel}
                            </Button>
                        </Box>

                        {/* Custom button elements from schema */}
                        {buttonElements.map((button: UIElement, index: number) => (
                            <Button
                                key={index}
                                type={button.type as any}
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                {button.label}
                            </Button>
                        ))}
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};
