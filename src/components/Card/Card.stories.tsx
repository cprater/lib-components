import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
    },
    interactive: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a simple card with default styling.',
  },
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Card Title</h3>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, color: 'var(--gray-600)' }}>
          This is the card content. It can contain any React elements.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardContent>
        <p style={{ margin: 0, color: 'var(--gray-600)' }}>
          This card has a footer with action buttons.
        </p>
      </CardContent>
      <CardFooter>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Save</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

export const Complete: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Project Card</h3>
          <Badge variant="success">Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--gray-600)' }}>
          This is a complete card example with header, content, and footer sections.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge variant="primary">React</Badge>
          <Badge variant="default">TypeScript</Badge>
          <Badge variant="info">Storybook</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="outline" size="sm">View</Button>
          <Button variant="outline" size="sm">Edit</Button>
          <Button size="sm">Share</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'This card has an elevated shadow effect.',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'This card has a prominent border outline.',
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    children: 'This card is interactive and responds to hover and click events.',
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <div style={{ padding: '1rem' }}>
        This card has no default padding, so we add it manually to the content.
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: 'This card has small padding.',
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: 'This card has large padding.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card variant="default" style={{ width: '200px' }}>
        <CardContent>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Default</h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--gray-600)' }}>
            Standard card with subtle border
          </p>
        </CardContent>
      </Card>
      <Card variant="elevated" style={{ width: '200px' }}>
        <CardContent>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Elevated</h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--gray-600)' }}>
            Card with shadow elevation
          </p>
        </CardContent>
      </Card>
      <Card variant="outlined" style={{ width: '200px' }}>
        <CardContent>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Outlined</h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--gray-600)' }}>
            Card with prominent border
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};
