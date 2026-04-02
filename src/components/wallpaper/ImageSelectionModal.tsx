import React from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { X } from 'lucide-react-native';
import { Image } from 'expo-image';

interface ImageSelectionModalProps {
  visible: boolean;
  images: string[];
  onSelect: (url: string) => void;
  onClose: () => void;
}

export const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({
  visible,
  images,
  onSelect,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-surface-container-lowest pt-14">
        <View className="flex-row items-center justify-between px-6 pb-4">
          <Text className="font-manrope text-xl font-bold text-on-surface">All Images</Text>
          <Pressable onPress={onClose} className="p-2">
            <X size={24} color="#53433e" />
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={{
            padding: 24,
            gap: 16,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {images.map((url, i) => (
            <Pressable
              key={'allimg' + i}
              onPress={() => onSelect(url)}
              className="w-[47%] overflow-hidden rounded-xl"
              style={{ aspectRatio: 4 / 5 }}>
              <Image
                source={{ uri: url }}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};
