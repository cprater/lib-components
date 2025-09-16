import React from 'react';
import { Card as MuiCard, CardHeader as MuiCardHeader, CardContent as MuiCardContent, CardActions as MuiCardActions } from '@mui/material';

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
  // Map custom variants to MUI elevation
  const elevation = variant === 'elevated' ? 4 : 
                   variant === 'outlined' ? 0 : 1;

  // Map custom padding to MUI padding
  const muiPadding = padding === 'none' ? 0 :
                     padding === 'sm' ? 1 :
                     padding === 'md' ? 2 :
                     padding === 'lg' ? 3 : 2;

  return (
    <MuiCard
      elevation={elevation}
      variant={variant === 'outlined' ? 'outlined' : 'elevation'}
      onClick={interactive ? onClick : undefined}
      className={className}
      sx={{
        cursor: interactive ? 'pointer' : 'default',
        padding: muiPadding,
        '&:hover': interactive ? {
          boxShadow: 6,
        } : {},
      }}
      {...props}
    >
      {children}
    </MuiCard>
  );
};

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <MuiCardHeader className={className}>
    {children}
  </MuiCardHeader>
);

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <MuiCardContent className={className}>
    {children}
  </MuiCardContent>
);

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <MuiCardActions className={className}>
    {children}
  </MuiCardActions>
);
