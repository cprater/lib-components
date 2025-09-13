import React from 'react';
import './Badge.css';

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
  const baseClasses = 'badge';
  const variantClasses = `badge--${variant}`;
  const sizeClasses = `badge--${size}`;
  const roundedClasses = rounded ? 'badge--rounded' : '';

  const classes = [baseClasses, variantClasses, sizeClasses, roundedClasses, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};
