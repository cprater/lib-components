import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square', 'rounded'],
    },
    clickable: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fallback: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    alt: 'User avatar',
    fallback: 'John Doe',
  },
};

export const Small: Story = {
  args: {
    fallback: 'JD',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    fallback: 'John Doe',
    size: 'lg',
  },
};

export const Square: Story = {
  args: {
    fallback: 'John Doe',
    shape: 'square',
  },
};

export const Rounded: Story = {
  args: {
    fallback: 'John Doe',
    shape: 'rounded',
  },
};

export const Clickable: Story = {
  args: {
    fallback: 'John Doe',
    clickable: true,
    onClick: () => alert('Avatar clicked!'),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar fallback="XS" size="xs" />
      <Avatar fallback="SM" size="sm" />
      <Avatar fallback="MD" size="md" />
      <Avatar fallback="LG" size="lg" />
      <Avatar fallback="XL" size="xl" />
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar fallback="Circle" shape="circle" />
      <Avatar fallback="Square" shape="square" />
      <Avatar fallback="Rounded" shape="rounded" />
    </div>
  ),
};
