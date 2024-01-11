import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FeedActionType } from '../utils/feedActions';
import { useUserData } from '../providers/userContext';

export interface FeedType {
  id: string;
  timestamp: number;
  userId: string;
  userMsgId: string;
  type: FeedActionType['name'];
  msg: string;
};

export type FeedAdd = { type: 'feedAdd', payload: Omit<FeedType, 'id'> };
export type FeedEdit = { type: 'feedEdit', payload: FeedType };
export type FeedDelete = { type: 'feedDelete', payload: string };

export const feedReducer = (state: FeedType[], action: FeedAdd | FeedEdit | FeedDelete) => {
  switch (action.type) {
    case 'feedAdd': {
      return [...state, { id: uuidv4(), ...action.payload }];
    }
    case 'feedEdit': {
      return state.map(f => {
        if (f.id !== action.payload.id) {
          return f;
        }

        return {...f, ...action.payload}
      }).sort((a: FeedType, b:FeedType) => a.timestamp - b.timestamp)
    }
    case 'feedDelete': {
      return state.filter((item: FeedType) => item.id !== action.payload)
    }
    default:
      return state;
  }
}

export const useFeedReducer = () => {
  const { user } = useUserData();
  const [feeds, dispatch] = useReducer(feedReducer, []);

  const handleFeedAdd = (feed: Omit<FeedType, 'id' | 'userId'>) => {
    dispatch({ type: 'feedAdd', payload: { ...feed, userId: user.userId }})
  }

  const handleFeedEdit = (feed: FeedType) => {
    dispatch({ type: 'feedEdit', payload: feed})
  }

  const handleFeedDelete = (id: string) => {
    dispatch({ type: 'feedDelete', payload: id})
  }

  return { feeds, handleFeedAdd, handleFeedEdit, handleFeedDelete };
}
