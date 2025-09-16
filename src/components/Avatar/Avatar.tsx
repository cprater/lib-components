import React from 'react';
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';

export interface AvatarProps {
  /**
   * The image URL for the avatar
   */
  src?: string;
  /**
   * The alt text for the avatar image
   */
  alt?: string;
  /**
   * The size of the avatar
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * The shape of the avatar
   */
  shape?: 'circle' | 'square' | 'rounded';
  /**
   * Fallback text when no image is provided
   */
  fallback?: string;
  /**
   * Whether the avatar is clickable
   */
  clickable?: boolean;
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  shape = 'circle',
  fallback,
  clickable = false,
  onClick,
  className = '',
  ...props
}) => {
  // Map custom sizes to MUI sizes
  const muiSize = size === 'xs' ? 24 :
                  size === 'sm' ? 32 :
                  size === 'md' ? 40 :
                  size === 'lg' ? 56 :
                  size === 'xl' ? 80 : 40;

  // Map custom shapes to MUI variants
  const muiVariant = shape === 'square' ? 'square' : 'circular';

  const getInitials = (text: string) => {
    return text
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <MuiAvatar
      src={src}
      alt={alt}
      sx={{
        width: muiSize,
        height: muiSize,
        cursor: clickable ? 'pointer' : 'default',
        borderRadius: shape === 'rounded' ? '8px' : undefined,
      }}
      variant={muiVariant}
      onClick={clickable ? onClick : undefined}
      className={className}
      {...props}
    >
      {fallback ? getInitials(fallback) : '?'}
    </MuiAvatar>
  );
};
