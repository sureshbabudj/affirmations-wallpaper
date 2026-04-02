import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Palette } from 'lucide-react-native';
import { useWallpaperStore } from '@/src/stores/wallpaperStore';

const PREDEFINED_COLORS = [
  '#fbf9f4',
  '#d5e8d1',
  '#ffdbcf',
  '#874c37',
  '#30312e',
  '#655a4b',
  '#0ea5e9',
  '#ec4899',
  '#eab308',
  '#22c55e',
];

interface ColorTabProps {
  onPickColor: (target: 'bg' | 'text' | 'pattern' | 'gradient0' | 'gradient1') => void;
}

export const ColorTab: React.FC<ColorTabProps> = ({ onPickColor }) => {
  const { currentWallpaper, updateWallpaper, recentColors } = useWallpaperStore();

  const ColorCircle = ({
    color,
    isSelected,
    onPress,
  }: {
    color: string;
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      style={{ backgroundColor: color }}
      className={`h-10 w-10 shrink-0 rounded-full border ${
        isSelected ? 'border-2 border-primary' : 'border border-outline-variant'
      }`}
    />
  );

  return (
    <View className="space-y-6 pb-32">
      <View>
        <Text className="mb-4 font-manrope text-[10px] uppercase tracking-widest text-on-surface-variant/60">
          Recently Used
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          className="flex-row pb-2">
          <Pressable
            onPress={() => onPickColor('bg')}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-outline-variant transition-colors hover:bg-surface-container">
            <Palette size={18} color="#d8c2bb" />
          </Pressable>
          {recentColors.map((c) => (
            <ColorCircle
              key={'recent' + c}
              color={c}
              isSelected={
                currentWallpaper.backgroundType === 'color' &&
                currentWallpaper.backgroundValue === c
              }
              onPress={() => updateWallpaper({ backgroundType: 'color', backgroundValue: c })}
            />
          ))}
        </ScrollView>
      </View>

      <View>
        <Text className="mb-4 font-manrope text-[10px] uppercase tracking-widest text-on-surface-variant/60">
          Predefined Colors
        </Text>
        <View className="flex-row flex-wrap gap-3">
          {PREDEFINED_COLORS.map((c) => (
            <ColorCircle
              key={'pre' + c}
              color={c}
              isSelected={
                currentWallpaper.backgroundType === 'color' &&
                currentWallpaper.backgroundValue === c
              }
              onPress={() => updateWallpaper({ backgroundType: 'color', backgroundValue: c })}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
