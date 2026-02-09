import type { System } from "../process-runner";

export const ApiActions: System = {
    call: ({ remote, action, parameters }: { remote: string, action: string, parameters: Record<string, any> }) => {
        console.log(`Calling API ${remote} with action ${action} and parameters`, parameters);
        // In a real scenario, this might be async, but following your synchronous architecture:
        return { success: true, data: { status: "fetched", payload: {} } };
    }
};