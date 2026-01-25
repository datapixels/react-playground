import Box from "@mui/material/Box";
import { revalidateLogic, useForm, type AnyFieldApi } from "@tanstack/react-form";
import zod from "zod";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import { useMemo } from "react";
import InputLabel from "@mui/material/InputLabel";

// Type definitions
interface FormFieldProps {
    field: AnyFieldApi;
    label: string;
    type?: 'text' | 'email' | 'number' | 'password' | 'tel';
    placeholder?: string;
    required?: boolean;
    labelWidth?: number;
    inputWidth?: number;
}

// Type definitions
interface FormFieldProps {
    field: AnyFieldApi;
    label: string;
    type?: 'text' | 'email' | 'number' | 'password' | 'tel';
    placeholder?: string;
    required?: boolean;
    labelWidth?: number;
    inputWidth?: number;
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid
        ? field.state.meta.errors.map((err) => (
            <em key={err.message}>{err.message}</em>
          ))
        : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}
// Reusable Form Field Component using MUI components
function FormField({
  field,
  label,
  type = "text",
  placeholder = "",
  required = false,
}: FormFieldProps) {
  const hasError = useMemo(
    () => field.state.meta.isTouched && !!field.state.meta.errors?.length,
    [field.state.meta.isTouched, field.state.meta.errors]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (type === "number") {
      field.handleChange(value === '' ? '' : Number(value));
    } else {
      field.handleChange(value);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
      {/* Label takes e.g. 3/12 on larger screens, full on mobile */}
      <Grid size={{ xs: 12, sm: 3 }}>
        <InputLabel
          htmlFor={field.name}
          required={required}
          error={hasError}
          sx={{
            textAlign: { xs: 'left', sm: 'right' },
            pt: { xs: 0, sm: 1 },           // less top padding on mobile
            fontWeight: 'medium',
          }}
        >
          {label}
        </InputLabel>
      </Grid>

      {/* Input takes remaining space */}
      <Grid size={{ xs: 12, sm: 9 }}>
        <TextField
          id={field.name}
          name={field.name}
          type={type}
          placeholder={placeholder}
          value={field.state.value ?? ''}
          onBlur={field.handleBlur}
          onChange={handleChange}
          error={hasError}
          helperText={<FieldInfo field={field} />}
          required={required}
          fullWidth
          variant="standard"   // or "outlined" if preferred
        />
      </Grid>
    </Grid>
  );
}
export function DialogExample() {
    const schema = zod.object(
        {
            model:
                zod.object({
                    firstName: zod.string().min(2).max(50),
                    lastName: zod.string().min(2).max(50),
                    age: zod.number().min(0).max(120).optional(),
                    email: zod.string().optional(),
                })
        }
    );


    const form = useForm({
        defaultValues: {

        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            console.log(value)
        },
        validationLogic: revalidateLogic(
            {
                mode: 'blur',
                modeAfterSubmission: 'blur',
            }
        ),
        validators: {
            onDynamic: schema,
        },
    });



    return (
        <Box width={600}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <div>
                    {/* A type-safe field component*/}
                    <form.Field
                        name="model.firstName"
                        children={(field) => {
                            return (
                                    <FormField
                                        field={field}
                                        label="First Name:"
                                        required={true}
                                    />
                            )
                        }}
                    />
                </div>
                <div>
                    <form.Field
                        name="model.lastName"
                        children={(field) => (
                            <FormField
                                field={field}
                                label="Last Name:"
                                required={true}
                            />
                        )}
                    />
                </div>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <>
                            <button type="submit" disabled={!canSubmit}>
                                {isSubmitting ? '...' : 'Submit'}
                            </button>
                            <button
                                type="reset"
                                onClick={(e) => {
                                    // Avoid unexpected resets of form elements (especially <select> elements)
                                    e.preventDefault()
                                    form.reset()
                                }}
                            >
                                Reset
                            </button>
                        </>
                    )}
                />
            </form>
        </Box>
    );
}