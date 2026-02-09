import type { System } from "../process-runner";

export const ConsoleActions: System = {
    log: ({ message }: { message: string }) => {
        console.log("Log Action:", message);
        return { success: true };
    }
};