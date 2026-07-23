/**
 * Store Status Utility for managing store operational status
 */

export function getStoreClosureStatus(): 'tomorrow_closed' | 'today_closed' | 'open' {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const CLOSED_DATE = '2026-07-24'; // Target closed date

  if (todayStr < CLOSED_DATE) {
    return 'tomorrow_closed';
  } else if (todayStr === CLOSED_DATE) {
    return 'today_closed';
  } else {
    return 'open';
  }
}

export function isStoreClosedToday(): boolean {
  return getStoreClosureStatus() === 'today_closed';
}
