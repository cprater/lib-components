import type { Meta, StoryObj } from '@storybook/react';
import { GamePick } from './GamePick';

const meta: Meta<typeof GamePick> = {
  title: 'Projects/FootballPickem/GamePick',
  component: GamePick,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    locked: {
      control: { type: 'boolean' },
      description: 'Whether picks are locked (game started or deadline passed)',
    },
    showResults: {
      control: { type: 'boolean' },
      description: 'Whether to show results (game finished)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseGame = {
  id: 1,
  homeTeamId: 1,
  awayTeamId: 2,
  gameDatetime: '2024-01-21T18:00:00Z',
  week: 1,
  homeTeam: {
    id: 1,
    name: 'Chiefs',
    city: 'Kansas City',
    abbreviation: 'KC',
    conference: 'AFC' as const,
    division: 'West',
    logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png',
  },
  awayTeam: {
    id: 2,
    name: 'Bills',
    city: 'Buffalo',
    abbreviation: 'BUF',
    conference: 'AFC' as const,
    division: 'East',
    logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png',
  },
};

/**
 * Default state - no pick made yet, game open for picking
 */
export const Default: Story = {
  args: {
    game: baseGame,
  },
};

/**
 * User has made a pick (selected away team)
 */
export const WithPick: Story = {
  args: {
    game: baseGame,
    userPick: {
      pickedTeamId: 2, // Buffalo Bills
    },
  },
};

/**
 * User has made a pick (selected home team)
 */
export const WithHomePick: Story = {
  args: {
    game: baseGame,
    userPick: {
      pickedTeamId: 1, // Kansas City Chiefs
    },
  },
};

/**
 * Game is locked (deadline passed or game started)
 */
export const Locked: Story = {
  args: {
    game: baseGame,
    userPick: {
      pickedTeamId: 2,
    },
    locked: true,
  },
};

/**
 * Game finished - user picked correctly
 */
export const ResultsCorrect: Story = {
  args: {
    game: {
      ...baseGame,
      homeScore: 28,
      awayScore: 31, // Away team won
    },
    userPick: {
      pickedTeamId: 2, // Picked away team (correct)
      isCorrect: true,
    },
    showResults: true,
  },
};

/**
 * Game finished - user picked incorrectly
 */
export const ResultsIncorrect: Story = {
  args: {
    game: {
      ...baseGame,
      homeScore: 31,
      awayScore: 28, // Home team won
    },
    userPick: {
      pickedTeamId: 2, // Picked away team (incorrect)
      isCorrect: false,
    },
    showResults: true,
  },
};

/**
 * Game finished - user didn't make a pick
 */
export const ResultsNoPick: Story = {
  args: {
    game: {
      ...baseGame,
      homeScore: 24,
      awayScore: 21,
    },
    showResults: true,
  },
};

/**
 * Multiple states shown together
 */
export const AllStates: Story = {
  render: () => {
    const game1 = baseGame;
    const game2 = {
      ...baseGame,
      id: 2,
      week: 2,
      homeTeam: {
        id: 3,
        name: 'Cowboys',
        city: 'Dallas',
        abbreviation: 'DAL',
        conference: 'NFC' as const,
        division: 'East',
        logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png',
      },
      awayTeam: {
        id: 4,
        name: 'Eagles',
        city: 'Philadelphia',
        abbreviation: 'PHI',
        conference: 'NFC' as const,
        division: 'East',
        logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/phi.png',
      },
    };
    const game3 = {
      ...baseGame,
      id: 3,
      week: 3,
      homeScore: 27,
      awayScore: 24,
      homeTeam: {
        id: 5,
        name: '49ers',
        city: 'San Francisco',
        abbreviation: 'SF',
        conference: 'NFC' as const,
        division: 'West',
        logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/sf.png',
      },
      awayTeam: {
        id: 6,
        name: 'Packers',
        city: 'Green Bay',
        abbreviation: 'GB',
        conference: 'NFC' as const,
        division: 'North',
        logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/gb.png',
      },
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '500px' }}>
        <div>
          <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Open for Picking</h4>
          <GamePick game={game1} />
        </div>
        
        <div>
          <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Pick Made</h4>
          <GamePick 
            game={game1} 
            userPick={{ pickedTeamId: 2 }}
          />
        </div>
        
        <div>
          <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Locked</h4>
          <GamePick 
            game={game2} 
            userPick={{ pickedTeamId: 3 }}
            locked={true}
          />
        </div>
        
        <div>
          <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Results - Correct</h4>
          <GamePick 
            game={game3}
            userPick={{ pickedTeamId: 5, isCorrect: true }}
            showResults={true}
          />
        </div>
        
        <div>
          <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Results - Incorrect</h4>
          <GamePick 
            game={game3}
            userPick={{ pickedTeamId: 6, isCorrect: false }}
            showResults={true}
          />
        </div>
      </div>
    );
  },
};

/**
 * Interactive example with click handling
 */
export const Interactive: Story = {
  args: {
    game: baseGame,
    onPickTeam: (teamId: number) => {
      const team = teamId === baseGame.homeTeamId ? baseGame.homeTeam : baseGame.awayTeam;
      alert(`You picked: ${team?.city} ${team?.name}`);
    },
  },
};

