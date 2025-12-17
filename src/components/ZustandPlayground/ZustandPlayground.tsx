import { SchemaStoreProvider, useSchemaStore, type SchemaStoreActions } from './SchemaStoreProvider'

const initiaValues = {
    model: {
        firstName: 'John',
        lastName: 'Doe'
    }
}


function SubComponent() {
        const firstName = useSchemaStore((state) => state.model.firstName) as string
    const {setFirstName} = useSchemaStore((state)=> state.actions) as SchemaStoreActions;

    return (
        <>
        <div>
            {firstName}
        </div>
        <button onClick={() => {
            setFirstName('Gerhard');
        }}>Set First Name to Gerhard</button>
        </>
        
    )
}


export function ZustandPlayground() {


    return (
        <SchemaStoreProvider initiaValues={initiaValues}>
        
            <SubComponent></SubComponent>
        </SchemaStoreProvider>
    )
}