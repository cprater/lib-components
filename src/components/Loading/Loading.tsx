import React from 'react';
import './Loading.css';

export interface LoadingProps {
  /**
   * The size of the loading spinner
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * The variant of the loading spinner
   */
  variant?: 'spinner' | 'dots' | 'pulse';
  /**
   * The color of the loading spinner
   */
  color?: 'primary' | 'secondary' | 'white';
  /**
   * Loading text to display
   */
  text?: string;
  /**
   * Whether to show the loading overlay
   */
  overlay?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  text,
  overlay = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'loading';
  const sizeClasses = `loading--${size}`;
  const variantClasses = `loading--${variant}`;
  const colorClasses = `loading--${color}`;
  const overlayClasses = overlay ? 'loading--overlay' : '';

  const classes = [baseClasses, sizeClasses, variantClasses, colorClasses, overlayClasses, className]
    .filter(Boolean)
    .join(' ');

  const renderSpinner = () => (
    <div className="loading__spinner">
      <div className="loading__spinner-inner"></div>
    </div>
  );

  const renderDots = () => (
    <div className="loading__dots">
      <div className="loading__dot"></div>
      <div className="loading__dot"></div>
      <div className="loading__dot"></div>
    </div>
  );

  const renderPulse = () => (
    <div className="loading__pulse">
      <div className="loading__pulse-inner"></div>
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={classes} {...props}>
      <div className="loading__content">
        {renderLoader()}
        {text && (
          <div className="loading__text">
            {text}
          </div>
        )}
      </div>
    </div>
  );
};
