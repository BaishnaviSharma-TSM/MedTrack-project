import { StyleSheet, View, type ViewProps } from 'react-native';

import { blobColors } from '@/theme/colors';

type ClayBackgroundProps = ViewProps & {
  children?: React.ReactNode;
};

export function ClayBackground({ children, style, ...props }: ClayBackgroundProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={[styles.blob, styles.blobViolet]} pointerEvents="none" />
      <View style={[styles.blob, styles.blobPink]} pointerEvents="none" />
      <View style={[styles.blob, styles.blobSky]} pointerEvents="none" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    borderRadius: 9999,
  },
  blobViolet: {
    top: '-12%',
    left: '-22%',
    width: '72%',
    aspectRatio: 1,
    backgroundColor: blobColors.violet,
  },
  blobPink: {
    top: '32%',
    right: '-28%',
    width: '68%',
    aspectRatio: 1,
    backgroundColor: blobColors.pink,
  },
  blobSky: {
    bottom: '-8%',
    left: '10%',
    width: '55%',
    aspectRatio: 1,
    backgroundColor: blobColors.sky,
  },
});
