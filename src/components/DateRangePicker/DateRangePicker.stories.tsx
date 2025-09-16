import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker } from './DateRangePicker';
import { Box, Stack, Typography } from '@mui/material';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive date range picker component with desktop and mobile support, built using only base MUI components.',
      },
    },
  },
  argTypes: {
    value: {
      control: false,
      description: 'The selected date range value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the value changes',
    },
    onAccept: {
      action: 'accepted',
      description: 'Callback fired when the value is accepted',
    },
    onClose: {
      action: 'closed',
      description: 'Callback fired when the picker closes',
    },
    onOpen: {
      action: 'opened',
      description: 'Callback fired when the picker opens',
    },
    label: {
      control: 'text',
      description: 'The label for the input field',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the component is read-only',
    },
    required: {
      control: 'boolean',
      description: 'Whether the component is required',
    },
    error: {
      control: 'boolean',
      description: 'Whether the component is in an error state',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display',
    },
    format: {
      control: 'text',
      description: 'The format for displaying dates',
    },
    minDate: {
      control: 'date',
      description: 'The minimum selectable date',
    },
    maxDate: {
      control: 'date',
      description: 'The maximum selectable date',
    },
    disableFuture: {
      control: 'boolean',
      description: 'Whether to disable future dates',
    },
    disablePast: {
      control: 'boolean',
      description: 'Whether to disable past dates',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Whether the picker should close after selecting both dates',
    },
    calendars: {
      control: { type: 'select' },
      options: [1, 2, 3],
      description: 'The number of calendars to show on desktop',
    },
    showDaysOutsideCurrentMonth: {
      control: 'boolean',
      description: 'Whether to show days outside the current month',
    },
    displayWeekNumber: {
      control: 'boolean',
      description: 'Whether to display week numbers',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'The size of the input field',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show the clear button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: {
    label: 'Select Date Range',
    placeholder: 'Choose start and end dates',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Date Range',
    value: {
      start: new Date(2024, 0, 15),
      end: new Date(2024, 0, 25),
    },
  },
};

export const SingleCalendar: Story = {
  args: {
    label: 'Single Calendar',
    calendars: 1,
    placeholder: 'Select date range',
  },
};

export const ThreeCalendars: Story = {
  args: {
    label: 'Three Calendars',
    calendars: 3,
    placeholder: 'Select date range',
  },
};

export const WithMinMaxDates: Story = {
  args: {
    label: 'Restricted Date Range',
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2024, 11, 31),
    placeholder: 'Select date range (2024 only)',
  },
};

export const DisableFuture: Story = {
  args: {
    label: 'No Future Dates',
    disableFuture: true,
    placeholder: 'Select date range (past dates only)',
  },
};

export const DisablePast: Story = {
  args: {
    label: 'No Past Dates',
    disablePast: true,
    placeholder: 'Select date range (future dates only)',
  },
};

export const WithCustomFormat: Story = {
  args: {
    label: 'Custom Format',
    format: 'dd/MM/yyyy',
    placeholder: 'Select date range (DD/MM/YYYY)',
  },
};

export const WithValidation: Story = {
  args: {
    label: 'Required Date Range',
    required: true,
    error: false,
    helperText: 'Please select a date range',
    placeholder: 'Select date range',
  },
};

export const WithError: Story = {
  args: {
    label: 'Date Range with Error',
    error: true,
    errorMessage: 'Please select a valid date range',
    placeholder: 'Select date range',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Date Range',
    disabled: true,
    value: {
      start: new Date(2024, 0, 15),
      end: new Date(2024, 0, 25),
    },
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read Only Date Range',
    readOnly: true,
    value: {
      start: new Date(2024, 0, 15),
      end: new Date(2024, 0, 25),
    },
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Small Date Range Picker',
    size: 'small',
    placeholder: 'Select date range',
  },
};

export const NotClearable: Story = {
  args: {
    label: 'Not Clearable',
    clearable: false,
    value: {
      start: new Date(2024, 0, 15),
      end: new Date(2024, 0, 25),
    },
  },
};

export const ShowDaysOutsideMonth: Story = {
  args: {
    label: 'Show Days Outside Month',
    showDaysOutsideCurrentMonth: true,
    placeholder: 'Select date range',
  },
};

export const CustomShouldDisableDate: Story = {
  args: {
    label: 'Custom Disabled Dates',
    shouldDisableDate: (date: Date) => {
      // Disable weekends
      return date.getDay() === 0 || date.getDay() === 6;
    },
    placeholder: 'Select date range (weekdays only)',
  },
};

export const Controlled: Story = {
  args: {
    label: 'Controlled Date Range',
    open: false,
    rangePosition: 'start',
    placeholder: 'Select date range',
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const [rangePosition, setRangePosition] = React.useState<'start' | 'end'>('start');
    const [value, setValue] = React.useState<{ start: Date | null; end: Date | null }>({
      start: null,
      end: null,
    });

    return (
      <Box sx={{ width: 300 }}>
        <DateRangePicker
          {...args}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          rangePosition={rangePosition}
          onRangePositionChange={setRangePosition}
          value={value}
          onChange={setValue}
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Selected: {value.start?.toLocaleDateString()} - {value.end?.toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Position: {rangePosition}
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400 }}>
      <DateRangePicker
        label="Default"
        placeholder="Select date range"
      />
      <DateRangePicker
        label="With Value"
        value={{
          start: new Date(2024, 0, 15),
          end: new Date(2024, 0, 25),
        }}
      />
      <DateRangePicker
        label="Disabled"
        disabled
        value={{
          start: new Date(2024, 0, 15),
          end: new Date(2024, 0, 25),
        }}
      />
      <DateRangePicker
        label="Error State"
        error
        errorMessage="Please select a valid date range"
      />
      <DateRangePicker
        label="Small Size"
        size="small"
        placeholder="Select date range"
      />
    </Stack>
  ),
};
