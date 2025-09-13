import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    dismissible: {
      control: { type: 'boolean' },
    },
    showIcon: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    children: 'This is an informational alert message.',
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    children: 'Your pick has been successfully submitted!',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning: The game deadline is approaching. Make your picks soon!',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'Error: Unable to submit your pick. Please try again.',
    variant: 'error',
  },
};

export const Dismissible: Story = {
  args: {
    children: 'This alert can be dismissed by clicking the × button.',
    variant: 'info',
    dismissible: true,
    onDismiss: () => alert('Alert dismissed!'),
  },
};

export const WithoutIcon: Story = {
  args: {
    children: 'This alert does not have an icon.',
    variant: 'info',
    showIcon: false,
  },
};

export const Small: Story = {
  args: {
    children: 'Small alert message.',
    variant: 'info',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'This is a large alert message with more detailed information.',
    variant: 'info',
    size: 'lg',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <Alert variant="info">This is an informational alert.</Alert>
      <Alert variant="success">This is a success alert.</Alert>
      <Alert variant="warning">This is a warning alert.</Alert>
      <Alert variant="error">This is an error alert.</Alert>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <Alert variant="info" size="sm">Small alert message.</Alert>
      <Alert variant="info" size="md">Medium alert message.</Alert>
      <Alert variant="info" size="lg">Large alert message with more content.</Alert>
    </div>
  ),
};
