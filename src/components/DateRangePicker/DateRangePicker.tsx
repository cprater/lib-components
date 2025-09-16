import React, { useState, useCallback, useMemo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { DateInput } from './DateInput';
import { DesktopPicker } from './DesktopPicker';
import { MobilePicker } from './MobilePicker';
import { DateRangePickerProps, DateRange, RangePosition } from './types';
import { formatDisplayValue } from './utils';

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  defaultValue,
  onChange,
  onAccept,
  onClose,
  onOpen,
  label,
  placeholder = 'Select date range',
  disabled = false,
  readOnly = false,
  required = false,
  error = false,
  errorMessage,
  helperText,
  format = 'MM/dd/yyyy',
  minDate,
  maxDate,
  disableFuture = false,
  disablePast = false,
  shouldDisableDate,
  closeOnSelect = true,
  calendars = 2,
  showDaysOutsideCurrentMonth = false,
  displayWeekNumber = false,
  name,
  id,
  className,
  open: controlledOpen,
  rangePosition: controlledRangePosition,
  onRangePositionChange,
  autoFocus = false,
  size = 'medium',
  clearable = true,
  renderInput,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [internalValue, setInternalValue] = useState<DateRange>(defaultValue || { start: null, end: null });
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalRangePosition, setInternalRangePosition] = useState<RangePosition>('start');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  
  const currentValue = value || internalValue;
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const rangePosition = controlledRangePosition !== undefined ? controlledRangePosition : internalRangePosition;
  
  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (disabled || readOnly) return;
    
    setAnchorEl(event.currentTarget);
    if (controlledOpen === undefined) {
      setInternalOpen(true);
    }
    onOpen?.();
  }, [disabled, readOnly, controlledOpen, onOpen]);
  
  const handleClose = useCallback(() => {
    setAnchorEl(null);
    if (controlledOpen === undefined) {
      setInternalOpen(false);
    }
    onClose?.();
  }, [controlledOpen, onClose]);
  
  const handleDateChange = useCallback((date: Date, calendarIndex: number = 0) => {
    const newValue = { ...currentValue };
    
    if (rangePosition === 'start') {
      newValue.start = date;
      if (!newValue.end || date > newValue.end) {
        newValue.end = null;
      }
    } else {
      newValue.end = date;
      if (!newValue.start || date < newValue.start) {
        newValue.start = null;
      }
    }
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    
    // Auto-close if both dates are selected and closeOnSelect is true
    if (closeOnSelect && newValue.start && newValue.end) {
      onAccept?.(newValue);
      handleClose();
    }
  }, [currentValue, rangePosition, value, onChange, closeOnSelect, onAccept, handleClose]);
  
  const handleRangePositionChange = useCallback((position: RangePosition) => {
    if (controlledRangePosition === undefined) {
      setInternalRangePosition(position);
    }
    onRangePositionChange?.(position);
  }, [controlledRangePosition, onRangePositionChange]);
  
  const handleClear = useCallback(() => {
    const newValue = { start: null, end: null };
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [value, onChange]);
  
  const handleAccept = useCallback(() => {
    onAccept?.(currentValue);
    handleClose();
  }, [onAccept, currentValue, handleClose]);
  
  const displayValue = useMemo(() => {
    return formatDisplayValue(currentValue, format);
  }, [currentValue, format]);
  
  const hasValue = Boolean(currentValue.start || currentValue.end);
  
  const commonPickerProps = {
    open: isOpen,
    onClose: handleClose,
    currentValue,
    rangePosition,
    onRangePositionChange: handleRangePositionChange,
    onDateChange: handleDateChange,
    onAccept: handleAccept,
    onClear: handleClear,
    clearable,
    minDate,
    maxDate,
    disableFuture,
    disablePast,
    shouldDisableDate,
    showDaysOutsideCurrentMonth,
  };
  
  return (
    <>
      <DateInput
        value={displayValue}
        placeholder={placeholder}
        label={label}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        name={name}
        id={id}
        size={size}
        autoFocus={autoFocus}
        clearable={clearable}
        hasValue={hasValue}
        onOpen={handleOpen}
        onClear={handleClear}
        renderInput={renderInput}
        className={className}
      />
      
      {isMobile ? (
        <MobilePicker {...commonPickerProps} />
      ) : (
        <DesktopPicker
          {...commonPickerProps}
          anchorEl={anchorEl}
          calendars={calendars}
        />
      )}
    </>
  );
};