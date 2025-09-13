import React from 'react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import './UserCard.css';

export interface User {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface UserCardProps {
  /**
   * The user data to display
   */
  user: User;
  /**
   * Whether to show additional user details
   */
  showDetails?: boolean;
  /**
   * Whether the card is clickable
   */
  clickable?: boolean;
  /**
   * Click handler
   */
  onClick?: (user: User) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Custom actions to display in the card
   */
  actions?: React.ReactNode;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  showDetails = false,
  clickable = false,
  onClick,
  className = '',
  actions,
  ...props
}) => {
  const baseClasses = 'user-card';
  const clickableClasses = clickable ? 'user-card--clickable' : '';

  const classes = [baseClasses, clickableClasses, className]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (clickable && onClick) {
      onClick(user);
    }
  };

  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.username;

  return (
    <div
      className={classes}
      onClick={handleClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      <div className="user-card__content">
        <Avatar
          src={user.avatarUrl}
          fallback={displayName}
          size="lg"
          clickable={false}
        />
        <div className="user-card__info">
          <div className="user-card__name">
            {displayName}
            {user.isActive === false && (
              <Badge variant="warning" size="sm">Inactive</Badge>
            )}
          </div>
          <div className="user-card__username">@{user.username}</div>
          {showDetails && user.email && (
            <div className="user-card__email">{user.email}</div>
          )}
          {showDetails && user.createdAt && (
            <div className="user-card__joined">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
      {actions && (
        <div className="user-card__actions">
          {actions}
        </div>
      )}
    </div>
  );
};
