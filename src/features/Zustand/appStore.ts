// stores/useAppStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { sliceCreators } from './sliceRegistry';

import type { AppStore } from './StoreTypes';

export const useAppStore = create<AppStore>()(
  devtools((...a) => {
    return Object.assign({}, ...sliceCreators.map((creator) => creator(...a)));
  })
);
