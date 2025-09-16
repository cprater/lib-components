import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { CalendarProps } from './types';
import {
  MONTHS,
  WEEKDAYS,
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
  isDateInRange,
  isDateDisabled,
} from './utils';

export const Calendar: React.FC<CalendarProps> = ({
  date,
  onDateChange,
  selectedStart,
  selectedEnd,
  rangePosition,
  onRangePositionChange,
  minDate,
  maxDate,
  disableFuture,
  disablePast,
  shouldDisableDate,
  showDaysOutsideCurrentMonth = false,
}) => {
  const daysInMonth = getDaysInMonth(date);
  const firstDay = getFirstDayOfMonth(date);
  const today = new Date();
  
  const handleDateClick = (day: number, isCurrentMonth: boolean = true) => {
    if (!isCurrentMonth && !showDaysOutsideCurrentMonth) return;
    
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), day);
    
    if (isDateDisabled(clickedDate, minDate, maxDate, disableFuture, disablePast, shouldDisableDate, rangePosition)) {
      return;
    }
    
    if (rangePosition === 'start') {
      if (!selectedEnd || clickedDate <= selectedEnd) {
        onDateChange(clickedDate);
        onRangePositionChange('end');
      } else {
        onDateChange(clickedDate);
        onRangePositionChange('end');
      }
    } else {
      if (!selectedStart || clickedDate >= selectedStart) {
        onDateChange(clickedDate);
        onRangePositionChange('start');
      } else {
        onDateChange(clickedDate);
        onRangePositionChange('start');
      }
    }
  };
  
  const renderDay = (day: number, isCurrentMonth: boolean = true) => {
    const dayDate = new Date(date.getFullYear(), date.getMonth(), day);
    const isToday = isSameDay(dayDate, today);
    const isSelectedStart = isSameDay(dayDate, selectedStart);
    const isSelectedEnd = isSameDay(dayDate, selectedEnd);
    const isInRange = isDateInRange(dayDate, selectedStart, selectedEnd);
    const isDisabled = isDateDisabled(dayDate, minDate, maxDate, disableFuture, disablePast, shouldDisableDate, rangePosition);
    
    return (
      <Box
        key={day}
        sx={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          borderRadius: '50%',
          position: 'relative',
          backgroundColor: isSelectedStart || isSelectedEnd ? 'primary.main' : 
                          isInRange ? 'primary.light' : 'transparent',
          color: isSelectedStart || isSelectedEnd ? 'primary.contrastText' :
                 isInRange ? 'primary.dark' :
                 isDisabled ? 'text.disabled' :
                 !isCurrentMonth ? 'text.disabled' : 'text.primary',
          opacity: !isCurrentMonth && !showDaysOutsideCurrentMonth ? 0.3 : 1,
          ...(isDisabled ? {} : {
            '&:hover': {
              backgroundColor: isSelectedStart || isSelectedEnd ? 'primary.dark' : 'action.hover',
            },
          }),
          ...(isToday && {
            border: '2px solid',
            borderColor: 'primary.main',
          }),
        }}
        onClick={() => handleDateClick(day, isCurrentMonth)}
      >
        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
          {day}
        </Typography>
      </Box>
    );
  };
  
  const renderCalendarDays = () => {
    const days = [];
    
    // Previous month days
    if (showDaysOutsideCurrentMonth) {
      const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 0);
      const daysInPrevMonth = prevMonth.getDate();
      
      for (let i = firstDay - 1; i >= 0; i--) {
        days.push(renderDay(daysInPrevMonth - i, false));
      }
    } else {
      for (let i = 0; i < firstDay; i++) {
        days.push(<Box key={`empty-${i}`} sx={{ width: 32, height: 32 }} />);
      }
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(renderDay(day, true));
    }
    
    // Next month days
    if (showDaysOutsideCurrentMonth) {
      const remainingDays = 42 - days.length; // 6 weeks * 7 days
      for (let day = 1; day <= remainingDays; day++) {
        days.push(renderDay(day, false));
      }
    }
    
    return days;
  };
  
  return (
    <Box sx={{ minWidth: 280 }}>
      {/* Calendar Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          {MONTHS[date.getMonth()]} {date.getFullYear()}
        </Typography>
        <Box>
          <IconButton
            size="small"
            onClick={() => onDateChange(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDateChange(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
      
      {/* Weekday Headers */}
      <Box sx={{ display: 'flex', mb: 1 }}>
        {WEEKDAYS.map((day) => (
          <Box key={day} sx={{ flex: 1, textAlign: 'center', py: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {day}
            </Typography>
          </Box>
        ))}
      </Box>
      
      {/* Calendar Days */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {renderCalendarDays().map((day, index) => (
          <Box key={index} sx={{ width: '14.28%', display: 'flex', justifyContent: 'center' }}>
            {day}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
