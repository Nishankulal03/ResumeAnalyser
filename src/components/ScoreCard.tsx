import { ResumeScore } from '../types';

interface ScoreCardProps {
  score: ResumeScore;
}

export function ScoreCard({ score }: ScoreCardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <ScoreItem label="Overall Score" value={score.overall} />
      <ScoreItem label="Keywords" value={score.keywords} />
      <ScoreItem label="Formatting" value={score.formatting} />
      <ScoreItem label="ATS Compatibility" value={score.atsCompatibility} />
    </div>
  );
}

function ScoreItem({ label, value }: { label: string; value: number }) {
  const getColorClass = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className={`text-2xl font-bold ${getColorClass(value)}`}>{value}%</p>
    </div>
  );
}