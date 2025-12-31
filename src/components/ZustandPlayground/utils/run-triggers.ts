import { runActions, type Action } from './run-actions';

export type Trigger = {
  trigger: string;
  actions: Action[];
};

export function runTriggers(triggers: Trigger[], formApi: any, fieldName: string) {
  const matchingTriggers = triggers.filter((t) => t.trigger === fieldName);
  for (const trigger of matchingTriggers) {
    runActions(trigger.actions, formApi);
  }
}
