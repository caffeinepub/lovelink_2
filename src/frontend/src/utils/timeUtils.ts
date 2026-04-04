/**
 * Utility: format bigint nanosecond timestamps as relative time
 */
export function formatDistanceToNow(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  const now = Date.now();
  const diff = now - ms;

  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

export function formatTimestamp(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
