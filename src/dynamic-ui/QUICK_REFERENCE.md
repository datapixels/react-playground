# Quick Reference - Dynamic UI System

## 🚀 Quick Start

### Render a Dashboard with Tabs
```typescript
import { DynamicUIRenderer } from '@/dynamic-ui';
import type { UISchema } from '@/dynamic-ui/types';

const dashboard: UISchema = {
    body: {
        elements: [
            {
                element: 'tabs',
                defaultValue: 0,
                children: [
                    {
                        element: 'tab',
                        label: 'Tab 1',
                        tabValue: 0,
                        children: [
                            {
                                element: 'card',
                                title: 'Content',
                                children: [
                                    {
                                        element: 'text',
                                        content: 'Hello!'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export function Dashboard() {
    const [values, setValues] = useState({});
    
    return (
        <DynamicUIRenderer
            element={{ element: 'container', children: dashboard.body?.elements }}
            formValues={values}
            onFieldChange={(f, v) => setValues(s => ({...s, [f]: v}))}
        />
    );
}
```

## Element Types Reference

### Containers
- `container` - Responsive wrapper
- `box` - Basic box
- `stack` - Flex layout (row/col)
- `grid` - CSS Grid

### UI
- `tabs` / `tab` - Tabbed interface
- `card` - Card component
- `accordion` - Collapsible
- `paper` - Paper surface
- `heading` - Heading text
- `text` - Text content
- `divider` - Divider line
- `chip` - Chip badge

### Forms
- `input` - Text input
- `textarea` - Multi-line
- `select` - Dropdown
- `checkbox` - Toggle
- `radio` - Choice
- `date` - Date picker
- `button` - Button

## Nesting Pattern

```typescript
{
    element: 'tabs',
    children: [
        {
            element: 'tab',
            label: 'Tab 1',
            children: [
                {
                    element: 'stack',
                    children: [
                        { element: 'input', type: 'text', field: 'name' },
                        { element: 'input', type: 'email', field: 'email' }
                    ]
                }
            ]
        }
    ]
}
```

## Layout Props

```typescript
// Stack
{
    element: 'stack',
    direction: 'row' | 'column',  // default: 'column'
    gap: 2,                        // spacing
    children: [...]
}

// Grid
{
    element: 'grid',
    minColWidth: 300,              // min column width
    gap: 2,
    children: [...]
}
```

## Styling Props

```typescript
{
    element: 'box',
    sx: { p: 2, bgcolor: 'blue' },           // MUI sx prop
    style: { color: 'red' },                 // CSS
    className: 'my-class'                    // CSS class
}
```

## Form Elements

```typescript
// Input
{
    element: 'input',
    type: 'text' | 'email' | 'number' | 'tel' | 'date',
    field: 'fieldName',
    label: 'Label',
    placeholder: 'Hint...',
    required: true,
    validation: {
        minLength: 2,
        maxLength: 50,
        pattern: '^[a-z]+$',
        message: 'Custom error'
    }
}

// Select
{
    element: 'select',
    field: 'country',
    label: 'Country',
    options: [
        { label: 'USA', value: 'us' },
        { label: 'Canada', value: 'ca' }
    ]
}

// Radio
{
    element: 'radio',
    field: 'choice',
    label: 'Pick one',
    options: [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' }
    ]
}

// Checkbox
{
    element: 'checkbox',
    field: 'agree',
    label: 'I agree'
}
```

## Component Examples

### Tab Navigation
```typescript
{
    element: 'tabs',
    defaultValue: 0,
    children: [
        {
            element: 'tab',
            label: 'First',
            tabValue: 0,
            children: [
                { element: 'text', content: 'First tab content' }
            ]
        },
        {
            element: 'tab',
            label: 'Second',
            tabValue: 1,
            children: [
                { element: 'text', content: 'Second tab content' }
            ]
        }
    ]
}
```

### Card with Content
```typescript
{
    element: 'card',
    title: 'My Card',
    description: 'Card subtitle',
    children: [
        {
            element: 'stack',
            direction: 'column',
            gap: 2,
            children: [
                { element: 'text', content: 'Some content' },
                { element: 'input', type: 'text', field: 'name' }
            ]
        }
    ]
}
```

### Grid Layout
```typescript
{
    element: 'grid',
    minColWidth: 250,
    gap: 2,
    children: [
        { element: 'card', title: 'Card 1', children: [...] },
        { element: 'card', title: 'Card 2', children: [...] },
        { element: 'card', title: 'Card 3', children: [...] }
    ]
}
```

## Handler Functions

```typescript
<DynamicUIRenderer
    element={schema}
    formValues={values}
    
    // Called when field value changes
    onFieldChange={(fieldName, value) => {
        console.log(`${fieldName} = ${value}`);
        setValues(prev => ({
            ...prev,
            [fieldName]: value
        }));
    }}
    
    // Called for custom actions
    onAction={(actionName, payload) => {
        console.log(`Action: ${actionName}`, payload);
    }}
/>
```

## Files Location

- **Component**: `src/dynamic-ui/DynamicUIRenderer.tsx`
- **Form Component**: `src/dynamic-ui/DynamicForm.tsx`
- **Types**: `src/dynamic-ui/types.ts`
- **Examples**: 
  - `src/features/DynamicForm/DynamicFormExample.tsx`
  - `src/features/DynamicForm/AdvancedDynamicUIExample.tsx`

## Building

```bash
pnpm build    # Build for production
pnpm dev      # Dev server
```

---

**Status**: ✅ All files compile successfully
**Build**: ✅ Production ready
