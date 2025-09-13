# Lib Components

A modern TypeScript component library built with React and Storybook. This library provides a collection of reusable UI components with comprehensive documentation and examples.

## 🚀 Features

- **TypeScript Support**: Full TypeScript support with type definitions
- **Storybook Integration**: Interactive component documentation and testing
- **Modern CSS**: CSS custom properties and modern styling patterns
- **Accessible**: Built with accessibility best practices
- **Customizable**: Easy to theme and customize
- **Tree Shakeable**: Optimized for bundle size

## 📦 Components

### Button
A versatile button component with multiple variants and states.

```tsx
import { Button } from 'lib-components';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`  
**Sizes**: `sm`, `md`, `lg`  
**States**: `disabled`, `loading`

### Input
A form input component with validation states and helper text.

```tsx
import { Input } from 'lib-components';

<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  error={hasError}
  errorMessage="Please enter a valid email"
/>
```

**Types**: `text`, `email`, `password`, `number`, `tel`, `url`, `search`  
**Sizes**: `sm`, `md`, `lg`  
**States**: `disabled`, `error`, `required`

### Card
A flexible card component with header, content, and footer sections.

```tsx
import { Card, CardHeader, CardContent, CardFooter } from 'lib-components';

<Card variant="elevated">
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Variants**: `default`, `elevated`, `outlined`  
**Padding**: `none`, `sm`, `md`, `lg`  
**Interactive**: Hover and click states

### Badge
A small status indicator component for labels and notifications.

```tsx
import { Badge } from 'lib-components';

<Badge variant="success" size="md" rounded>
  Active
</Badge>
```

**Variants**: `default`, `primary`, `success`, `warning`, `error`, `info`  
**Sizes**: `sm`, `md`, `lg`  
**Options**: `rounded`

### Form Components

#### Select
A dropdown select component with options and validation.

```tsx
import { Select } from 'lib-components';

<Select
  label="Choose Team"
  options={teamOptions}
  value={selectedTeam}
  onChange={handleChange}
  placeholder="Select a team"
/>
```

#### Textarea
A multi-line text input component with auto-resize and character counting.

```tsx
import { Textarea } from 'lib-components';

<Textarea
  label="Description"
  placeholder="Enter description"
  rows={4}
  maxLength={500}
  autoResize
/>
```

### User Components

#### Avatar
A user avatar component with fallback initials and multiple sizes.

```tsx
import { Avatar } from 'lib-components';

<Avatar
  src={user.avatarUrl}
  fallback={user.name}
  size="lg"
  shape="circle"
/>
```

#### UserCard
A card component for displaying user information.

```tsx
import { UserCard } from 'lib-components';

<UserCard
  user={user}
  showDetails={true}
  clickable={true}
  onClick={handleUserClick}
/>
```

### Football Pickem Components

#### LeagueCard
A card component for displaying league information and actions.

```tsx
import { LeagueCard } from 'lib-components';

<LeagueCard
  league={league}
  showJoinButton={true}
  isMember={false}
  onJoin={handleJoinLeague}
/>
```

#### GameCard
A card component for displaying game information and picks.

```tsx
import { GameCard } from 'lib-components';

<GameCard
  game={game}
  showPickActions={true}
  hasPick={false}
  onPick={handleMakePick}
/>
```

#### PickForm
A form component for making game picks.

```tsx
import { PickForm } from 'lib-components';

<PickForm
  game={game}
  teams={teams}
  showConfidence={true}
  onSubmit={handleSubmitPick}
/>
```

#### StandingsTable
A table component for displaying league standings.

```tsx
import { StandingsTable } from 'lib-components';

<StandingsTable
  standings={standings}
  showAvatars={true}
  highlightCurrentUser={true}
/>
```

### Feedback Components

#### Alert
A notification component for displaying messages to users.

```tsx
import { Alert } from 'lib-components';

<Alert variant="success" dismissible onDismiss={handleDismiss}>
  Your pick has been submitted successfully!
</Alert>
```

#### Loading
A loading indicator component with multiple variants.

```tsx
import { Loading } from 'lib-components';

<Loading variant="spinner" size="lg" text="Loading your picks..." />
```

### Layout Components

#### Container
A responsive container component for page layout.

```tsx
import { Container } from 'lib-components';

<Container maxWidth="xl" padding="lg">
  <h1>Page Content</h1>
</Container>
```

### Navigation Components

#### Header
A navigation header component with branding and user actions.

```tsx
import { Header } from 'lib-components';

<Header
  title="Football Pickem"
  navItems={navItems}
  user={currentUser}
  isAuthenticated={true}
  onLogout={handleLogout}
/>
```

## 🛠️ Installation

### For Users

```bash
# Install the package
npm install @your-org/lib-components
```

```tsx
// Import components and styles
import { Button, Card, GameCard } from '@your-org/lib-components';
import '@your-org/lib-components/styles';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Card>Content</Card>
      <GameCard game={gameData} />
    </div>
  );
}
```

### For Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Build the library
npm run build

# Build Storybook
npm run build-storybook
```

## 🎨 Theming

The library uses CSS custom properties for easy theming. You can override the default values:

```css
:root {
  --primary-500: #your-color;
  --gray-100: #your-gray;
  --spacing-md: 1rem;
  --radius-md: 0.5rem;
}
```

## 📚 Storybook

This project includes Storybook for component development and documentation. To start Storybook:

```bash
npm run storybook
```

Storybook provides:
- Interactive component playground
- Documentation with examples
- Controls for testing different props
- Accessibility testing
- Visual regression testing

## 🧪 Development

### Project Structure

```
src/
├── components/          # Generic reusable components
│   ├── Button/
│   ├── Input/
│   ├── Card/
│   ├── Badge/
│   ├── Alert/
│   ├── Avatar/
│   ├── Select/
│   ├── Textarea/
│   ├── Loading/
│   ├── Container/
│   ├── Header/
│   └── UserCard/
├── projects/           # Project-specific components
│   └── FootballPickem/ # Football pickem domain components
│       ├── GameCard/
│       ├── LeagueCard/
│       ├── PickForm/
│       └── StandingsTable/
├── styles/             # Global styles and CSS variables
└── index.ts           # Main export file

.storybook/            # Storybook configuration
├── main.ts
└── preview.ts
```

### Component Organization

This library is organized into two main categories:

#### Generic Components (`src/components/`)
These are reusable UI components that can be used in any application:
- **Button, Input, Card, Badge** - Basic UI elements
- **Alert, Loading** - Feedback components  
- **Select, Textarea** - Form components
- **Avatar, UserCard** - User-related components
- **Container, Header** - Layout components

#### Project-Specific Components (`src/projects/`)
These contain domain-specific business logic and are organized by project:
- **FootballPickem** - Components specific to football pickem functionality
  - GameCard, LeagueCard, PickForm, StandingsTable

### Adding New Components

#### For Generic Components:
1. Create a new component directory in `src/components/`
2. Implement the component with TypeScript interfaces
3. Add CSS styles using the design system variables
4. Create an index file for exports
5. Add Storybook stories for documentation
6. Export from the main `src/index.ts` file

#### For Project-Specific Components:
1. Create a new project directory in `src/projects/` if it doesn't exist
2. Create the component directory within the project folder
3. Follow the same implementation steps as generic components
4. Update the main `src/index.ts` file to export from the new location
5. Update Storybook story titles to reflect the project organization

### Code Style

- Use TypeScript for all components
- Follow React best practices
- Use CSS custom properties for styling
- Include comprehensive prop documentation
- Write Storybook stories for all components

## 📝 Scripts

- `npm run build` - Build the TypeScript library
- `npm run dev` - Watch mode for development
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build static Storybook
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and stories
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- [Storybook Documentation](http://localhost:6006) (when running locally)
- [Component API Documentation](./docs/) (generated from Storybook)
