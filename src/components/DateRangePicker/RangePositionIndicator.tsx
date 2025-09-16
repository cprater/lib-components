import React from 'react';
import { Chip, Stack } from '@mui/material';
import { RangePositionIndicatorProps } from './types';

export const RangePositionIndicator: React.FC<RangePositionIndicatorProps> = ({
  rangePosition,
  onRangePositionChange,
}) => {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Chip
        label="Start Date"
        color={rangePosition === 'start' ? 'primary' : 'default'}
        variant={rangePosition === 'start' ? 'filled' : 'outlined'}
        onClick={() => onRangePositionChange('start')}
        size="small"
      />
      <Chip
        label="End Date"
        color={rangePosition === 'end' ? 'primary' : 'default'}
        variant={rangePosition === 'end' ? 'filled' : 'outlined'}
        onClick={() => onRangePositionChange('end')}
        size="small"
      />
    </Stack>
  );
};
