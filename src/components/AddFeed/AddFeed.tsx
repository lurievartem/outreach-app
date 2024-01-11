import React, { FC, memo, useState, ChangeEventHandler, SyntheticEvent } from 'react';
import { FeedType } from '../../hooks/useFeedReducer';
import { feedActions, FeedActionType } from '../../utils/feedActions';

import './AddFeed.css';

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
      setMsg('');
      setFeedActionType(undefined);
    }
  };

  const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setMsg(event.currentTarget.value)
  }

  const handleChangeActionType = (name: FeedActionType['name']) => {
    setFeedActionType(name);
  }

  return (
    <form data-testid='addFeed' className='addFeedForm'>
      <textarea
        className='addFeedInput'
        data-testid='addFeed-input'
        value={msg}
        onChange={handleInput}
      />
      <div className='addFeedTypeContainer'>
        <div className="addFeedIconContainer">
          {feedActions.map((action: FeedActionType) => {
            const Icon = action.icon;
            return (
              <div key={action.name} onClick={() => handleChangeActionType(action.name)}>
                <Icon height="20" width="20" className={feedActionType === action.name ? 'iconSelected' : ''} />
              </div>
            );
          })}
        </div>
        <button className="addFeedSubmit" data-testid='addFeed-submit' disabled={!msg} onClick={submitHandler}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default memo(AddFeed);
