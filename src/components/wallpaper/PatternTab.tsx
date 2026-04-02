import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Palette, Ban, Grid } from 'lucide-react-native';
import { SvgXml } from 'react-native-svg';
import Slider from '@react-native-community/slider';
import { useWallpaperStore, DEFAULT_WALLPAPER } from '@/src/stores/wallpaperStore';
import { generatePatternSVG, PATTERN_DEFINITIONS } from '@/src/services/wallpaper/patterns';

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

const MemoizedPattern = React.memo(({ xml }: { xml: string }) => (
  <SvgXml xml={xml} width="100%" height="100%" pointerEvents="none" />
));

interface PatternTabProps {
  onPickColor: (target: 'bg' | 'text' | 'pattern' | 'gradient0' | 'gradient1') => void;
  onShowMore: () => void;
}

export const PatternTab: React.FC<PatternTabProps> = ({ onPickColor, onShowMore }) => {
  const { currentWallpaper, updateWallpaper } = useWallpaperStore();

  const PatternThumb = ({ pattern }: { pattern: string }) => (
    <Pressable
      onPress={() =>
        updateWallpaper({
          patternConfig: {
            ...(currentWallpaper.patternConfig || DEFAULT_WALLPAPER.patternConfig!),
            type: pattern,
          },
        })
      }
      className={`relative w-20 shrink-0 overflow-hidden rounded-xl bg-surface-container-low ${
        currentWallpaper.patternConfig?.type === pattern ? 'border-2 border-primary' : ''
      }`}
      style={{ aspectRatio: 4 / 5 }}>
      <MemoizedPattern
        xml={generatePatternSVG({
          type: pattern as any,
          opacity: 0.5,
          scale: 1,
          color: currentWallpaper.patternConfig?.color || '#30312e',
        })}
      />
    </Pressable>
  );

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
          Select Pattern
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          className="flex-row pb-2">
          <Pressable
            onPress={() => {
              updateWallpaper({
                patternConfig: {
                  ...(currentWallpaper.patternConfig || DEFAULT_WALLPAPER.patternConfig!),
                  type: 'none',
                },
              });
            }}
            className="flex w-20 shrink-0 items-center justify-center rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest"
            style={{ aspectRatio: 4 / 5 }}>
            <Ban size={24} color="#53433e" />
            <Text className="mt-2 font-manrope text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              None
            </Text>
          </Pressable>

          {Object.keys(PATTERN_DEFINITIONS)
            .slice(0, 5)
            .map((pattern) => (
              <PatternThumb key={pattern} pattern={pattern} />
            ))}

          <Pressable
            onPress={onShowMore}
            className="flex w-20 shrink-0 items-center justify-center rounded-xl bg-surface-container transition-colors hover:bg-surface-container-high"
            style={{ aspectRatio: 4 / 5 }}>
            <Grid size={24} color="#53433e" />
            <Text className="mt-2 font-manrope text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              More
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      <View>
        <Text className="mb-4 font-manrope text-[10px] uppercase tracking-widest text-on-surface-variant/60">
          Pattern Color
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          className="flex-row pb-2">
          <Pressable
            onPress={() => onPickColor('pattern')}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-outline-variant transition-colors hover:bg-surface-container">
            <Palette size={18} color="#d8c2bb" />
          </Pressable>
          {PREDEFINED_COLORS.map((c) => (
            <ColorCircle
              key={'pcol' + c}
              color={c}
              isSelected={currentWallpaper.patternConfig?.color === c}
              onPress={() =>
                updateWallpaper({
                  patternConfig: { ...currentWallpaper.patternConfig!, color: c },
                })
              }
            />
          ))}
        </ScrollView>
      </View>

      <View>
        <Text className="mb-2 font-manrope text-[10px] uppercase tracking-widest text-on-surface-variant/60">
          Opacity
        </Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={1}
          value={currentWallpaper.patternConfig?.opacity ?? 0.2}
          onValueChange={(val) =>
            updateWallpaper({
              patternConfig: { ...currentWallpaper.patternConfig!, opacity: val },
            })
          }
          minimumTrackTintColor="#874c37"
          maximumTrackTintColor="#d8c2bb"
        />
      </View>
    </View>
  );
};
