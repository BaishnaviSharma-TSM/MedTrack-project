import { useState, type ReactNode } from 'react';
import { Platform, Pressable, Text, View, type ViewStyle } from 'react-native';

import { fontFamilies, fontSizes, spacing, useTheme } from '@/theme';

export type DataTableColumn<T> = {
  key: string;
  label: string;
  width?: number | `${number}%`;
  render: (row: T, index: number) => ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  onRowPress?: (row: T, index: number) => void;
  emptyMessage?: string;
};

const TABLE_RADIUS = 12;
const CELL_PAD_X = spacing.md;
const isWeb = Platform.OS === 'web';

function cellLayout(width?: number | `${number}%`): ViewStyle {
  const shared: ViewStyle = {
    minWidth: 0,
    paddingHorizontal: CELL_PAD_X,
    justifyContent: 'center',
    alignItems: 'flex-start',
    ...(isWeb ? ({ boxSizing: 'border-box' } as ViewStyle) : null),
  };

  if (width === undefined) {
    return {
      ...shared,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      ...(isWeb ? ({ flex: '1 1 0%' } as ViewStyle) : null),
    };
  }

  if (typeof width === 'number') {
    return {
      ...shared,
      width,
      flexGrow: 0,
      flexShrink: 0,
    };
  }

  const pct = Number.parseFloat(width);
  if (Number.isNaN(pct)) {
    return {
      ...shared,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      ...(isWeb ? ({ flex: '1 1 0%' } as ViewStyle) : null),
    };
  }

  return {
    ...shared,
    flexGrow: pct,
    flexShrink: 1,
    flexBasis: 0,
    ...(isWeb ? ({ flex: `${pct} 1 0%` } as ViewStyle) : null),
  };
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowPress,
  emptyMessage = 'No records to display.',
}: DataTableProps<T>) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const { colors, isDark } = useTheme();

  const wrapperStyle: ViewStyle = {
    width: '100%',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: isDark ? colors.borderSubtle : colors.brand.alpha08,
    borderRadius: TABLE_RADIUS,
    backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
    overflow: 'hidden',
  };

  const rowBase: ViewStyle = {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    ...(isWeb ? ({ display: 'flex' } as ViewStyle) : null),
  };

  if (data.length === 0) {
    return (
      <View style={wrapperStyle}>
        <Text
          style={{
            padding: spacing.xl,
            textAlign: 'center',
            fontFamily: fontFamilies.body.regular,
            fontSize: fontSizes.sm,
            color: colors.muted,
          }}
        >
          {emptyMessage}
        </Text>
      </View>
    );
  }

  const renderCells = (row: T, index: number) =>
    columns.map((column) => {
      const content = column.render(row, index);
      return (
        <View
          key={column.key}
          style={[cellLayout(column.width), { paddingVertical: spacing.md }]}
        >
          {typeof content === 'string' || typeof content === 'number' ? (
            <Text style={{ color: colors.foreground, textAlign: 'left' }} numberOfLines={1}>
              {content}
            </Text>
          ) : (
            content
          )}
        </View>
      );
    });

  return (
    <View style={wrapperStyle}>
      <View
        style={[
          rowBase,
          {
            backgroundColor: isDark ? colors.brand.alpha06 : colors.brand.alpha04,
            borderBottomWidth: 1,
            borderBottomColor: isDark ? colors.borderSubtle : colors.brand.alpha08,
          },
        ]}
      >
        {columns.map((column) => (
          <View
            key={column.key}
            style={[cellLayout(column.width), { paddingVertical: spacing.sm }]}
          >
            <Text
              style={{
                fontFamily: fontFamilies.body.bold,
                fontSize: fontSizes.sm,
                color: colors.muted,
                textTransform: 'uppercase',
                letterSpacing: 0.4,
                textAlign: 'left',
              }}
              numberOfLines={1}
            >
              {column.label}
            </Text>
          </View>
        ))}
      </View>
      {data.map((row, index) => {
        const rowKey = keyExtractor(row, index);
        const isLast = index === data.length - 1;
        const isHovered = hoveredKey === rowKey;
        const rowStyles: ViewStyle[] = [
          rowBase,
          {
            borderBottomWidth: isLast ? 0 : 1,
            borderBottomColor: colors.brand.alpha06,
            ...(isWeb ? ({ cursor: onRowPress ? 'pointer' : 'default' } as ViewStyle) : null),
          },
          isHovered ? { backgroundColor: colors.brand.alpha04 } : null,
        ].filter(Boolean) as ViewStyle[];

        if (onRowPress) {
          return (
            <Pressable
              key={rowKey}
              style={rowStyles}
              onPress={(event) => {
                if (isWeb) {
                  const target = (
                    event as unknown as { nativeEvent?: { target?: { closest?: (selector: string) => Element | null } } }
                  ).nativeEvent?.target;
                  if (target?.closest?.('[data-stop-row-press="true"]')) {
                    return;
                  }
                }
                onRowPress(row, index);
              }}
              onHoverIn={isWeb ? () => setHoveredKey(rowKey) : undefined}
              onHoverOut={isWeb ? () => setHoveredKey(null) : undefined}
              accessibilityRole="button"
            >
              {renderCells(row, index)}
            </Pressable>
          );
        }

        return (
          <View key={rowKey} style={rowStyles}>
            {renderCells(row, index)}
          </View>
        );
      })}
    </View>
  );
}
