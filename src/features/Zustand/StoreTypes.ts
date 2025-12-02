import type { NoticationState } from './slices/notificationSlice';
import type { ProfileState } from './slices/profileSlice';

export type AppStore = NoticationState & ProfileState;