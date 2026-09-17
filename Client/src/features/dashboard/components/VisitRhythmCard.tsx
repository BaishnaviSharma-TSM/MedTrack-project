import { useMemo, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import { CHART_CONDITIONS } from '@/constants/chartConditions';
import { fontFamilies, useTheme } from '@/theme';
import type { ConditionType } from '@/types';

/* ───────────────── Types ───────────────── */

type RangeOption = 7 | 30 | 90;

export type RhythmVisitEntry = {
  date: string;
  condition: ConditionType;
};

type Bucket = {
  start: Date;
  end: Date;
  total: number;
} & Record<ConditionType, number>;

type VisitRhythmCardProps = {
  visits: RhythmVisitEntry[];
  today?: Date;
  defaultRange?: RangeOption;
};

/* ───────────────── Constants ───────────────── */

const RANGE_LABELS: Record<RangeOption, string> = {
  7: 'last 7 days',
  30: 'last 30 days',
  90: 'last 12 weeks',
};

const RANGE_BUTTONS: { value: RangeOption; label: string }[] = [
  { value: 7, label: '7d' },
  { value: 30, label: '30d' },
  { value: 90, label: '90d' },
];

const SVG_W = 720;
const SVG_H = 150;
const PAD_X = 8;
const BASELINE_Y = SVG_H - 18;
const TOP_GUIDE_Y = 14;
const USABLE_H = BASELINE_Y - 16;
const SEGMENT_GAP = 1.5;
const MIN_SEGMENT_H = 2;

/* ───────────────── Helpers ───────────────── */

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function parseISO(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function fmtShort(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function fmtRange(start: Date, end: Date): string {
  return `${fmtShort(start)}–${fmtShort(end)}`;
}

function emptyBucket(start: Date, end: Date): Bucket {
  const counts = Object.fromEntries(
    CHART_CONDITIONS.map((c) => [c.id, 0]),
  ) as Record<ConditionType, number>;
  return { start, end, total: 0, ...counts };
}

/* ───────────────── Aggregation ───────────────── */

const CONDITION_KEYS: ConditionType[] = CHART_CONDITIONS.map((c) => c.id);

function assignVisits(visits: RhythmVisitEntry[], buckets: Bucket[]): void {
  for (const v of visits) {
    const vd = parseISO(v.date);
    for (const b of buckets) {
      if (vd >= b.start && vd <= b.end && CONDITION_KEYS.includes(v.condition)) {
        b.total++;
        b[v.condition]++;
        break;
      }
    }
  }
}

function buildBuckets(
  visits: RhythmVisitEntry[],
  range: RangeOption,
  today: Date,
): Bucket[] {
  const anchor = startOfDay(today);

  if (range === 90) {
    const buckets: Bucket[] = [];
    for (let i = 12; i >= 0; i--) {
      const end = addDays(anchor, -i * 7);
      const start = addDays(end, -6);
      buckets.push(emptyBucket(start, end));
    }
    assignVisits(visits, buckets);
    return buckets;
  }

  const buckets: Bucket[] = [];
  for (let i = range - 1; i >= 0; i--) {
    const day = addDays(anchor, -i);
    buckets.push(emptyBucket(day, day));
  }
  assignVisits(visits, buckets);
  return buckets;
}

/* ───────────────── Component ───────────────── */

export function VisitRhythmCard({
  visits,
  today: todayProp,
  defaultRange = 7,
}: VisitRhythmCardProps) {
  const { colors, isDark } = useTheme();
  const [range, setRange] = useState<RangeOption>(defaultRange);
  const today = todayProp ?? new Date();

  const buckets = useMemo(
    () => buildBuckets(visits, range, today),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visits, range, today.toDateString()],
  );

  const max = useMemo(() => Math.max(...buckets.map((b) => b.total)) || 1, [buckets]);
  const allEmpty = buckets.every((b) => b.total === 0);

  const slot = (SVG_W - PAD_X * 2) / buckets.length;
  const barWidth = Math.min(slot - Math.max(2, slot * 0.22), 26);

  const conditionColors = CHART_CONDITIONS.map((c) => (isDark ? c.darkColor : c.color));

  const ink2 = isDark ? '#B0BEC5' : '#4A4458';
  const ink3 = isDark ? '#8899A8' : '#635F69';
  const lineColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
  const line2Color = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)';

  const rangeStart = buckets.length > 0 ? fmtShort(buckets[0].start) : '';

  /* ── Theme-aware card styles ── */
  const cardBg = isDark ? colors.cardBg : '#FFFFFF';
  const borderColor = isDark ? colors.borderSubtle : '#E8E4EF';

  return (
    <View
      style={{
        backgroundColor: cardBg,
        borderRadius: 14,
        borderWidth: 1,
        borderColor,
        padding: 20,
        ...(Platform.OS === 'web'
          ? ({
              boxShadow: isDark
                ? '0 1px 3px rgba(0,0,0,0.4)'
                : '0 1px 3px rgba(160,150,180,0.18)',
            } as object)
          : null),
      }}
    >
      {/* ── Header row ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 14,
          gap: 12,
        }}
      >
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            style={{
              fontFamily: fontFamilies.heading.bold,
              fontSize: 15,
              color: colors.foreground,
            }}
          >
            Visit rhythm
          </Text>
          <Text
            style={{
              fontFamily: fontFamilies.body.regular,
              fontSize: 12,
              color: colors.muted,
              marginTop: 2,
            }}
          >
            {RANGE_LABELS[range]}, shaded by condition
          </Text>
        </View>

        {/* Segmented control */}
        <View
          role="group"
          style={{
            flexDirection: 'row',
            backgroundColor: isDark ? colors.brand.alpha06 : '#F0ECF5',
            borderRadius: 8,
            padding: 2,
          }}
        >
          {RANGE_BUTTONS.map((btn) => {
            const active = btn.value === range;
            return (
              <Pressable
                key={btn.value}
                role="button"
                aria-pressed={active}
                onPress={() => setRange(btn.value)}
                style={({ pressed }) => ({
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  borderRadius: 6,
                  backgroundColor: active ? colors.accent.primary : 'transparent',
                  opacity: pressed && !active ? 0.7 : 1,
                  ...(Platform.OS === 'web'
                    ? ({
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'background-color 0.15s ease',
                      } as object)
                    : null),
                })}
              >
                <Text
                  style={{
                    fontFamily: fontFamilies.body.bold,
                    fontSize: 12,
                    color: active ? '#FFFFFF' : colors.muted,
                  }}
                >
                  {btn.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* ── SVG chart (web only — falls back to nothing on native) ── */}
      {Platform.OS === 'web' ? (
        <>
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            role="img"
            aria-labelledby="vrcard-title"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <title id="vrcard-title">Daily visit counts by condition</title>

            {/* Peak guide line */}
            <line
              x1={0}
              y1={TOP_GUIDE_Y}
              x2={SVG_W}
              y2={TOP_GUIDE_Y}
              stroke={lineColor}
              strokeWidth={1}
              strokeDasharray="3 5"
            />
            <text
              x={4}
              y={TOP_GUIDE_Y - 3}
              fill={ink3}
              fontSize={11}
              fontFamily="DM Sans, sans-serif"
            >
              {max}
            </text>

            {/* Baseline */}
            <line
              x1={0}
              y1={BASELINE_Y}
              x2={SVG_W}
              y2={BASELINE_Y}
              stroke={line2Color}
              strokeWidth={1}
            />

            {/* Columns */}
            {buckets.map((bucket, i) => {
              const cx = PAD_X + slot * i + slot / 2;

              if (bucket.total === 0) {
                const tooltipText =
                  range === 90
                    ? `${fmtRange(bucket.start, bucket.end)}: no visits`
                    : `${fmtShort(bucket.start)}: no visits`;
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={BASELINE_Y}
                    r={1.8}
                    fill={line2Color}
                  >
                    <title>{tooltipText}</title>
                  </circle>
                );
              }

              const segments: {
                condIdx: number;
                count: number;
                condName: string;
              }[] = [];
              for (let ci = 0; ci < CHART_CONDITIONS.length; ci++) {
                const cond = CHART_CONDITIONS[ci];
                const count = bucket[cond.id] ?? 0;
                if (count > 0) segments.push({ condIdx: ci, count, condName: cond.name });
              }

              const totalGap = Math.max(0, (segments.length - 1) * SEGMENT_GAP);
              const rawBarH = (bucket.total / max) * USABLE_H;
              const barH = Math.max(rawBarH, segments.length * MIN_SEGMENT_H + totalGap);

              let yOffset = BASELINE_Y;
              const rects: React.ReactNode[] = [];

              for (let si = 0; si < segments.length; si++) {
                const seg = segments[si];
                const isTop = si === segments.length - 1;

                let segH = (seg.count / bucket.total) * (barH - totalGap);
                segH = Math.max(segH, MIN_SEGMENT_H);

                const segY = yOffset - segH;
                const tooltipText =
                  range === 90
                    ? `${fmtRange(bucket.start, bucket.end)} · ${seg.count} ${seg.condName}`
                    : `${fmtShort(bucket.start)} · ${seg.count} ${seg.condName}`;

                rects.push(
                  <rect
                    key={`${i}-${seg.condIdx}`}
                    x={cx - barWidth / 2}
                    y={segY}
                    width={barWidth}
                    height={segH}
                    fill={conditionColors[seg.condIdx]}
                    rx={isTop ? 3 : 0}
                    ry={isTop ? 3 : 0}
                    shapeRendering="crispEdges"
                  >
                    <title>{tooltipText}</title>
                  </rect>,
                );

                yOffset = segY - SEGMENT_GAP;
              }

              const countLabel =
                bucket.total >= 3 ? (
                  <text
                    x={cx}
                    y={yOffset + SEGMENT_GAP - 4}
                    fill={ink2}
                    fontSize={11}
                    fontWeight={700}
                    fontFamily="DM Sans, sans-serif"
                    textAnchor="middle"
                  >
                    {bucket.total}
                  </text>
                ) : null;

              return (
                <g key={i}>
                  {rects}
                  {countLabel}
                </g>
              );
            })}

            {/* Empty-state label */}
            {allEmpty && (
              <text
                x={SVG_W / 2}
                y={BASELINE_Y / 2 + 5}
                fill={ink3}
                fontSize={13}
                fontFamily="DM Sans, sans-serif"
                textAnchor="middle"
              >
                No visits recorded in this range.
              </text>
            )}
          </svg>

          {/* X-axis labels */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 4,
              marginTop: 4,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamilies.body.regular,
                fontSize: 12,
                color: ink3,
              }}
            >
              {rangeStart}
            </Text>
            <Text
              style={{
                fontFamily: fontFamilies.body.regular,
                fontSize: 12,
                color: ink3,
              }}
            >
              Today
            </Text>
          </View>

          {/* ── Visually-hidden table for screen readers ── */}
          <View
            accessibilityRole="summary"
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              ...(Platform.OS === 'web'
                ? ({
                    clip: 'rect(0 0 0 0)',
                    clipPath: 'inset(50%)',
                    whiteSpace: 'nowrap',
                  } as object)
                : null),
            }}
          >
            {/* Render a real HTML table for assistive tech on web */}
            {Platform.OS === 'web' && (
              <table>
                <caption>Daily visit counts by condition</caption>
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    {CHART_CONDITIONS.map((c) => (
                      <th key={c.id} scope="col">
                        {c.name}
                      </th>
                    ))}
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {buckets.map((b, i) => (
                    <tr key={i}>
                      <td>
                        {range === 90
                          ? fmtRange(b.start, b.end)
                          : fmtShort(b.start)}
                      </td>
                      {CHART_CONDITIONS.map((c) => (
                        <td key={c.id}>{b[c.id]}</td>
                      ))}
                      <td>{b.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </View>

          {/* ── Condition legend ── */}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 14,
              marginTop: 14,
            }}
          >
            {CHART_CONDITIONS.map((cond, idx) => (
              <View
                key={cond.id}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    backgroundColor: conditionColors[idx],
                  }}
                />
                <Text
                  style={{
                    fontFamily: fontFamilies.body.regular,
                    fontSize: 12,
                    color: colors.muted,
                  }}
                >
                  {cond.name}
                </Text>
              </View>
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
}
