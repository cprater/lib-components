import React from 'react';
import { CircularProgress, LinearProgress, Box, Typography, Backdrop } from '@mui/material';

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
  // Map custom sizes to MUI sizes
  const muiSize = size === 'sm' ? 20 :
                  size === 'md' ? 40 :
                  size === 'lg' ? 60 :
                  size === 'xl' ? 80 : 40;

  // Map custom colors to MUI colors
  const muiColor = color === 'primary' ? 'primary' :
                   color === 'secondary' ? 'secondary' :
                   color === 'white' ? 'inherit' : 'primary';

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <Box display="flex" gap={1}>
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: muiColor === 'inherit' ? 'white' : 'currentColor',
                  animation: 'loading-dots 1.4s infinite ease-in-out',
                  animationDelay: `${index * 0.16}s`,
                  '@keyframes loading-dots': {
                    '0%, 80%, 100%': {
                      transform: 'scale(0)',
                    },
                    '40%': {
                      transform: 'scale(1)',
                    },
                  },
                }}
              />
            ))}
          </Box>
        );
      case 'pulse':
        return (
          <Box
            sx={{
              width: muiSize,
              height: muiSize,
              borderRadius: '50%',
              backgroundColor: muiColor === 'inherit' ? 'white' : 'currentColor',
              animation: 'loading-pulse 1.5s infinite ease-in-out',
              '@keyframes loading-pulse': {
                '0%': {
                  transform: 'scale(0)',
                  opacity: 1,
                },
                '100%': {
                  transform: 'scale(1)',
                  opacity: 0,
                },
              },
            }}
          />
        );
      case 'spinner':
      default:
        return <CircularProgress size={muiSize} color={muiColor} />;
    }
  };

  const content = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      className={className}
      {...props}
    >
      {renderLoader()}
      {text && (
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      )}
    </Box>
  );

  if (overlay) {
    return (
      <Backdrop open={true} sx={{ zIndex: 1300 }}>
        {content}
      </Backdrop>
    );
  }

  return content;
};
