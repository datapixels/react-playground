import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppStore } from "./appStore";

export function Workspace() {
    const profileSlice = useAppStore((state) => state.profiles);

    const addProfile = () => {
        const newProfile = { id: Date.now(), name: `Profile ${Date.now()}`, operationalRoleId: 1 };
        useAppStore.getState().addProfile?.(newProfile);
    }

    const deleteProfile = (profileId: number) => {
        useAppStore.getState().deleteProfile?.(profileId);
    }

    return (
        <div>
            <h1>Workspace</h1>
            <Button variant="contained" onClick={addProfile}>Add Profile</Button>
            <ul>
                {profileSlice?.map((profile) => (
                    <li key={profile.id}>{profile.name} <IconButton  onClick={() => deleteProfile(profile.id)}><DeleteIcon /></IconButton></li>
                ))}
            </ul>
        </div>
    );
}
   