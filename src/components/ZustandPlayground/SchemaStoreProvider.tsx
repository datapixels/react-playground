import { createStore, useStore } from 'zustand'
import type { StoreApi } from 'zustand';
import React, { useState } from 'react'
import type { ISchema } from '../../schema-parser/types/schema';
import type { IDataset } from '../../schema-parser/types/dataset';


export type SchemaStoreActions = {
    setFirstName: (firstName: string) => void
}

export type SchemaStoreState = {
    model: IDataset
    schema: ISchema
    actions: SchemaStoreActions
}

const SchemaStoreContext = React.createContext<StoreApi<SchemaStoreState> | null>(null);

export function SchemaStoreProvider({ children, initiaValues }: { children: React.ReactNode, initiaValues?: Partial<SchemaStoreState> }) {
    const [store] = useState(() =>
        createStore<SchemaStoreState>((set) => ({
            model: initiaValues?.model || {},
            schema: initiaValues?.schema || { body: { elements: [] } },
            actions: {
                setFirstName: (firstName: string) => set((state) => ({
                    model: { ...state.model, firstName }
                })),
            }
        }))
    );

    return (
        <SchemaStoreContext.Provider value={store}>
            {children}
        </SchemaStoreContext.Provider>
    );
}


export const useSchemaStore = (selector: (state: SchemaStoreState) => unknown) => {
  const store = React.useContext(SchemaStoreContext)
  if (!store) {
    throw new Error('Missing SchemaStoreProvider')
  }
  return useStore(store, selector)
}