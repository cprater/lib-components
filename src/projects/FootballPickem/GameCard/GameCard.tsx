import React from 'react';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import './GameCard.css';

export interface Team {
  id: number;
  name: string;
  city: string;
  abbreviation: string;
  conference: 'AFC' | 'NFC';
  division: string;
  logoUrl?: string;
}

export interface Game {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  gameDate: string;
  week: number;
  seasonYear: number;
  homeScore?: number;
  awayScore?: number;
  spread?: number;
  overUnder?: number;
  status: 'scheduled' | 'in_progress' | 'final';
  homeTeam?: Team;
  awayTeam?: Team;
}

export interface GameCardProps {
  /**
   * The game data to display
   */
  game: Game;
  /**
   * Whether to show pick functionality
   */
  showPickActions?: boolean;
  /**
   * Whether user has already made a pick for this game
   */
  hasPick?: boolean;
  /**
   * The user's pick (if any)
   */
  userPick?: {
    pickedTeamId: number;
    pickType: 'spread' | 'over_under' | 'straight';
    confidencePoints?: number;
  };
  /**
   * Pick button click handler
   */
  onPick?: (game: Game) => void;
  /**
   * Whether the card is clickable
   */
  clickable?: boolean;
  /**
   * Click handler
   */
  onClick?: (game: Game) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  showPickActions = false,
  hasPick = false,
  userPick,
  onPick,
  clickable = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'game-card';
  const clickableClasses = clickable ? 'game-card--clickable' : '';

  const classes = [baseClasses, clickableClasses, className]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (clickable && onClick) {
      onClick(game);
    }
  };

  const handlePickClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPick) {
      onPick(game);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'info';
      case 'in_progress': return 'warning';
      case 'final': return 'success';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Scheduled';
      case 'in_progress': return 'Live';
      case 'final': return 'Final';
      default: return status;
    }
  };

  const formatGameTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getPickTypeLabel = (type: string) => {
    switch (type) {
      case 'spread': return 'Spread';
      case 'over_under': return 'Over/Under';
      case 'straight': return 'Straight';
      default: return type;
    }
  };

  const isGameStarted = game.status !== 'scheduled';
  const canPick = !isGameStarted && !hasPick;

  return (
    <div
      className={classes}
      onClick={handleClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      <div className="game-card__header">
        <div className="game-card__week">
          Week {game.week}
        </div>
        <Badge variant={getStatusColor(game.status) as any} size="sm">
          {getStatusLabel(game.status)}
        </Badge>
      </div>

      <div className="game-card__teams">
        <div className="game-card__team game-card__team--away">
          <div className="game-card__team-info">
            <div className="game-card__team-name">
              {game.awayTeam?.city} {game.awayTeam?.name}
            </div>
            <div className="game-card__team-abbr">
              {game.awayTeam?.abbreviation}
            </div>
          </div>
          <div className="game-card__score">
            {game.awayScore !== undefined ? game.awayScore : '-'}
          </div>
        </div>

        <div className="game-card__vs">@</div>

        <div className="game-card__team game-card__team--home">
          <div className="game-card__team-info">
            <div className="game-card__team-name">
              {game.homeTeam?.city} {game.homeTeam?.name}
            </div>
            <div className="game-card__team-abbr">
              {game.homeTeam?.abbreviation}
            </div>
          </div>
          <div className="game-card__score">
            {game.homeScore !== undefined ? game.homeScore : '-'}
          </div>
        </div>
      </div>

      <div className="game-card__details">
        <div className="game-card__time">
          {formatGameTime(game.gameDate)}
        </div>
        {(game.spread || game.overUnder) && (
          <div className="game-card__odds">
            {game.spread && (
              <span className="game-card__spread">
                Spread: {game.spread > 0 ? '+' : ''}{game.spread}
              </span>
            )}
            {game.overUnder && (
              <span className="game-card__over-under">
                O/U: {game.overUnder}
              </span>
            )}
          </div>
        )}
      </div>

      {showPickActions && (
        <div className="game-card__actions">
          {hasPick && userPick ? (
            <div className="game-card__pick-info">
              <Badge variant="success" size="sm">
                Picked: {userPick.pickedTeamId === game.homeTeamId 
                  ? game.homeTeam?.abbreviation 
                  : game.awayTeam?.abbreviation}
              </Badge>
              <span className="game-card__pick-type">
                {getPickTypeLabel(userPick.pickType)}
                {userPick.confidencePoints && ` (${userPick.confidencePoints} pts)`}
              </span>
            </div>
          ) : canPick ? (
            <Button size="sm" onClick={handlePickClick}>
              Make Pick
            </Button>
          ) : isGameStarted ? (
            <Badge variant="warning" size="sm">Game Started</Badge>
          ) : null}
        </div>
      )}
    </div>
  );
};
