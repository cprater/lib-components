import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, SelectChangeEvent } from '@mui/material';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /**
   * The options for the select
   */
  options: SelectOption[];
  /**
   * The selected value
   */
  value?: string | number;
  /**
   * The default value
   */
  defaultValue?: string | number;
  /**
   * The placeholder text
   */
  placeholder?: string;
  /**
   * The label for the select
   */
  label?: string;
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  /**
   * Whether the select is required
   */
  required?: boolean;
  /**
   * Whether the select is in an error state
   */
  error?: boolean;
  /**
   * The size of the select
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Helper text to display below the select
   */
  helperText?: string;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Change handler
   */
  onChange?: (value: string | number, event: React.ChangeEvent<HTMLSelectElement>) => void;
  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * The name attribute of the select
   */
  name?: string;
  /**
   * The id attribute of the select
   */
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  placeholder,
  label,
  disabled = false,
  required = false,
  error = false,
  size = 'md',
  helperText,
  errorMessage,
  onChange,
  onBlur,
  onFocus,
  className = '',
  name,
  id,
  ...props
}) => {
  const hasError = error || !!errorMessage;

  // Map custom sizes to MUI sizes (FormControl only supports small and medium)
  const muiSize = size === 'sm' ? 'small' :
                  size === 'md' ? 'medium' :
                  size === 'lg' ? 'medium' : 'medium';

  const handleChange = (event: SelectChangeEvent<string>) => {
    if (onChange) {
      const selectedOption = options.find(option => 
        option.value.toString() === event.target.value
      );
      // Create a synthetic event that matches the expected signature
      const syntheticEvent = {
        target: { value: event.target.value },
        currentTarget: event.currentTarget,
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(selectedOption?.value || event.target.value, syntheticEvent);
    }
  };

  return (
    <FormControl 
      fullWidth 
      error={hasError} 
      disabled={disabled} 
      required={required}
      size={muiSize}
      className={className}
    >
      {label && <InputLabel id={`${id || name || 'select'}-label`}>{label}</InputLabel>}
      <MuiSelect
        labelId={`${id || name || 'select'}-label`}
        id={id}
        name={name}
        value={value?.toString() || ''}
        defaultValue={defaultValue?.toString()}
        label={label}
        onChange={handleChange}
        displayEmpty={!!placeholder}
        {...props}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value.toString()}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {(helperText || errorMessage) && (
        <FormHelperText>{errorMessage || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
