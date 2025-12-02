/**
 * Advanced Dynamic UI Example - Demonstrates tabs, nested elements, and complex layouts
 * Uses DynamicUIRenderer for rendering any UI structure
 */

import { useState } from 'react';
import { DynamicUIRenderer } from '../../dynamic-ui/DynamicUIRenderer';
import type { UISchema, FormValues } from '../../dynamic-ui/types';
import { Box, Alert } from '@mui/material';

// Example schema with tabs and nested elements
const advancedSchema: UISchema = {
    body: {
        elements: [
            {
                element: 'heading',
                title: 'Dashboard',
                variant: 'h4',
                sx: { mb: 3 },
            },
            {
                element: 'tabs',
                defaultValue: 0,
                children: [
                    {
                        element: 'tab',
                        label: 'Personal Info',
                        tabValue: 0,
                        children: [
                            {
                                element: 'stack',
                                direction: 'column',
                                gap: 2,
                                children: [
                                    {
                                        element: 'input',
                                        type: 'text',
                                        field: 'firstName',
                                        label: 'First Name',
                                        placeholder: 'Enter your first name',
                                        required: true,
                                    },
                                    {
                                        element: 'input',
                                        type: 'text',
                                        field: 'lastName',
                                        label: 'Last Name',
                                        placeholder: 'Enter your last name',
                                        required: true,
                                    },
                                    {
                                        element: 'input',
                                        type: 'email',
                                        field: 'email',
                                        label: 'Email',
                                        placeholder: 'your.email@example.com',
                                        required: true,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        element: 'tab',
                        label: 'Contact Details',
                        tabValue: 1,
                        children: [
                            {
                                element: 'stack',
                                direction: 'column',
                                gap: 2,
                                children: [
                                    {
                                        element: 'input',
                                        type: 'tel',
                                        field: 'phone',
                                        label: 'Phone Number',
                                        placeholder: '+1 (555) 000-0000',
                                    },
                                    {
                                        element: 'textarea',
                                        field: 'address',
                                        label: 'Address',
                                        placeholder: 'Enter your address',
                                    },
                                    {
                                        element: 'select',
                                        field: 'country',
                                        label: 'Country',
                                        options: [
                                            { label: 'United States', value: 'us' },
                                            { label: 'Canada', value: 'ca' },
                                            { label: 'United Kingdom', value: 'uk' },
                                            { label: 'Australia', value: 'au' },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        element: 'tab',
                        label: 'Preferences',
                        tabValue: 2,
                        children: [
                            {
                                element: 'stack',
                                direction: 'column',
                                gap: 2,
                                children: [
                                    {
                                        element: 'checkbox',
                                        field: 'subscribe',
                                        label: 'Subscribe to newsletter',
                                    },
                                    {
                                        element: 'radio',
                                        field: 'contactMethod',
                                        label: 'Preferred Contact Method',
                                        options: [
                                            { label: 'Email', value: 'email' },
                                            { label: 'Phone', value: 'phone' },
                                            { label: 'SMS', value: 'sms' },
                                        ],
                                    },
                                    {
                                        element: 'select',
                                        field: 'language',
                                        label: 'Language',
                                        options: [
                                            { label: 'English', value: 'en' },
                                            { label: 'Spanish', value: 'es' },
                                            { label: 'French', value: 'fr' },
                                            { label: 'German', value: 'de' },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        element: 'tab',
                        label: 'Advanced Settings',
                        tabValue: 3,
                        children: [
                            {
                                element: 'card',
                                title: 'API Configuration',
                                description: 'Manage your API settings',
                                children: [
                                    {
                                        element: 'stack',
                                        direction: 'column',
                                        gap: 2,
                                        children: [
                                            {
                                                element: 'input',
                                                type: 'text',
                                                field: 'apiKey',
                                                label: 'API Key',
                                                placeholder: 'Enter your API key',
                                            },
                                            {
                                                element: 'input',
                                                type: 'url',
                                                field: 'apiEndpoint',
                                                label: 'API Endpoint',
                                                placeholder: 'https://api.example.com',
                                            },
                                            {
                                                element: 'checkbox',
                                                field: 'enableLogging',
                                                label: 'Enable Debug Logging',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                element: 'divider',
                sx: { my: 3 },
            },
            {
                element: 'stack',
                direction: 'row',
                gap: 2,
                sx: { justifyContent: 'flex-end' },
                children: [
                    {
                        element: 'button',
                        type: 'submit',
                        label: 'Save Changes',
                    },
                    {
                        element: 'button',
                        type: 'reset',
                        label: 'Reset',
                    },
                ],
            },
        ],
    },
};

export function AdvancedDynamicUIExample() {
    const [formValues, setFormValues] = useState<FormValues>({});
    const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

    const handleFieldChange = (fieldName: string, value: any) => {
        setFormValues((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const handleAction = (action: string, payload?: any) => {
        console.log(`Action: ${action}`, payload);
        if (action === 'submit') {
            setSubmittedData(formValues);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 4 }}>
                <DynamicUIRenderer
                    element={{
                        element: 'container',
                        children: advancedSchema.body?.elements,
                    }}
                    formValues={formValues}
                    onFieldChange={handleFieldChange}
                    onAction={handleAction}
                />
            </Box>

            {submittedData && (
                <Box sx={{ mt: 4 }}>
                    <Alert severity="success">Form submitted successfully!</Alert>
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <pre style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {JSON.stringify(submittedData, null, 2)}
                        </pre>
                    </Box>
                </Box>
            )}

            <Box sx={{ mt: 4, p: 2, bgcolor: 'blue.50', borderRadius: 1 }}>
                <strong>Current Form State:</strong>
                <pre style={{ maxHeight: '200px', overflowY: 'auto', fontSize: '12px' }}>
                    {JSON.stringify(formValues, null, 2)}
                </pre>
            </Box>
        </Box>
    );
}
