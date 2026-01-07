import { getValueOnPath } from './get-value-on-path';

export type Action = {
    action: 'setValue' | 'setValidation' | string;
    value?: string;
    path?: string;
};

/**
 * Execute an array of actions against the form api
 */
export function runActions(actions: Action[], formApi: any) {
    for (const action of actions) {
        if (action.action === 'setValue') {
            if (action.value === undefined || action.path === undefined) {
                throw new Error('setValue action requires value and path');
            }
            const value = getValueOnPath(formApi.state.values, action.value) ?? action.value;
            formApi.setFieldValue(action.path as any, value);
        }

        if (action.action.startsWith('model.')) {
            console.log('IMPORTANT Running model action:', action.action);
            const path = action.action;
            // If the action explicitly calls a function (e.g. "model.foo.load()"), let getValueOnPath evaluate it
            if (path.endsWith('()')) {
                return getValueOnPath(formApi.state.values, path);
            }
        }

        // future action types (e.g. setValidation) can be handled here
    }
}
