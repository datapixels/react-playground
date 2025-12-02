import type { IJsonElement } from "./json-element";
import { useForm } from "@tanstack/react-form";

export type IProviderProps = {
    element: IJsonElement;
    form: ReturnType<typeof useForm>;
}