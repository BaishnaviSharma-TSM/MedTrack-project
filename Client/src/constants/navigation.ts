/** Shared bottom tab bar dimensions */
export const TAB_BAR_HEIGHT = 64;
export const FAB_SIZE = 56;
export const FAB_OVERFLOW = FAB_SIZE / 2;
export const TAB_CONTENT_BOTTOM_PADDING = TAB_BAR_HEIGHT + FAB_OVERFLOW + 16;

export function getTabContentBottomPadding(bottomInset: number) {
  return TAB_CONTENT_BOTTOM_PADDING + bottomInset;
}
