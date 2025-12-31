import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

interface TestListItem {
  id?: string | number;
  primary: string;
  secondary?: string;
}

interface TestListProps {
  items: Array<string | TestListItem>;
  /** initial selected index (default 0) */
  initialIndex?: number;
  /** called when selection changes with the selected id (string | number) */
  onSelectionChange?: (id: string | number) => void;
}

export default function TestList({
  items,
  initialIndex = 0,
  onSelectionChange,
}: TestListProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(
    initialIndex,
  );

  console.log("Rendering TestList with selectedIndex:", selectedIndex);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    id: string | number,
  ) => {
    setSelectedIndex(index);
    onSelectionChange?.(id);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="test list">
        {items.map((it, i) => {
          const item: TestListItem =
            typeof it === 'string' ? { primary: it, id: i } : it;

          return (
            <ListItemButton
              key={item.id ?? i}
              selected={selectedIndex === i}
              onClick={(event) => handleListItemClick(event, i, item.id ?? i)}
            >
              {/* only show icons for the first two items to keep parity with the original example */}
              {i === 0 || i === 1 ? (
                <ListItemIcon>
                  {i === 0 ? <InboxIcon /> : <DraftsIcon />}
                </ListItemIcon>
              ) : null}
              <ListItemText primary={item.primary} secondary={item.secondary} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
    </Box>
  );
}