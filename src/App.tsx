import React from 'react';
import AddFeed from './components/AddFeed/AddFeed';
import Feed from './components/Feed/Feed';
import { useFeedReducer } from './hooks/useFeedReducer';

import './App.css'

const App = () => {
  const { feeds, handleFeedAdd, handleFeedDelete } = useFeedReducer();

  return (
    <div className="container">
      <AddFeed addHandler={handleFeedAdd}/>
      {feeds.map((feed) =>
        <Feed key={feed.id} feed={feed} deleteHandler={handleFeedDelete} />
      )}
    </div>
  );
};

export default App;
