import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isAuthenticated: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleNavItems = [
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Leagues', href: '/leagues' },
  { label: 'Games', href: '/games' },
  { label: 'Standings', href: '/standings' },
];

const sampleUser = {
  id: 1,
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
};

export const Default: Story = {
  args: {
    title: 'Football Pickem',
    navItems: sampleNavItems,
  },
};

export const Authenticated: Story = {
  args: {
    title: 'Football Pickem',
    navItems: sampleNavItems,
    user: sampleUser,
    isAuthenticated: true,
    onLogout: () => alert('Logged out!'),
    onUserMenuClick: () => alert('User menu clicked!'),
  },
};

export const WithLogo: Story = {
  args: {
    title: 'Football Pickem',
    logoUrl: 'https://via.placeholder.com/32x32/3b82f6/ffffff?text=F',
    navItems: sampleNavItems,
    user: sampleUser,
    isAuthenticated: true,
  },
};

export const Minimal: Story = {
  args: {
    title: 'My App',
  },
};

export const WithLogin: Story = {
  args: {
    title: 'Football Pickem',
    navItems: sampleNavItems,
    onLogin: () => alert('Login clicked!'),
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Fantasy Football League',
    navItems: [
      { label: 'Home', href: '/', active: true },
      { label: 'My Teams', href: '/teams' },
      { label: 'Matchups', href: '/matchups' },
      { label: 'Trade', href: '/trade' },
    ],
    user: sampleUser,
    isAuthenticated: true,
  },
};

export const NoNavigation: Story = {
  args: {
    title: 'Simple App',
    user: sampleUser,
    isAuthenticated: true,
  },
};
