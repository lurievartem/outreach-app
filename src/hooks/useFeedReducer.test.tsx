import { feedReducer, FeedType, FeedAdd, FeedEdit, FeedDelete } from './useFeedReducer';
import { feedActions } from '../utils/feedActions';

const item = { id: '2', msg: 'dfds', timestamp: 2, userId: '1', userMsgId: '2', type: feedActions[0].name };

test('returns new state for "add" type', () => {
  const initialState = [] as FeedType[];
  const addAction = {type: 'feedAdd', payload: item };
  const updatedState = feedReducer(initialState, addAction as FeedAdd);
  expect(updatedState).toEqual([item]);
});

test('returns new state for "edit" type', () => {
  const initialState = [item, { ...item, id: '4', msg: 'old' }];
  const updateAction = {type: 'feedEdit', payload: { ...item, id: '4', msg: 'new' } };
  const updatedState = feedReducer(initialState, updateAction as FeedEdit);
  expect(updatedState).toEqual([item, { ...item, id: '4', msg: 'new' }]);
});

test('returns new state for "delete" type', () => {
  const initialState = [item, { ...item, id: '4', msg: 'old' }];
  const deleteAction = {type: 'feedDelete', payload: '4' };
  const updatedState = feedReducer(initialState, deleteAction as FeedDelete);
  expect(updatedState).toEqual([item]);
});
