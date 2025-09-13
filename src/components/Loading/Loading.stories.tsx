import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['spinner', 'dots', 'pulse'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'white'],
    },
    overlay: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinner: Story = {
  args: {
    variant: 'spinner',
  },
};

export const Dots: Story = {
  args: {
    variant: 'dots',
  },
};

export const Pulse: Story = {
  args: {
    variant: 'pulse',
  },
};

export const WithText: Story = {
  args: {
    variant: 'spinner',
    text: 'Loading your picks...',
  },
};

export const Small: Story = {
  args: {
    variant: 'spinner',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    variant: 'spinner',
    size: 'lg',
  },
};

export const White: Story = {
  args: {
    variant: 'spinner',
    color: 'white',
    text: 'Loading...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Loading variant="spinner" text="Spinner" />
      <Loading variant="dots" text="Dots" />
      <Loading variant="pulse" text="Pulse" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Loading variant="spinner" size="sm" text="Small" />
      <Loading variant="spinner" size="md" text="Medium" />
      <Loading variant="spinner" size="lg" text="Large" />
      <Loading variant="spinner" size="xl" text="Extra Large" />
    </div>
  ),
};
