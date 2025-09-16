import React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

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
  // Map custom variants to MUI severity
  const muiSeverity = variant === 'info' ? 'info' :
                      variant === 'success' ? 'success' :
                      variant === 'warning' ? 'warning' :
                      variant === 'error' ? 'error' : 'info';

  return (
    <MuiAlert
      severity={muiSeverity}
      className={className}
      icon={showIcon ? undefined : false}
      action={dismissible && onDismiss ? (
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onDismiss}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      ) : undefined}
      {...props}
    >
      {children}
    </MuiAlert>
  );
};
