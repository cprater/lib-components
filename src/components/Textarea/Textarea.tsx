import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export interface TextareaProps {
  /**
   * The placeholder text
   */
  placeholder?: string;
  /**
   * The value of the textarea
   */
  value?: string;
  /**
   * The default value of the textarea
   */
  defaultValue?: string;
  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;
  /**
   * Whether the textarea is required
   */
  required?: boolean;
  /**
   * Whether the textarea is in an error state
   */
  error?: boolean;
  /**
   * The size of the textarea
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * The number of rows
   */
  rows?: number;
  /**
   * The label for the textarea
   */
  label?: string;
  /**
   * Helper text to display below the textarea
   */
  helperText?: string;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * The name attribute of the textarea
   */
  name?: string;
  /**
   * The id attribute of the textarea
   */
  id?: string;
  /**
   * Whether the textarea should auto-resize
   */
  autoResize?: boolean;
  /**
   * Maximum number of characters
   */
  maxLength?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  value,
  defaultValue,
  disabled = false,
  required = false,
  error = false,
  size = 'md',
  rows = 3,
  label,
  helperText,
  errorMessage,
  onChange,
  onBlur,
  onFocus,
  className = '',
  name,
  id,
  autoResize = false,
  maxLength,
  ...props
}) => {
  const hasError = error || !!errorMessage;

  // Map custom sizes to MUI sizes (TextField only supports small and medium)
  const muiSize = size === 'sm' ? 'small' :
                  size === 'md' ? 'medium' :
                  size === 'lg' ? 'medium' : 'medium';

  // Combine helper text with character count if maxLength is provided
  const combinedHelperText = maxLength 
    ? `${errorMessage || helperText || ''} (${value?.length || 0}/${maxLength})`
    : errorMessage || helperText;

  return (
    <TextField
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      required={required}
      error={hasError}
      label={label}
      helperText={combinedHelperText}
      size={muiSize}
      multiline
      rows={rows}
      inputProps={{ maxLength }}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      className={className}
      fullWidth
      sx={{
        '& .MuiInputBase-input': {
          resize: autoResize ? 'vertical' : 'none',
        },
      }}
      {...props}
    />
  );
};
