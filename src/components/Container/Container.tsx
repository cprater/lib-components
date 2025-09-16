import React from 'react';
import { Container as MuiContainer, ContainerProps as MuiContainerProps } from '@mui/material';

export interface ContainerProps {
  /**
   * The content of the container
   */
  children: React.ReactNode;
  /**
   * The maximum width of the container
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /**
   * Whether the container should be centered
   */
  centered?: boolean;
  /**
   * The padding of the container
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'xl',
  centered = true,
  padding = 'md',
  className = '',
  ...props
}) => {
  // Map custom maxWidth to MUI maxWidth
  const muiMaxWidth = maxWidth === 'sm' ? 'sm' :
                      maxWidth === 'md' ? 'md' :
                      maxWidth === 'lg' ? 'lg' :
                      maxWidth === 'xl' ? 'xl' :
                      maxWidth === '2xl' ? 'xl' :
                      maxWidth === 'full' ? false : 'xl';

  // Map custom padding to MUI padding
  const muiPadding = padding === 'none' ? 0 :
                     padding === 'sm' ? 1 :
                     padding === 'md' ? 2 :
                     padding === 'lg' ? 3 :
                     padding === 'xl' ? 4 : 2;

  return (
    <MuiContainer
      maxWidth={muiMaxWidth}
      className={className}
      sx={{
        padding: muiPadding,
        margin: centered ? '0 auto' : undefined,
      }}
      {...props}
    >
      {children}
    </MuiContainer>
  );
};
