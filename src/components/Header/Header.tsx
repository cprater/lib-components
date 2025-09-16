import React from 'react';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const displayName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user?.username || 'User';

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    if (onUserMenuClick) {
      onUserMenuClick();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={className} {...props}>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          {logoUrl && (
            <Box
              component="img"
              src={logoUrl}
              alt={title}
              sx={{ height: 40, marginRight: 2 }}
            />
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {navItems.map((item, index) => (
            <Typography
              key={index}
              component="a"
              href={item.href}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                fontWeight: item.active ? 'bold' : 'normal',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {item.label}
            </Typography>
          ))}

          {isAuthenticated && user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleUserMenuClick}
                color="inherit"
              >
                <Avatar
                  src={user.avatarUrl}
                  fallback={displayName}
                  size="sm"
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Typography variant="body2">{displayName}</Typography>
                </MenuItem>
                {onLogout && (
                  <MenuItem onClick={() => {
                    handleClose();
                    onLogout();
                  }}>
                    Logout
                  </MenuItem>
                )}
              </Menu>
            </Box>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onLogin}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
