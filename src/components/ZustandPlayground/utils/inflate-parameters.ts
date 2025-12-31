// import { getValueOnPath } from "./get-value-on-path";
import { useForm } from "@tanstack/react-form";

export function inflateParameters(parameters: Record<string, any>, form: ReturnType<typeof useForm>) {
    const inflated: Record<string, any> = {};
    for (const [key, value] of Object.entries(parameters)) {
        if (typeof value === 'string' && value.startsWith('model.')) {
            inflated[key] = form.getFieldValue(value);
        } else {
            inflated[key] = value;
        }
    }
    return inflated;
}