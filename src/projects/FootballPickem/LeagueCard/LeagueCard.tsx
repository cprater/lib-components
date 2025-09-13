import React from 'react';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import './LeagueCard.css';

export interface League {
  id: number;
  name: string;
  description?: string;
  commissionerId: number;
  isPublic: boolean;
  maxParticipants: number;
  entryFee: number;
  scoringType: 'confidence' | 'straight' | 'survivor';
  seasonYear: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  currentParticipants?: number;
  commissioner?: {
    id: number;
    username: string;
  };
}

export interface LeagueCardProps {
  /**
   * The league data to display
   */
  league: League;
  /**
   * Whether the card is clickable
   */
  clickable?: boolean;
  /**
   * Click handler
   */
  onClick?: (league: League) => void;
  /**
   * Whether to show join button
   */
  showJoinButton?: boolean;
  /**
   * Whether user is already a member
   */
  isMember?: boolean;
  /**
   * Join button click handler
   */
  onJoin?: (league: League) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const LeagueCard: React.FC<LeagueCardProps> = ({
  league,
  clickable = false,
  onClick,
  showJoinButton = false,
  isMember = false,
  onJoin,
  className = '',
  ...props
}) => {
  const baseClasses = 'league-card';
  const clickableClasses = clickable ? 'league-card--clickable' : '';

  const classes = [baseClasses, clickableClasses, className]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (clickable && onClick) {
      onClick(league);
    }
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onJoin) {
      onJoin(league);
    }
  };

  const getScoringTypeLabel = (type: string) => {
    switch (type) {
      case 'confidence': return 'Confidence';
      case 'straight': return 'Straight Up';
      case 'survivor': return 'Survivor';
      default: return type;
    }
  };

  const isFull = league.currentParticipants && league.currentParticipants >= league.maxParticipants;
  const canJoin = !isMember && !isFull && league.isActive;

  return (
    <div
      className={classes}
      onClick={handleClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      <div className="league-card__header">
        <div className="league-card__title">
          <h3 className="league-card__name">{league.name}</h3>
          <div className="league-card__badges">
            <Badge variant={league.isPublic ? 'success' : 'warning'} size="sm">
              {league.isPublic ? 'Public' : 'Private'}
            </Badge>
            <Badge variant="info" size="sm">
              {getScoringTypeLabel(league.scoringType)}
            </Badge>
            {!league.isActive && (
              <Badge variant="error" size="sm">Inactive</Badge>
            )}
          </div>
        </div>
        {league.entryFee > 0 && (
          <div className="league-card__entry-fee">
            ${league.entryFee.toFixed(2)}
          </div>
        )}
      </div>

      {league.description && (
        <div className="league-card__description">
          {league.description}
        </div>
      )}

      <div className="league-card__details">
        <div className="league-card__detail">
          <span className="league-card__detail-label">Season:</span>
          <span className="league-card__detail-value">{league.seasonYear}</span>
        </div>
        <div className="league-card__detail">
          <span className="league-card__detail-label">Participants:</span>
          <span className="league-card__detail-value">
            {league.currentParticipants || 0} / {league.maxParticipants}
          </span>
        </div>
        {league.commissioner && (
          <div className="league-card__detail">
            <span className="league-card__detail-label">Commissioner:</span>
            <span className="league-card__detail-value">@{league.commissioner.username}</span>
          </div>
        )}
      </div>

      {showJoinButton && (
        <div className="league-card__actions">
          {isMember ? (
            <Badge variant="success" size="sm">Member</Badge>
          ) : isFull ? (
            <Badge variant="warning" size="sm">Full</Badge>
          ) : canJoin ? (
            <Button size="sm" onClick={handleJoinClick}>
              Join League
            </Button>
          ) : (
            <Badge variant="error" size="sm">Cannot Join</Badge>
          )}
        </div>
      )}
    </div>
  );
};
