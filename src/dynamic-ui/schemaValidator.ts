/**
 * Helper functions to build dynamic Zod schemas from form elements
 */

import { z } from 'zod';
import type { FormElement } from './types';

export function buildZodSchema(elements: FormElement[]): z.ZodType<any> {
    const shape: Record<string, z.ZodTypeAny> = {};

    elements.forEach((element) => {
        if (!element.field) return;

        let fieldSchema: z.ZodTypeAny;

        // Start with base type
        switch (element.type || element.element) {
            case 'email':
                fieldSchema = z.string().email('Invalid email');
                break;
            case 'number':
                fieldSchema = z.coerce.number();
                break;
            case 'checkbox':
                fieldSchema = z.boolean();
                break;
            case 'date':
                fieldSchema = z.string().pipe(z.coerce.date());
                break;
            default:
                fieldSchema = z.string();
        }

        // Apply validation rules
        if (element.validation) {
            const { pattern, minLength, maxLength, message } = element.validation;

            if (minLength !== undefined && fieldSchema instanceof z.ZodString) {
                fieldSchema = (fieldSchema as z.ZodString).min(minLength, message || `Min ${minLength} characters`);
            }
            if (maxLength !== undefined && fieldSchema instanceof z.ZodString) {
                fieldSchema = (fieldSchema as z.ZodString).max(maxLength, message || `Max ${maxLength} characters`);
            }
            if (pattern !== undefined && fieldSchema instanceof z.ZodString) {
                fieldSchema = (fieldSchema as z.ZodString).regex(new RegExp(pattern), message || 'Invalid format');
            }
        }

        // Apply required constraint
        if (element.required === false) {
            fieldSchema = fieldSchema.optional().nullable();
        }

        shape[element.field] = fieldSchema;
    });

    return z.object(shape);
}

export function getDefaultValues(elements: FormElement[]): Record<string, any> {
    const defaults: Record<string, any> = {};

    elements.forEach((element) => {
        if (!element.field) return;

        switch (element.type || element.element) {
            case 'checkbox':
                defaults[element.field] = false;
                break;
            case 'number':
                defaults[element.field] = '';
                break;
            default:
                defaults[element.field] = '';
        }
    });

    return defaults;
}
