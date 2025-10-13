import React from 'react';
import { Badge } from '../../../components/Badge';
import { Team } from '../GameCard';
import './GamePick.css';

export interface GamePickData {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  gameDatetime: string;
  week: number;
  homeScore?: number;
  awayScore?: number;
  homeTeam?: Team;
  awayTeam?: Team;
}

export interface UserPick {
  pickedTeamId: number;
  isCorrect?: boolean;
}

export interface GamePickProps {
  /**
   * The game data to display
   */
  game: GamePickData;
  /**
   * The user's pick for this game (if any)
   */
  userPick?: UserPick;
  /**
   * Whether picks are locked (game started or deadline passed)
   */
  locked?: boolean;
  /**
   * Whether to show results (game finished)
   */
  showResults?: boolean;
  /**
   * Click handler when a team is picked
   */
  onPickTeam?: (teamId: number) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const GamePick: React.FC<GamePickProps> = ({
  game,
  userPick,
  locked = false,
  showResults = false,
  onPickTeam,
  className = '',
}) => {
  const handleTeamClick = (teamId: number) => {
    if (!locked && !showResults && onPickTeam) {
      onPickTeam(teamId);
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

  const isWinner = (teamId: number) => {
    if (!showResults || game.homeScore === undefined || game.awayScore === undefined) {
      return false;
    }
    if (teamId === game.homeTeamId) {
      return game.homeScore > game.awayScore;
    }
    return game.awayScore > game.homeScore;
  };

  const isPicked = (teamId: number) => {
    return userPick?.pickedTeamId === teamId;
  };

  const canPick = !locked && !showResults;

  const getTeamClasses = (teamId: number) => {
    const classes = ['game-pick__team'];
    
    if (canPick) {
      classes.push('game-pick__team--clickable');
    }
    
    if (isPicked(teamId)) {
      classes.push('game-pick__team--picked');
    }
    
    if (showResults && isWinner(teamId)) {
      classes.push('game-pick__team--winner');
    }
    
    if (showResults && !isWinner(teamId)) {
      classes.push('game-pick__team--loser');
    }
    
    return classes.join(' ');
  };

  return (
    <div className={`game-pick ${className}`}>
      {(locked || (showResults && userPick)) && (
        <div className="game-pick__header">
          {locked && !showResults && (
            <Badge variant="warning" size="sm">
              🔒 Locked
            </Badge>
          )}
          {showResults && userPick && (
            <Badge 
              variant={userPick.isCorrect ? 'success' : 'error'} 
              size="sm"
            >
              {userPick.isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </Badge>
          )}
        </div>
      )}

      <div className="game-pick__matchup">
        {/* Away Team */}
        <div
          className={getTeamClasses(game.awayTeamId)}
          onClick={() => handleTeamClick(game.awayTeamId)}
          role={canPick ? 'button' : undefined}
          tabIndex={canPick ? 0 : undefined}
          onKeyDown={(e) => {
            if (canPick && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleTeamClick(game.awayTeamId);
            }
          }}
        >
          {game.awayTeam?.logoUrl && (
            <img 
              src={game.awayTeam.logoUrl} 
              alt={`${game.awayTeam.name} logo`}
              className="game-pick__team-logo"
            />
          )}
          <div className="game-pick__team-info">
            <div className="game-pick__team-name">
              {game.awayTeam?.city}
            </div>
            <div className="game-pick__team-abbr">
              {game.awayTeam?.name}
            </div>
          </div>
          {showResults && game.awayScore !== undefined && (
            <div className="game-pick__score">{game.awayScore}</div>
          )}
          {isPicked(game.awayTeamId) && !showResults && (
            <div className="game-pick__pick-indicator">✓</div>
          )}
        </div>

        <div className="game-pick__vs">@</div>

        {/* Home Team */}
        <div
          className={getTeamClasses(game.homeTeamId)}
          onClick={() => handleTeamClick(game.homeTeamId)}
          role={canPick ? 'button' : undefined}
          tabIndex={canPick ? 0 : undefined}
          onKeyDown={(e) => {
            if (canPick && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleTeamClick(game.homeTeamId);
            }
          }}
        >
          {game.homeTeam?.logoUrl && (
            <img 
              src={game.homeTeam.logoUrl} 
              alt={`${game.homeTeam.name} logo`}
              className="game-pick__team-logo"
            />
          )}
          <div className="game-pick__team-info">
            <div className="game-pick__team-name">
              {game.homeTeam?.city}
            </div>
            <div className="game-pick__team-abbr">
              {game.homeTeam?.name}
            </div>
          </div>
          {showResults && game.homeScore !== undefined && (
            <div className="game-pick__score">{game.homeScore}</div>
          )}
          {isPicked(game.homeTeamId) && !showResults && (
            <div className="game-pick__pick-indicator">✓</div>
          )}
        </div>
      </div>

      <div className="game-pick__footer">
        <div className="game-pick__time">
          {formatGameTime(game.gameDatetime)}
        </div>
      </div>
    </div>
  );
};

