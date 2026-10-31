import React from 'react';

interface CountryFlagProps {
  countryName: string;
  flagEmoji?: string;
  showName?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryName,
  flagEmoji,
  showName = true,
  className = '',
  size = 'md',
}) => {
  // Fallback map if emoji not passed
  const flagsMap: Record<string, string> = {
    'Saudi Arabia': '🇸🇦',
    'United Arab Emirates': '🇦🇪',
    'UAE': '🇦🇪',
    'Qatar': '🇶🇦',
    'Kuwait': '🇰🇼',
    'Oman': '🇴🇲',
    'Bahrain': '🇧🇭',
    'Romania': '🇷🇴',
    'Croatia': '🇭🇷',
    'Poland': '🇵🇱',
    'Germany': '🇩🇪',
    'Italy': '🇮🇹',
    'Portugal': '🇵🇹',
    'Malaysia': '🇲🇾',
    'Singapore': '🇸🇬',
    'India': '🇮🇳',
  };

  const emoji = flagEmoji || flagsMap[countryName] || '🌐';

  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  }[size];

  return (
    <div className={`inline-flex items-center gap-1.5 font-medium ${className}`}>
      <span className={`${textSize} select-none drop-shadow-xs`} role="img" aria-label={countryName}>
        {emoji}
      </span>
      {showName && <span className="text-slate-800 text-xs sm:text-sm font-semibold">{countryName}</span>}
    </div>
  );
};
