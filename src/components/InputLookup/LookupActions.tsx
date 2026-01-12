import { IconButton, InputAdornment } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

interface LookupActionsProps {
  lookupTemplate?: any;
  treeLookupTemplate?: any;
  onLookupClick: () => void;
  onTreeLookupClick: () => void;
}

export function LookupActions({
  lookupTemplate,
  treeLookupTemplate,
  onLookupClick,
  onTreeLookupClick,
}: LookupActionsProps) {
  if (!lookupTemplate && !treeLookupTemplate) {
    return null;
  }

  return (
    <InputAdornment position="end">
      {lookupTemplate && (
        <IconButton
          size="small"
          onClick={onLookupClick}
          edge="end"
          title="Open lookup dialog"
        >
          <GridOnIcon />
        </IconButton>
      )}
      {treeLookupTemplate && (
        <IconButton
          size="small"
          onClick={onTreeLookupClick}
          edge="end"
          title="Open tree lookup dialog"
        >
          <AccountTreeIcon />
        </IconButton>
      )}
    </InputAdornment>
  );
}
