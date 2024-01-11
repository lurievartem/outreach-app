import React, { FC, memo } from 'react';
import { FeedType } from '../App';
import { getFeedActionText, getFeedActionIcon } from '../utils/feedActions';
import { getUserNameById } from '../utils/users';
import { calculateDaysBetween } from '../utils/calculateDaysBetween';

type Props = {
  userId: string;
  userMsgId: string;
  feed: FeedType;
  deleteHandler: (id: string) => void;
};

const Feed: FC<Props>= ({ feed, userId, userMsgId, deleteHandler }) => {
  const handleDelete = () => {
    deleteHandler(feed.id);
  }

  return (
    <div key={feed.id}>
      <div>{calculateDaysBetween(feed.timestamp)}d</div>
      <div>{getFeedActionIcon(feed.type)}</div>
      <div>
        <p>{`${getUserNameById(userId)} ${getFeedActionText(feed.type)} ${getUserNameById(userMsgId)}`}</p>
        <p>{feed.msg}</p>
      </div>
      <div>
        <button popovertarget="mypopover" onClcik={handleDelete}>Delete</button>
        <div id="mypopover" popover>Popover content</div>
      </div>
    </div>
  );
};

export default memo(Feed);
