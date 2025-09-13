import React from 'react';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import './Header.css';

export interface User {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface HeaderProps {
  /**
   * The application title
   */
  title?: string;
  /**
   * The application logo URL
   */
  logoUrl?: string;
  /**
   * Navigation items
   */
  navItems?: Array<{
    label: string;
    href: string;
    active?: boolean;
  }>;
  /**
   * Current user data
   */
  user?: User;
  /**
   * Whether the user is authenticated
   */
  isAuthenticated?: boolean;
  /**
   * Login button click handler
   */
  onLogin?: () => void;
  /**
   * Logout button click handler
   */
  onLogout?: () => void;
  /**
   * User menu click handler
   */
  onUserMenuClick?: () => void;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Football Pickem',
  logoUrl,
  navItems = [],
  user,
  isAuthenticated = false,
  onLogin,
  onLogout,
  onUserMenuClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'header';
  const classes = [baseClasses, className].filter(Boolean).join(' ');

  const displayName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user?.username || 'User';

  return (
    <header className={classes} {...props}>
      <div className="header__container">
        <div className="header__brand">
          {logoUrl && (
            <img 
              src={logoUrl} 
              alt={title}
              className="header__logo"
            />
          )}
          <h1 className="header__title">{title}</h1>
        </div>

        <nav className="header__nav">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`header__nav-link ${item.active ? 'header__nav-link--active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          {isAuthenticated && user ? (
            <div className="header__user">
              <button
                className="header__user-button"
                onClick={onUserMenuClick}
                aria-label="User menu"
              >
                <Avatar
                  src={user.avatarUrl}
                  fallback={displayName}
                  size="sm"
                />
                <span className="header__user-name">{displayName}</span>
              </button>
              {onLogout && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              )}
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onLogin}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
