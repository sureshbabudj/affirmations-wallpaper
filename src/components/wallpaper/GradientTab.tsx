import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ban, Pipette } from 'lucide-react-native';
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useWallpaperStore } from '@/src/stores/wallpaperStore';

const DEFAULT_GRADIENT = ['#FF6B35', '#F7931E'];

const PREDEFINED_GRADIENTS = [
  DEFAULT_GRADIENT,
  ['#FF3366', '#FF9933'],
  ['#00C9FF', '#92FE9D'],
  ['#ef32d9', '#89fffd'],
  ['#ff758c', '#ff7eb3'],
  ['#20002c', '#cbb4d4'],
  ['#C33764', '#1D2671'],
  ['#34e89e', '#0f3443'],
  ['#e1eec3', '#f05053'],
  ['#000000', '#434343'],
];

interface GradientTabProps {
  onPickColor: (target: 'bg' | 'text' | 'pattern' | 'gradient0' | 'gradient1') => void;
}

export const GradientTab: React.FC<GradientTabProps> = ({ onPickColor }) => {
  const { currentWallpaper, updateWallpaper, recentGradients, addRecentGradient } =
    useWallpaperStore();

  const currentGrad =
    currentWallpaper.backgroundType === 'gradient' &&
    Array.isArray(currentWallpaper.backgroundValue)
      ? currentWallpaper.backgroundValue
      : DEFAULT_GRADIENT;

  return (
    <View className="space-y-6 pb-32">
      <View className="mb-2">
        <Text className="mb-4 font-manrope text-[10px] uppercase tracking-widest text-on-surface-variant/60">
          Gradient Colors
        </Text>
        <View className="flex-row items-center justify-center gap-1">
          <Pressable
            onPress={() => onPickColor('gradient0')}
            style={{
              backgroundColor: currentGrad[0],
              height: 48,
              width: 48,
            }}
            className="items-center justify-center rounded-xl border-2 border-outline-variant shadow-sm active:scale-90">
            <Pipette size={18} color="white" strokeWidth={2.5} />
          </Pressable>

          <View className="h-[48px] grow items-center justify-center px-1">
            <Svg width="100%" height="48">
              <Defs>
                <LinearGradient id="gradPreview" x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0" stopColor={currentGrad[0] as string} />
                  <Stop offset="1" stopColor={currentGrad[1] as string} />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="48" rx={12} fill="url(#gradPreview)" />
            </Svg>
          </View>

          <Pressable
            onPress={() => onPickColor('gradient1')}
            style={{
              backgroundColor: currentGrad[1],
              height: 48,
              width: 48,
            }}
            className="items-center justify-center rounded-xl border-2 border-outline-variant shadow-sm active:scale-90">
            <Pipette size={18} color="white" strokeWidth={2.5} />
          </Pressable>
        </View>
      </View>

      <View>
        <Text className="mb-4 font-manrope text-[10px] uppercase tracking-widest text-on-surface-variant/60">
          Predefined Gradients
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          className="flex-row pb-2">
          <Pressable
            onPress={() => updateWallpaper({ backgroundType: 'color', backgroundValue: '#000000' })}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dashed border-outline-variant bg-surface-container-lowest">
            <Ban size={20} color="#53433e" />
          </Pressable>

          {[...recentGradients, ...PREDEFINED_GRADIENTS].slice(0, 15).map((g, i) => (
            <Pressable
              key={'grad' + i}
              onPress={() => {
                updateWallpaper({ backgroundType: 'gradient', backgroundValue: g });
                addRecentGradient(g);
              }}
              className={`h-12 w-12 shrink-0 flex-row overflow-hidden rounded-full border transition-transform active:scale-90 ${
                currentWallpaper.backgroundType === 'gradient' &&
                Array.isArray(currentWallpaper.backgroundValue) &&
                currentWallpaper.backgroundValue[0] === g[0] &&
                currentWallpaper.backgroundValue[1] === g[1]
                  ? 'border-2 border-primary'
                  : 'border-1 border-outline-variant/50'
              }`}>
              <View style={{ backgroundColor: g[0], flex: 1 }} />
              <View style={{ backgroundColor: g[1], flex: 1 }} />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
