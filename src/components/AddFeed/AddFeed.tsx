import React, { FC, memo, useState, ChangeEventHandler, SyntheticEvent } from 'react';
import { FeedType } from '../../hooks/useFeedReducer';
import { feedActions, FeedActionType } from '../../utils/feedActions';

type Props = {
  addHandler: (data: Omit<FeedType, 'id' | 'userId'>) => void;
};

const AddFeed: FC<Props>= ({ addHandler }) => {
  const [msg, setMsg] = useState<string>();
  const [feedActionType, setFeedActionType] = useState<FeedActionType['name']>();

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    if(msg && feedActionType) {
      const timestamp = (new Date()).getTime();
      addHandler({ timestamp, msg, type: feedActionType, userMsgId: '2' });
    }
  };

  const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMsg(event.currentTarget.value)
  }

  const handleChangeActionType = (name: FeedActionType['name']) => {
    setFeedActionType(name);
  }

  return (
    <form data-testid='addFeed'>
      <input
        data-testid='addFeed-input'
        type="text"
        value={msg}
        onChange={handleInput}
      />
      <div>
        {feedActions.map((action: FeedActionType) =>
          <div key={action.name} onClick={() => handleChangeActionType(action.name)}>{action.icon}</div>)}
      </div>
      <button data-testid='addFeed-submit' disabled={!msg} onClick={submitHandler}>
        Submit
      </button>
    </form>
  );
};

export default memo(AddFeed);
