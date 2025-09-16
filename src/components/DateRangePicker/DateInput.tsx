import React from 'react';
import { TextField, Box, IconButton, Typography } from '@mui/material';
import { CalendarToday as CalendarIcon } from '@mui/icons-material';
import { DateInputProps } from './types';

export const DateInput: React.FC<DateInputProps> = ({
  value,
  placeholder,
  label,
  disabled = false,
  readOnly = true,
  required = false,
  error = false,
  errorMessage,
  helperText,
  name,
  id,
  size = 'medium',
  autoFocus = false,
  clearable = true,
  hasValue,
  onOpen,
  onClear,
  renderInput,
  className,
}) => {
  const inputProps = {
    value,
    placeholder,
    readOnly,
    disabled,
    error,
    helperText: errorMessage || helperText,
    label,
    name,
    id,
    size,
    required,
    autoFocus,
    onClick: onOpen,
    InputProps: {
      endAdornment: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {clearable && hasValue && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              sx={{ p: 0.5 }}
            >
              <Typography sx={{ fontSize: '1rem' }}>×</Typography>
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={onOpen}
            disabled={disabled}
            sx={{ p: 0.5 }}
          >
            <CalendarIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  };

  if (renderInput) {
    return <>{renderInput(inputProps)}</>;
  }

  return <TextField {...inputProps} className={className} fullWidth />;
};
