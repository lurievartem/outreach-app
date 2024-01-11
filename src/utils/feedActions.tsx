export type FeedActionType = {
  name: 'message' | 'phone' | 'coffee' | 'beer' | 'meeting';
  text: string;
  icon: string;
}

export const feedActions = [
  { name: 'message', text: 'had a meeting with', icon: '' },
  { name: 'phone', text: 'had a call with', icon: '' },
  { name: 'coffee', text: 'had a coffee with', icon: '' },
  { name: 'beer', text: 'had a beer with', icon: '' },
  { name: 'meeting', text: 'added a note', icon: '' }
] as FeedActionType[];

export const getFeedActionText = (type: FeedActionType['name']): string => {
  return feedActions.find(action => action.name === type)?.text || '';
}

export const getFeedActionIcon = (type: FeedActionType['name']): string => {
  return feedActions.find(action => action.name === type)?.icon || '';
}
