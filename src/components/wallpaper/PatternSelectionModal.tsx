import React from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { X } from 'lucide-react-native';
import { SvgXml } from 'react-native-svg';
import { generatePatternSVG, PATTERN_DEFINITIONS } from '@/src/services/wallpaper/patterns';
import { colors } from '@/src/constants/colors';

const MemoizedPattern = React.memo(({ xml }: { xml: string }) => (
  <SvgXml xml={xml} width="100%" height="100%" pointerEvents="none" />
));

interface PatternSelectionModalProps {
  visible: boolean;
  currentColor: string;
  onSelect: (type: string) => void;
  onClose: () => void;
}

export const PatternSelectionModal: React.FC<PatternSelectionModalProps> = ({
  visible,
  currentColor,
  onSelect,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-surface-container-lowest pt-14">
        <View className="flex-row items-center justify-between px-6 pb-4">
          <Text className="font-manrope text-xl font-bold text-on-surface">All Patterns</Text>
          <Pressable onPress={onClose} className="p-2">
            <X size={24} color={colors['on-surface-variant']} />
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={{
            padding: 24,
            gap: 16,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {Object.keys(PATTERN_DEFINITIONS).map((key) => (
            <Pressable
              key={'allpat' + key}
              onPress={() => onSelect(key)}
              className="w-[47%] overflow-hidden rounded-xl bg-surface-container-low"
              style={{ aspectRatio: 4 / 5 }}>
              <MemoizedPattern
                xml={generatePatternSVG({
                  type: key as any,
                  opacity: 0.5,
                  scale: 1,
                  color: colors['on-surface-variant'],
                })}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};
