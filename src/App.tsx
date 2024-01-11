import React, { FC } from 'react';
import AddFeed from './components/AddFeed/AddFeed';
import Feed from './components/Feed/Feed';
import { useFeedReducer } from './hooks/useFeedReducer';

import './App.css'

type Props = {
  userId: string;
  userMsgId: string;
}

const App: FC<Props> = () => {
  const { feeds, handleFeedAdd, handleFeedDelete } = useFeedReducer();

  return (
    <div>
      <AddFeed addHandler={handleFeedAdd}/>
      {feeds.map((feed) =>
        <Feed feed={feed} deleteHandler={handleFeedDelete} />
      )}
    </div>
  );
};

export default App;
