import { FunctionComponent } from "react";

import { ReactComponent as Beer } from "../assets/beer.svg";
import { ReactComponent as Message } from "../assets/message.svg";
import { ReactComponent as Phone } from "../assets/phone.svg";
import { ReactComponent as Coffee } from "../assets/coffee.svg";
import { ReactComponent as Note } from "../assets/note.svg";

export type FeedActionType = {
  name: 'message' | 'phone' | 'coffee' | 'beer' | 'meeting';
  text: string;
  icon: FunctionComponent;
}

export const feedActions = [
  { name: 'message', text: 'had a meeting with', icon: Message },
  { name: 'phone', text: 'had a call with', icon: Phone },
  { name: 'coffee', text: 'had a coffee with', icon: Coffee },
  { name: 'beer', text: 'had a beer with', icon: Beer },
  { name: 'meeting', text: 'added a note', icon: Note }
] as FeedActionType[];

export const getFeedActionText = (type: FeedActionType['name']): string => {
  return feedActions.find(action => action.name === type)?.text || '';
}

export const getFeedActionIcon = (type: FeedActionType['name']): FunctionComponent | undefined => {
  return feedActions.find(action => action.name === type)?.icon;
}
