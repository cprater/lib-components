# Football Pickem Components

This directory contains components that are specific to the Football Pickem application domain. These components are not generic and contain business logic and data structures specific to football pickem functionality.

## Components

### GameCard
Displays NFL game information including teams, scores, spreads, and over/under lines. Includes functionality for making picks on games.

**Key Features:**
- Team information display (NFL teams with conferences/divisions)
- Game status tracking (scheduled, in_progress, final)
- Pick functionality (spread, over/under, straight)
- Confidence points system

### LeagueCard
Displays fantasy football league information including participant details, scoring types, and entry fees.

**Key Features:**
- League management (commissioner, participants, entry fees)
- Football-specific scoring types (confidence, straight, survivor)
- Season-based organization
- Public/private league indicators

### PickForm
Form component for making picks on specific games with team selection and confidence points.

**Key Features:**
- Team selection for specific games
- Pick type selection (spread, over/under, straight)
- Confidence points assignment
- Form validation

### StandingsTable
Displays league standings with pick-based scoring and participant rankings.

**Key Features:**
- Pick-based scoring (correct picks, confidence points)
- Win percentage calculations
- League participant rankings
- User highlighting

## Usage

These components are exported from the main library index and can be imported like:

```typescript
import { GameCard, LeagueCard, PickForm, StandingsTable } from 'lib-components';
```

## Dependencies

These components depend on the generic components in `../../components/`:
- Badge
- Button
- Alert
- Select
- Avatar

## Data Types

The components use domain-specific interfaces:
- `Team` - NFL team information
- `Game` - Football game data
- `League` - Fantasy league information
- `StandingsEntry` - User standings data
- `PickFormData` - Pick submission data
