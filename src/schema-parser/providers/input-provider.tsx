import React from "react";
import { Box, TextField } from "@mui/material";
import type { IProviderProps } from "../types/base-provider";
import { evaluateConditionalAttributes } from "../schema-parser";

export function InputProvider({ element, form }: IProviderProps): React.ReactNode {

    return (
        <Box>
            <form.Field
                name={element.field as string}
                children={({ state, handleChange, handleBlur }) => {
                    
                const evaluatedAttrs = evaluateConditionalAttributes(
                    element.attributes,
                    form.state.values
                );
                
                // Don't render if hidden
                if (evaluatedAttrs.hidden) {
                    return null;
                }

                    return (
                        <>
                        <TextField
                            label={element.label as string}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={state.value || ''}
                            onChange={(e) => handleChange(e.target.value)}
                            onBlur={handleBlur}
                            placeholder={element.placeholder as string}
                            required={element.required ? true : false}
                        />
                        </>
                    )
                }}
            />

        </Box>

    );
}