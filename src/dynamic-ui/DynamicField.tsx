/**
 * Individual field renderer for different form element types
 */

import React from 'react';
import {
    TextField,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormHelperText,
    Box,
} from '@mui/material';
import type { FormElement, FormValues } from './types';

interface DynamicFieldProps {
    element: FormElement;
    value: FormValues[string];
    onChange: (value: string | number | boolean) => void;
    onBlur?: () => void;
    error?: string;
}

export const DynamicField: React.FC<DynamicFieldProps> = ({
    element,
    value,
    onChange,
    onBlur,
    error,
}) => {
    const { element: elementType, type, label, placeholder, options, required, style } = element;

    const commonProps = {
        error: !!error,
        helperText: error,
        fullWidth: true,
        margin: 'normal' as const,
        size: 'small' as const,
    };

    switch (elementType) {
        case 'input':
            return (
                <TextField
                    {...commonProps}
                    type={type || 'text'}
                    label={label}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    required={required}
                    inputProps={{
                        ...(element.validation?.maxLength && {
                            maxLength: element.validation.maxLength,
                        }),
                        ...(element.validation?.minLength && {
                            minLength: element.validation.minLength,
                        }),
                    }}
                    style={style}
                />
            );

        case 'textarea':
            return (
                <TextField
                    {...commonProps}
                    label={label}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    required={required}
                    multiline
                    rows={4}
                    style={style}
                />
            );

        case 'select':
            return (
                <Box sx={{ margin: 1 }}>
                    <Select
                        {...commonProps}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value as string | number | boolean)}
                        onBlur={onBlur}
                        margin={undefined}
                    >
                        <MenuItem value="">
                            <em>Select {label}</em>
                        </MenuItem>
                        {options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText error>{error}</FormHelperText>}
                </Box>
            );

        case 'checkbox':
            return (
                <Box sx={{ margin: 1 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!!value}
                                onChange={(e) => onChange(e.target.checked)}
                                onBlur={onBlur}
                            />
                        }
                        label={label}
                    />
                    {error && <FormHelperText error>{error}</FormHelperText>}
                </Box>
            );

        case 'radio':
            return (
                <Box sx={{ margin: 1 }}>
                    <RadioGroup
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                    >
                        {options?.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>
                    {error && <FormHelperText error>{error}</FormHelperText>}
                </Box>
            );

        case 'date':
            return (
                <TextField
                    {...commonProps}
                    type="date"
                    label={label}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    InputLabelProps={{ shrink: true }}
                    required={required}
                    style={style}
                />
            );

        default:
            return null;
    }
};
