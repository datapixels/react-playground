import { createNotificationsSlice } from './slices/notificationSlice';
import { createProfilesSlice } from './slices/profileSlice';

export const sliceCreators = [
  createProfilesSlice,
  createNotificationsSlice,
];