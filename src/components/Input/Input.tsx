import React from 'react';
import './Input.css';

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
  const inputId = id || (name ? `input-${name}` : undefined);
  const hasError = error || !!errorMessage;

  const inputClasses = [
    'input',
    `input--${size}`,
    hasError && 'input--error',
    disabled && 'input--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
          {required && <span className="input__required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={inputClasses}
        {...props}
      />
      {(helperText || errorMessage) && (
        <div className={`input__message ${hasError ? 'input__message--error' : ''}`}>
          {errorMessage || helperText}
        </div>
      )}
    </div>
  );
};
