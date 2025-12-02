import type { StateCreator } from 'zustand';

export interface Notification {
    code: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
}

export interface NoticationState {
    notifications: Notification[] | null;
    setNotifications: (notifications: Notification[]) => void;
}

export const createNotificationsSlice: StateCreator<NoticationState> = (set) => ({
    notifications: null,
    setNotifications: (notifications: Notification[]) => set({ notifications }),
});