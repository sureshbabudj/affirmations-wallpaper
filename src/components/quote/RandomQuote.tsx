import { Text } from 'react-native';
import { quotes } from '@/src/constants/quotes';

export function RandomQuote() {
  const { quote } = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <Text className="max-w-sm text-center font-noto-serif-italic text-3xl leading-tight text-primary md:text-5xl">
      &quot;{quote}&quot;
    </Text>
  );
}
