import React from 'react';
import './Select.css';

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
  const selectId = id || (name ? `select-${name}` : undefined);
  const hasError = error || !!errorMessage;

  const selectClasses = [
    'select',
    `select--${size}`,
    hasError && 'select--error',
    disabled && 'select--disabled',
    className,
  ].filter(Boolean).join(' ');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      const selectedOption = options.find(option => 
        option.value.toString() === event.target.value
      );
      onChange(selectedOption?.value || event.target.value, event);
    }
  };

  return (
    <div className="select-wrapper">
      {label && (
        <label htmlFor={selectId} className="select__label">
          {label}
          {required && <span className="select__required">*</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {(helperText || errorMessage) && (
        <div className={`select__message ${hasError ? 'select__message--error' : ''}`}>
          {errorMessage || helperText}
        </div>
      )}
    </div>
  );
};
