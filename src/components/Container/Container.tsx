import React from 'react';
import './Container.css';

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
  const baseClasses = 'container';
  const maxWidthClasses = `container--max-width-${maxWidth}`;
  const centeredClasses = centered ? 'container--centered' : '';
  const paddingClasses = `container--padding-${padding}`;

  const classes = [baseClasses, maxWidthClasses, centeredClasses, paddingClasses, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
