export type User = { userId: string, name: string };

export const users = [
  { userId: '1', name: 'You' },
  { userId: '2', name: 'Milton Romaguera' }
] as User[]

export const getUserNameById = (id: string): string => {
  return (users.find(u => u.userId === id))?.name || '';
}
