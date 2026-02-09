import type { System } from "../process-runner";

export const MathActions: System = {
    add: ({ a, b }: { a: number; b: number }) => {
        const result = a + b;
        return { success: true, data: result };
    }
};