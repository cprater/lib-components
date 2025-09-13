import type { Meta, StoryObj } from '@storybook/react';
import { StandingsTable, StandingsEntry } from './StandingsTable';

const meta: Meta<typeof StandingsTable> = {
  title: 'Projects/FootballPickem/StandingsTable',
  component: StandingsTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showAvatars: {
      control: { type: 'boolean' },
    },
    highlightCurrentUser: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleStandings = [
  {
    userId: 1,
    username: 'champion_joe',
    firstName: 'Joe',
    lastName: 'Champion',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    correctPicks: 12,
    totalPicks: 16,
    confidencePoints: 156,
    winPercentage: 0.75,
    rank: 1,
  },
  {
    userId: 2,
    username: 'football_fan',
    firstName: 'Sarah',
    lastName: 'Johnson',
    correctPicks: 11,
    totalPicks: 16,
    confidencePoints: 142,
    winPercentage: 0.6875,
    rank: 2,
  },
  {
    userId: 3,
    username: 'pick_master',
    firstName: 'Mike',
    lastName: 'Smith',
    correctPicks: 10,
    totalPicks: 16,
    confidencePoints: 128,
    winPercentage: 0.625,
    rank: 3,
  },
  {
    userId: 4,
    username: 'current_user',
    firstName: 'Current',
    lastName: 'User',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    correctPicks: 9,
    totalPicks: 16,
    confidencePoints: 115,
    winPercentage: 0.5625,
    rank: 4,
    isCurrentUser: true,
  },
  {
    userId: 5,
    username: 'rookie_picker',
    firstName: 'Alex',
    lastName: 'Brown',
    correctPicks: 8,
    totalPicks: 16,
    confidencePoints: 98,
    winPercentage: 0.5,
    rank: 5,
  },
];

export const Default: Story = {
  args: {
    standings: sampleStandings,
  },
};

export const WithoutAvatars: Story = {
  args: {
    standings: sampleStandings,
    showAvatars: false,
  },
};

export const WithoutCurrentUserHighlight: Story = {
  args: {
    standings: sampleStandings,
    highlightCurrentUser: false,
  },
};

export const Loading: Story = {
  args: {
    standings: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    standings: [],
  },
};

export const WithRowClick: Story = {
  args: {
    standings: sampleStandings,
    onRowClick: (entry: StandingsEntry) => alert(`Clicked on ${entry.firstName} ${entry.lastName} (${entry.username})`),
  },
};

export const SmallLeague: Story = {
  args: {
    standings: sampleStandings.slice(0, 3),
  },
};

export const LargeLeague: Story = {
  args: {
    standings: [
      ...sampleStandings,
      {
        userId: 6,
        username: 'player_6',
        firstName: 'Emma',
        lastName: 'Wilson',
        correctPicks: 7,
        totalPicks: 16,
        confidencePoints: 85,
        winPercentage: 0.4375,
        rank: 6,
      },
      {
        userId: 7,
        username: 'player_7',
        firstName: 'David',
        lastName: 'Lee',
        correctPicks: 6,
        totalPicks: 16,
        confidencePoints: 72,
        winPercentage: 0.375,
        rank: 7,
      },
      {
        userId: 8,
        username: 'player_8',
        firstName: 'Lisa',
        lastName: 'Garcia',
        correctPicks: 5,
        totalPicks: 16,
        confidencePoints: 58,
        winPercentage: 0.3125,
        rank: 8,
      },
    ],
  },
};
