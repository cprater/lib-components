import type { Meta, StoryObj } from '@storybook/react';
import { LeagueCard, League } from './LeagueCard';

const meta: Meta<typeof LeagueCard> = {
  title: 'Projects/FootballPickem/LeagueCard',
  component: LeagueCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    clickable: {
      control: { type: 'boolean' },
    },
    showJoinButton: {
      control: { type: 'boolean' },
    },
    isMember: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleLeague = {
  id: 1,
  name: 'Fantasy Football Champions',
  description: 'A competitive league for serious fantasy football players. Winner takes all!',
  commissionerId: 1,
  isPublic: true,
  maxParticipants: 12,
  entryFee: 50.00,
  scoringType: 'confidence' as const,
  seasonYear: 2024,
  isActive: true,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
  currentParticipants: 8,
  commissioner: {
    id: 1,
    username: 'commissioner_joe'
  }
};

const privateLeague = {
  ...sampleLeague,
  id: 2,
  name: 'Private League',
  description: 'Invite only league for friends and family.',
  isPublic: false,
  entryFee: 25.00,
  scoringType: 'straight' as const,
  currentParticipants: 6,
};

const fullLeague = {
  ...sampleLeague,
  id: 3,
  name: 'Full League',
  description: 'This league is at maximum capacity.',
  currentParticipants: 12,
};

export const Default: Story = {
  args: {
    league: sampleLeague,
  },
};

export const Private: Story = {
  args: {
    league: privateLeague,
  },
};

export const Full: Story = {
  args: {
    league: fullLeague,
    showJoinButton: true,
  },
};

export const WithJoinButton: Story = {
  args: {
    league: sampleLeague,
    showJoinButton: true,
  },
};

export const AsMember: Story = {
  args: {
    league: sampleLeague,
    showJoinButton: true,
    isMember: true,
  },
};

export const Clickable: Story = {
  args: {
    league: sampleLeague,
    clickable: true,
    onClick: (league: League) => alert(`Clicked on league: ${league.name}`),
  },
};

export const WithJoinAction: Story = {
  args: {
    league: sampleLeague,
    showJoinButton: true,
    onJoin: (league: League) => alert(`Joining league: ${league.name}`),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <LeagueCard league={sampleLeague} showJoinButton={true} />
      <LeagueCard league={privateLeague} showJoinButton={true} />
      <LeagueCard league={fullLeague} showJoinButton={true} />
    </div>
  ),
};
