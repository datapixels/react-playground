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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ZustandPlayground } from './components/ZustandPlayground/ZustandPlayground';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


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
                    "element": "div",
                    "elements": [
                        {
                            "element": "h1",
                            "content": "Welcome to the Schema Parser Demo ${model.firstName} ${model.lastName}"
                        },
                    ],

                },
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
                                            field: "model.firstName", 
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
                                            field: "model.lastName",
                                            label: "Last Name",
                                            placeholder: "Enter your last name",
                                            required: true,
                                            validation: {
                                                minLength: 2,
                                                maxLength: 50,
                                            }
                                        },
                                        {
                                            element: "input",
                                            type: "text",
                                            field: "model.age",
                                            label: "Age",
                                            placeholder: "Enter your age name",
                                            attributes: {
                                                "hidden.if": "model.firstName === 'Gerhard' ? true : false"
                                            },
                                            required: true
                                        },
                                         {
                                            element: "input",
                                            type: "text",
                                            field: "model.gender",
                                            label: "Gender",
                                            placeholder: "Enter your gender name",
                                            attributes: {
                                                "disabled.if": "model.firstName === 'Gerhard' ? true : false"
                                            },
                                            required: true
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
        customActionTriggers: [
            {
                trigger: "model.firstName",
                actions: [
                    {
                        "condition": "model.firstName === 'Gerhard'",
                        "action": "setValue",
                        "path": "model.lastName",
                        "value": "Smith"
                    }
                ]
            }
        ]
    };
    const model: IDataset = {
        firstName: "John",
        lastName: "Doe"
    }

    return (
        <>
             <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <QueryClientProvider client={queryClient}>
                    <Box sx={{
                        width: '100%',
                        maxWidth: 600,
                        margin: '2rem auto',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1
                    }}>

                        {/* <WeatherWidget></WeatherWidget> */}
                        {/* <SchemaParser schema={schema} model={model} componentRegistry={registry}></SchemaParser> */}
                        <ZustandPlayground></ZustandPlayground>
                        <ZustandPlayground></ZustandPlayground>
                    </Box>
                </QueryClientProvider>
            </ThemeProvider>
        </>
    )
}

export default App
