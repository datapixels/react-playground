/**
 * Quick Integration Guide - How to use the Dynamic Form System
 */

import { DynamicForm } from '../dynamic-ui';
import type { FormSchema, FormValues } from '../dynamic-ui/types';

/**
 * Step 1: Import the necessary modules
 */

/**
 * Step 2: Define your form schema (can be loaded from JSON file or API)
 */
const myFormSchema: FormSchema = {
    body: {
        elements: [
            {
                element: 'input',
                type: 'text',
                field: 'productName',
                label: 'Product Name',
                placeholder: 'Enter product name',
                required: true,
                validation: {
                    minLength: 3,
                    maxLength: 100
                }
            },
            {
                element: 'textarea',
                field: 'description',
                label: 'Description',
                placeholder: 'Describe your product...',
                required: false,
                validation: {
                    maxLength: 1000
                }
            },
            {
                element: 'input',
                type: 'number',
                field: 'price',
                label: 'Price',
                required: true
            },
            {
                element: 'select',
                field: 'category',
                label: 'Category',
                required: true,
                options: [
                    { label: 'Electronics', value: 'electronics' },
                    { label: 'Clothing', value: 'clothing' },
                    { label: 'Food', value: 'food' }
                ]
            },
            {
                element: 'checkbox',
                field: 'inStock',
                label: 'Product is in stock',
                required: false
            }
        ]
    }
};

/**
 * Step 3: Use DynamicForm in your component
 */
export function ProductForm() {
    const handleFormSubmit = async (values: FormValues) => {
        console.log('Form submitted with data:', values);
        // You can send this data to your API, store it, etc.
        // Example:
        // const response = await fetch('/api/products', {
        //   method: 'POST',
        //   body: JSON.stringify(values)
        // });
    };

    const handleFormReset = () => {
        console.log('Form reset');
    };

    return (
        <DynamicForm
            schema={myFormSchema}
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
            submitButtonLabel="Create Product"
            resetButtonLabel="Clear Form"
        />
    );
}

/**
 * ADDITIONAL TIPS:
 *
 * 1. Load schema from JSON file:
 *    import schema from '@/dynamic-ui/schema.json';
 *
 * 2. Load schema from API:
 *    const [schema, setSchema] = useState<FormSchema | null>(null);
 *    useEffect(() => {
 *      fetch('/api/form-schema')
 *        .then(r => r.json())
 *        .then(setSchema);
 *    }, []);
 *    return schema ? <DynamicForm schema={schema} /> : <div>Loading...</div>;
 *
 * 3. Conditional fields:
 *    // Filter elements based on business logic
 *    const filteredSchema = {
 *      ...schema,
 *      body: {
 *        elements: schema.body.elements.filter(el => ...)
 *      }
 *    };
 *
 * 4. Custom styling:
 *    Add 'className' or 'style' properties to form elements
 *
 * 5. Dynamic options:
 *    Fetch options from API and update schema before rendering
 */
