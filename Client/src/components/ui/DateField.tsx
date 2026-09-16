import { Feather } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Modal, Platform, Pressable, Text, View } from 'react-native';

import { fontFamilies, fontSizes, radii, shadows, spacing, useTheme } from '@/theme';

type DateFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
};

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const webPointer = Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null;
const webNoSelect = Platform.OS === 'web' ? ({ userSelect: 'none' } as object) : null;

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseISODate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDisplayDate(value: string): string {
  const date = parseISODate(value);
  if (!date) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getMonthCells(monthDate: Date): Array<Date | null> {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const cells: Array<Date | null> = Array.from({ length: mondayOffset }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function isBeforeDay(date: Date, boundary: Date): boolean {
  return toISODate(date) < toISODate(boundary);
}

function isAfterDay(date: Date, boundary: Date): boolean {
  return toISODate(date) > toISODate(boundary);
}

export function DateField({
  label,
  value,
  onChange,
  placeholder = 'DD/MM/YYYY',
  minDate,
  maxDate,
}: DateFieldProps) {
  const { colors, isDark } = useTheme();
  const selectedDate = parseISODate(value);
  const min = minDate ? parseISODate(minDate) : null;
  const max = maxDate ? parseISODate(maxDate) : null;
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(selectedDate ?? new Date()),
  );

  const monthCells = useMemo(() => getMonthCells(visibleMonth), [visibleMonth]);
  const displayValue = formatDisplayDate(value);
  const todayIso = toISODate(new Date());
  const monthLabel = visibleMonth.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  function openPicker() {
    setVisibleMonth(startOfMonth(selectedDate ?? max ?? min ?? new Date()));
    setOpen(true);
  }

  function selectDate(date: Date) {
    onChange(toISODate(date));
    setOpen(false);
  }

  function clearDate() {
    onChange('');
    setOpen(false);
  }

  return (
    <View style={{ flex: 1, gap: spacing.xs }}>
      <Text style={{ fontFamily: fontFamilies.body.medium, fontSize: 13, color: colors.muted }}>
        {label}
      </Text>
      <View
        style={{
          position: 'relative',
          overflow: 'hidden',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isDark ? colors.inputBg : '#FFFFFF',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: isDark ? colors.borderSubtle : '#E8E4EF',
          paddingHorizontal: spacing.md,
          height: 48,
        }}
      >
        <Pressable
          style={{
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
            height: '100%',
            ...webPointer,
          }}
          onPress={openPicker}
          accessibilityRole="button"
          accessibilityLabel={displayValue ? `${label} ${displayValue}` : label}
        >
          <Feather name="calendar" size={18} color={colors.muted} />
          <Text
            style={{
              flex: 1,
              fontFamily: fontFamilies.body.regular,
              fontSize: 14,
              color: displayValue ? colors.foreground : colors.muted,
              ...webNoSelect,
            }}
            numberOfLines={1}
          >
            {displayValue || placeholder}
          </Text>
        </Pressable>
        {value ? (
          <Pressable
            style={{ padding: 2, ...webPointer }}
            onPress={clearDate}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Clear ${label}`}
          >
            <Feather name="x" size={16} color={colors.muted} />
          </Pressable>
        ) : null}
      </View>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
        accessibilityViewIsModal
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.lg,
            ...(Platform.OS === 'web'
              ? ({ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 } as object)
              : null),
          }}
        >
          <Pressable
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: colors.overlay,
            }}
            onPress={() => setOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close date picker"
          />
          <View
            style={{
              width: '100%',
              maxWidth: 340,
              backgroundColor: isDark ? colors.cardBg : '#FFFFFF',
              borderRadius: radii.card,
              borderWidth: 1,
              borderColor: colors.borderSubtle,
              padding: spacing.base,
              gap: spacing.md,
              zIndex: 1,
              ...shadows.clayCard,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Pressable
                style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', ...webPointer }}
                onPress={() =>
                  setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))
                }
                accessibilityLabel="Previous month"
              >
                <Feather name="chevron-left" size={20} color={colors.foreground} />
              </Pressable>
              <Text
                style={{
                  fontFamily: fontFamilies.heading.bold,
                  fontSize: fontSizes.base,
                  color: colors.foreground,
                }}
              >
                {monthLabel}
              </Text>
              <Pressable
                style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', ...webPointer }}
                onPress={() =>
                  setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))
                }
                accessibilityLabel="Next month"
              >
                <Feather name="chevron-right" size={20} color={colors.foreground} />
              </Pressable>
            </View>

            <View style={{ flexDirection: 'row' }}>
              {WEEKDAYS.map((day) => (
                <Text
                  key={day}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fontFamilies.body.medium,
                    fontSize: 12,
                    color: colors.muted,
                  }}
                >
                  {day}
                </Text>
              ))}
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {monthCells.map((date, index) => {
                if (!date) {
                  return (
                    <View
                      key={`empty-${index}`}
                      style={{ width: '14.285%', height: 40, alignItems: 'center', justifyContent: 'center' }}
                    />
                  );
                }

                const iso = toISODate(date);
                const selected = iso === value;
                const isToday = iso === todayIso;
                const disabled = Boolean(
                  (min && isBeforeDay(date, min)) || (max && isAfterDay(date, max)),
                );

                return (
                  <View
                    key={iso}
                    style={{ width: '14.285%', height: 40, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Pressable
                      style={[
                        {
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          alignItems: 'center',
                          justifyContent: 'center',
                          ...webPointer,
                        },
                        isToday && !selected && { borderWidth: 1, borderColor: colors.brand.primary },
                        selected && { backgroundColor: colors.brand.primary },
                        disabled && { opacity: 0.35 },
                      ]}
                      onPress={() => selectDate(date)}
                      disabled={disabled}
                      accessibilityRole="button"
                      accessibilityState={{ selected, disabled }}
                      accessibilityLabel={date.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    >
                      <Text
                        style={{
                          fontFamily: selected
                            ? fontFamilies.body.bold
                            : fontFamilies.body.medium,
                          fontSize: 13,
                          color: selected ? '#FFFFFF' : colors.foreground,
                        }}
                      >
                        {date.getDate()}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.sm }}>
              <Pressable
                style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 999, ...webPointer }}
                onPress={clearDate}
              >
                <Text
                  style={{ fontFamily: fontFamilies.body.medium, fontSize: 13, color: colors.brand.primary }}
                >
                  Clear
                </Text>
              </Pressable>
              <Pressable
                style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 999, ...webPointer }}
                onPress={() => setOpen(false)}
              >
                <Text
                  style={{ fontFamily: fontFamilies.body.medium, fontSize: 13, color: colors.brand.primary }}
                >
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
