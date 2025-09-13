import React from 'react';
import './Alert.css';

export interface AlertProps {
  /**
   * The content of the alert
   */
  children: React.ReactNode;
  /**
   * The variant of the alert
   */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /**
   * The size of the alert
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the alert can be dismissed
   */
  dismissible?: boolean;
  /**
   * Dismiss handler
   */
  onDismiss?: () => void;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Whether the alert has an icon
   */
  showIcon?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  size = 'md',
  dismissible = false,
  onDismiss,
  className = '',
  showIcon = true,
  ...props
}) => {
  const baseClasses = 'alert';
  const variantClasses = `alert--${variant}`;
  const sizeClasses = `alert--${size}`;

  const classes = [baseClasses, variantClasses, sizeClasses, className]
    .filter(Boolean)
    .join(' ');

  const getIcon = () => {
    if (!showIcon) return null;
    
    switch (variant) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✕';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={classes} role="alert" {...props}>
      <div className="alert__content">
        {showIcon && (
          <div className="alert__icon">
            {getIcon()}
          </div>
        )}
        <div className="alert__message">
          {children}
        </div>
      </div>
      {dismissible && onDismiss && (
        <button
          className="alert__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          ×
        </button>
      )}
    </div>
  );
};
