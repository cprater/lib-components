import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Wrapper component for interactive stories
const ModalWrapper = ({ children, ...props }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...props} open={open} onClose={() => setOpen(false)}>
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This is the default modal content. You can put any content here.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Modal Title',
    size: 'md',
    showCloseButton: true,
    closeOnBackdropClick: true,
  },
};

export const WithTitle: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This modal has a title in the header.</p>
      <p>You can add multiple paragraphs of content.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Welcome to the Modal',
    size: 'md',
  },
};

export const NoCloseButton: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This modal doesn't have a close button.</p>
      <p>You can only close it by clicking outside (if enabled) or pressing Escape.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'No Close Button',
    showCloseButton: false,
    size: 'md',
  },
};

export const NoBackdropClose: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This modal cannot be closed by clicking the backdrop.</p>
      <p>You must use the close button or press Escape.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Persistent Modal',
    closeOnBackdropClick: false,
    size: 'md',
  },
};

export const SmallSize: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This is a small modal.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Small Modal',
    size: 'sm',
  },
};

export const MediumSize: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This is a medium-sized modal (default).</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Medium Modal',
    size: 'md',
  },
};

export const LargeSize: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This is a large modal with more space for content.</p>
      <p>Perfect for forms or detailed information.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Large Modal',
    size: 'lg',
  },
};

export const ExtraLargeSize: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This is an extra-large modal.</p>
      <p>Great for complex layouts or data tables.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Extra Large Modal',
    size: 'xl',
  },
};

export const WithForm: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <form>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>
            Name
          </label>
          <input
            id="name"
            type="text"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '8px' }}>
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>
    </ModalWrapper>
  ),
  args: {
    title: 'Contact Form',
    size: 'md',
  },
};

export const LongContent: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <h3>Terms and Conditions</h3>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      ))}
    </ModalWrapper>
  ),
  args: {
    title: 'Long Scrollable Content',
    size: 'md',
  },
};

