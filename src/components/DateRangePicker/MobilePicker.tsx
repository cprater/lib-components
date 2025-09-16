import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { DateRange as DateRangeIcon } from '@mui/icons-material';
import { Calendar } from './Calendar';
import { RangePositionIndicator } from './RangePositionIndicator';
import { DateRange, RangePosition } from './types';

interface MobilePickerProps {
  open: boolean;
  onClose: () => void;
  currentValue: DateRange;
  rangePosition: RangePosition;
  onRangePositionChange: (position: RangePosition) => void;
  onDateChange: (date: Date, calendarIndex?: number) => void;
  onAccept: () => void;
  onClear: () => void;
  clearable: boolean;
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
  shouldDisableDate?: (date: Date, position: RangePosition) => boolean;
  showDaysOutsideCurrentMonth?: boolean;
}

export const MobilePicker: React.FC<MobilePickerProps> = ({
  open,
  onClose,
  currentValue,
  rangePosition,
  onRangePositionChange,
  onDateChange,
  onAccept,
  onClear,
  clearable,
  minDate,
  maxDate,
  disableFuture,
  disablePast,
  shouldDisableDate,
  showDaysOutsideCurrentMonth,
}) => {
  const startDate = currentValue.start || new Date();
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { minHeight: 500 }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DateRangeIcon />
          Select Date Range
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {/* Range Position Indicator */}
        <Box sx={{ mb: 3 }}>
          <RangePositionIndicator
            rangePosition={rangePosition}
            onRangePositionChange={onRangePositionChange}
          />
        </Box>
        
        {/* Calendar */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Calendar
            date={startDate}
            onDateChange={(date) => onDateChange(date, 0)}
            selectedStart={currentValue.start}
            selectedEnd={currentValue.end}
            rangePosition={rangePosition}
            onRangePositionChange={onRangePositionChange}
            minDate={minDate}
            maxDate={maxDate}
            disableFuture={disableFuture}
            disablePast={disablePast}
            shouldDisableDate={shouldDisableDate}
            showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          />
        </Box>
      </DialogContent>
      
      <DialogActions>
        {clearable && (currentValue.start || currentValue.end) && (
          <Button onClick={onClear}>
            Clear
          </Button>
        )}
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={onAccept} 
          variant="contained"
          disabled={!currentValue.start || !currentValue.end}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
