import React from 'react';
import { render, screen } from '@testing-library/react';
import Feed from './Feed';
import { feedActions } from '../../utils/feedActions';
import { UserProvider } from '../../providers/userContext';

const ONE_DAY = 1000 * 60 * 60 * 24;
const differenceMs = Math.abs((new Date()).getTime() - ONE_DAY);

const feed = { id: '2', msg: 'message', timestamp: differenceMs, userId: '1', userMsgId: '2', type: feedActions[0].name };

const wrapper = ({ children }) => (
  <UserProvider >{children}</UserProvider>
);

test('renders Feed', () => {
  render(<Feed feed={feed} deleteHandler={() => {}}/>, { wrapper });
  expect(screen.getByTestId("feed-time").textContent).toEqual('1d');
  expect(screen.getByTestId("feed-header").textContent).toEqual('You had a meeting with Milton Romaguera');
  expect(screen.getByTestId("feed-msg").textContent).toEqual(feed.msg);
});
