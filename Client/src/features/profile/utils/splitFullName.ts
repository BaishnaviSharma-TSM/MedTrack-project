const HONORIFIC = /^(dr\.?|doctor)$/i;

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const working = parts.length > 1 && HONORIFIC.test(parts[0]) ? parts.slice(1) : parts;

  if (working.length === 0) {
    return { firstName: '', lastName: '' };
  }

  if (working.length === 1) {
    return { firstName: working[0], lastName: '' };
  }

  return {
    firstName: working[0],
    lastName: working.slice(1).join(' '),
  };
}

export function joinFullName(
  firstName: string,
  lastName: string,
  originalFullName = '',
): string {
  const originalParts = originalFullName.trim().split(/\s+/).filter(Boolean);
  const honorific =
    originalParts.length > 0 && HONORIFIC.test(originalParts[0]) ? originalParts[0] : '';

  return [honorific, firstName.trim(), lastName.trim()].filter(Boolean).join(' ');
}
