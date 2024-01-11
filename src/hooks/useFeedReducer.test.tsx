import React from 'react';
import { feedReducer } from './useFeedReducer';
import { feedActions } from '../utils/feedActions';

const item = { id: '2', msg: 'dfds', timestamp: 2, userId: '1', userMsgId: '2', type: feedActions[0].name };

test('returns new state for "add" type', () => {
  const initialState = [];
  const addAction = {type: 'feedAdd', payload: item };
  const updatedState = feedReducer(initialState, addAction);
  expect(updatedState).toEqual([item]);
});

test('returns new state for "edit" type', () => {
  const initialState = [item, { ...item, id: '4', msg: 'old' }];
  const updateAction = {type: 'feedEdit', payload: { ...item, id: '4', msg: 'new' } };
  const updatedState = feedReducer(initialState, updateAction);
  expect(updatedState).toEqual([item, { ...item, id: '4', msg: 'new' }]);
});

test('returns new state for "delete" type', () => {
  const initialState = [item, { ...item, id: '4', msg: 'old' }];
  const deleteAction = {type: 'feedDelete', payload: '4' };
  const updatedState = feedReducer(initialState, deleteAction);
  expect(updatedState).toEqual([item]);
});
