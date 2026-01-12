import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import type { InputLookupProps } from './InputLookup.types';
import { useInputLookup } from './useInputLookup';
import { LookupOptionComponent } from './LookupOption';
import { LookupActions } from './LookupActions';

export function InputLookup({ 
  onChange, 
  remote,
  action,
  idField = 'id',
  codeField = 'code',
  descriptionField = 'description',
  label = 'Select',
  lookupTemplate,
  treeLookupTemplate,
}: InputLookupProps) {
  const { open, options, isLoading, handleOpen, handleClose } = useInputLookup(remote, action);

  const handleLookupClick = () => {
    // TODO: Open lookup dialog
    console.log('Open lookup dialog with template:', lookupTemplate);
  };

  const handleTreeLookupClick = () => {
    // TODO: Open tree lookup dialog
    console.log('Open tree lookup dialog with template:', treeLookupTemplate);
  };

  const getOptionLabel = (option: any) => {
    return option[codeField] || '';
  };

  const handleChange = (_event: any, value: any) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option[idField] === value[idField]}
      getOptionLabel={getOptionLabel}
      options={options}
      loading={isLoading}
      onChange={handleChange}
      renderOption={(props, option) => (
        <LookupOptionComponent
          key={option[idField]}
          props={props}
          option={option}
          codeField={codeField}
          descriptionField={descriptionField}
        />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                  <LookupActions
                    lookupTemplate={lookupTemplate}
                    treeLookupTemplate={treeLookupTemplate}
                    onLookupClick={handleLookupClick}
                    onTreeLookupClick={handleTreeLookupClick}
                  />
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}

export default InputLookup;
