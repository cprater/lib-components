import React from 'react';
import './Textarea.css';

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
  const textareaId = id || (name ? `textarea-${name}` : undefined);
  const hasError = error || !!errorMessage;

  const textareaClasses = [
    'textarea',
    `textarea--${size}`,
    hasError && 'textarea--error',
    disabled && 'textarea--disabled',
    autoResize && 'textarea--auto-resize',
    className,
  ].filter(Boolean).join(' ');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (autoResize) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="textarea-wrapper">
      {label && (
        <label htmlFor={textareaId} className="textarea__label">
          {label}
          {required && <span className="textarea__required">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={textareaClasses}
        {...props}
      />
      {(helperText || errorMessage || maxLength) && (
        <div className="textarea__footer">
          <div className={`textarea__message ${hasError ? 'textarea__message--error' : ''}`}>
            {errorMessage || helperText}
          </div>
          {maxLength && (
            <div className="textarea__char-count">
              {value?.length || 0} / {maxLength}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
