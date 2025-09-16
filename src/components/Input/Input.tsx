import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export interface InputProps {
  /**
   * The type of the input
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /**
   * The placeholder text
   */
  placeholder?: string;
  /**
   * The value of the input
   */
  value?: string;
  /**
   * The default value of the input
   */
  defaultValue?: string;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * Whether the input is in an error state
   */
  error?: boolean;
  /**
   * The size of the input
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * The label for the input
   */
  label?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * The name attribute of the input
   */
  name?: string;
  /**
   * The id attribute of the input
   */
  id?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  disabled = false,
  required = false,
  error = false,
  size = 'md',
  label,
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

  // Map custom sizes to MUI sizes (TextField only supports small and medium)
  const muiSize = size === 'sm' ? 'small' :
                  size === 'md' ? 'medium' :
                  size === 'lg' ? 'medium' : 'medium';

  return (
    <TextField
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      required={required}
      error={hasError}
      label={label}
      helperText={errorMessage || helperText}
      size={muiSize}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      className={className}
      fullWidth
      {...props}
    />
  );
};
