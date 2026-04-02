import React from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { X } from 'lucide-react-native';
import { colors } from '@/src/constants/colors';
import { maps } from '@/src/services/text/unicode-map';
import { StyleThumb } from './StyleTab';

interface StyleSelectionModalProps {
  visible: boolean;
  currentStyle?: string;
  onSelect: (styleKey: string | undefined) => void;
  onClose: () => void;
}

export const StyleSelectionModal: React.FC<StyleSelectionModalProps> = ({
  visible,
  currentStyle,
  onSelect,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-surface-container-lowest pt-14">
        <View className="flex-row items-center justify-between px-6 pb-4">
          <Text className="font-manrope text-xl font-bold text-on-surface">Typography Styles</Text>
          <Pressable onPress={onClose} className="p-2">
            <X size={24} color={colors['on-surface-variant']} />
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={{
            padding: 24,
          }}>
          <Pressable onPress={() => onSelect(undefined)} className="w-full">
            <StyleThumb
              label="Standard"
              isFullWidth
              isSelected={!currentStyle}
              onPress={() => {}}
            />
          </Pressable>
          {Object.keys(maps).map((styleKey) => (
            <Pressable
              key={'modal' + styleKey}
              onPress={() => onSelect(styleKey)}
              className="w-full">
              <StyleThumb
                styleKey={styleKey}
                label={styleKey}
                isFullWidth
                isSelected={currentStyle === styleKey}
                onPress={() => {}}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};
