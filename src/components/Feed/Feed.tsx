import React, { FC, memo, useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { FeedType } from '../../hooks/useFeedReducer';
import { getFeedActionText, getFeedActionIcon } from '../../utils/feedActions';
import { getUserNameById } from '../../utils/users';
import { calculateDaysBetween } from '../../utils/calculateDaysBetween';
import { useUserData } from '../../providers/userContext';

import './Feed.css';

type Props = {
  feed: FeedType;
  deleteHandler: (id: string) => void;
};

const Feed: FC<Props>= ({ feed, deleteHandler }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const { user } = useUserData();
  const Icon = getFeedActionIcon(feed.type);

  const handleDelete = () => {
    deleteHandler(feed.id);
  }

  return (
    <div className='feedContainer'>
      <div className='feedDay'>
        <div data-testid='feed-time'>{calculateDaysBetween(feed.timestamp)}d</div>
        {Icon && <Icon height="20" width="20" />}
      </div>
      <div className="feedMessageBlock">
        <div>
          <p data-testid='feed-header'>
            <span className='feedTextBold'>{getUserNameById(user.userId)}</span>
            <span> {`${getFeedActionText(feed.type)} `}</span>
            <span className='feedTextBold'>{getUserNameById(feed.userMsgId)}</span>
          </p>
          <p data-testid='feed-msg' className='feedSmallText'>{feed.msg}</p>
        </div>
        <div className='popoverContainer'>
          <Popover
            containerStyle={{ lineHeight: '79px;' }}
            isOpen={isPopoverOpen}
            onClickOutside={() => setIsPopoverOpen(!isPopoverOpen)}
            positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
            content={<div className="popover" onClick={handleDelete}>Delete</div>}
          >
            <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
              Popover
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default memo(Feed);
