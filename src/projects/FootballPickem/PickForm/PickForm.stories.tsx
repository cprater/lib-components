import type { Meta, StoryObj } from '@storybook/react';
import { PickForm, PickFormData } from './PickForm';
import { Game, Team } from '../GameCard';

const meta: Meta<typeof PickForm> = {
  title: 'Projects/FootballPickem/PickForm',
  component: PickForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    showConfidence: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleGame: Game = {
  id: 1,
  homeTeamId: 1,
  awayTeamId: 2,
  gameDate: '2024-01-21T18:00:00Z',
  week: 1,
  seasonYear: 2024,
  spread: -3.5,
  overUnder: 45.5,
  status: 'scheduled',
  homeTeam: {
    id: 1,
    name: 'Chiefs',
    city: 'Kansas City',
    abbreviation: 'KC',
    conference: 'AFC',
    division: 'West',
  },
  awayTeam: {
    id: 2,
    name: 'Bills',
    city: 'Buffalo',
    abbreviation: 'BUF',
    conference: 'AFC',
    division: 'East',
  },
};

const sampleTeams: Team[] = [
  {
    id: 1,
    name: 'Chiefs',
    city: 'Kansas City',
    abbreviation: 'KC',
    conference: 'AFC',
    division: 'West',
  },
  {
    id: 2,
    name: 'Bills',
    city: 'Buffalo',
    abbreviation: 'BUF',
    conference: 'AFC',
    division: 'East',
  },
];

export const Default: Story = {
  args: {
    game: sampleGame,
    teams: sampleTeams,
  },
};

export const WithoutConfidence: Story = {
  args: {
    game: sampleGame,
    teams: sampleTeams,
    showConfidence: false,
  },
};

export const Loading: Story = {
  args: {
    game: sampleGame,
    teams: sampleTeams,
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    game: sampleGame,
    teams: sampleTeams,
    disabled: true,
  },
};

export const WithActions: Story = {
  args: {
    game: sampleGame,
    teams: sampleTeams,
    onSubmit: (data: PickFormData) => alert(`Pick submitted: ${JSON.stringify(data, null, 2)}`),
    onCancel: () => alert('Pick cancelled'),
  },
};

export const WithCustomMaxConfidence: Story = {
  args: {
    game: sampleGame,
    teams: sampleTeams,
    maxConfidence: 10,
  },
};
