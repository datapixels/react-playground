import { z } from 'zod';

export type ExtractDataType<TDefinition> = {
    [KField in keyof TDefinition]: TDefinition[KField] extends z.ZodType<infer ZodOutput> ? ZodOutput : never;
}

// Generic performAction function
export const performAction = async <TDefinition extends Record<string, z.ZodType>>(
    baseUrl: string,
    actionName: string,
    definition: TDefinition,
    data: ExtractDataType<TDefinition>
): Promise<void> => {
    // Validate data against the definition
    const schema = z.object(definition);
    const validatedData = schema.parse(data);
    
    // Make the API call
    console.log(`Performing ${actionName} at ${baseUrl} with data:`, validatedData);
    
    // Example: await fetch(`${baseUrl}/${actionName}`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(validatedData)
    // });
}

export const createAction = <T extends Record<string, z.ZodType>>(
    baseUrl: string,
    actionName: string,
    definition: T
) => (data: ExtractDataType<T>) => performAction(baseUrl, actionName, definition, data);
