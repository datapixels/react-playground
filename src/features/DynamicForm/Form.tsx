import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
// Form components that pre-bind events from the form hook; check our "Form Composition" guide for more
import { TextField, Button, Box, Tabs, Tab } from '@mui/material'
// We also support Valibot, ArkType, and any other standard schema library
import { z } from 'zod'
import { useState } from 'react'

const { fieldContext, formContext } = createFormHookContexts()

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
const { useAppForm } = createFormHook({
    fieldComponents: {
        TextField,
    },
    formComponents: {
        Button,
    },
    fieldContext,
    formContext,
})

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export function SiteForm() {
    const form = useAppForm({
        defaultValues: {
            code: 'ABC123',
            description: "Test description",
        },
        validators: {
            // Pass a schema or function to validate
            onChange: z.object({
                code: z.string(),
                description: z.string()
            }),
        },
        onSubmit: ({ value }) => {
            // Do something with form data
            alert(JSON.stringify(value, null, 2))
        },
    })

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            <h1>Personal Information</h1>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                </Tabs>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
                <form.AppField
                name="code"
                children={(field) => (
                    <field.TextField
                        label="Code"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                )}
            />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={2}>
                <form.AppField
                name="description"
                children={(field) => (
                    <field.TextField
                        label="Description"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                )}
            />
            </CustomTabPanel>
            <form.AppForm>
                <form.Button type='submit' variant="contained" color="primary">Submit</form.Button>
            </form.AppForm>
        </form>
    )
}
