import React from 'react';
import { Popover, Box, Button } from '@mui/material';
import { Calendar } from './Calendar';
import { RangePositionIndicator } from './RangePositionIndicator';
import { DateRange, RangePosition } from './types';

interface DesktopPickerProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  currentValue: DateRange;
  rangePosition: RangePosition;
  onRangePositionChange: (position: RangePosition) => void;
  onDateChange: (date: Date, calendarIndex?: number) => void;
  onAccept: () => void;
  onClear: () => void;
  calendars: 1 | 2 | 3;
  clearable: boolean;
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
  shouldDisableDate?: (date: Date, position: RangePosition) => boolean;
  showDaysOutsideCurrentMonth?: boolean;
}

export const DesktopPicker: React.FC<DesktopPickerProps> = ({
  open,
  anchorEl,
  onClose,
  currentValue,
  rangePosition,
  onRangePositionChange,
  onDateChange,
  onAccept,
  onClear,
  calendars,
  clearable,
  minDate,
  maxDate,
  disableFuture,
  disablePast,
  shouldDisableDate,
  showDaysOutsideCurrentMonth,
}) => {
  const startDate = currentValue.start || new Date();
  const endDate = currentValue.end || new Date();
  
  // Calculate the second calendar date
  const secondCalendarDate = calendars > 1 ? 
    new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1) : 
    startDate;
  
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: { p: 2, minWidth: calendars > 1 ? 600 : 300 }
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        {/* Range Position Indicator */}
        <Box sx={{ mb: 2, width: '100%' }}>
          <RangePositionIndicator
            rangePosition={rangePosition}
            onRangePositionChange={onRangePositionChange}
          />
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* First Calendar */}
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
        
        {/* Second Calendar */}
        {calendars > 1 && (
          <Calendar
            date={secondCalendarDate}
            onDateChange={(date) => onDateChange(date, 1)}
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
        )}
      </Box>
      
      {/* Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
        {clearable && (currentValue.start || currentValue.end) && (
          <Button onClick={onClear} size="small">
            Clear
          </Button>
        )}
        <Button onClick={onClose} size="small">
          Cancel
        </Button>
        <Button 
          onClick={onAccept} 
          variant="contained" 
          size="small"
          disabled={!currentValue.start || !currentValue.end}
        >
          OK
        </Button>
      </Box>
    </Popover>
  );
};
