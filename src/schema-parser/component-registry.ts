import type { IComponentRegistry } from "./types/json-element";
import { TabProvider } from "./providers/tab-provider";
import { GroupProvider } from "./providers/group-provider";
import { InputProvider } from "./providers/input-provider";

export const registry: IComponentRegistry = {
  tabsheet: TabProvider,
  group: GroupProvider,
  input: InputProvider,
};