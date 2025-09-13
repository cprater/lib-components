// Basic Components
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

export { Input } from './components/Input';
export type { InputProps } from './components/Input';

export { Card, CardHeader, CardContent, CardFooter } from './components/Card';
export type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps } from './components/Card';

export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';

// Form Components
export { Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

export { Textarea } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';

// User Components
export { Avatar } from './components/Avatar';
export type { AvatarProps } from './components/Avatar';

export { UserCard } from './components/UserCard';
export type { UserCardProps, User as UserCardUser } from './components/UserCard';

// Football Pickem Components
export { LeagueCard } from './projects/FootballPickem/LeagueCard';
export type { LeagueCardProps, League } from './projects/FootballPickem/LeagueCard';

export { GameCard } from './projects/FootballPickem/GameCard';
export type { GameCardProps, Game, Team } from './projects/FootballPickem/GameCard';

// Feedback Components
export { Alert } from './components/Alert';
export type { AlertProps } from './components/Alert';

export { Loading } from './components/Loading';
export type { LoadingProps } from './components/Loading';

// Layout Components
export { Container } from './components/Container';
export type { ContainerProps } from './components/Container';

// Navigation Components
export { Header } from './components/Header';
export type { HeaderProps, User as HeaderUser } from './components/Header';

// Pick Components
export { PickForm } from './projects/FootballPickem/PickForm';
export type { PickFormProps, PickFormData } from './projects/FootballPickem/PickForm';

// Standings Components
export { StandingsTable } from './projects/FootballPickem/StandingsTable';
export type { StandingsTableProps, StandingsEntry } from './projects/FootballPickem/StandingsTable';

// Styles
import './styles/globals.css';
