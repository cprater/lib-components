import { DateRange, RangePosition } from './types';

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const formatDate = (date: Date | null, format: string = 'MM/dd/yyyy'): string => {
  if (!date) return '';
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return format
    .replace('MM', month)
    .replace('dd', day)
    .replace('yyyy', year.toString())
    .replace('M', (date.getMonth() + 1).toString())
    .replace('d', date.getDate().toString())
    .replace('yy', year.toString().slice(-2));
};

export const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  
  // Try different date formats
  const formats = [
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, // MM/dd/yyyy
    /^(\d{4})-(\d{1,2})-(\d{1,2})$/, // yyyy-MM-dd
    /^(\d{1,2})-(\d{1,2})-(\d{4})$/, // MM-dd-yyyy
  ];
  
  for (const format of formats) {
    const match = dateString.match(format);
    if (match) {
      const [, part1, part2, part3] = match;
      let month, day, year;
      
      if (format === formats[0]) { // MM/dd/yyyy
        month = parseInt(part1) - 1;
        day = parseInt(part2);
        year = parseInt(part3);
      } else if (format === formats[1]) { // yyyy-MM-dd
        year = parseInt(part1);
        month = parseInt(part2) - 1;
        day = parseInt(part3);
      } else { // MM-dd-yyyy
        month = parseInt(part1) - 1;
        day = parseInt(part2);
        year = parseInt(part3);
      }
      
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
  }
  
  return null;
};

export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

export const isDateInRange = (date: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false;
  return date >= start && date <= end;
};

export const isDateDisabled = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disableFuture?: boolean,
  disablePast?: boolean,
  shouldDisableDate?: (date: Date, position: RangePosition) => boolean,
  position: RangePosition = 'start'
): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (disableFuture && date > today) return true;
  if (disablePast && date < today) return true;
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  if (shouldDisableDate && shouldDisableDate(date, position)) return true;
  
  return false;
};

export const formatDisplayValue = (value: DateRange, format: string): string => {
  if (!value.start && !value.end) return '';
  
  const startStr = formatDate(value.start, format);
  const endStr = formatDate(value.end, format);
  
  if (value.start && value.end) {
    return `${startStr} - ${endStr}`;
  } else if (value.start) {
    return `${startStr} - `;
  } else if (value.end) {
    return ` - ${endStr}`;
  }
  
  return '';
};
