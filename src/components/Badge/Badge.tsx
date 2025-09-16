import React from 'react';
import { Chip, ChipProps } from '@mui/material';

export interface BadgeProps {
  /**
   * The content of the badge
   */
  children: React.ReactNode;
  /**
   * The variant of the badge
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /**
   * The size of the badge
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the badge should be rounded
   */
  rounded?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  className = '',
  ...props
}) => {
  // Map custom variants to MUI colors
  const muiColor = variant === 'primary' ? 'primary' :
                   variant === 'success' ? 'success' :
                   variant === 'warning' ? 'warning' :
                   variant === 'error' ? 'error' :
                   variant === 'info' ? 'info' : 'default';

  // Map custom sizes to MUI sizes (Chip only supports small and medium)
  const muiSize = size === 'sm' ? 'small' :
                  size === 'md' ? 'medium' :
                  size === 'lg' ? 'medium' : 'medium';

  return (
    <Chip
      label={children}
      color={muiColor}
      size={muiSize}
      className={className}
      sx={{
        borderRadius: rounded ? '50px' : '4px',
      }}
      {...props}
    />
  );
};
