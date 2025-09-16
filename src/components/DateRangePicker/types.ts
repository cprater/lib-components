export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export type RangePosition = 'start' | 'end';

export interface DateRangePickerProps {
  /**
   * The selected date range value
   */
  value?: DateRange;
  /**
   * The default date range value
   */
  defaultValue?: DateRange;
  /**
   * Callback fired when the value changes
   */
  onChange?: (value: DateRange) => void;
  /**
   * Callback fired when the value is accepted
   */
  onAccept?: (value: DateRange) => void;
  /**
   * Callback fired when the popup requests to be closed
   */
  onClose?: () => void;
  /**
   * Callback fired when the popup requests to be opened
   */
  onOpen?: () => void;
  /**
   * The label for the input field
   */
  label?: string;
  /**
   * The placeholder text
   */
  placeholder?: string;
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
  /**
   * Whether the component is read-only
   */
  readOnly?: boolean;
  /**
   * Whether the component is required
   */
  required?: boolean;
  /**
   * Whether the component is in an error state
   */
  error?: boolean;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Helper text to display
   */
  helperText?: string;
  /**
   * The format for displaying dates
   */
  format?: string;
  /**
   * The minimum selectable date
   */
  minDate?: Date;
  /**
   * The maximum selectable date
   */
  maxDate?: Date;
  /**
   * Whether to disable future dates
   */
  disableFuture?: boolean;
  /**
   * Whether to disable past dates
   */
  disablePast?: boolean;
  /**
   * Function to determine if a date should be disabled
   */
  shouldDisableDate?: (date: Date, position: RangePosition) => boolean;
  /**
   * Whether the picker should close after selecting both dates
   */
  closeOnSelect?: boolean;
  /**
   * The number of calendars to show on desktop
   */
  calendars?: 1 | 2 | 3;
  /**
   * Whether to show days outside the current month
   */
  showDaysOutsideCurrentMonth?: boolean;
  /**
   * Whether to display week numbers
   */
  displayWeekNumber?: boolean;
  /**
   * The name attribute for the input
   */
  name?: string;
  /**
   * The id attribute for the input
   */
  id?: string;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Whether the picker is open (controlled)
   */
  open?: boolean;
  /**
   * The current position in the date range being edited
   */
  rangePosition?: RangePosition;
  /**
   * Callback fired when the range position changes
   */
  onRangePositionChange?: (position: RangePosition) => void;
  /**
   * Whether to auto-focus the component
   */
  autoFocus?: boolean;
  /**
   * The size of the input field
   */
  size?: 'small' | 'medium';
  /**
   * Whether to show the clear button
   */
  clearable?: boolean;
  /**
   * Custom render function for the input field
   */
  renderInput?: (props: any) => React.ReactNode;
}

export interface CalendarProps {
  date: Date;
  onDateChange: (date: Date) => void;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  rangePosition: RangePosition;
  onRangePositionChange: (position: RangePosition) => void;
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
  shouldDisableDate?: (date: Date, position: RangePosition) => boolean;
  showDaysOutsideCurrentMonth?: boolean;
}

export interface DateInputProps {
  value: string;
  placeholder: string;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  name?: string;
  id?: string;
  size?: 'small' | 'medium';
  autoFocus?: boolean;
  clearable?: boolean;
  hasValue: boolean;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onClear: () => void;
  renderInput?: (props: any) => React.ReactNode;
  className?: string;
}

export interface RangePositionIndicatorProps {
  rangePosition: RangePosition;
  onRangePositionChange: (position: RangePosition) => void;
}
