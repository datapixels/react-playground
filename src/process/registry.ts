import { ConsoleActions } from "./systems/console";
import { MathActions } from "./systems/math";
import { ApiActions } from "./systems/api";
import { StateActions } from "./systems/state";

export const Systems = {
    console: ConsoleActions,
    math: MathActions,
    state: StateActions,
    api: ApiActions,
    // Add others here...
};