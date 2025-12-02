/**
 * Type definitions for dynamic UI schema
 * Supports rendering forms, dashboards, and other advanced UIs from JSON
 */

// Form/Input specific types
export type ElementType = 
    | 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'button'
    // Container/Layout elements
    | 'container' | 'box' | 'grid' | 'stack' | 'paper'
    // UI Components
    | 'tabs' | 'tab' | 'accordion' | 'card' | 'table' | 'list' | 'listitem'
    | 'text' | 'heading' | 'divider' | 'badge' | 'chip'
    // Custom/Extension point
    | string;

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'submit' | 'reset' | 'button';

export interface UIElement {
    // Core properties
    id?: string;
    element: ElementType;
    
    // For input elements
    type?: InputType;
    field?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    
    // For UI elements like tabs, accordion
    children?: UIElement[];
    
    // For containers/layouts
    layout?: 'flex' | 'grid';
    direction?: 'row' | 'column';
    gap?: number;
    
    // Display & styling
    title?: string;
    description?: string;
    icon?: string;
    className?: string;
    style?: Record<string, string | number>;
    sx?: Record<string, any>;
    
    // For option-based elements (select, radio, checkbox group)
    options?: Array<{ label: string; value: string | number; icon?: string }>;
    
    // Validation rules for form fields
    validation?: {
        pattern?: string;
        min?: number | string;
        max?: number | string;
        minLength?: number;
        maxLength?: number;
        message?: string;
    };
    
    // Event handlers
    onClick?: string; // Action name
    onChange?: string; // Action name
    onSubmit?: string; // Action name
    
    // Conditional rendering
    visible?: boolean;
    hidden?: boolean;
    condition?: string; // Expression or field name to check
    
    // Tab-specific
    tabValue?: string | number;
    defaultValue?: string | number;
    
    // Misc properties (flexible for extension)
    [key: string]: any;
}

// Backwards compatibility
export type FormElement = UIElement;

export interface UISchema {
    body?: {
        elements: UIElement[];
    };
    elements?: UIElement[]; // Alternative structure
    version?: string;
    metadata?: Record<string, any>;
}

// Backwards compatibility
export type FormSchema = UISchema;

export interface FormValues {
    [key: string]: string | number | boolean | null | undefined | FormValues;
}
