import React, { FC, memo } from 'react';
import { FeedType } from '../../App';
import { getFeedActionText, getFeedActionIcon } from '../../utils/feedActions';
import { getUserNameById } from '../../utils/users';
import { calculateDaysBetween } from '../../utils/calculateDaysBetween';
import { useUserData } from '../../providers/userContext';

type Props = {
  feed: FeedType;
  deleteHandler: (id: string) => void;
};

const Feed: FC<Props>= ({ feed, deleteHandler }) => {
  const { user } = useUserData();
  const handleDelete = () => {
    deleteHandler(feed.id);
  }

  return (
    <div key={feed.id}>
      <div data-testid='feed-time'>{calculateDaysBetween(feed.timestamp)}d</div>
      <div>{getFeedActionIcon(feed.type)}</div>
      <div>
        <p data-testid='feed-header'>{`${getUserNameById(user.userId)} ${getFeedActionText(feed.type)} ${getUserNameById(feed.userMsgId)}`}</p>
        <p data-testid='feed-msg'>{feed.msg}</p>
      </div>
      <div>
        <button popovertarget="mypopover" onClcik={handleDelete}>Delete</button>
        <div id="mypopover" popover>Popover content</div>
      </div>
    </div>
  );
};

export default memo(Feed);
