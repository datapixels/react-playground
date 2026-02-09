import type { AnyFormApi } from "@tanstack/react-form";
import { Systems } from "./registry";
import { resolveArgs } from "./resolve-parameters";

export type SystemStepResult = { success: boolean; data?: any };
export type SystemAction = (args: any) => Promise<SystemStepResult>;

export type ProcessStep = {
  system: string;
  action: string;
  args: Record<string, any>;
  target?: string;
  next_step?: string;
  pass_step?: string;
  fail_step?: string;
};

export type ProcessDefinition = {
  steps: Record<string, ProcessStep>;
};

export async function runProcess(process: ProcessDefinition, form?: AnyFormApi) {
  let stepKey: string | undefined = "start";
  const store: Record<string, any> = {};

  while (stepKey) {
    const step: ProcessStep | undefined = process.steps[stepKey];
    if (!step) break;

    const exec: SystemAction = (Systems as any)[step.system]?.[step.action];
    
    if (!exec) throw new Error(`Action ${step.system}.${step.action} not found`);

    const resolved = resolveArgs(step.args, store) as Record<string, unknown>;
    const { success, data } = await exec({ ...resolved, form });
    const saveTo = step.target || step.args.target;
    if (success && saveTo) {
      if (typeof saveTo === "string" && saveTo.includes(".")) {
        const parts = saveTo.split(".");
        let current = store;
        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          if (!current[part]) current[part] = {};
          current = current[part];
        }
        current[parts[parts.length - 1]] = data;
      } else {
        store[saveTo] = data;
      }
    }

    stepKey = success ? (step.pass_step || step.next_step) : step.fail_step;
  }

  return store;
}