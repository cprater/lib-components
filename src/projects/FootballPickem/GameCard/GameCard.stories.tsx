import type { Meta, StoryObj } from '@storybook/react';
import { GameCard } from './GameCard';

const meta: Meta<typeof GameCard> = {
  title: 'Projects/FootballPickem/GameCard',
  component: GameCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showPickActions: {
      control: { type: 'boolean' },
    },
    hasPick: {
      control: { type: 'boolean' },
    },
    clickable: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleGame = {
  id: 1,
  homeTeamId: 1,
  awayTeamId: 2,
  gameDate: '2024-01-21T18:00:00Z',
  week: 1,
  seasonYear: 2024,
  spread: -3.5,
  overUnder: 45.5,
  status: 'scheduled' as const,
  homeTeam: {
    id: 1,
    name: 'Chiefs',
    city: 'Kansas City',
    abbreviation: 'KC',
    conference: 'AFC' as const,
    division: 'West',
    logoUrl: undefined,
  },
  awayTeam: {
    id: 2,
    name: 'Bills',
    city: 'Buffalo',
    abbreviation: 'BUF',
    conference: 'AFC' as const,
    division: 'East',
    logoUrl: undefined,
  },
};

const liveGame = {
  ...sampleGame,
  id: 2,
  status: 'in_progress' as const,
  homeScore: 14,
  awayScore: 10,
  homeTeam: {
    ...sampleGame.homeTeam,
    name: 'Cowboys',
    city: 'Dallas',
    abbreviation: 'DAL',
  },
  awayTeam: {
    ...sampleGame.awayTeam,
    name: 'Packers',
    city: 'Green Bay',
    abbreviation: 'GB',
  },
};

const finalGame = {
  ...sampleGame,
  id: 3,
  status: 'final' as const,
  homeScore: 28,
  awayScore: 24,
  homeTeam: {
    ...sampleGame.homeTeam,
    name: 'Rams',
    city: 'Los Angeles',
    abbreviation: 'LAR',
  },
  awayTeam: {
    ...sampleGame.awayTeam,
    name: '49ers',
    city: 'San Francisco',
    abbreviation: 'SF',
  },
};

export const Default: Story = {
  args: {
    game: sampleGame,
  },
};

export const Live: Story = {
  args: {
    game: liveGame,
  },
};

export const Final: Story = {
  args: {
    game: finalGame,
  },
};

export const WithPickActions: Story = {
  args: {
    game: sampleGame,
    showPickActions: true,
  },
};

export const WithExistingPick: Story = {
  args: {
    game: sampleGame,
    showPickActions: true,
    hasPick: true,
    userPick: {
      pickedTeamId: 1,
      pickType: 'spread',
      confidencePoints: 8,
    },
  },
};

export const Clickable: Story = {
  args: {
    game: sampleGame,
    clickable: true,
    onClick: (game) => alert(`Clicked on game: ${game.awayTeam?.abbreviation} @ ${game.homeTeam?.abbreviation}`),
  },
};

export const WithPickAction: Story = {
  args: {
    game: sampleGame,
    showPickActions: true,
    onPick: (game) => alert(`Making pick for game: ${game.awayTeam?.abbreviation} @ ${game.homeTeam?.abbreviation}`),
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <GameCard game={sampleGame} showPickActions={true} />
      <GameCard game={liveGame} showPickActions={true} />
      <GameCard game={finalGame} showPickActions={true} />
    </div>
  ),
};
