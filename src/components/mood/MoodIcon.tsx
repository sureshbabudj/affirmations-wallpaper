import React from 'react';
import { View, Text } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { LucideIconName } from '@/src/types/lucide';
import { colors } from '@/src/constants/colors';

interface MoodIconProps {
  emoji: string;
  icon: LucideIconName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  badgeColor?: string;
}

export const MoodIcon: React.FC<MoodIconProps> = ({
  emoji,
  icon,
  size = 'md',
  showBadge = false,
  badgeColor = colors['mood-energetic-primary'],
}) => {
  const sizeMap = {
    sm: { container: 32, emoji: 16, icon: 14 },
    md: { container: 48, emoji: 24, icon: 20 },
    lg: { container: 64, emoji: 32, icon: 28 },
    xl: { container: 80, emoji: 40, icon: 36 },
  };

  const { container, emoji: emojiSize, icon: iconSize } = sizeMap[size];

  // eslint-disable-next-line import/namespace
  const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as React.ComponentType<{
    size: number;
    color: string;
    strokeWidth?: number;
  }>;

  return (
    <View
      className="relative items-center justify-center rounded-[0.5rem] bg-surface-container"
      style={{ width: container, height: container }}>
      <Text style={{ fontSize: emojiSize }}>{emoji}</Text>

      {IconComponent && (
        <View className="absolute -bottom-1 -right-1 rounded-full border-2 border-surface bg-surface-container-highest p-1">
          <IconComponent size={iconSize} color={colors['on-surface-variant']} strokeWidth={2} />
        </View>
      )}

      {showBadge && (
        <View
          className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-surface"
          style={{ backgroundColor: badgeColor }}
        />
      )}
    </View>
  );
};
