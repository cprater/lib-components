import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import { Select } from '../../../components/Select';
import { Alert } from '../../../components/Alert';
import { Game, Team } from '../GameCard';
import './PickForm.css';

export interface PickFormData {
  pickedTeamId: number;
  pickType: 'spread' | 'over_under' | 'straight';
  confidencePoints?: number;
}

export interface PickFormProps {
  /**
   * The game to make a pick for
   */
  game: Game;
  /**
   * Available teams for the game
   */
  teams: Team[];
  /**
   * Whether the form is in a loading state
   */
  loading?: boolean;
  /**
   * Whether the form is disabled
   */
  disabled?: boolean;
  /**
   * Submit handler
   */
  onSubmit?: (data: PickFormData) => void;
  /**
   * Cancel handler
   */
  onCancel?: () => void;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Whether to show confidence points selector
   */
  showConfidence?: boolean;
  /**
   * Maximum confidence points
   */
  maxConfidence?: number;
}

export const PickForm: React.FC<PickFormProps> = ({
  game,
  teams,
  loading = false,
  disabled = false,
  onSubmit,
  onCancel,
  className = '',
  showConfidence = true,
  maxConfidence = 16,
  ...props
}) => {
  const [formData, setFormData] = useState<PickFormData>({
    pickedTeamId: 0,
    pickType: 'straight',
    confidencePoints: 1,
  });
  const [errors, setErrors] = useState<string[]>([]);

  const gameTeams = teams.filter(team => 
    team.id === game.homeTeamId || team.id === game.awayTeamId
  );

  const teamOptions = gameTeams.map(team => ({
    value: team.id,
    label: `${team.city} ${team.name} (${team.abbreviation})`,
  }));

  const pickTypeOptions = [
    { value: 'straight', label: 'Straight Up' },
    { value: 'spread', label: 'Against Spread' },
    { value: 'over_under', label: 'Over/Under' },
  ];

  const confidenceOptions = Array.from({ length: maxConfidence }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} point${i + 1 !== 1 ? 's' : ''}`,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: string[] = [];
    
    if (!formData.pickedTeamId) {
      newErrors.push('Please select a team');
    }
    
    if (showConfidence && !formData.confidencePoints) {
      newErrors.push('Please select confidence points');
    }
    
    setErrors(newErrors);
    
    if (newErrors.length === 0 && onSubmit) {
      onSubmit(formData);
    }
  };

  const handleTeamChange = (value: string | number) => {
    setFormData(prev => ({ ...prev, pickedTeamId: Number(value) }));
  };

  const handlePickTypeChange = (value: string | number) => {
    setFormData(prev => ({ ...prev, pickType: value as any }));
  };

  const handleConfidenceChange = (value: string | number) => {
    setFormData(prev => ({ ...prev, confidencePoints: Number(value) }));
  };

  const isFormDisabled = disabled || loading;

  return (
    <form className={`pick-form ${className}`} onSubmit={handleSubmit} {...props}>
      <div className="pick-form__header">
        <h3 className="pick-form__title">
          Make Your Pick
        </h3>
        <div className="pick-form__game-info">
          Week {game.week}: {game.awayTeam?.abbreviation} @ {game.homeTeam?.abbreviation}
        </div>
      </div>

      {errors.length > 0 && (
        <Alert variant="error" size="sm">
          <ul className="pick-form__errors">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <div className="pick-form__fields">
        <Select
          label="Pick Team"
          options={teamOptions}
          value={formData.pickedTeamId}
          onChange={handleTeamChange}
          placeholder="Select a team"
          disabled={isFormDisabled}
          required
        />

        <Select
          label="Pick Type"
          options={pickTypeOptions}
          value={formData.pickType}
          onChange={handlePickTypeChange}
          disabled={isFormDisabled}
          required
        />

        {showConfidence && (
          <Select
            label="Confidence Points"
            options={confidenceOptions}
            value={formData.confidencePoints}
            onChange={handleConfidenceChange}
            disabled={isFormDisabled}
            required
          />
        )}
      </div>

      <div className="pick-form__actions">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isFormDisabled}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          loading={loading}
          disabled={isFormDisabled}
        >
          Submit Pick
        </Button>
      </div>
    </form>
  );
};
