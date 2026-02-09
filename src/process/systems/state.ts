import type { System, SystemStepResult } from "../process-runner";
import type { AnyFormApi } from "@tanstack/react-form";

export const StateActions: System = {
    setValue: ({ form, path, value }: { form: AnyFormApi, path: string, value: any }): SystemStepResult => {
        console.log("StateActions.setValue called with:", { path, value, form });
        if (!form) return { success: false };
        form.setFieldValue(path, value);
        console.log(`Set form path "${path}" to:`, value);
        return { success: true };
    }
};