import { useEffect } from "react"
import { useDynamicSetStore } from "../DynamicSetExample"




export function useZustandTrigger(
    triggers: Trigger[],
    callback: (action: Action) => void
) {
    useEffect(() => {

        const subscriptions: Array<() => void> = [];

        for (const trigger of triggers) {
            const unsubscribe = useDynamicSetStore.subscribe(
                (state, previousState) => {
                    const current = state.actions.getValueOnPath(state, trigger.trigger);
                    const previous = previousState.actions.getValueOnPath(previousState, trigger.trigger);
                    if (current === previous) return undefined
                    for (const action of trigger.actions) {
                        callback(action);
                    }
                }
            );
            subscriptions.push(unsubscribe);
        }

        const unsubscribeAll = () => {
            for (const unsubscribe of subscriptions) {
                unsubscribe();
            }
        };

        return unsubscribeAll;

    }, [triggers, callback])
}
