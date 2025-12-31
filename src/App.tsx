import './App.css'
import type { ISchema } from './schema-parser/types/schema';
import type { IDataset } from './schema-parser/types/dataset';
import {
    QueryClientProvider,
} from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Layout } from './components/Layout/Layout';
import { queryClient } from './components/ZustandPlayground/utils/query-client';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});





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
                    <Layout />
                </QueryClientProvider>
            </ThemeProvider>
        </>
    )
}

export default App
