# Dynamic Form System

A React component system for rendering dynamic forms from JSON schemas using TanStack Form and Material-UI, with built-in validation via Zod.

## Features

- **JSON-driven UI**: Define forms using simple JSON schemas
- **TanStack Form Integration**: Powerful form state management and validation
- **Zod Validation**: Type-safe schema validation
- **Material-UI Components**: Professional, accessible UI components
- **Multiple Input Types**: Support for text, email, textarea, select, checkbox, radio, date fields
- **Built-in Validation**: Pattern matching, min/max length, required fields
- **Flexible**: Easy to extend with custom field types

## Project Structure

```
src/dynamic-ui/
├── schema.json              # Example form schema
├── types.ts                 # TypeScript type definitions
├── DynamicForm.tsx          # Main form component
├── DynamicField.tsx         # Individual field renderer
├── schemaValidator.ts       # Zod schema builder & validation helpers
└── index.ts                 # Public exports
```

## Installation

The required dependencies are already installed:
- `@tanstack/react-form` - Form state management
- `zod` - Schema validation
- `@mui/material` - UI components
- `react` - React library

## Usage

### Basic Example

```typescript
import { DynamicForm } from '@/dynamic-ui';
import type { FormSchema } from '@/dynamic-ui/types';

const schema: FormSchema = {
    body: {
        elements: [
            {
                element: 'input',
                type: 'text',
                field: 'firstName',
                label: 'First Name',
                required: true,
                validation: {
                    minLength: 2,
                    maxLength: 50
                }
            },
            {
                element: 'input',
                type: 'email',
                field: 'email',
                label: 'Email',
                required: true
            }
        ]
    }
};

export function MyForm() {
    const handleSubmit = (values) => {
        console.log('Form data:', values);
    };

    return (
        <DynamicForm
            schema={schema}
            onSubmit={handleSubmit}
            submitButtonLabel="Send"
        />
    );
}
```

## Schema Definition

### FormSchema Structure

```typescript
interface FormSchema {
    body: {
        elements: FormElement[];
    };
}
```

### FormElement Properties

| Property | Type | Description |
|----------|------|-------------|
| `element` | `'input' \| 'textarea' \| 'select' \| 'checkbox' \| 'radio' \| 'date' \| 'button'` | Field element type |
| `type` | `string` | HTML input type (text, email, password, number, tel, url, submit, etc.) |
| `field` | `string` | Form field name (for binding to form values) |
| `label` | `string` | Display label for the field |
| `placeholder` | `string` | Placeholder text |
| `required` | `boolean` | Whether the field is required |
| `validation` | `object` | Validation rules |
| `options` | `Array<{label: string, value: string \| number}>` | Options for select/radio fields |
| `className` | `string` | CSS class name |
| `style` | `Record<string, string>` | Inline styles |

### Validation Rules

```typescript
validation: {
    pattern?: string;           // Regex pattern for validation
    minLength?: number;         // Minimum string length
    maxLength?: number;         // Maximum string length
    min?: number | string;      // Minimum numeric value
    max?: number | string;      // Maximum numeric value
    message?: string;           // Custom error message
}
```

## Element Types

### Input
```json
{
    "element": "input",
    "type": "text",
    "field": "username",
    "label": "Username",
    "placeholder": "Enter username",
    "required": true,
    "validation": {
        "minLength": 3,
        "maxLength": 20
    }
}
```

### Email
```json
{
    "element": "input",
    "type": "email",
    "field": "email",
    "label": "Email Address"
}
```

### Number
```json
{
    "element": "input",
    "type": "number",
    "field": "age",
    "label": "Age",
    "validation": {
        "min": 0,
        "max": 150
    }
}
```

### Textarea
```json
{
    "element": "textarea",
    "field": "comments",
    "label": "Comments",
    "placeholder": "Enter your comments..."
}
```

### Select
```json
{
    "element": "select",
    "field": "country",
    "label": "Country",
    "required": true,
    "options": [
        { "label": "United States", "value": "us" },
        { "label": "Canada", "value": "ca" }
    ]
}
```

### Checkbox
```json
{
    "element": "checkbox",
    "field": "agreeToTerms",
    "label": "I agree to the terms"
}
```

### Radio
```json
{
    "element": "radio",
    "field": "contactMethod",
    "label": "Preferred Contact",
    "options": [
        { "label": "Email", "value": "email" },
        { "label": "Phone", "value": "phone" }
    ]
}
```

### Date
```json
{
    "element": "date",
    "field": "dateOfBirth",
    "label": "Date of Birth"
}
```

## Component Props

### DynamicForm

```typescript
interface DynamicFormProps {
    schema: FormSchema;                                      // Form schema definition
    onSubmit?: (values: FormValues) => void | Promise<void>; // Submit handler
    onReset?: () => void;                                    // Reset handler
    submitButtonLabel?: string;                              // Submit button text
    resetButtonLabel?: string;                               // Reset button text
    loading?: boolean;                                       // Show loading state
}
```

## Examples

See `src/features/DynamicForm/DynamicFormExample.tsx` for a comprehensive example with all field types.

## How It Works

1. **Schema Definition**: Define your form as JSON with element definitions
2. **Zod Schema Generation**: `buildZodSchema()` creates a Zod schema from form elements
3. **Default Values**: `getDefaultValues()` initializes form state
4. **Form Rendering**: `DynamicForm` component renders fields using `DynamicField`
5. **Validation**: Each field validates using the generated Zod schema
6. **Submission**: Form data is validated and passed to the `onSubmit` handler

## Extending the System

### Adding a New Field Type

1. Add the type to `types.ts`:
```typescript
export type ElementType = 'input' | 'textarea' | 'custom';
```

2. Add rendering logic in `DynamicField.tsx`:
```typescript
case 'custom':
    return <CustomComponent {...props} />;
```

3. Add validation logic in `schemaValidator.ts`:
```typescript
case 'custom':
    fieldSchema = z.string().custom(...);
    break;
```

## Error Handling

Validation errors are displayed automatically below each field. Errors appear when:
- Field is touched (user interacted with it)
- Validation fails

Custom error messages can be set in the `validation.message` property.

## Type Safety

All components are fully typed with TypeScript. Use the provided type definitions for complete IDE support:

```typescript
import type { FormSchema, FormValues, FormElement } from '@/dynamic-ui/types';
```
