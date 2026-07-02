export function getAvatarUrl(avatar?: string | null): string | null {
  if (!avatar) return null;
  return avatar.startsWith("http") ? avatar : `http://localhost:5000${avatar}`;
}