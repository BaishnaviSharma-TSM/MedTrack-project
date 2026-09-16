import { createElement, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { Platform, Text, View } from 'react-native';

import { DataTable, type DataTableColumn } from '@/components/data';
import type { VisitRecord } from '../types';
import { formatDisplayDate } from '@/utils/formatDisplayDate';
import { fontFamilies, useThemeColors } from '@/theme';

import { VisitConditionCell } from './VisitConditionCell';
import { VisitVitalsChips } from './VisitVitalsChips';

type VisitRecordsTableProps = {
  records: VisitRecord[];
};

type NotesTooltip = {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type RectLike = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const TOOLTIP_MAX_WIDTH = 280;
const TOOLTIP_GAP = 8;
const TOOLTIP_PAD = 12;

function getCreatePortal(): ((node: React.ReactNode, container: Element) => React.ReactNode) | null {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return null;
  try {
    return (
      require('react-dom') as { createPortal: (node: React.ReactNode, container: Element) => React.ReactNode }
    ).createPortal;
  } catch {
    return null;
  }
}

function clampTooltipPosition(anchor: NotesTooltip, tipWidth: number, tipHeight: number) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let top = anchor.y - tipHeight - TOOLTIP_GAP;
  const fitsAbove = top >= TOOLTIP_PAD;
  const belowTop = anchor.y + anchor.height + TOOLTIP_GAP;
  const fitsBelow = belowTop + tipHeight <= viewportHeight - TOOLTIP_PAD;

  if (!fitsAbove && fitsBelow) {
    top = belowTop;
  } else if (!fitsAbove) {
    top = Math.max(TOOLTIP_PAD, viewportHeight - tipHeight - TOOLTIP_PAD);
  }

  let left = anchor.x + anchor.width - tipWidth;
  if (left < TOOLTIP_PAD) left = TOOLTIP_PAD;
  if (left + tipWidth > viewportWidth - TOOLTIP_PAD) {
    left = Math.max(TOOLTIP_PAD, viewportWidth - tipWidth - TOOLTIP_PAD);
  }

  return { left, top };
}

function NotesHoverTooltip({
  tooltip,
  backgroundColor,
  textColor,
}: {
  tooltip: NotesTooltip;
  backgroundColor: string;
  textColor: string;
}) {
  const nodeRef = useRef<{ getBoundingClientRect: () => RectLike } | null>(null);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);

  useLayoutEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const tip = node.getBoundingClientRect();
    setCoords(clampTooltipPosition(tooltip, tip.width, tip.height));
  }, [tooltip]);

  const createPortal = getCreatePortal();
  if (!createPortal || typeof document === 'undefined') return null;

  return createPortal(
    createElement(
      'div',
      {
        ref: (node: { getBoundingClientRect: () => RectLike } | null) => {
          nodeRef.current = node;
        },
        style: {
          position: 'fixed',
          left: coords?.left ?? Math.max(TOOLTIP_PAD, tooltip.x + tooltip.width - TOOLTIP_MAX_WIDTH),
          top: coords?.top ?? Math.max(TOOLTIP_PAD, tooltip.y - TOOLTIP_GAP),
          transform: coords ? undefined : 'translateY(-100%)',
          zIndex: 100000,
          maxWidth: TOOLTIP_MAX_WIDTH,
          padding: '8px 10px',
          background: backgroundColor,
          color: textColor,
          borderRadius: 8,
          fontSize: 12,
          lineHeight: '18px',
          fontFamily: 'DMSans_400Regular, system-ui, sans-serif',
          boxShadow: '0 8px 24px rgba(51, 47, 58, 0.22)',
          pointerEvents: 'none',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        },
      },
      tooltip.text,
    ),
    document.body,
  );
}

function NotesCell({
  notes,
  onTooltip,
}: {
  notes?: string;
  onTooltip: (tooltip: NotesTooltip | null) => void;
}) {
  const colors = useThemeColors();
  const wrapRef = useRef<View>(null);
  const textRef = useRef<Text>(null);
  const truncatedRef = useRef(false);

  if (!notes) {
    return <Text style={{ color: colors.muted }}>—</Text>;
  }

  const measureTruncation = (target?: unknown) => {
    const node = (target ?? textRef.current) as { scrollWidth?: number; clientWidth?: number } | null;
    truncatedRef.current =
      node && typeof node.scrollWidth === 'number' && typeof node.clientWidth === 'number'
        ? node.scrollWidth > node.clientWidth + 1
        : notes.length > 32;
  };

  const showTooltip = (rect?: RectLike) => {
    if (!truncatedRef.current) return;
    if (rect) {
      onTooltip({
        text: notes,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
      return;
    }
    wrapRef.current?.measureInWindow((x, y, width, height) => {
      onTooltip({ text: notes, x, y, width, height });
    });
  };

  return (
    <View
      ref={wrapRef}
      style={{ width: '100%', minWidth: 0 }}
      {...(Platform.OS === 'web'
        ? {
            onMouseEnter: (event: { currentTarget?: { getBoundingClientRect?: () => RectLike } }) => {
              showTooltip(event.currentTarget?.getBoundingClientRect?.());
            },
            onMouseLeave: () => onTooltip(null),
          }
        : null)}
    >
      <Text
        ref={textRef}
        numberOfLines={1}
        ellipsizeMode="tail"
        onLayout={(event) => {
          const target = (event.nativeEvent as { target?: unknown }).target;
          measureTruncation(target);
        }}
        style={{ color: colors.muted, width: '100%' }}
      >
        {notes}
      </Text>
    </View>
  );
}

function useColumns(onNotesTooltip: (tooltip: NotesTooltip | null) => void): DataTableColumn<VisitRecord>[] {
  const colors = useThemeColors();

  return [
    {
      key: 'date',
      label: 'Date',
      width: '12%',
      render: (record) => (
        <Text style={{ color: colors.muted }}>{formatDisplayDate(record.visit.visitDate)}</Text>
      ),
    },
    {
      key: 'patient',
      label: 'Patient',
      width: '16%',
      render: (record) => (
        <Text style={{ fontFamily: fontFamilies.body.bold, color: colors.foreground }} numberOfLines={1}>
          {record.patient.name}
        </Text>
      ),
    },
    {
      key: 'id',
      label: 'Patient ID',
      width: '11%',
      render: (record) => (
        <Text style={{ color: colors.muted }}>{record.patient.uniqueId}</Text>
      ),
    },
    {
      key: 'condition',
      label: 'Condition',
      width: '16%',
      render: (record) => <VisitConditionCell condition={record.visit.condition} />,
    },
    {
      key: 'vitals',
      label: 'Vitals',
      width: '29%',
      render: (record) => <VisitVitalsChips vitals={record.visit.vitals} max={2} />,
    },
    {
      key: 'notes',
      label: 'Notes',
      width: '16%',
      render: (record) => <NotesCell notes={record.visit.notes} onTooltip={onNotesTooltip} />,
    },
  ];
}

export function VisitRecordsTable({ records }: VisitRecordsTableProps) {
  const router = useRouter();
  const colors = useThemeColors();
  const [notesTooltip, setNotesTooltip] = useState<NotesTooltip | null>(null);
  const columns = useColumns(setNotesTooltip);

  return (
    <View>
      <DataTable
        columns={columns}
        data={records}
        keyExtractor={(record) => record.visit.id}
        onRowPress={(record) => router.push(`/(app)/visits/${record.visit.id}`)}
        emptyMessage="No visit records found."
      />
      {Platform.OS === 'web' && notesTooltip ? (
        <NotesHoverTooltip
          key={`${notesTooltip.x}-${notesTooltip.y}-${notesTooltip.text}`}
          tooltip={notesTooltip}
          backgroundColor={colors.foreground}
          textColor={colors.white}
        />
      ) : null}
    </View>
  );
}
