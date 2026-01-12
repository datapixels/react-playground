import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLookupData } from './lookup-api';

export function useInputLookup(remote: string, action: string) {
  const [open, setOpen] = useState(false);

  const { data: options = [], isLoading } = useQuery({
    queryKey: ['lookup', remote, action],
    queryFn: () => fetchLookupData(remote, action),
    enabled: open, // Only fetch when dropdown is opened
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    options,
    isLoading,
    handleOpen,
    handleClose,
  };
}
