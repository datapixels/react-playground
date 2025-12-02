import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { parseElements } from "../schema-parser";
import { registry } from "../component-registry";
import type { IProviderProps } from "../types/base-provider";

export function TabProvider({element, form}: IProviderProps): React.ReactNode {
    const [value, setValue] = useState('0');
    const tabs = element.elements || [];

    if (tabs.length === 0) {
        return <Box sx={{ p: 2 }}>No tabs available</Box>;
    }

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label='Tabs'>
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.title || 'MISSING LABEL'}
                            value={String(index)}
                        />
                    ))}
                </TabList>
            </Box>
            {tabs.map((tab, index) => (
                <TabPanel key={index} value={String(index)}>
                    {parseElements(tab.elements || [], form, registry)}
                </TabPanel>
            ))}
        </TabContext>
    );
}