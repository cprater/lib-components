import React from 'react';
import './Card.css';

export interface CardProps {
  /**
   * The content of the card
   */
  children: React.ReactNode;
  /**
   * The variant of the card
   */
  variant?: 'default' | 'elevated' | 'outlined';
  /**
   * Whether the card is interactive (clickable)
   */
  interactive?: boolean;
  /**
   * Click handler for interactive cards
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * The padding size of the card
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  interactive = false,
  onClick,
  className = '',
  padding = 'md',
  ...props
}) => {
  const baseClasses = 'card';
  const variantClasses = `card--${variant}`;
  const paddingClasses = `card--padding-${padding}`;
  const interactiveClasses = interactive ? 'card--interactive' : '';

  const classes = [baseClasses, variantClasses, paddingClasses, interactiveClasses, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`card__header ${className}`}>
    {children}
  </div>
);

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={`card__content ${className}`}>
    {children}
  </div>
);

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`card__footer ${className}`}>
    {children}
  </div>
);
