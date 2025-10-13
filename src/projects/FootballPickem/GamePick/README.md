# GamePick Component

An interactive game pick component for the Football Pick'em project. Allows users to make picks by clicking directly on team names, with support for locked and results states.

## Features

- **Interactive Picking**: Click on team names/logos to make picks
- **Visual Feedback**: Clear indication of which team is picked
- **Locked State**: Prevents picks when game has started or deadline passed
- **Results State**: Shows final scores, winner highlighting, and whether user's pick was correct
- **Responsive**: Works well on mobile and desktop
- **Accessible**: Keyboard navigation support

## Usage

```tsx
import { GamePick } from '@your-org/lib-components/projects/FootballPickem';

// Basic usage - open for picking
<GamePick
  game={gameData}
  onPickTeam={(teamId) => handlePick(teamId)}
/>

// With existing pick
<GamePick
  game={gameData}
  userPick={{ pickedTeamId: 2 }}
  onPickTeam={(teamId) => handlePick(teamId)}
/>

// Locked state (game started)
<GamePick
  game={gameData}
  userPick={{ pickedTeamId: 2 }}
  locked={true}
/>

// Results state (game finished)
<GamePick
  game={{
    ...gameData,
    homeScore: 28,
    awayScore: 31
  }}
  userPick={{
    pickedTeamId: 2,
    isCorrect: true
  }}
  showResults={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `game` | `GamePickData` | *required* | Game data including teams, date, and scores |
| `userPick` | `UserPick` | `undefined` | The user's pick for this game |
| `locked` | `boolean` | `false` | Whether picks are locked (deadline passed) |
| `showResults` | `boolean` | `false` | Whether to show results (game finished) |
| `onPickTeam` | `(teamId: number) => void` | `undefined` | Handler called when user clicks a team |
| `className` | `string` | `''` | Additional CSS class name |

## Types

```typescript
interface GamePickData {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  gameDate: string;
  week: number;
  homeScore?: number;
  awayScore?: number;
  homeTeam?: Team;
  awayTeam?: Team;
}

interface UserPick {
  pickedTeamId: number;
  isCorrect?: boolean;
}

interface Team {
  id: number;
  name: string;
  city: string;
  abbreviation: string;
  conference: 'AFC' | 'NFC';
  division: string;
  logoUrl?: string;
}
```

## States

### Open for Picking
- Teams are clickable
- Hover effects on teams
- Pick indicator (✓) shows on selected team

### Locked
- Teams are not clickable
- Shows 🔒 Locked badge
- User's previous pick is still visible

### Results
- Shows final scores
- Winner is highlighted with green background
- Loser has reduced opacity
- Badge shows whether user was correct (✓ Correct / ✗ Incorrect)

## Styling

The component uses CSS custom properties for theming. Key variables:

- `--primary-*`: Primary color variants
- `--success-*`: Success state colors
- `--error-*`: Error state colors
- `--gray-*`: Gray scale
- `--spacing-*`: Spacing scale
- `--radius-*`: Border radius values
- `--font-size-*`: Typography scale

## Accessibility

- Keyboard navigable (Tab key)
- Enter/Space to select team
- Proper ARIA roles
- Focus indicators
- Semantic HTML

## Examples

Check out the Storybook stories for interactive examples:
- Default state
- With pick
- Locked state
- Results (correct/incorrect)
- All states demo

