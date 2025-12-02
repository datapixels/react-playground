/**
 * Example usage of DynamicForm component with various field types
 */

import { useState } from 'react';
import { DynamicForm } from '../../dynamic-ui';
import type { FormSchema, FormValues } from '../../dynamic-ui/types';
import { Box, Alert } from '@mui/material';

// Example schema with various input types
const exampleSchema: FormSchema = {
    body: {
        elements: [
            {
                element: 'input',
                type: 'text',
                field: 'firstName',
                label: 'First Name',
                placeholder: 'Enter your first name',
                required: true,
                validation: {
                    minLength: 2,
                    maxLength: 50,
                },
            },
            {
                element: 'input',
                type: 'text',
                field: 'lastName',
                label: 'Last Name',
                placeholder: 'Enter your last name',
                required: true,
                validation: {
                    minLength: 2,
                    maxLength: 50,
                },
            },
            {
                element: 'input',
                type: 'email',
                field: 'email',
                label: 'Email Address',
                placeholder: 'your.email@example.com',
                required: true,
            },
            {
                element: 'input',
                type: 'tel',
                field: 'phone',
                label: 'Phone Number',
                placeholder: '+1 (555) 000-0000',
                required: false,
            },
            {
                element: 'textarea',
                field: 'message',
                label: 'Message',
                placeholder: 'Enter your message here...',
                required: false,
                validation: {
                    maxLength: 500,
                },
            },
            {
                element: 'select',
                field: 'country',
                label: 'Country',
                required: true,
                options: [
                    { label: 'United States', value: 'us' },
                    { label: 'Canada', value: 'ca' },
                    { label: 'United Kingdom', value: 'uk' },
                    { label: 'Australia', value: 'au' },
                ],
            },
            {
                element: 'radio',
                field: 'contactMethod',
                label: 'Preferred Contact Method',
                required: true,
                options: [
                    { label: 'Email', value: 'email' },
                    { label: 'Phone', value: 'phone' },
                    { label: 'SMS', value: 'sms' },
                ],
            },
            {
                element: 'checkbox',
                field: 'subscribe',
                label: 'Subscribe to our newsletter',
                required: false,
            },
            {
                element: 'date',
                field: 'dateOfBirth',
                label: 'Date of Birth',
                required: false,
            },
        ],
    },
};

export function DynamicFormExample() {
    const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values: FormValues) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('Form submitted with values:', values);
            setSubmittedData(values);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <DynamicForm
                schema={exampleSchema}
                onSubmit={handleSubmit}
                submitButtonLabel="Submit Form"
                resetButtonLabel="Clear"
                loading={isLoading}
            />

            {submittedData && (
                <Box sx={{ mt: 4 }}>
                    <Alert severity="success">Form submitted successfully!</Alert>
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
