/**
 * Dynamic UI Renderer - Renders any UI structure from JSON schema
 * Supports nested elements, containers, forms, layouts, and custom components
 */

import React from 'react';
import {
    Box,
    Container,
    Stack,
    Paper,
    Tabs,
    Tab,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Divider,
    Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { UIElement, FormValues } from './types';
import { DynamicField } from './DynamicField';

interface DynamicUIRendererProps {
    element: UIElement;
    formValues?: FormValues;
    onFieldChange?: (fieldName: string, value: any) => void;
    onAction?: (action: string, payload?: any) => void;
    level?: number;
}

/**
 * Recursively renders UI elements from schema
 * Supports nested children for complex layouts
 */
export const DynamicUIRenderer: React.FC<DynamicUIRendererProps> = ({
    element,
    formValues = {},
    onFieldChange,
    onAction,
    level = 0,
}) => {
    const {
        element: elementType,
        children,
        direction = 'column',
        gap = 2,
        sx = {},
        style,
        className,
        title,
        description,
        visible = true,
        hidden = false,
    } = element;

    // Handle visibility
    if (!visible || hidden) return null;

    // Check condition-based visibility
    if (element.condition && formValues) {
        const conditionMet = evaluateCondition(element.condition, formValues);
        if (!conditionMet) return null;
    }

    const commonProps = {
        sx: { ...sx },
        style,
        className,
    };

    // Render form input elements
    if (isFormElement(elementType)) {
        return (
            <DynamicField
                element={element as any}
                value={formValues[element.field || ''] || ''}
                onChange={(value) => {
                    if (element.field && onFieldChange) {
                        onFieldChange(element.field, value);
                    }
                    element.onChange && onAction?.(element.onChange, value);
                }}
            />
        );
    }

    // Render container/layout elements with nested children
    switch (elementType) {
        case 'container':
            return (
                <Container {...commonProps}>
                    {renderChildren(children, formValues, onFieldChange, onAction)}
                </Container>
            );

        case 'box':
            return (
                <Box {...commonProps}>
                    {renderChildren(children, formValues, onFieldChange, onAction)}
                </Box>
            );

        case 'stack':
            return (
                <Stack
                    direction={direction as any}
                    spacing={gap}
                    {...commonProps}
                >
                    {renderChildren(children, formValues, onFieldChange, onAction)}
                </Stack>
            );

        case 'grid':
            return (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(auto-fit, minmax(${element.minColWidth || 250}px, 1fr))`,
                        gap: gap,
                        ...sx,
                    }}
                    style={style}
                    className={className}
                >
                    {children?.map((child, idx) => (
                        <Box key={idx} sx={{ ...child.sx }}>
                            <DynamicUIRenderer
                                element={child}
                                formValues={formValues}
                                onFieldChange={onFieldChange}
                                onAction={onAction}
                                level={level + 1}
                            />
                        </Box>
                    ))}
                </Box>
            );

        case 'paper':
            return (
                <Paper elevation={element.elevation || 1} {...commonProps}>
                    {title && <Typography variant="h6">{title}</Typography>}
                    {description && <Typography variant="body2">{description}</Typography>}
                    {renderChildren(children, formValues, onFieldChange, onAction)}
                </Paper>
            );

        case 'card':
            return (
                <Card {...commonProps}>
                    {(title || description) && (
                        <CardHeader
                            title={title}
                            subheader={description}
                        />
                    )}
                    <CardContent>
                        {renderChildren(children, formValues, onFieldChange, onAction)}
                    </CardContent>
                </Card>
            );

        case 'tabs':
            return (
                <TabsContainer
                    element={element}
                    formValues={formValues}
                    onFieldChange={onFieldChange}
                    onAction={onAction}
                    level={level}
                    {...commonProps}
                />
            );

        case 'accordion':
            return (
                <Box {...commonProps}>
                    {children?.map((child, idx) => (
                        <AccordionItem
                            key={idx}
                            element={child}
                            formValues={formValues}
                            onFieldChange={onFieldChange}
                            onAction={onAction}
                            level={level}
                        />
                    ))}
                </Box>
            );

        case 'divider':
            return <Divider {...commonProps} />;

        case 'text':
            return (
                <Typography variant={element.variant || 'body1'} {...commonProps}>
                    {element.content || element.label}
                </Typography>
            );

        case 'heading':
            return (
                <Typography
                    variant={element.variant || 'h5'}
                    component="h2"
                    {...commonProps}
                >
                    {element.content || element.title}
                </Typography>
            );

        case 'chip':
            return (
                <Chip
                    label={element.label}
                    icon={element.icon ? <span>{element.icon}</span> : undefined}
                    {...commonProps}
                />
            );

        default:
            return null;
    }
};

/**
 * Helper component for rendering tabs with nested elements
 */
const TabsContainer: React.FC<any> = ({
    element,
    formValues,
    onFieldChange,
    onAction,
    level,
    ...props
}) => {
    const [tabValue, setTabValue] = React.useState<number | string>(
        element.defaultValue ?? 0
    );

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number | string) => {
        setTabValue(newValue);
    };

    return (
        <Box {...props}>
            <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable">
                {element.children?.map((tab: UIElement, idx: number) => (
                    <Tab
                        key={idx}
                        label={tab.label || `Tab ${idx + 1}`}
                        value={tab.tabValue ?? idx}
                    />
                ))}
            </Tabs>

            {element.children?.map((tab: UIElement, idx: number) => (
                <TabPanel
                    key={idx}
                    value={tabValue}
                    index={tab.tabValue ?? idx}
                >
                    {tab.children && (
                        renderChildren(
                            tab.children,
                            formValues,
                            onFieldChange,
                            onAction,
                            level + 1
                        )
                    )}
                </TabPanel>
            ))}
        </Box>
    );
};

/**
 * Tab panel component
 */
interface TabPanelProps {
    children?: React.ReactNode;
    index: number | string;
    value: number | string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return (
        <Box sx={{ p: 2, display: value === index ? 'block' : 'none' }}>
            {children}
        </Box>
    );
};

/**
 * Accordion item component
 */
const AccordionItem: React.FC<any> = ({
    element,
    formValues,
    onFieldChange,
    onAction,
    level,
}) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{element.title || element.label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {renderChildren(
                    element.children,
                    formValues,
                    onFieldChange,
                    onAction,
                    level + 1
                )}
            </AccordionDetails>
        </Accordion>
    );
};

/**
 * Helper to render array of children elements
 */
function renderChildren(
    children: UIElement[] | undefined,
    formValues: FormValues,
    onFieldChange?: (fieldName: string, value: any) => void,
    onAction?: (action: string, payload?: any) => void,
    level: number = 0
) {
    if (!children || children.length === 0) return null;

    return (
        <>
            {children.map((child, idx) => (
                <DynamicUIRenderer
                    key={child.id || idx}
                    element={child}
                    formValues={formValues}
                    onFieldChange={onFieldChange}
                    onAction={onAction}
                    level={level}
                />
            ))}
        </>
    );
}

/**
 * Check if element type is a form input element
 */
function isFormElement(elementType: string): boolean {
    const formElements = [
        'input',
        'textarea',
        'select',
        'checkbox',
        'radio',
        'date',
        'button',
    ];
    return formElements.includes(elementType);
}

/**
 * Evaluate condition for conditional rendering
 */
function evaluateCondition(condition: string, formValues: FormValues): boolean {
    try {
        // Simple field existence check
        if (formValues.hasOwnProperty(condition)) {
            const value = formValues[condition];
            return Boolean(value);
        }
        // Could be extended with expression evaluation
        return true;
    } catch {
        return true;
    }
}
