import React from 'react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Card, CardContent, Box, Typography, Stack } from '@mui/material';

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
  const handleClick = () => {
    if (clickable && onClick) {
      onClick(user);
    }
  };

  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.username;

  return (
    <Card
      className={className}
      onClick={handleClick}
      sx={{
        cursor: clickable ? 'pointer' : 'default',
        '&:hover': clickable ? {
          boxShadow: 6,
        } : {},
      }}
      {...props}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={user.avatarUrl}
            fallback={displayName}
            size="lg"
            clickable={false}
          />
          <Box flex={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" component="div">
                {displayName}
              </Typography>
              {user.isActive === false && (
                <Badge variant="warning" size="sm">Inactive</Badge>
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              @{user.username}
            </Typography>
            {showDetails && user.email && (
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            )}
            {showDetails && user.createdAt && (
              <Typography variant="body2" color="text.secondary">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        </Stack>
        {actions && (
          <Box mt={2}>
            {actions}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
