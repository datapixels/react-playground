import { ListItem, ListItemText } from '@mui/material';
import type { LookupOption } from './InputLookup.types';

interface LookupOptionComponentProps {
  props: any;
  option: LookupOption;
  codeField: string;
  descriptionField: string;
}

export function LookupOptionComponent({
  props,
  option,
  codeField,
  descriptionField,
}: LookupOptionComponentProps) {
  const { key, ...otherProps } = props as any;
  
  return (
    <ListItem key={key} {...otherProps}>
      <ListItemText
        primary={option[codeField]}
        secondary={option[descriptionField]}
      />
    </ListItem>
  );
}
