export function formatDisplayDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDisplayDateTime(isoDate: string) {
  return new Date(isoDate).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Compact date for vitals footers — e.g. "16 Sept" */
export function formatShortDisplayDate(isoDate: string) {
  const formatted = new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
  return formatted.replace(/^0/, '');
}
