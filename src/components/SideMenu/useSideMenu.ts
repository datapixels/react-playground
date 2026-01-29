import type React from "react"
import { create } from "zustand"


export type SlideOutItem = {
    key: string,
    content: React.ReactNode
}

export type SlideOutType = {
    stack: SlideOutItem[],
    push: (node: React.ReactNode) => void
    pop: ()=> void
}

export const useSideMenu = create<SlideOutType>((set) => ({
    stack: [],
    push: (node: React.ReactNode) =>
        set((state) => ({ stack: [...state.stack, { content: node, key: globalThis.crypto.randomUUID() }] })),
    pop: () => set((state) => ({ stack: state.stack.slice(0, -1) }))
}))