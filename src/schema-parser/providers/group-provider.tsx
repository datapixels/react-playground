import React from "react";
import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import type { IProviderProps } from "../types/base-provider";
import { parseElements } from "../schema-parser";
import { registry } from "../component-registry";

export function GroupProvider({element, form}: IProviderProps): React.ReactNode {
    const children = element.elements || [];

    if (children.length === 0) {
        return <Box sx={{ p: 2 }}>No content</Box>;
    }

    return (
        <Accordion defaultExpanded={element.attributes?.defaultExpanded ?? true}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">{element.title ?? 'MISSING LABEL'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {parseElements(children, form, registry)}
            </AccordionDetails>
        </Accordion>
    );
}