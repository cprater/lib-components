import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';

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
  // Map custom variants to MUI variants
  const muiVariant = variant === 'primary' ? 'contained' : 
                    variant === 'secondary' ? 'outlined' :
                    variant === 'outline' ? 'outlined' :
                    variant === 'ghost' ? 'text' :
                    variant === 'danger' ? 'contained' : 'contained';

  // Map custom sizes to MUI sizes
  const muiSize = size === 'sm' ? 'small' :
                  size === 'md' ? 'medium' :
                  size === 'lg' ? 'large' : 'medium';

  // Map custom color to MUI color
  const muiColor = variant === 'danger' ? 'error' : 'primary';

  return (
    <MuiButton
      variant={muiVariant}
      size={muiSize}
      color={muiColor}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={className}
      fullWidth={fullWidth}
      startIcon={loading ? <CircularProgress size={16} /> : undefined}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
