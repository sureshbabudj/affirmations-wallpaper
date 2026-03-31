import React from 'react';
import { ScrollView, Pressable, Text, View } from 'react-native';
import { MOODS, MoodId } from '@/src/constants/moods';
import { MoodIcon } from './MoodIcon';

interface MoodSelectorProps {
  selectedMood: MoodId | null;
  onSelect: (moodId: MoodId) => void;
  horizontal?: boolean;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelect,
  horizontal = true,
}) => {
  const moods = Object.entries(MOODS);

  if (horizontal) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 py-2"
        contentContainerClassName="gap-3">
        {moods.map(([id, mood]) => {
          const isSelected = selectedMood === id;
          return (
            <Pressable
              key={id}
              onPress={() => onSelect(id as MoodId)}
              className={`flex-row items-center rounded-full border-2 px-4 py-3 ${
                isSelected ? 'border-white' : 'border-transparent'
              }`}
              style={{
                backgroundColor: isSelected ? mood.color : 'rgba(30, 41, 59, 0.8)',
              }}>
              <Text className="mr-2 text-xl">{mood.emoji}</Text>
              <Text className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {mood.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    );
  }

  // Grid layout
  return (
    <View className="flex-row flex-wrap gap-3 px-4">
      {moods.map(([id, mood]) => {
        const isSelected = selectedMood === id;
        return (
          <Pressable
            key={id}
            onPress={() => onSelect(id as MoodId)}
            className={`aspect-square w-[30%] items-center justify-center rounded-2xl p-3 ${
              isSelected ? 'scale-105' : 'opacity-80'
            }`}
            style={{
              backgroundColor: isSelected ? mood.color : 'rgba(30, 41, 59, 0.6)',
            }}>
            <MoodIcon
              emoji={mood.emoji}
              icon={mood.icon}
              size="lg"
              showBadge={isSelected}
              badgeColor={mood.color}
            />
            <Text
              className={`mt-2 text-center text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-400'}`}>
              {mood.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
