import type { StateCreator } from 'zustand';

export interface Profile {
    id: number;
    name: string;
    operationalRoleId: number;
}

export interface ProfileState {
    profiles: Profile[] | null;
    setProfiles: (profiles: Profile[]) => void;
    addProfile?: (profile: Profile) => void;
    deleteProfile?: (profileId: number) => void;
}

export const createProfilesSlice: StateCreator<ProfileState> = (set) => ({
    profiles: null,
    setProfiles: (profiles: Profile[]) => set({ profiles }),
    addProfile: (profile: Profile) => {
        set((state) => ({
            profiles: state.profiles ? [...state.profiles, profile] : [profile],
        }))
    },
    deleteProfile: (profileId: number) => {
        set((state) => ({
            profiles: state.profiles ? state.profiles.filter(p => p.id !== profileId) : null,
        }))
    },
});