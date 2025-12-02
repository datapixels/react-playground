import CssBaseline from '@mui/material/CssBaseline';
import './App.css'
import { Box } from '@mui/material';
import { SchemaParser } from './schema-parser/schema-parser';
import type { ISchema } from './schema-parser/types/schema';
import { registry } from './schema-parser/component-registry';
import type { IDataset } from './schema-parser/types/dataset';
import { WeatherWidget } from './components/WeatherWidget/WeatherWidget';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
        },
    },
})


function App() {
    const schema: ISchema = {
        body: {
            elements: [
                {
                    element: "tabsheet",
                    elements: [
                        {
                            title: "Header",
                            element: 'tab',
                            elements: [
                                {
                                    element: "group",
                                    title: "User Information",
                                    elements: [
                                        {
                                            element: "input",
                                            type: "text",
                                            field: "firstName",
                                            label: "First Name",
                                            placeholder: "Enter your first name",
                                            required: true,
                                            validation: {
                                                minLength: 2,
                                                maxLength: 50,
                                            }
                                        },
                                        {
                                            element: "input",
                                            type: "text",
                                            field: "lastName",
                                            label: "Last Name",
                                            placeholder: "Enter your last name",
                                            required: true,
                                            validation: {
                                                minLength: 2,
                                                maxLength: 50,
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "Tasks",
                            element: 'tab',

                        }
                    ]

                },
            ],
        },
    };
    const model: IDataset = {
        firstName: "John",
        lastName: "Doe"
    }

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <CssBaseline />
                <Box sx={{
                    width: '100%',
                    maxWidth: 600,
                    margin: '2rem auto',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                }}>

                    <WeatherWidget></WeatherWidget>
                    {/* <SchemaParser schema={schema} model={model} componentRegistry={registry}></SchemaParser> */}
                </Box>
            </QueryClientProvider>
        </>
    )
}

export default App
