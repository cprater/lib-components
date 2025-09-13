import React from 'react';
import './Avatar.css';

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
  const baseClasses = 'avatar';
  const sizeClasses = `avatar--${size}`;
  const shapeClasses = `avatar--${shape}`;
  const clickableClasses = clickable ? 'avatar--clickable' : '';

  const classes = [baseClasses, sizeClasses, shapeClasses, clickableClasses, className]
    .filter(Boolean)
    .join(' ');

  const getInitials = (text: string) => {
    return text
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={classes}
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="avatar__image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallbackElement = target.nextElementSibling as HTMLElement;
            if (fallbackElement) {
              fallbackElement.style.display = 'flex';
            }
          }}
        />
      ) : null}
      <div className="avatar__fallback" style={{ display: src ? 'none' : 'flex' }}>
        {fallback ? getInitials(fallback) : '?'}
      </div>
    </div>
  );
};
