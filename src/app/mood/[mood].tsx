import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Sparkles } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

import { MOODS, MoodId } from '@/src/constants/moods';
import { useWallpaperStore } from '@/src/stores/wallpaperStore';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { quotes } from '@/src/constants/quotes';

export default function AffirmationSelectionScreen() {
  const { mood } = useLocalSearchParams<{ mood: MoodId }>();
  const router = useRouter();
  const { createWallpaper } = useWallpaperStore();
  const insets = useSafeAreaInsets();

  const moodConfig = MOODS[mood as MoodId];

  if (!moodConfig) {
    return (
      <View className="flex-1 items-center justify-center bg-surface p-6">
        <Text className="font-noto-serif text-xl text-on-surface">Mood not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 rounded-full bg-surface-container px-6 py-2">
          <Text className="font-manrope text-on-surface">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const handleSelectAffirmation = (text: string) => {
    createWallpaper(mood as string, text);
    // We'll navigate to create screen with a temporary ID if needed,
    // but the store handles 'currentWallpaper'
    router.push('/create/new');
  };

  let allQuotes = quotes.filter((q) => q.categoryId === mood).map((q) => q.quote);
  allQuotes = [...moodConfig.affirmations, ...allQuotes];

  return (
    <View className="flex-1 bg-surface">
      <StatusBar style="dark" />
      
      {/* TopAppBar */}
      <View 
        style={{ paddingTop: insets.top }} 
        className="w-full z-50 flex-row items-center justify-between px-6 py-4 bg-surface"
      >
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full active:opacity-70 transition-opacity"
        >
          <ChevronLeft size={28} color="#874c37" />
        </Pressable>
        <Text className="font-noto-serif text-xl tracking-tight text-primary">
          Choose Your Affirmation
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView
        contentContainerClassName="pt-8 pb-32 px-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Mood Indicator Section */}
        <View className="mb-12 flex-col items-center">
          <View 
            style={{ backgroundColor: moodConfig.color + '20' }}
            className="mb-4 flex-row items-center gap-3 rounded-full px-6 py-3"
          >
            <Text className="text-lg">{moodConfig.emoji}</Text>
            <Text 
              style={{ color: moodConfig.color }}
              className="font-manrope text-sm font-semibold uppercase tracking-wider"
            >
              {moodConfig.name} Mood
            </Text>
          </View>
          <Text className="font-noto-serif-italic text-center text-lg text-on-surface-variant px-4">
            &quot;Speak tenderness into your own heart today.&quot;
          </Text>
        </View>

        {/* Featured Affirmation */}
        {allQuotes.length > 0 && (
          <Pressable
            onPress={() => handleSelectAffirmation(allQuotes[0])}
            className="relative mb-10 overflow-hidden rounded-[2.5rem] bg-surface-container-lowest p-8 shadow-sm active:opacity-90"
          >
            {/* Visual Accent */}
            <View 
              style={{ backgroundColor: moodConfig.color + '15' }}
              className="absolute -right-4 -top-4 h-32 w-32 rounded-full"
            />
            
            <View className="relative z-10">
              <Text 
                style={{ color: moodConfig.color }}
                className="mb-6 font-manrope text-[10px] uppercase tracking-[0.2em]"
              >
                Featured Reflection
              </Text>
              <Text className="mb-8 font-noto-serif text-3xl leading-snug text-on-surface">
                {allQuotes[0]}
              </Text>
              
              <View 
                style={{ backgroundColor: moodConfig.color }}
                className="self-start flex-row items-center gap-2 rounded-full px-6 py-3 shadow-md"
              >
                <Text className="font-manrope font-semibold text-white">Select Affirmation</Text>
                <Sparkles size={16} color="white" />
              </View>
            </View>
          </Pressable>
        )}

        {/* Affirmations List */}
        <View className="flex-col gap-6">
          {allQuotes.slice(1).map((text, index) => (
            <Pressable
              key={index}
              onPress={() => handleSelectAffirmation(text)}
              className="rounded-[2rem] bg-surface-container-low p-8 transition-colors active:bg-surface-container-lowest"
            >
              <Text 
                style={{ color: moodConfig.color }} 
                className="font-noto-serif text-4xl leading-none opacity-40 mb-2"
              >
                &quot;
              </Text>
              <Text className="mb-6 font-noto-serif text-xl leading-relaxed text-on-surface mt-[-10px]">
                {text}
              </Text>
              <View 
                style={{ borderColor: moodConfig.color + '40' }}
                className="self-start rounded-full border px-5 py-2.5"
              >
                <Text 
                  style={{ color: moodConfig.color }}
                  className="font-manrope text-xs font-bold uppercase tracking-widest"
                >
                  Select
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
