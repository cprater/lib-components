import React from 'react';
import './Button.css';

export interface ButtonProps {
  /**
   * The content of the button
   */
  children: React.ReactNode;
  /**
   * The variant of the button
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /**
   * The size of the button
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  /**
   * The type of the button
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Whether the button should take full width
   */
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = `btn--${variant}`;
  const sizeClasses = `btn--${size}`;
  const stateClasses = [
    disabled && 'btn--disabled',
    loading && 'btn--loading',
    fullWidth && 'btn--full-width',
  ].filter(Boolean).join(' ');

  const classes = [baseClasses, variantClasses, sizeClasses, stateClasses, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      <span className={loading ? 'btn__content--loading' : 'btn__content'}>
        {children}
      </span>
    </button>
  );
};
