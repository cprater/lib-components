import React from 'react';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import './LeagueCard.css';

export interface League {
  id: number;
  name: string;
  description?: string;
  commissionerId: number;
  isPublic?: boolean;
  memberCount?: number;
  entryFee: number;
  scoringType: 'confidence' | 'straight' | 'survivor';
  seasonYear: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  currentParticipants?: number;
  ownerName: string;
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
   * Whether to show a badge in the actions section
   */
  showBadge?: boolean;
  /**
   * Text to display in the badge
   */
  badgeText?: string;
  /**
   * Badge variant/type
   */
  badgeType?: 'success' | 'warning' | 'error' | 'info' | 'default' | 'primary';
  /**
   * Whether to show a CTA button
   */
  showCta?: boolean;
  /**
   * Text for the CTA button
   */
  ctaText?: string;
  /**
   * CTA button click handler
   */
  ctaAction?: (league: League) => void;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const LeagueCard: React.FC<LeagueCardProps> = ({
  league,
  clickable = false,
  onClick,
  showBadge = false,
  badgeText,
  badgeType = 'default',
  showCta = false,
  ctaText,
  ctaAction,
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

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ctaAction) {
      ctaAction(league);
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

  const scoringTypeLabel = getScoringTypeLabel(league.scoringType);

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
            {/* TODO: Public and Private leagues have not been implemented yet */}
            {/* <Badge variant={league.isPublic ? 'success' : 'warning'} size="sm">
              {league.isPublic ? 'Public' : 'Private'}
            </Badge> */}
            {/* {scoringTypeLabel && (
              <Badge variant="info" size="sm">
                {scoringTypeLabel}
              </Badge>
            )} */}
            {/* {!league.isActive && (
              <Badge variant="error" size="sm">Inactive</Badge>
            )} */}
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
        {/* <div className="league-card__detail">
          <span className="league-card__detail-label">Season:</span>
          <span className="league-card__detail-value">{league.seasonYear}</span>
        </div> */}
        <div className="league-card__detail">
          <span className="league-card__detail-label">Participants:</span>
          <span className="league-card__detail-value">
            {league.memberCount || 0}
          </span>
        </div>
        <div className="league-card__detail">
          <span className="league-card__detail-label">Commissioner:</span>
          <span className="league-card__detail-value">@{league.ownerName}</span>
        </div>
      </div>

      {(showBadge || showCta) && (
        <div className="league-card__actions">
          {showBadge && badgeText && (
            <Badge variant={badgeType} size="sm">{badgeText}</Badge>
          )}
          {showCta && ctaText && (
            <Button size="sm" onClick={handleCtaClick}>
              {ctaText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
