import { Box, Button } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function TanstackQueryRefresh() {
    const queryClient = useQueryClient();

    const { data, isFetching } = useQuery<TodoItem[]>({
        queryKey: ['WorkOrder', "get", "GetWorkOrderCollection"],
        queryFn: getFakeData,
    });

    const itemCreated = async (id: number) => {
        const result = await getSingleFakeData(id);
        queryClient.setQueryData(['WorkOrder', "get", "GetWorkOrderCollection"], (oldData) => {
            if (Array.isArray(oldData)) {
                return [...oldData, result];
            }
            
            return [result];
        });
    };

    const itemUpdated = async (id: number) => {
        const existingItem = queryClient.getQueryData<TodoItem[]>(['WorkOrder', "get", "GetWorkOrderCollection"])?.find(item => item.id === id);
        if (existingItem) {
            const updatedItem = { ...existingItem, completed: true };
            queryClient.setQueryData(['WorkOrder', "get", "GetWorkOrderCollection"], (oldData) => {
                if (Array.isArray(oldData)) {
                    return oldData.map(item => item.id === id ? updatedItem : item);
                }
                return oldData;
            });
        }
    };


   
    const addSingle = async () => {
        await itemCreated( Math.floor(Math.random() * 1000) );
    };

    const updateSingle = async (id: number) => {
        await itemUpdated(id);
    }

    return (
        <Box>
            {isFetching ? (
                <div>Loading...</div>
            )
                : (
                    <ul>
                        {data?.map((todo) => (
                            <li key={todo.id}>
                                {todo.title} {todo.completed ? '(Completed)' : ''}
                                <Button onClick={() => updateSingle(todo.id)} variant="outlined" size="small" style={{ marginLeft: '10px' }}>
                                    Mark as Completed
                                </Button>
                            </li>
                        ))}
                    </ul>
                )

            }




            <Button onClick={addSingle} variant="contained" color="primary">
                Add Single
            </Button>
        </Box>
    );
}



type TodoItem = {
    id: number;
    title: string;
    completed: boolean;
};

function getFakeData(args: unknown): Promise<TodoItem[]> {
    console.log(args)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: 'Learn React', completed: false },
                { id: 2, title: 'Learn TypeScript', completed: false },
                { id: 3, title: 'Build Awesome Apps', completed: false },
            ]);
        }, 1000);
    });
}

function getSingleFakeData(id: number): Promise<TodoItem> {
    return new Promise((resolve) => {
            resolve({ id: id, title: `Task ${id}`, completed: false });
    });
}