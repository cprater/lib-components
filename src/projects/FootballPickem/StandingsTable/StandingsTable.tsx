import React from 'react';
import { Badge } from '../../../components/Badge';
import { Avatar } from '../../../components/Avatar';
import './StandingsTable.css';

export interface StandingsEntry {
  userId: number;
  username: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  correctPicks: number;
  totalPicks: number;
  confidencePoints: number;
  winPercentage: number;
  rank: number;
  isCurrentUser?: boolean;
}

export interface StandingsTableProps {
  /**
   * The standings data to display
   */
  standings: StandingsEntry[];
  /**
   * Whether to show user avatars
   */
  showAvatars?: boolean;
  /**
   * Whether to highlight the current user
   */
  highlightCurrentUser?: boolean;
  /**
   * Whether the table is loading
   */
  loading?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Click handler for table rows
   */
  onRowClick?: (entry: StandingsEntry) => void;
}

export const StandingsTable: React.FC<StandingsTableProps> = ({
  standings,
  showAvatars = true,
  highlightCurrentUser = true,
  loading = false,
  className = '',
  onRowClick,
  ...props
}) => {
  const baseClasses = 'standings-table';
  const classes = [baseClasses, className].filter(Boolean).join(' ');

  const handleRowClick = (entry: StandingsEntry) => {
    if (onRowClick) {
      onRowClick(entry);
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank === 1) return 'success';
    if (rank <= 3) return 'warning';
    return 'default';
  };

  const getRankLabel = (rank: number) => {
    if (rank === 1) return '1st';
    if (rank === 2) return '2nd';
    if (rank === 3) return '3rd';
    return `${rank}th`;
  };

  if (loading) {
    return (
      <div className={classes} {...props}>
        <div className="standings-table__loading">
          <div className="standings-table__loading-text">Loading standings...</div>
        </div>
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <div className={classes} {...props}>
        <div className="standings-table__empty">
          <div className="standings-table__empty-text">No standings data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes} {...props}>
      <div className="standings-table__header">
        <h3 className="standings-table__title">League Standings</h3>
        <div className="standings-table__subtitle">
          {standings.length} participant{standings.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="standings-table__content">
        <table className="standings-table__table">
          <thead className="standings-table__thead">
            <tr className="standings-table__tr">
              <th className="standings-table__th standings-table__th--rank">Rank</th>
              <th className="standings-table__th standings-table__th--user">User</th>
              <th className="standings-table__th standings-table__th--record">Record</th>
              <th className="standings-table__th standings-table__th--percentage">Win %</th>
              <th className="standings-table__th standings-table__th--points">Points</th>
            </tr>
          </thead>
          <tbody className="standings-table__tbody">
            {standings.map((entry) => (
              <tr
                key={entry.userId}
                className={`standings-table__tr ${
                  entry.isCurrentUser && highlightCurrentUser ? 'standings-table__tr--current-user' : ''
                } ${onRowClick ? 'standings-table__tr--clickable' : ''}`}
                onClick={() => handleRowClick(entry)}
              >
                <td className="standings-table__td standings-table__td--rank">
                  <Badge variant={getRankBadgeVariant(entry.rank)} size="sm">
                    {getRankLabel(entry.rank)}
                  </Badge>
                </td>
                <td className="standings-table__td standings-table__td--user">
                  <div className="standings-table__user">
                    {showAvatars && (
                      <Avatar
                        src={entry.avatarUrl}
                        fallback={`${entry.firstName || ''} ${entry.lastName || ''}`.trim() || entry.username}
                        size="sm"
                      />
                    )}
                    <div className="standings-table__user-info">
                      <div className="standings-table__username">
                        {entry.firstName && entry.lastName 
                          ? `${entry.firstName} ${entry.lastName}`
                          : entry.username
                        }
                      </div>
                      {entry.firstName && entry.lastName && (
                        <div className="standings-table__user-handle">@{entry.username}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="standings-table__td standings-table__td--record">
                  <div className="standings-table__record">
                    <span className="standings-table__wins">{entry.correctPicks}</span>
                    <span className="standings-table__separator">-</span>
                    <span className="standings-table__losses">{entry.totalPicks - entry.correctPicks}</span>
                  </div>
                  <div className="standings-table__total">
                    ({entry.totalPicks} total)
                  </div>
                </td>
                <td className="standings-table__td standings-table__td--percentage">
                  <div className="standings-table__percentage">
                    {(entry.winPercentage * 100).toFixed(1)}%
                  </div>
                </td>
                <td className="standings-table__td standings-table__td--points">
                  <div className="standings-table__points">
                    {entry.confidencePoints.toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
