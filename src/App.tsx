import React, { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddFeed from './components/AddFeed';
import Feed from './components/Feed';
import { FeedActionType } from './utils/feedActions';

export interface FeedType {
  id: string;
  timestamp: number;
  userId: string;
  userMsgId: string;
  type: FeedActionType['name'];
  msg: string;
};

type FeedAdd = { type: 'feedAdd', payload: Omit<FeedType, 'id'> };
type FeedEdit = { type: 'feedEdit', payload: FeedType };
type FeedDelete = { type: 'feedDelete', payload: string };

type Props = {
  userId: string;
  userMsgId: string;
}

const App: FC<Props> = ({ userId = '1', userMsgId = '2' }) => {
  const [feeds, dispatch] = useReducer((state: FeedType[], action: FeedAdd | FeedEdit | FeedDelete) => {
    switch (action.type) {
      case 'feedAdd': {
        return [...state, { id: uuidv4(), ...action.payload }];
      }
      case 'feedEdit': {
        const index = state.findIndex((item: FeedType) => item.id === action.payload.id);
        return [ ...state.slice(0, index),
          { ...action.payload },
          ...state.slice(index)]
      }
      case 'feedDelete': {
        return state.filter((item: FeedType) => item.id !== action.payload)
      }
      default:
        return state;
    }
  }, []);

  const handleFeedAdd = (feed: Omit<FeedType, 'id' | 'userId' | 'userMsgId'>) => {
    dispatch({ type: 'feedAdd', payload: { ...feed, userId, userMsgId }})
  }

  const handleFeedEdit = (feed: FeedType) => {
    dispatch({ type: 'feedEdit', payload: feed})
  }

  const handleFeedDelete = (id: string) => {
    dispatch({ type: 'feedDelete', payload: id})
  }

  return (
    <div>
      <AddFeed addHandler={handleFeedAdd}/>
      {feeds.map((feed: FeedType) =>
        <Feed feed={feed} deleteHandler={handleFeedDelete} userId={userId} userMsgId={userMsgId}/>
      )}
    </div>
  );
};

export default App;
